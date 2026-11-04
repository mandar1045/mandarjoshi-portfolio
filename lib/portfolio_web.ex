defmodule PortfolioWeb do
  @moduledoc false

  def static_paths,
    do: ~w(css js images favicon.svg robots.txt mandar-joshi-resume.pdf mandar-joshi-cv.pdf)

  def router do
    quote do
      use Phoenix.Router, helpers: false
      import Plug.Conn
      import Phoenix.Controller
    end
  end

  def controller do
    quote do
      use Phoenix.Controller, formats: [:html]
      import Plug.Conn
      unquote(verified_routes())
    end
  end

  def html do
    quote do
      use Phoenix.Component
      import Phoenix.HTML
      unquote(verified_routes())
    end
  end

  def verified_routes do
    quote do
      use Phoenix.VerifiedRoutes,
        endpoint: PortfolioWeb.Endpoint,
        router: PortfolioWeb.Router,
        statics: PortfolioWeb.static_paths()
    end
  end

  defmacro __using__(which) when is_atom(which), do: apply(__MODULE__, which, [])
end
