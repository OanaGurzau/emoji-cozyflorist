"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

import GuildWealthDesktopTable from "./GuildWealthDesktopTable";
import GuildWealthMobileCards from "./GuildWealthMobileCards";

export default function GuildWealthTable({
  members,
  wealthEntries,
  selectedPeriod,
  getWealthEntries
}) {

  const [draftWealth, setDraftWealth] =
    useState({});

  const [saved, setSaved] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 30;

  const totalPages = Math.ceil(
    members.length / itemsPerPage
  );

  const paginatedMembers =
    members.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const dayKeys = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];

  const today = new Date().getDay();

  const adjustedIndex =
    today === 0 ? 6 : today - 1;

  const [selectedDay, setSelectedDay] =
    useState(dayKeys[adjustedIndex]);

  const wealthOptions = [
    70,
    80,
    90,
    100,
    110,
    120
  ];

  function calculateWealthGems(days) {

    const hasAllDays =
      dayKeys.every(day =>
        days[day] !== undefined
      );

    if (!hasAllDays) return 0;

    const values =
      Object.values(days);

    const all120 =
      values.every(value => value >= 120);

    if (all120) return 3;

    const all70 =
      values.every(value => value >= 70);

    if (all70) return 1;

    return 0;
  }

  function getWeekDays(startDate) {

    const start = new Date(startDate);

    return Array.from({ length: 7 }, (_, i) => {

      const date = new Date(start);

      date.setDate(start.getDate() + i);

      return {
        day: date.toLocaleDateString("en-GB", {
          weekday: "short"
        }),

        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short"
        })
      };
    });
  }

  const weekDays =
    selectedPeriod
      ? getWeekDays(selectedPeriod.week_start)
      : [];

  useEffect(() => {

    const mapped = {};

    wealthEntries.forEach(entry => {

      const memberId =
        entry.member_id;

      const date =
        new Date(entry.date);

      const dayIndex =
        date.getDay();

      const adjustedDay =
        dayIndex === 0
          ? "sun"
          : dayKeys[dayIndex - 1];

      if (!mapped[memberId]) {
        mapped[memberId] = {};
      }

      mapped[memberId][adjustedDay] =
        entry.amount;
    });

    setDraftWealth(mapped);

  }, [wealthEntries]);

  async function handleSaveAll() {

    if (selectedPeriod?.is_finalized) {
      return;
    }

    for (const memberId in draftWealth) {

      const memberDays =
        draftWealth[memberId];

      for (const dayKey in memberDays) {

        const amount =
          memberDays[dayKey];

        const dayIndex =
          dayKeys.indexOf(dayKey);

        const actualDate =
          new Date(selectedPeriod.week_start);

        actualDate.setDate(
          actualDate.getDate() + dayIndex
        );

        const formattedDate =
          actualDate
            .toISOString()
            .split("T")[0];

        const existingEntry =
          wealthEntries.find(
            item =>
              item.member_id ===
                Number(memberId) &&
              item.reward_period_id ===
                selectedPeriod.id &&
              item.date === formattedDate
          );

        if (existingEntry) {

          await supabase
            .from("daily_wealth")
            .update({
              amount
            })
            .eq("id", existingEntry.id);

        } else {

          await supabase
            .from("daily_wealth")
            .insert({
              member_id: Number(memberId),
              reward_period_id:
                selectedPeriod.id,
              date: formattedDate,
              amount
            });

        }
      }

      const wealthGems =
        calculateWealthGems(memberDays);

      const existingWeeklyReward =
        await supabase
          .from("weekly_rewards")
          .select("*")
          .eq(
            "member_id",
            Number(memberId)
          )
          .eq(
            "reward_period_id",
            selectedPeriod.id
          )
          .single();

      const currentGcGems =
        existingWeeklyReward.data
          ?.gc_gems || 0;

      const currentBonusGems =
        existingWeeklyReward.data
          ?.bonus_gems || 0;

      const totalWeek =
        currentGcGems +
        currentBonusGems +
        wealthGems;

      if (existingWeeklyReward.data) {

        await supabase
          .from("weekly_rewards")
          .update({
            wealth_gems: wealthGems,
            total_week: totalWeek
          })
          .eq(
            "id",
            existingWeeklyReward.data.id
          );

      } else {

        await supabase
          .from("weekly_rewards")
          .insert({
            member_id: Number(memberId),
            reward_period_id:
              selectedPeriod.id,
            gc_gems: 0,
            wealth_gems: wealthGems,
            bonus_gems: 0,
            total_week: totalWeek
          });

      }
    }

    await getWealthEntries(
      selectedPeriod.id
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <>
      {/* Day Selector */}
      <div className="flex justify-center mb-4">

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(e.target.value)
          }
          className="
            bg-white
            border
            border-[#DDECCF]
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-[#5B3B2E]
            outline-none
            shadow-sm
            cursor-pointer
            min-w-[170px]

            disabled:bg-[#F3F1EC]
            disabled:text-[#B7AEA4]
            disabled:border-[#E5DED3]
            disabled:cursor-not-allowed
          "
          disabled={selectedPeriod?.is_finalized}
        >

          {dayKeys.map((day, index) => (

            <option
              key={day}
              value={day}
            >
              {weekDays[index]?.day} —{" "}
              {weekDays[index]?.date}
            </option>

          ))}

        </select>

      </div>

      {/* Desktop */}
      <div className="hidden xl:block">

        <GuildWealthDesktopTable
          paginatedMembers={paginatedMembers}
          draftWealth={draftWealth}
          setDraftWealth={setDraftWealth}
          selectedDay={selectedDay}
          wealthOptions={wealthOptions}
          calculateWealthGems={calculateWealthGems}
          selectedPeriod={selectedPeriod}
        />

      </div>

      {/* Mobile */}
      <div className="xl:hidden">

        <GuildWealthMobileCards
          paginatedMembers={paginatedMembers}
          draftWealth={draftWealth}
          setDraftWealth={setDraftWealth}
          selectedDay={selectedDay}
          wealthOptions={wealthOptions}
          calculateWealthGems={calculateWealthGems}
          selectedPeriod={selectedPeriod}
        />

      </div>

      {/* Save */}
      <div className="flex justify-end mt-4">

        <button
          onClick={handleSaveAll}
          className="
            bg-[#4FA36B]
            hover:bg-[#438B5B]
            text-white
            px-5
            py-3
            rounded-2xl
            font-semibold
            transition
            shadow-sm
            cursor-pointer

            disabled:bg-[#BFCFBE]
            disabled:hover:bg-[#BFCFBE]
            disabled:cursor-not-allowed
            disabled:shadow-none
          "
          disabled={selectedPeriod?.is_finalized}
        >
          Save All
        </button>

      </div>

      {/* Saved */}
      {saved && (

        <p className="text-sm text-[#1c672e] mt-3 text-right">
          All changes saved ✨
        </p>

      )}

      {/* Pagination */}
      <div
        className="
          overflow-x-auto
          pb-2
        "
      >

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-6
            min-w-max
          "
        >

          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="
              px-4
              py-2
              rounded-xl
              border
              bg-white
              disabled:opacity-50
            "
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, i) => (

              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`
                  w-10
                  h-10
                  rounded-xl
                  border

                  ${
                    currentPage === i + 1
                      ? `
                        bg-[#4FA36B]
                        text-white
                        border-[#4FA36B]
                      `
                      : `
                        bg-white
                        border-[#DDECCF]
                      `
                  }
                `}
              >
                {i + 1}
              </button>

            )
          )}

          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage === totalPages
            }
            className="
              px-4
              py-2
              rounded-xl
              border
              bg-white
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}