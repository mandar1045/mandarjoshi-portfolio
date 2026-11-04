defmodule Portfolio.Activity do
  @moduledoc """
  Keeps the latest `Portfolio.Snapshot` in `:persistent_term` and refreshes it
  from GitHub on an interval.

  It starts from the committed snapshot, so pages never wait on the network.
  If a refresh fails, the last good data stays in place.
  """

  use GenServer
  require Logger

  alias Portfolio.Snapshot

  @key {__MODULE__, :snapshot}

  def start_link(opts), do: GenServer.start_link(__MODULE__, opts, name: __MODULE__)

  @doc "The latest snapshot. Reads never go through the process."
  @spec get() :: Snapshot.t()
  def get, do: :persistent_term.get(@key)

  @doc "Refreshes now and waits for it to finish."
  def refresh, do: GenServer.call(__MODULE__, :refresh, :timer.seconds(60))

  @impl true
  def init(opts) do
    unless match?({:ok, _}, fetch_existing()), do: put(Snapshot.load!())
    interval = Keyword.get(opts, :interval, Application.get_env(:portfolio, :refresh_interval))
    if interval, do: send(self(), :refresh)
    {:ok, %{interval: interval}}
  end

  @impl true
  def handle_info(:refresh, state) do
    do_refresh()
    Process.send_after(self(), :refresh, state.interval)
    {:noreply, state}
  end

  @impl true
  def handle_call(:refresh, _from, state), do: {:reply, do_refresh(), state}

  defp do_refresh do
    case Portfolio.GitHub.fetch() do
      {:ok, snapshot} ->
        snapshot = %{snapshot | calendar: snapshot.calendar || get().calendar}
        put(snapshot)
        Logger.info("Refreshed GitHub activity: #{length(snapshot.merged)} merged PRs")
        :ok

      {:error, reason} ->
        Logger.warning("GitHub refresh failed, keeping previous data: #{inspect(reason)}")
        {:error, reason}
    end
  rescue
    exception ->
      Logger.error(
        "GitHub refresh crashed: " <> Exception.format(:error, exception, __STACKTRACE__)
      )

      {:error, exception}
  end

  defp fetch_existing do
    case :persistent_term.get(@key, nil) do
      nil -> :error
      snapshot -> {:ok, snapshot}
    end
  end

  defp put(snapshot), do: :persistent_term.put(@key, snapshot)
end
