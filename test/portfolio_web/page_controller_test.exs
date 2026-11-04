defmodule PortfolioWeb.PageControllerTest do
  use PortfolioWeb.ConnCase, async: true

  test "GET / renders the library, highlights and contribution graph", %{conn: conn} do
    html = conn |> get("/") |> html_response(200)

    assert html =~ "Mandar Joshi"
    assert html =~ "Open source · Software engineer"
    assert html =~ ~s(<span class="t-atom">:stampede</span>)
    assert html =~ "contributions in the last year"
    assert html =~ "https://x.com/Mandarjoshi1045"

    # A live "now" bar instead of headline counts or an org strip
    assert html =~ "Latest release"
    assert html =~ "Latest merge"
    assert html =~ ~s(data-clock="Asia/Kolkata")
    refute html =~ "Merged upstream"
    refute html =~ "Code merged into"

    # Highlights, not every PR
    assert html =~ "realtime#2345"
    assert html =~ "status-merged"
    refute html =~ "realtime#2228"
    refute html =~ "Merged pull requests per month"
    # Backticks in notes render as code, with the rest escaped
    assert html =~ "<code>mix format</code>"
    refute html =~ "rani-app"
  end

  test "old pages redirect to their section", %{conn: conn} do
    assert conn |> get("/projects") |> redirected_to() == "/#projects"
    assert build_conn() |> get("/about") |> redirected_to() == "/#about"
  end

  test "GET /healthz", %{conn: conn} do
    assert conn |> get("/healthz") |> text_response(200) == "ok"
  end

  test "static files are served", %{conn: conn} do
    assert conn |> get("/css/app.css") |> response(200) =~ "--accent"
  end
end
