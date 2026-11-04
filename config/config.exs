import Config

config :portfolio,
  github_user: "mandar1045",
  hex_package: "stampede",
  refresh_interval: :timer.hours(1)

config :portfolio, PortfolioWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [formats: [html: PortfolioWeb.ErrorHTML], layout: false]

config :logger, :default_formatter, format: "$time $metadata[$level] $message\n"

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
