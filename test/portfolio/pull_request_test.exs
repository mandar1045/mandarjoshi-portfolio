defmodule Portfolio.PullRequestTest do
  use ExUnit.Case, async: true
  doctest Portfolio.PullRequest

  alias Portfolio.PullRequest

  test "clean_title/1 strips Conventional Commits prefixes" do
    assert PullRequest.clean_title("fix(self-hosted): proxy .well-known route") ==
             "Proxy .well-known route"

    assert PullRequest.clean_title("feat!: drop old API") == "Drop old API"
    assert PullRequest.clean_title("Keep parens on calls") == "Keep parens on calls"

    assert PullRequest.clean_title("Fix: keeps capitalised words") ==
             "Fix: keeps capitalised words"
  end

  test "ref/1 and key/1" do
    pr = Portfolio.Fixtures.pr("supabase/realtime", 2379, "2026-10-19")
    assert PullRequest.ref(pr) == "realtime#2379"
    assert PullRequest.key(pr) == "supabase/realtime#2379"
  end

  test "JSON round trip" do
    pr = Portfolio.Fixtures.pr("supabase/realtime", 2379, "2026-10-19")
    assert pr |> PullRequest.to_json() |> PullRequest.from_json() == pr
  end
end
