"use client";

import Image from "next/image";

import {
  Check,
  Hourglass,
  MessageCircle
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function GuildWealthDesktopTable({
  paginatedMembers,
  draftWealth,
  setDraftWealth,
  selectedDay,
  wealthOptions,
  calculateWealthGems,
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
        overflow-hidden
      "
    >

      {/* Header */}
      <div
        className="
          grid
          grid-cols-[0.7fr_3fr_0.7fr_1fr]
          rounded-t-2xl
          px-4
          py-3
          text-[#3c874e]
          font-bold
          text-xl
          bg-[#E7F1DD]
          border-b
          border-[#E8E2D6]
          gap-2
          items-center
        "
      >

        <div>Member</div>

        <div className="text-center">
          Daily Wealth
        </div>

        <div>Gems</div>

        <div>Status</div>

      </div>

      {/* Rows */}
      <div>

        {paginatedMembers.map((member, index) => {

          const rowBg =
            index % 2 === 0
              ? "bg-[#FEFEFE]"
              : "bg-[#FBFBFC]";

          const memberDays =
            draftWealth[member.id] || {};

          const gems =
            calculateWealthGems(memberDays);

          let statusStyles = "";
          let iconBg = "";
          let StatusIcon = Check;

          if (member.status === "Eligible") {

            statusStyles =
              "bg-[#d6ecd9] text-[#38834d]";

            iconBg = "bg-[#38834d]";

            StatusIcon = Check;
          }

          if (member.status === "Waiting Period") {

            statusStyles =
              "bg-[#ffecd4] text-[#fe7108]";

            iconBg = "bg-[#fe7108]";

            StatusIcon = Hourglass;
          }

          if (member.status === "Discord Required") {

            statusStyles =
              "bg-[#F9D9E1] text-[#C05673]";

            iconBg = "bg-[#C05673]";

            StatusIcon = MessageCircle;
          }

          const isLocked =
            member.status === "Waiting Period" ||
            member.status === "Discord Required";

          return (
            <div
              key={member.id}
              className={`
                grid
                grid-cols-[0.7fr_3fr_0.7fr_1fr]
                items-center
                px-4
                py-3
                gap-2
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
                      member.id % avatars.length
                    ]
                  }
                  alt="avatar"
                  width={26}
                  height={26}
                  className="rounded-full"
                />

                {member.name}

              </div>

              {/* Wealth Buttons */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  flex-nowrap
                  min-w-0
                "
              >

                {wealthOptions.map(value => {

                  const isSelected =
                    memberDays[selectedDay] === value;

                  return (
                    <button
                      key={value}
                      disabled={
                        isLocked ||
                        selectedPeriod?.is_finalized
                      }
                      onClick={() => {

                        if (
                          isLocked ||
                          selectedPeriod?.is_finalized
                        ) {
                          return;
                        }

                        setDraftWealth(prev => ({
                          ...prev,

                          [member.id]: {
                            ...prev[member.id],

                            [selectedDay]: value
                          }
                        }));
                      }}
                      className={`
                        min-w-[56px]
                        px-4
                        py-2.5
                        rounded-xl
                        border
                        text-sm
                        font-medium
                        transition

                        ${
                          isLocked ||
                          selectedPeriod?.is_finalized
                            ? `
                              bg-[#F3F1EC]
                              text-[#B7AEA4]
                              border-[#E5DED3]
                              cursor-not-allowed
                              opacity-60
                              pointer-events-none
                            `
                            : isSelected
                              ? `
                                bg-[#3c874e]
                                text-white
                                border-[#3c874e]
                              `
                              : `
                                bg-white
                                text-[#5B3B2E]
                                border-[#DDECCF]
                                hover:bg-[#F6FAF2]
                                cursor-pointer
                              `
                        }
                      `}
                    >
                      {value}
                    </button>
                  );
                })}

              </div>

              {/* Gems */}
              <div className="font-semibold text-[#0a395c]">

                💎 {gems}

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