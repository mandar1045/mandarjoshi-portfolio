import Config

config :portfolio, PortfolioWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: String.to_integer(System.get_env("PORT") || "4000")],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "dev-only-secret-key-base-not-used-for-anything-sensitive-0000000000"

config :phoenix, :plug_init_mode, :runtime
config :phoenix, :stacktrace_depth, 20
