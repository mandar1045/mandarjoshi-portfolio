defmodule Mix.Tasks.Portfolio.Snapshot do
  @shortdoc "Fetches GitHub and Hex data into priv/data/snapshot.json"
  @moduledoc """
  Fetches the latest pull requests, issues and library stats and writes them to
  `priv/data/snapshot.json`, the data the site starts from.

      mix portfolio.snapshot

  Set `GITHUB_TOKEN` to raise the API rate limit.
  """

  use Mix.Task

  @requirements ["app.config"]

  @impl true
  def run(_args) do
    Application.ensure_all_started(:req)

    case Portfolio.GitHub.fetch() do
      {:ok, snapshot} ->
        path = Path.join(["priv", "data", "snapshot.json"])
        Portfolio.Snapshot.write!(snapshot, path)

        Mix.shell().info(
          "Wrote #{path}: #{length(snapshot.merged)} merged, #{length(snapshot.open)} open, " <>
            "#{Enum.sum(Map.values(snapshot.issues))} issues"
        )

      {:error, reason} ->
        Mix.raise("Could not fetch from GitHub: #{inspect(reason)}")
    end
  end
end
