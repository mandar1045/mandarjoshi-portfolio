defmodule PortfolioWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :portfolio

  plug Plug.Static,
    at: "/",
    from: :portfolio,
    gzip: false,
    only: PortfolioWeb.static_paths(),
    cache_control_for_etags: "public, max-age=3600"

  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]
  plug Plug.Head
  plug PortfolioWeb.Router
end
