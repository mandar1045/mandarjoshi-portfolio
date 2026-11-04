defmodule Portfolio.GitHubTest do
  use ExUnit.Case, async: true

  alias Portfolio.GitHub

  defp item(repo, number, extra) do
    Map.merge(
      %{
        "repository_url" => "https://api.github.com/repos/#{repo}",
        "number" => number,
        "title" => "fix: thing #{number} ",
        "html_url" => "https://github.com/#{repo}/pull/#{number}",
        "created_at" => "2026-10-01T10:00:00Z",
        "closed_at" => "2026-10-02T10:00:00Z"
      },
      extra
    )
  end

  @calendar_html """
  <td tabindex="0" data-date="2026-11-03" id="contribution-day-component-2-52" data-level="0" class="ContributionCalendar-day"></td>
  <td tabindex="0" data-date="2026-11-04" id="contribution-day-component-3-52" data-level="2" class="ContributionCalendar-day"></td>
  <tool-tip id="tooltip-a" for="contribution-day-component-2-52" popover="manual" class="sr-only">No contributions on November 3rd.</tool-tip>
  <tool-tip id="tooltip-b" for="contribution-day-component-3-52" popover="manual" class="sr-only">1,204 contributions on November 4th.</tool-tip>
  """

  defp stub_all(calendar) do
    Req.Test.stub(GitHub, fn conn ->
      conn = Plug.Conn.fetch_query_params(conn)

      case {conn.host, conn.request_path, conn.query_params["q"]} do
        {"api.github.com", "/search/issues", "is:pr is:merged" <> _} ->
          Req.Test.json(conn, %{
            "total_count" => 2,
            "items" => [
              item("supabase/realtime", 1, %{
                "pull_request" => %{"merged_at" => "2026-09-01T00:00:00Z"}
              }),
              item("elixir-lang/elixir", 2, %{
                "pull_request" => %{"merged_at" => "2026-10-05T00:00:00Z"}
              })
            ]
          })

        {"api.github.com", "/search/issues", "is:pr is:open" <> _} ->
          Req.Test.json(conn, %{
            "total_count" => 1,
            "items" => [item("phoenixframework/phoenix", 3, %{})]
          })

        {"api.github.com", "/search/issues", "is:issue" <> _} ->
          Req.Test.json(conn, %{
            "total_count" => 2,
            "items" => [item("supabase/realtime", 4, %{}), item("supabase/realtime", 5, %{})]
          })

        {"api.github.com", "/repos/mandar1045/stampede", _} ->
          Req.Test.json(conn, %{"stargazers_count" => 48})

        {"hex.pm", "/api/packages/stampede", _} ->
          Req.Test.json(conn, %{
            "latest_stable_version" => "1.3.2",
            "downloads" => %{"all" => 280},
            "releases" => [
              %{"version" => "1.3.2", "inserted_at" => "2026-11-04T12:14:41.723276Z"},
              %{"version" => "1.3.1", "inserted_at" => "2026-10-31T19:55:13.809209Z"}
            ]
          })

        {"github.com", "/users/mandar1045/contributions", _} ->
          case calendar do
            :ok -> Req.Test.html(conn, @calendar_html)
            :down -> Plug.Conn.send_resp(conn, 503, "unavailable")
          end
      end
    end)
  end

  test "fetch/0 builds a snapshot from GitHub and Hex" do
    stub_all(:ok)
    assert {:ok, snapshot} = GitHub.fetch()

    assert [
             %{repo: "elixir-lang/elixir", date: ~D[2026-10-05], title: "fix: thing 2"},
             %{number: 1}
           ] =
             snapshot.merged

    assert [%{repo: "phoenixframework/phoenix", date: ~D[2026-10-01]}] = snapshot.open
    assert snapshot.issues == %{"supabase/realtime" => 2}

    assert snapshot.library == %{
             stars: 48,
             version: "1.3.2",
             downloads: 280,
             released_on: ~D[2026-11-04]
           }

    # Without a token the calendar comes from the public contributions page
    assert snapshot.calendar == [{~D[2026-11-03], 0, 0}, {~D[2026-11-04], 1204, 2}]
  end

  test "fetch/0 still succeeds when the contribution calendar is unavailable" do
    stub_all(:down)
    assert {:ok, %{calendar: nil, merged: [_, _]}} = GitHub.fetch()
  end

  test "fetch/0 returns an error instead of raising when GitHub refuses" do
    Req.Test.stub(GitHub, &Plug.Conn.send_resp(&1, 403, "rate limited"))
    assert {:error, {:http, 403, "/search/issues"}} = GitHub.fetch()
  end
end
