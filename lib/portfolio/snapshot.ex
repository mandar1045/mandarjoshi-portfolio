defmodule Portfolio.Snapshot do
  @moduledoc """
  Everything the site shows that comes from GitHub and Hex.

  A copy lives in `priv/data/snapshot.json` so the site renders straight away
  and keeps working if GitHub is unreachable. Refresh it with
  `mix portfolio.snapshot`.
  """

  alias Portfolio.PullRequest

  defstruct fetched_at: nil, merged: [], open: [], issues: %{}, library: %{}, calendar: nil

  @type t :: %__MODULE__{
          fetched_at: DateTime.t(),
          merged: [PullRequest.t()],
          open: [PullRequest.t()],
          issues: %{String.t() => non_neg_integer()},
          library: %{
            stars: non_neg_integer(),
            version: String.t(),
            downloads: non_neg_integer(),
            released_on: Date.t() | nil
          },
          calendar: [{Date.t(), non_neg_integer(), 0..4}] | nil
        }

  def path, do: Application.app_dir(:portfolio, "priv/data/snapshot.json")

  def load!(path \\ path()), do: path |> File.read!() |> Jason.decode!() |> from_json()

  def write!(%__MODULE__{} = snapshot, path) do
    File.write!(path, [Jason.encode_to_iodata!(to_json(snapshot), pretty: true), ?\n])
  end

  def from_json(map) do
    {:ok, fetched_at, _} = DateTime.from_iso8601(map["fetched_at"])
    library = map["library"]

    %__MODULE__{
      fetched_at: fetched_at,
      merged: Enum.map(map["merged"], &PullRequest.from_json/1),
      open: Enum.map(map["open"], &PullRequest.from_json/1),
      issues: map["issues"],
      library: %{
        stars: library["stars"],
        version: library["version"],
        downloads: library["downloads"],
        released_on: library["released_on"] && Date.from_iso8601!(library["released_on"])
      },
      calendar:
        map["calendar"] &&
          Enum.map(map["calendar"], fn [date, count, level] ->
            {Date.from_iso8601!(date), count, level}
          end)
    }
  end

  def to_json(%__MODULE__{} = s) do
    %{
      "fetched_at" => DateTime.to_iso8601(s.fetched_at),
      "merged" => Enum.map(s.merged, &PullRequest.to_json/1),
      "open" => Enum.map(s.open, &PullRequest.to_json/1),
      "issues" => s.issues,
      "library" => %{
        "stars" => s.library.stars,
        "version" => s.library.version,
        "downloads" => s.library.downloads,
        "released_on" => s.library[:released_on] && Date.to_iso8601(s.library.released_on)
      },
      "calendar" =>
        s.calendar &&
          Enum.map(s.calendar, fn {date, count, level} ->
            [Date.to_iso8601(date), count, level]
          end)
    }
  end
end
