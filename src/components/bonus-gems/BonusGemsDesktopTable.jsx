"use client";

import Image from "next/image";

import {
  Check,
  Hourglass,
  MessageCircle
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function BonusGemsDesktopTable({
  paginatedMembers,
  draftBonus,
  setDraftBonus,
  selectedDay,
  selectedPeriod
}) {

  return (
    <section
      className="
        bg-[#fefefe]
        rounded-xl
        border
        border-[#f0e7d9]
        shadow-sm
        p-6
      "
    >

      {/* Header */}
      <div
        className="
          grid
          grid-cols-[220px_700px_120px_180px]
          rounded-t-2xl
          px-4
          py-3
          text-[#3c874e]
          font-bold
          text-lg
          bg-[#E7F1DD]
          border-b
          border-[#E8E2D6]
          gap-4
          items-center
        "
      >

        <div>Member</div>

        <div className="text-center">
          Bonus Gems
        </div>

        <div>Weekly Total</div>

        <div>Status</div>

      </div>

      {/* Rows */}
      <div>

        {paginatedMembers.map((member, index) => {

          const rowBg =
            index % 2 === 0
              ? "bg-[#FEFEFE]"
              : "bg-[#FBFBFC]";

          const memberBonus =
            draftBonus[member.id] || {};

          const currentDayBonus =
            memberBonus[selectedDay] ?? "";

          const weeklyTotal =
            Object.values(memberBonus)
              .reduce(
                (sum, item) =>
                  sum + (item || 0),
                0
              );

          const isLocked =
            member.status ===
              "Waiting Period" ||
            member.status ===
              "Discord Required";

          let statusStyles = "";
          let iconBg = "";
          let StatusIcon = Check;

          if (
            member.status === "Eligible"
          ) {

            statusStyles =
              "bg-[#d6ecd9] text-[#38834d]";

            iconBg =
              "bg-[#38834d]";
          }

          if (
            member.status ===
            "Waiting Period"
          ) {

            statusStyles =
              "bg-[#ffecd4] text-[#fe7108]";

            iconBg =
              "bg-[#fe7108]";

            StatusIcon =
              Hourglass;
          }

          if (
            member.status ===
            "Discord Required"
          ) {

            statusStyles =
              "bg-[#F9D9E1] text-[#C05673]";

            iconBg =
              "bg-[#C05673]";

            StatusIcon =
              MessageCircle;
          }

          return (
            <div
              key={member.id}
              className={`
                grid
                grid-cols-[220px_700px_120px_180px]
                items-center
                px-4
                py-3
                gap-4
                ${rowBg}
              `}
            >

              {/* Member */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  font-medium
                  text-[#5B3B2E]
                "
              >

                <Image
                  src={
                    avatars[
                      member.id %
                      avatars.length
                    ]
                  }
                  alt="avatar"
                  width={28}
                  height={28}
                  className="rounded-full"
                />

                {member.name}

              </div>

              {/* Bonus Controls */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  justify-center
                "
              >

                {/* Minus */}
                <button
                  disabled={
                    isLocked ||
                    selectedPeriod?.is_finalized
                  }
                  onClick={() => {

                    if (
                      isLocked ||
                      selectedPeriod?.is_finalized
                    ) return;

                    const current =
                      memberBonus[selectedDay] || 0;

                    const newValue =
                      Math.max(current - 1, 0);

                    setDraftBonus(prev => ({
                      ...prev,

                      [member.id]: {
                        ...prev[member.id],

                        [selectedDay]: newValue,
                      }
                    }));
                  }}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                    transition

                    ${
                      selectedPeriod?.is_finalized
                        ? `
                          bg-[#F3F1EC]
                          text-[#B7AEA4]
                          border-[#E5DED3]
                          cursor-not-allowed
                        `
                        : `
                          bg-white
                          border-[#DDECCF]
                          hover:bg-[#F6FAF2]
                        `
                    }
                  `}
                >
                  -
                </button>

                {/* Input */}
                <input
                  type="number"
                  min="0"
                  disabled={
                    isLocked ||
                    selectedPeriod?.is_finalized
                  }
                  value={currentDayBonus}
                  onChange={(e) => {

                    const value =
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value);

                    setDraftBonus(prev => ({
                      ...prev,

                      [member.id]: {
                        ...prev[member.id],

                        [selectedDay]: value,
                      }
                    }));
                  }}
                  className="
                    w-24
                    h-10
                    rounded-xl
                    border
                    border-[#DDECCF]
                    text-center
                    outline-none
                    text-sm
                    font-medium
                    text-[#3B2B2B]
                    appearance-none

                    disabled:bg-[#F3F1EC]
                    disabled:text-[#B7AEA4]
                    disabled:border-[#E5DED3]
                    disabled:cursor-not-allowed
                  "
                />

                {/* Plus */}
                <button
                  disabled={
                    isLocked ||
                    selectedPeriod?.is_finalized
                  }
                  onClick={() => {

                    if (
                      isLocked ||
                      selectedPeriod?.is_finalized
                    ) return;

                    const current =
                      memberBonus[selectedDay] || 0;

                    const newValue =
                      current + 1;

                    setDraftBonus(prev => ({
                      ...prev,

                      [member.id]: {
                        ...prev[member.id],

                        [selectedDay]: newValue
                      }
                    }));
                  }}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                    transition

                    ${
                      selectedPeriod?.is_finalized
                        ? `
                          bg-[#F3F1EC]
                          text-[#B7AEA4]
                          border-[#E5DED3]
                          cursor-not-allowed
                        `
                        : `
                          bg-white
                          border-[#DDECCF]
                          hover:bg-[#F6FAF2]
                        `
                    }
                  `}
                >
                  +
                </button>

              </div>

              {/* Weekly Total */}
              <div
                className="
                  font-semibold
                  text-[#0a395c]
                "
              >
                💎 {weeklyTotal}
              </div>

              {/* Status */}
              <div>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    pl-2
                    pr-3
                    py-1
                    rounded-full
                    font-medium
                    ${statusStyles}
                  `}
                >

                  <div
                    className={`
                      w-4
                      h-4
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white
                      ${iconBg}
                    `}
                  >

                    <StatusIcon
                      size={10}
                      strokeWidth={3}
                    />

                  </div>

                  {member.status}

                </span>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}