defmodule Portfolio.CalendarTest do
  use ExUnit.Case, async: true

  alias Portfolio.Calendar

  defp days(start, counts) do
    counts
    |> Enum.with_index()
    |> Enum.map(fn {count, i} -> {Date.add(start, i), count, min(count, 4)} end)
  end

  test "pads weeks to start on Sunday" do
    # 2026-10-28 is a Wednesday
    %{weeks: [first, second]} = Calendar.build(days(~D[2026-10-28], [1, 2, 3, 4, 5, 6]))

    assert Enum.take(first, 3) == [nil, nil, nil]
    assert {~D[2026-10-28], 1, 1} = Enum.at(first, 3)
    assert length(first) == 7
    assert [{~D[2026-11-01], 5, 4}, {~D[2026-11-02], 6, 4} | pad] = second
    assert pad == List.duplicate(nil, 5)
  end

  test "streaks, totals and the best day" do
    cal = Calendar.build(days(~D[2026-10-25], [1, 1, 0, 2, 2, 2, 5, 0]))

    assert cal.total == 13
    assert cal.active_days == 6
    assert cal.longest_streak == 4
    # The last day is empty, which counts as "not yet today"
    assert cal.current_streak == 4
    assert {~D[2026-10-31], 5, _} = cal.best_day
  end

  test "month labels land on the week holding the 1st" do
    %{months: months} = Calendar.build(days(~D[2026-09-06], List.duplicate(1, 60)))
    assert {_, "Oct"} = Enum.find(months, &(elem(&1, 1) == "Oct"))
    assert hd(months) == {0, "Sep"}
  end

  test "no data" do
    assert Calendar.build(nil) == nil
  end
end
