defmodule Portfolio.Fixtures do
  @moduledoc false
  alias Portfolio.{PullRequest, Snapshot}

  def pr(repo, number, date, title \\ "fix: something") do
    %PullRequest{
      repo: repo,
      number: number,
      title: title,
      url: "https://github.com/#{repo}/pull/#{number}",
      date: Date.from_iso8601!(date)
    }
  end

  def snapshot do
    %Snapshot{
      fetched_at: ~U[2026-11-04 12:00:00Z],
      merged: [
        pr("supabase/realtime", 2379, "2026-10-19"),
        pr("supabase/realtime", 2345, "2026-10-06"),
        pr("supabase/supabase", 46021, "2026-07-01"),
        pr("supabase/realtime", 2167, "2026-09-15"),
        pr("elixir-lang/elixir", 16004, "2026-10-19"),
        pr("brandlabsapp/rani-app", 163, "2026-10-17")
      ],
      open: [
        pr("phoenixframework/phoenix", 6896, "2026-10-30"),
        pr("h4cc/awesome-elixir", 4971, "2026-10-29"),
        pr("supabase/realtime", 2488, "2026-10-28")
      ],
      issues: %{"supabase/realtime" => 3, "supabase/cli" => 2, "fossology/fossology" => 4},
      library: %{stars: 48, version: "1.3.2", downloads: 280}
    }
  end
end
