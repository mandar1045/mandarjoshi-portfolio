defmodule Portfolio.GitHub do
  @moduledoc """
  Fetches pull requests, issues and library stats from the GitHub and Hex APIs.

  Pull requests and issues on the user's own repositories are left out at the
  query level, so only work on other people's projects is counted.
  """

  alias Portfolio.{PullRequest, Snapshot}

  @per_page 100
  @max_pages 5

  @spec fetch() :: {:ok, Snapshot.t()} | {:error, term()}
  def fetch do
    user = Application.fetch_env!(:portfolio, :github_user)
    package = Application.fetch_env!(:portfolio, :hex_package)
    scope = "author:#{user} -user:#{user}"

    with {:ok, merged} <- search("is:pr is:merged #{scope}"),
         {:ok, open} <- search("is:pr is:open #{scope}"),
         {:ok, issues} <- search("is:issue #{scope}"),
         {:ok, repo} <- get(github(), "/repos/#{user}/#{package}"),
         {:ok, hex} <- get(hex(), "/api/packages/#{package}") do
      {:ok,
       %Snapshot{
         fetched_at: DateTime.utc_now() |> DateTime.truncate(:second),
         merged: merged |> Enum.map(&to_pr(&1, :merged)) |> sort(),
         open: open |> Enum.map(&to_pr(&1, :open)) |> sort(),
         issues: issues |> Enum.map(&repo_name/1) |> Enum.frequencies(),
         library: %{
           stars: repo["stargazers_count"],
           version: hex["latest_stable_version"],
           downloads: get_in(hex, ["downloads", "all"]) || 0,
           released_on: released_on(hex)
         },
         calendar:
           case fetch_calendar(user) do
             {:ok, calendar} -> calendar
             {:error, _} -> nil
           end
       }}
    end
  end

  defp released_on(%{"latest_stable_version" => version, "releases" => releases})
       when is_list(releases) do
    with %{"inserted_at" => at} <- Enum.find(releases, &(&1["version"] == version)),
         {:ok, date} <- at |> String.slice(0, 10) |> Date.from_iso8601() do
      date
    else
      _ -> nil
    end
  end

  defp released_on(_), do: nil

  @levels %{
    "NONE" => 0,
    "FIRST_QUARTILE" => 1,
    "SECOND_QUARTILE" => 2,
    "THIRD_QUARTILE" => 3,
    "FOURTH_QUARTILE" => 4
  }

  @calendar_query """
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
  """

  @doc """
  The last year of the contribution graph as `{date, count, level}` tuples.

  Uses GraphQL when a token is configured, and the public contributions page
  otherwise, since GraphQL needs authentication.
  """
  def fetch_calendar(user) do
    if token(), do: calendar_from_graphql(user), else: calendar_from_html(user)
  end

  defp calendar_from_graphql(user) do
    body = %{query: @calendar_query, variables: %{login: user}}

    case Req.post(github(), url: "/graphql", json: body) do
      {:ok, %Req.Response{status: 200, body: %{"data" => %{"user" => %{} = data}}}} ->
        days =
          for week <- get_in(data, ["contributionsCollection", "contributionCalendar", "weeks"]),
              day <- week["contributionDays"] do
            {Date.from_iso8601!(day["date"]), day["contributionCount"],
             Map.get(@levels, day["contributionLevel"], 0)}
          end

        {:ok, days}

      {:ok, response} ->
        {:error, {:graphql, response.status}}

      {:error, exception} ->
        {:error, exception}
    end
  end

  defp calendar_from_html(user) do
    with {:ok, html} <-
           get(base("https://github.com", accept: "text/html"), "/users/#{user}/contributions") do
      counts =
        for [_, id, text] <-
              Regex.scan(~r/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/, html),
            into: %{} do
          count =
            case Regex.run(~r/^([\d,]+) contribution/, text) do
              [_, n] -> n |> String.replace(",", "") |> String.to_integer()
              nil -> 0
            end

          {id, count}
        end

      days =
        for [td] <- Regex.scan(~r/<td[^>]*\bdata-date="[^"]+"[^>]*>/, html),
            [_, date] = Regex.run(~r/data-date="([^"]+)"/, td),
            [_, level] = Regex.run(~r/data-level="(\d)"/, td),
            id = with([_, id] <- Regex.run(~r/\bid="([^"]+)"/, td), do: id, else: (_ -> nil)) do
          {Date.from_iso8601!(date), Map.get(counts, id, 0), String.to_integer(level)}
        end

      if days == [],
        do: {:error, :no_calendar},
        else: {:ok, Enum.sort_by(days, &Date.to_gregorian_days(elem(&1, 0)))}
    end
  end

  defp search(query, page \\ 1, acc \\ []) do
    params = [q: query, per_page: @per_page, page: page, sort: "created", order: "desc"]

    with {:ok, %{"items" => items, "total_count" => total}} <-
           get(github(), "/search/issues", params) do
      acc = acc ++ items

      if length(acc) < total and length(items) == @per_page and page < @max_pages do
        search(query, page + 1, acc)
      else
        {:ok, acc}
      end
    end
  end

  defp get(req, path, params \\ []) do
    case Req.get(req, url: path, params: params) do
      {:ok, %Req.Response{status: 200, body: body}} -> {:ok, body}
      {:ok, %Req.Response{status: status}} -> {:error, {:http, status, path}}
      {:error, exception} -> {:error, exception}
    end
  end

  defp to_pr(item, state) do
    date =
      case state do
        :merged -> get_in(item, ["pull_request", "merged_at"]) || item["closed_at"]
        :open -> item["created_at"]
      end

    %PullRequest{
      repo: repo_name(item),
      number: item["number"],
      title: String.trim(item["title"]),
      url: item["html_url"],
      date: date |> String.slice(0, 10) |> Date.from_iso8601!()
    }
  end

  defp repo_name(%{"repository_url" => url}),
    do: url |> String.split("/") |> Enum.take(-2) |> Enum.join("/")

  defp sort(prs), do: Enum.sort_by(prs, &{Date.to_gregorian_days(&1.date), &1.number}, :desc)

  defp github do
    headers =
      [accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28"] ++
        if(token(), do: [authorization: "Bearer #{token()}"], else: [])

    base("https://api.github.com", headers)
  end

  defp token do
    case Application.get_env(:portfolio, :github_token) do
      token when is_binary(token) and token != "" -> token
      _ -> nil
    end
  end

  defp hex, do: base("https://hex.pm", accept: "application/json")

  defp base(url, headers) do
    [base_url: url, headers: [{"user-agent", "mandarjoshi-portfolio"} | headers]]
    |> Keyword.merge(Application.get_env(:portfolio, :req_options, []))
    |> Req.new()
  end
end
