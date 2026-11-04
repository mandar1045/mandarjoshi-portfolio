defmodule Portfolio.Calendar do
  @moduledoc "Lays out the GitHub contribution calendar and works out streaks."

  @type day :: {Date.t(), non_neg_integer(), 0..4}

  @doc """
  Weeks (Sunday first, padded with `nil`), month labels by column, and totals.
  Returns `nil` when there is no calendar data.
  """
  def build(nil), do: nil
  def build([]), do: nil

  def build(days) do
    days = Enum.sort_by(days, fn {date, _, _} -> Date.to_gregorian_days(date) end)

    weeks =
      days
      |> Enum.chunk_by(fn {date, _, _} -> Date.beginning_of_week(date, :sunday) end)
      |> Enum.map(&pad_week/1)

    %{
      weeks: weeks,
      months: month_labels(weeks),
      total: days |> Enum.map(&elem(&1, 1)) |> Enum.sum(),
      active_days: Enum.count(days, fn {_, count, _} -> count > 0 end),
      longest_streak: longest_streak(days),
      current_streak: current_streak(days),
      best_day: Enum.max_by(days, &elem(&1, 1))
    }
  end

  defp pad_week([{first, _, _} | _] = week) do
    lead = Date.day_of_week(first, :sunday) - 1
    List.duplicate(nil, lead) ++ week ++ List.duplicate(nil, 7 - lead - length(week))
  end

  # A month is labelled on the first week that contains its 1st day, and on
  # the first column if that week starts mid-month and has room for a label.
  defp month_labels(weeks) do
    weeks
    |> Enum.with_index()
    |> Enum.flat_map(fn {week, col} ->
      case Enum.find(week, &match?({%Date{day: 1}, _, _}, &1)) do
        {date, _, _} -> [{col, Calendar.strftime(date, "%b")}]
        nil when col == 0 -> [{0, week |> Enum.find(& &1) |> elem(0) |> Calendar.strftime("%b")}]
        nil -> []
      end
    end)
    |> drop_crowded()
  end

  defp drop_crowded([{0, _}, {next, _} = second | rest]) when next < 3, do: [second | rest]
  defp drop_crowded(labels), do: labels

  @doc "The longest run of consecutive days with at least one contribution."
  def longest_streak(days) do
    days
    |> Enum.chunk_by(fn {_, count, _} -> count > 0 end)
    |> Enum.filter(fn [{_, count, _} | _] -> count > 0 end)
    |> Enum.map(&length/1)
    |> Enum.max(fn -> 0 end)
  end

  @doc """
  Consecutive active days up to the most recent one. Today not having any
  contributions yet doesn't break the streak.
  """
  def current_streak(days) do
    reversed =
      case Enum.reverse(days) do
        [{_, 0, _} | rest] -> rest
        all -> all
      end

    Enum.take_while(reversed, fn {_, count, _} -> count > 0 end) |> length()
  end
end
