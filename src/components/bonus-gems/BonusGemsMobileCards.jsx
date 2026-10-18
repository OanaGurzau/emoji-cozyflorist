"use client";

import Image from "next/image";

import {
  Check,
  Hourglass,
  MessageCircle,
  Gem
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function BonusGemsMobileCards({
  paginatedMembers,
  draftBonus,
  setDraftBonus,
  selectedDay,
  selectedPeriod
}) {

  return (
    <div className="space-y-4">

      {paginatedMembers.map(member => {

        const memberBonus =
          draftBonus[member.id] || {};

        const currentDayBonus =
          memberBonus[selectedDay] || 0;

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
            className="
              bg-white
              border
              border-[#E8E2D6]
              rounded-2xl
              p-4
              shadow-sm
            "
          >

            {/* Top */}
            <div className="flex items-start gap-3">

              <Image
                src={
                  avatars[
                    member.id %
                    avatars.length
                  ]
                }
                alt="avatar"
                width={42}
                height={42}
                className="rounded-full"
              />

              <div className="flex-1">

                <p className="font-semibold text-[#5B3B2E]">
                  {member.name}
                </p>

                <div className="mt-2">

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

            </div>

            {/* Bonus Controls */}
            <div className="mt-5">

              <p
                className="
                  text-xs
                  font-medium
                  text-[#6B7A74]
                  mb-3
                "
              >
                Bonus Gems
              </p>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
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
                  className="
                    w-12
                    h-12
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    bg-white
                    border-[#DDECCF]
                    active:scale-95
                    transition

                    disabled:bg-[#F3F1EC]
                    disabled:text-[#B7AEA4]
                    disabled:border-[#E5DED3]
                    disabled:cursor-not-allowed
                  "
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
                      Number(e.target.value);

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
                    h-12
                    rounded-xl
                    border
                    border-[#DDECCF]
                    text-center
                    outline-none
                    text-base
                    font-semibold

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
                  className="
                    w-12
                    h-12
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    bg-white
                    border-[#DDECCF]
                    active:scale-95
                    transition

                    disabled:bg-[#F3F1EC]
                    disabled:text-[#B7AEA4]
                    disabled:border-[#E5DED3]
                    disabled:cursor-not-allowed
                  "
                >
                  +
                </button>

              </div>

            </div>

            {/* Weekly Total */}
            <div
              className="
                mt-5
                pt-4
                border-t
                border-[#F1ECE3]
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-[#6B7A74]
                "
              >

                <Gem size={16} />

                Weekly Total

              </div>

              <div
                className="
                  mt-2
                  text-lg
                  font-bold
                  text-[#0a395c]
                "
              >
                💎 {weeklyTotal}
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}