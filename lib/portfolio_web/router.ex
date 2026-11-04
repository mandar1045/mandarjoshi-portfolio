defmodule PortfolioWeb.Router do
  use PortfolioWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :put_root_layout, html: {PortfolioWeb.Layouts, :root}

    plug :put_secure_browser_headers, %{
      "content-security-policy" =>
        "default-src 'self'; style-src 'self' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; " <>
          "font-src https://fonts.gstatic.com; img-src 'self' data:; base-uri 'self'; frame-ancestors 'none'"
    }
  end

  scope "/", PortfolioWeb do
    pipe_through :browser

    get "/", PageController, :home

    # Pages from the previous version of the site, kept so old links still land.
    get "/about", PageController, :redirect_to, assigns: %{section: "about"}
    get "/experience", PageController, :redirect_to, assigns: %{section: "experience"}
    get "/projects", PageController, :redirect_to, assigns: %{section: "projects"}
    get "/skills", PageController, :redirect_to, assigns: %{section: "experience"}
  end

  get "/healthz", PortfolioWeb.HealthController, :show
end
