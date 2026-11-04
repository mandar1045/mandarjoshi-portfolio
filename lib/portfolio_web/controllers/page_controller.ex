defmodule PortfolioWeb.PageController do
  use PortfolioWeb, :controller

  alias Portfolio.{Activity, Contributions, Profile}

  def home(conn, _params) do
    snapshot = Activity.get()

    render(conn, :home,
      page_title: "#{Profile.name()} · Software Engineer",
      snapshot: snapshot,
      projects: Contributions.projects(snapshot),
      highlights: Contributions.highlights(snapshot),
      latest: Contributions.latest(snapshot),
      calendar: Portfolio.Calendar.build(snapshot.calendar)
    )
  end

  def redirect_to(conn, _params) do
    section = conn.assigns[:section] || "about"
    redirect(conn, to: "/##{section}")
  end
end
