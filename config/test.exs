import Config

config :portfolio, PortfolioWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "test-only-secret-key-base-not-used-for-anything-sensitive-00000000000",
  server: false

# Never call GitHub from tests: the cache serves the committed snapshot, and
# the client is exercised against Req.Test stubs.
config :portfolio,
  refresh_interval: false,
  req_options: [plug: {Req.Test, Portfolio.GitHub}, retry: false]

config :logger, level: :warning
config :phoenix, :plug_init_mode, :runtime
