defmodule PortfolioWeb.PageHTML do
  use PortfolioWeb, :html
  import PortfolioWeb.Icons

  alias Portfolio.{Contributions, Profile, PullRequest}

  embed_templates "page_html/*"

  attr :eyebrow, :string, required: true
  attr :title, :string, required: true
  slot :inner_block
  slot :action

  def section_head(assigns) do
    ~H"""
    <header class="section-head" data-reveal>
      <div>
        <p class="eyebrow">{@eyebrow}</p>
        <h2>{@title}</h2>
        <p :if={@inner_block != []} class="section-sub">{render_slot(@inner_block)}</p>
      </div>
      <div :if={@action != []}>{render_slot(@action)}</div>
    </header>
    """
  end

  attr :state, :atom, required: true

  def status(assigns) do
    ~H"""
    <span class={"status status-#{@state}"}>
      <.icon :if={@state == :merged} name="git-merge" />
      <span :if={@state == :open} class="live-dot" aria-hidden="true"></span>
      {if @state == :merged, do: "Merged", else: "In review"}
    </span>
    """
  end

  attr :calendar, :map, default: nil

  def contribution_graph(assigns) do
    ~H"""
    <figure :if={@calendar} class="contrib card" aria-labelledby="contrib-title" data-reveal>
      <figcaption class="chart-head">
        <div>
          <h3 id="contrib-title">
            {number(@calendar.total)} contributions in the last year
          </h3>
          <p class="muted small">Commits, pull requests, reviews and issues across GitHub</p>
        </div>
        <a class="btn btn-small" href={profile().github()}>
          <.icon name="github" /> @{Application.fetch_env!(:portfolio, :github_user)}
        </a>
      </figcaption>

      <div class="contrib-scroll" data-scroll-end>
        <div class="contrib-grid" style={"--weeks: #{length(@calendar.weeks)}"}>
          <div class="contrib-months" aria-hidden="true">
            <span :for={{col, label} <- @calendar.months} style={"grid-column: #{col + 1}"}>
              {label}
            </span>
          </div>
          <div class="contrib-days" aria-hidden="true">
            <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
          </div>
          <div
            class="contrib-cells"
            role="img"
            aria-label={"#{@calendar.total} contributions in the last year"}
          >
            <%= for {week, w} <- Enum.with_index(@calendar.weeks), day <- week do %>
              <span :if={is_nil(day)} class="cell pad"></span>
              <span
                :if={day}
                class={"cell l#{elem(day, 2)}"}
                style={"--w: #{w}"}
                title={contribution_title(day)}
              ></span>
            <% end %>
          </div>
        </div>
      </div>

      <div class="contrib-foot">
        <dl class="contrib-stats">
          <div>
            <dt>Active days</dt>
            <dd>{number(@calendar.active_days)}</dd>
          </div>
          <div>
            <dt>Longest streak</dt>
            <dd>{plural(@calendar.longest_streak, "day", "days")}</dd>
          </div>
          <div>
            <dt>Current streak</dt>
            <dd>{plural(@calendar.current_streak, "day", "days")}</dd>
          </div>
          <div>
            <dt>Best day</dt>
            <dd>
              {elem(@calendar.best_day, 1)}
              <span class="muted">on {Calendar.strftime(elem(@calendar.best_day, 0), "%b %-d")}</span>
            </dd>
          </div>
        </dl>
        <p class="contrib-legend" aria-hidden="true">
          Less
          <span class="cell l0"></span><span class="cell l1"></span><span class="cell l2"></span><span class="cell l3"></span><span class="cell l4"></span>
          More
        </p>
      </div>
    </figure>
    """
  end

  defp contribution_title({date, count, _level}) do
    "#{plural(count, "contribution", "contributions")} on #{Calendar.strftime(date, "%b %-d, %Y")}"
  end

  @doc "Escapes text, then renders `backticked` spans as code."
  def inline_code(text) do
    text
    |> Phoenix.HTML.html_escape()
    |> Phoenix.HTML.safe_to_string()
    |> String.replace(~r/`([^`]+)`/, "<code>\\1</code>")
    |> Phoenix.HTML.raw()
  end

  def month(%Date{} = date), do: Calendar.strftime(date, "%b %Y")

  @doc "A short relative date, such as `today`, `3 days ago` or `2 months ago`."
  def ago(%Date{} = date, today \\ Date.utc_today()) do
    case Date.diff(today, date) do
      d when d <= 0 -> "today"
      1 -> "yesterday"
      d when d < 7 -> "#{d} days ago"
      d when d < 14 -> "last week"
      d when d < 31 -> "#{div(d, 7)} weeks ago"
      d when d < 60 -> "last month"
      d when d < 365 -> "#{div(d, 30)} months ago"
      _ -> month(date)
    end
  end

  @doc "The current time in India, e.g. `10:42 PM`. The page keeps it ticking."
  def local_time do
    DateTime.utc_now()
    |> DateTime.add(19_800, :second)
    |> Calendar.strftime("%-I:%M %p")
  end

  def number(n) when is_integer(n) do
    n
    |> Integer.to_string()
    |> String.reverse()
    |> String.replace(~r/(\d{3})(?=\d)/, "\\1,")
    |> String.reverse()
  end

  def plural(1, singular, _plural), do: "1 #{singular}"
  def plural(n, _singular, plural), do: "#{number(n)} #{plural}"

  def minor_version(version) do
    case String.split(version, ".") do
      [major, minor | _] -> "#{major}.#{minor}"
      _ -> version
    end
  end

  def sentence([]), do: ""
  def sentence([one]), do: one
  def sentence(items), do: Enum.join(Enum.drop(items, -1), ", ") <> " & " <> List.last(items)

  def project_names(projects), do: projects |> Enum.map(& &1.name) |> Enum.take(3)

  def search_url(owners) do
    user = Application.fetch_env!(:portfolio, :github_user)
    orgs = if owners == [], do: "-user:#{user}", else: Enum.map_join(owners, " ", &"org:#{&1}")
    q = URI.encode_www_form("is:pr author:#{user} #{orgs}")
    "https://github.com/search?type=pullrequests&q=#{q}"
  end

  def review_url do
    user = Application.fetch_env!(:portfolio, :github_user)
    q = URI.encode_www_form("is:pr is:open author:#{user} -user:#{user}")
    "https://github.com/search?type=pullrequests&q=#{q}"
  end

  def profile, do: Profile
end
