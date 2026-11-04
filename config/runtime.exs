import Config

# Optional. Raises the GitHub API rate limit; the site works without it.
config :portfolio, github_token: System.get_env("GITHUB_TOKEN")

if config_env() == :prod do
  host = System.get_env("PHX_HOST") || "mandarjoshi.me"
  port = String.to_integer(System.get_env("PORT") || "4000")

  # The site has no sessions or cookies, so a random key is fine when unset.
  secret_key_base =
    System.get_env("SECRET_KEY_BASE") || Base.encode64(:crypto.strong_rand_bytes(48))

  config :portfolio, PortfolioWeb.Endpoint,
    server: true,
    url: [host: host, port: 443, scheme: "https"],
    http: [ip: {0, 0, 0, 0, 0, 0, 0, 0}, port: port],
    secret_key_base: secret_key_base
end
