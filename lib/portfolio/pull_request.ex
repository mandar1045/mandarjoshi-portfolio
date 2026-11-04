defmodule Portfolio.PullRequest do
  @moduledoc "A pull request opened on someone else's repository."

  @enforce_keys [:repo, :number, :title, :url, :date]
  defstruct @enforce_keys

  @type t :: %__MODULE__{
          repo: String.t(),
          number: pos_integer(),
          title: String.t(),
          url: String.t(),
          date: Date.t()
        }

  @doc "The repository owner, e.g. `\"supabase\"` for `supabase/realtime`."
  def owner(%__MODULE__{repo: repo}), do: repo |> String.split("/") |> hd()

  @doc "Short reference such as `realtime#2379`."
  def ref(%__MODULE__{repo: repo, number: number}) do
    [_owner, name] = String.split(repo, "/", parts: 2)
    "#{name}##{number}"
  end

  @doc "Full reference such as `supabase/realtime#2379`."
  def key(%__MODULE__{repo: repo, number: number}), do: "#{repo}##{number}"

  @doc """
  The title without a Conventional Commits prefix, capitalised.

      iex> Portfolio.PullRequest.clean_title("fix(api): null safety checks")
      "Null safety checks"
  """
  def clean_title(title) do
    title
    |> String.replace(~r/^[a-z]+(\([^)]*\))?!?:\s+/, "")
    |> capitalize_first()
  end

  defp capitalize_first(<<first::utf8, rest::binary>>), do: String.upcase(<<first::utf8>>) <> rest
  defp capitalize_first(""), do: ""

  def from_json(map) do
    %__MODULE__{
      repo: map["repo"],
      number: map["number"],
      title: map["title"],
      url: map["url"],
      date: Date.from_iso8601!(map["date"])
    }
  end

  def to_json(%__MODULE__{} = pr) do
    %{
      "repo" => pr.repo,
      "number" => pr.number,
      "title" => pr.title,
      "url" => pr.url,
      "date" => Date.to_iso8601(pr.date)
    }
  end
end
