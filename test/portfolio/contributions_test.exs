defmodule Portfolio.ContributionsTest do
  use ExUnit.Case, async: true

  alias Portfolio.{Contributions, Fixtures}

  test "groups merged PRs by project, biggest first, newest PR first" do
    [supabase, elixir] = Contributions.projects(Fixtures.snapshot())

    assert supabase.name == "Supabase"
    assert supabase.merged == 4
    assert Enum.map(supabase.prs, & &1.number) == [2379, 2345, 2167, 46021]
    assert supabase.issues == 5
    assert supabase.open == 1

    assert elixir.name == "Elixir"
    assert elixir.merged == 1
  end

  test "leaves out work repositories and list submissions" do
    snapshot = Fixtures.snapshot()

    refute Enum.any?(Contributions.projects(snapshot), &(&1.name == "brandlabsapp"))

    assert Enum.map(Contributions.in_review(snapshot), & &1.repo) ==
             ["phoenixframework/phoenix", "supabase/realtime"]
  end

  test "highlights/1 shows picked PRs with their live state and skips missing ones" do
    [supabase, elixir] = Contributions.highlights(Fixtures.snapshot())

    assert supabase.name == "Supabase"
    assert supabase.merged == 4

    assert [
             %{pr: %{number: 2345}, state: :merged},
             %{pr: %{number: 2488}, state: :open}
           ] = supabase.highlights

    # Only Realtime PRs are picked for Supabase, even though others are merged
    assert Enum.all?(supabase.highlights, &(&1.pr.repo == "supabase/realtime"))

    assert [%{pr: %{number: 16004}, state: :merged, headline: headline}] = elixir.highlights
    assert headline =~ "parse"
  end

  test "latest/1 picks the newest upstream merge and open PR" do
    assert %{merged: %{number: 2379}, open: %{repo: "phoenixframework/phoenix"}} =
             Contributions.latest(Fixtures.snapshot())
  end

  test "ago/2 gives short relative dates" do
    ago = &PortfolioWeb.PageHTML.ago(&1, ~D[2026-11-04])

    assert ago.(~D[2026-11-04]) == "today"
    assert ago.(~D[2026-11-03]) == "yesterday"
    assert ago.(~D[2026-10-31]) == "4 days ago"
    assert ago.(~D[2026-10-19]) == "2 weeks ago"
    assert ago.(~D[2026-09-15]) == "last month"
    assert ago.(~D[2026-07-01]) == "4 months ago"
  end

  test "the committed snapshot loads" do
    snapshot = Portfolio.Snapshot.load!()
    assert snapshot.merged != []
    assert snapshot.library.version
    assert length(snapshot.calendar) > 300
  end
end
