defmodule PortfolioWeb.Icons do
  @moduledoc """
  Inline SVG icons, read from `priv/icons` at compile time so they inherit
  `currentColor`. Outline icons are Lucide (ISC), brand marks are Simple Icons (CC0).
  """
  use Phoenix.Component

  @dir Path.expand("../../../priv/icons", __DIR__)

  @icons (for file <- File.ls!(@dir), Path.extname(file) == ".svg", into: %{} do
            svg = File.read!(Path.join(@dir, file))
            [_, body] = Regex.run(~r/<svg[^>]*>(.*)<\/svg>/s, svg)
            body = body |> String.replace(~r/<title>.*?<\/title>/s, "") |> String.trim()
            {Path.rootname(file), {body, svg =~ ~s(stroke="currentColor")}}
          end)

  for file <- File.ls!(@dir), do: @external_resource(Path.join(@dir, file))

  # Adding or removing an icon file recompiles this module.
  @files @dir |> File.ls!() |> Enum.sort()
  def __mix_recompile__?, do: @dir |> File.ls!() |> Enum.sort() != @files

  attr :name, :string, required: true
  attr :class, :string, default: "icon"

  def icon(assigns) do
    {body, stroke?} = Map.fetch!(@icons, assigns.name)
    assigns = assign(assigns, body: Phoenix.HTML.raw(body), stroke?: stroke?)

    ~H"""
    <svg
      :if={@stroke?}
      class={@class}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >{@body}</svg>
    <svg :if={!@stroke?} class={@class} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{@body}</svg>
    """
  end
end
