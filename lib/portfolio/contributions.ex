defmodule Portfolio.Contributions do
  @moduledoc """
  Turns raw GitHub activity into what the open source section shows: overall
  numbers per project, and a few hand-picked pull requests worth reading.

  Counts come straight from GitHub, so they stay current. Highlights are picked
  by hand below; each one shows as merged or open from the live data, and one
  that was closed without merging drops off the page.
  """

  alias Portfolio.{PullRequest, Snapshot}

  # Work repositories and "add my library to this list" PRs are not upstream
  # engineering work, so they stay off the page.
  @excluded_owners ~w(brandlabsapp tect-raniwork NilanchalaPanda)
  @excluded_repos ~w(h4cc/awesome-elixir aliesbelik/load-testing-toolkit)

  # GitHub owner => {project name, one-line description, what I worked in}
  @projects %{
    "supabase" =>
      {"Supabase", "Open source Postgres development platform", ~w(Elixir TypeScript Docker)},
    "fossology" =>
      {"FOSSology", "License compliance toolkit, a Linux Foundation project", ~w(PHP C SQL)},
    "elixir-lang" => {"Elixir", "The Elixir language and its code formatter", ~w(Elixir)},
    "podman-container-tools" => {"Podman", "Daemonless container engine", ~w(Go)},
    "containers" => {"Podman", "Daemonless container engine", ~w(Go)},
    "calcom" => {"Cal.com", "Open source scheduling infrastructure", ~w(Docs)},
    "phoenixframework" => {"Phoenix", "Elixir web framework", ~w(Elixir)},
    "jenkinsci" => {"Jenkins", "Automation server", ~w(Java)},
    "multigres" => {"Multigres", "Horizontally scalable Postgres", ~w(Go)},
    "RocketChat" => {"Rocket.Chat", "Open source team chat", ~w(TypeScript)}
  }

  # Hand-picked PRs per project: {key, headline, why it mattered}. Supabase is
  # limited to Realtime, the Elixir service behind Broadcast, Presence and
  # Postgres Changes.
  @highlights [
    {"Supabase", "Realtime: the Elixir service behind Broadcast, Presence and Postgres Changes",
     [
       {"supabase/realtime#2345", "One oversized message could crash dispatch for every tenant",
        "Serializer errors now stay inside the dispatcher instead of taking down the shared GenRpcPubSub worker."},
       {"supabase/realtime#2343", "A bad presence key could crash a shard shared across tenants",
        "Presence keys are validated as strings before they reach the shared Presence shard."},
       {"supabase/realtime#2488", "Partitioned tables silently lost every Postgres Change",
        "With `publish_via_partition_root`, changes arrived under the leaf partition and were filtered out while clients stayed subscribed."},
       {"supabase/realtime#2362", "One array filter dropped the whole change batch",
        "Filters were checked against jsonb-cast values, so an array raised and the batch was lost for everyone. They now use the raw wal2json values."}
     ]},
    {"Elixir", "The language's code formatter, used by every `mix format` run",
     [
       {"elixir-lang/elixir#16004",
        "The formatter turned valid code into code that wouldn't parse",
        "It dropped parentheses on anonymous calls with do-end blocks. `Macro.to_string/1` is fixed too."},
       {"elixir-lang/elixir#16006", "Formatting `!!x in y` changed what the code did",
        "It printed `!(!x in y)`, which parses differently. Now it prints `!((!x) in y)`."},
       {"elixir-lang/elixir#16009",
        "Comments made `mix format` give different output on each run",
        "Formatting Elixir's own lib with added comments went from about 20 unstable files to none."}
     ]},
    {"FOSSology", "License compliance toolkit, a Linux Foundation project",
     [
       {"fossology/fossology#3936", "Buffer overflow in the scheduler's agent setup",
        "Commands of 1006 to 1023 bytes overran `raw_cmd` once ` --scheduler_start` was appended. Reproduced under AddressSanitizer."},
       {"fossology/fossology#3555", "Memory-safety bugs in the C package agent",
        "Replaced unsafe `strcpy()`, fixed NULL-before-free crashes and HTML double-encoding."},
       {"fossology/fossology#3456", "N+1 queries and a crash in the scanned-licenses API",
        "Removed redundant per-license lookups from `/scanned` and fixed a TypeError on synthetic entries."}
     ]}
  ]

  @logos Path.expand("../../priv/static/images/orgs", __DIR__)
         |> File.ls!()
         |> Map.new(&{Path.rootname(&1), "/images/orgs/" <> &1})

  @doc "Merged pull requests grouped by project, biggest first."
  def projects(%Snapshot{} = snapshot) do
    merged = Enum.reject(snapshot.merged, &excluded?/1)
    open = Enum.reject(snapshot.open, &excluded?/1)
    open_by = Enum.frequencies_by(open, &project_name/1)

    issues_by =
      Enum.reduce(snapshot.issues, %{}, fn {repo, count}, acc ->
        owner = repo |> String.split("/") |> hd()

        if excluded_repo?(repo, owner),
          do: acc,
          else: Map.update(acc, name_for(owner), count, &(&1 + count))
      end)

    merged
    |> Enum.group_by(&PullRequest.owner/1)
    |> Enum.group_by(fn {owner, _} -> name_for(owner) end, fn {owner, prs} -> {owner, prs} end)
    |> Enum.map(fn {name, groups} ->
      owners = Enum.map(groups, &elem(&1, 0))

      prs =
        groups
        |> Enum.flat_map(&elem(&1, 1))
        |> Enum.sort_by(&{Date.to_gregorian_days(&1.date), &1.number}, :desc)

      %{
        name: name,
        description: description_for(hd(owners)),
        logo: logo(hd(owners)),
        tech: tech_for(hd(owners)),
        owners: owners,
        prs: prs,
        merged: length(prs),
        open: Map.get(open_by, name, 0),
        issues: Map.get(issues_by, name, 0)
      }
    end)
    |> Enum.sort_by(&{-&1.merged, &1.name})
  end

  @doc "Open pull requests waiting for review, newest first."
  def in_review(%Snapshot{} = snapshot), do: Enum.reject(snapshot.open, &excluded?/1)

  @doc """
  The highlighted projects, each with its overall counts and the picked PRs
  that are still merged or open on GitHub.
  """
  def highlights(%Snapshot{} = snapshot) do
    status =
      Map.new(snapshot.merged, &{PullRequest.key(&1), {:merged, &1}})
      |> Map.merge(Map.new(snapshot.open, &{PullRequest.key(&1), {:open, &1}}))

    by_name = Map.new(projects(snapshot), &{&1.name, &1})

    for {name, subtitle, picks} <- @highlights, project = by_name[name] do
      prs =
        for {key, headline, note} <- picks, {state, pr} = status[key] || {nil, nil}, pr do
          %{pr: pr, state: state, headline: headline, note: note}
        end

      Map.merge(project, %{subtitle: subtitle, highlights: prs})
    end
  end

  @doc "The most recent upstream merge and the most recent PR still in review."
  def latest(%Snapshot{} = snapshot) do
    %{
      merged: snapshot.merged |> Enum.reject(&excluded?/1) |> List.first(),
      open: snapshot |> in_review() |> List.first()
    }
  end

  def project_name(%PullRequest{} = pr), do: pr |> PullRequest.owner() |> name_for()

  def excluded?(%PullRequest{repo: repo} = pr), do: excluded_repo?(repo, PullRequest.owner(pr))

  defp excluded_repo?(repo, owner), do: owner in @excluded_owners or repo in @excluded_repos

  defp name_for(owner) do
    case @projects do
      %{^owner => {name, _, _}} -> name
      _ -> owner
    end
  end

  defp description_for(owner) do
    case @projects do
      %{^owner => {_, description, _}} -> description
      _ -> nil
    end
  end

  defp tech_for(owner) do
    case @projects do
      %{^owner => {_, _, tech}} -> tech
      _ -> []
    end
  end

  @doc "Path to the project's logo, if there is one in `priv/static/images/orgs`."
  def logo(owner) when is_binary(owner), do: Map.get(@logos, owner)
  def logo(%PullRequest{} = pr), do: pr |> PullRequest.owner() |> logo()
end
