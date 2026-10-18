"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

import BonusGemsDesktopTable from "./BonusGemsDesktopTable";
import BonusGemsMobileCards from "./BonusGemsMobileCards";

export default function BonusGemsTable({
  members,
  selectedPeriod,
  bonusEntries,
  getBonusEntries
}) {

  const dayKeys = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
  ];

  const today = new Date().getDay();

  const adjustedIndex =
    today === 0 ? 6 : today - 1;

  const [selectedDay, setSelectedDay] =
    useState(dayKeys[adjustedIndex]);

  const [draftBonus, setDraftBonus] =
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

  function getWeekDays(startDate) {

    const start = new Date(startDate);

    return Array.from(
      { length: 7 },
      (_, i) => {

        const date = new Date(start);

        date.setDate(
          start.getDate() + i
        );

        return {
          day:
            date.toLocaleDateString(
              "en-GB",
              {
                weekday: "short"
              }
            ),

          date:
            date.toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short"
              }
            )
        };
      }
    );
  }

  const weekDays =
    selectedPeriod
      ? getWeekDays(
          selectedPeriod.week_start
        )
      : [];

  useEffect(() => {

    if (!bonusEntries) return;

    const mapped = {};

    bonusEntries.forEach(entry => {

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

    setDraftBonus(mapped);

  }, [bonusEntries]);

  async function handleSaveBonus() {

    if (selectedPeriod?.is_finalized) {
      return;
    }

    for (const memberId in draftBonus) {

      const memberDays =
        draftBonus[memberId];

      // SAVE DAILY BONUS
      for (const dayKey in memberDays) {

        const amount =
          memberDays[dayKey];

        const dayIndex =
          dayKeys.indexOf(dayKey);

        const actualDate =
          new Date(
            selectedPeriod.week_start
          );

        actualDate.setDate(
          actualDate.getDate() +
          dayIndex
        );

        const formattedDate =
          actualDate
            .toISOString()
            .split("T")[0];

        const existingEntry =
          bonusEntries.find(
            item =>
              item.member_id ===
                Number(memberId) &&
              item.reward_period_id ===
                selectedPeriod.id &&
              item.date ===
                formattedDate
          );

        if (existingEntry) {

          await supabase
            .from("bonus_gems")
            .update({
              amount
            })
            .eq("id", existingEntry.id);

        } else {

          await supabase
            .from("bonus_gems")
            .insert({
              member_id:
                Number(memberId),

              reward_period_id:
                selectedPeriod.id,

              date: formattedDate,

              amount
            });

        }
      }

      // WEEKLY TOTAL
      const weeklyBonus =
        Object.values(memberDays)
          .reduce(
            (sum, value) =>
              sum + value,
            0
          );

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

      const currentWealthGems =
        existingWeeklyReward.data
          ?.wealth_gems || 0;

      const totalWeek =
        currentGcGems +
        currentWealthGems +
        weeklyBonus;

      if (existingWeeklyReward.data) {

        await supabase
          .from("weekly_rewards")
          .update({
            bonus_gems:
              weeklyBonus,

            total_week:
              totalWeek
          })
          .eq(
            "id",
            existingWeeklyReward
              .data.id
          );

      } else {

        await supabase
          .from("weekly_rewards")
          .insert({
            member_id:
              Number(memberId),

            reward_period_id:
              selectedPeriod.id,

            gc_gems: 0,

            wealth_gems: 0,

            bonus_gems:
              weeklyBonus,

            total_week:
              weeklyBonus
          });

      }
    }

    await getBonusEntries(
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
      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          flex-wrap
          mb-4
        "
      >

        {dayKeys.map((day, index) => (

          <button
            key={day}
            onClick={() => {

              if (
                selectedPeriod?.is_finalized
              ) return;

              setSelectedDay(day);
            }}
            disabled={
              selectedPeriod?.is_finalized
            }
            className={`
              px-4
              py-2
              rounded-xl
              border
              text-sm
              font-medium
              transition

              ${
                selectedPeriod?.is_finalized
                  ? `
                    bg-[#F3F1EC]
                    text-[#B7AEA4]
                    border-[#E5DED3]
                    cursor-not-allowed
                    opacity-60
                  `
                  : selectedDay === day
                    ? `
                      bg-[#4DA6FF]
                      text-white
                      border-[#4DA6FF]
                    `
                    : `
                      bg-white
                      border-[#DDECCF]
                      text-[#5B3B2E]
                      hover:bg-[#F6FAF2]
                    `
              }
            `}
          >

            <div
              className="
                flex
                flex-col
                items-center
                leading-tight
              "
            >

              <span>
                {weekDays[index]?.day}
              </span>

              <span
                className={`
                  text-[11px]

                  ${
                    selectedDay === day
                      ? "text-white/80"
                      : "text-[#7A8A73]"
                  }
                `}
              >
                {weekDays[index]?.date}
              </span>

            </div>

          </button>

        ))}

      </div>

      {/* Desktop */}
      <div className="hidden md:block">

        <BonusGemsDesktopTable
          paginatedMembers={paginatedMembers}
          draftBonus={draftBonus}
          setDraftBonus={setDraftBonus}
          selectedDay={selectedDay}
          selectedPeriod={selectedPeriod}
        />

      </div>

      {/* Mobile */}
      <div className="md:hidden">

        <BonusGemsMobileCards
          paginatedMembers={paginatedMembers}
          draftBonus={draftBonus}
          setDraftBonus={setDraftBonus}
          selectedDay={selectedDay}
          selectedPeriod={selectedPeriod}
        />

      </div>

      {/* Save */}
      <div
        className="
          flex
          justify-end
          mt-6
        "
      >

        <button
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
            disabled:opacity-70
          "
          onClick={handleSaveBonus}
          disabled={selectedPeriod?.is_finalized}
        >

          Save Bonus

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