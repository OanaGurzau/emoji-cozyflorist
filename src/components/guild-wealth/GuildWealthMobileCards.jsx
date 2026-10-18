"use client";

import Image from "next/image";

import {
  Check,
  Hourglass,
  MessageCircle,
  Gem
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function GuildWealthMobileCards({
  paginatedMembers,
  draftWealth,
  setDraftWealth,
  selectedDay,
  wealthOptions,
  calculateWealthGems,
  selectedPeriod
}) {

  return (
    <div className="space-y-4">

      {paginatedMembers.map(member => {

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
                    member.id % avatars.length
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

            {/* Wealth Buttons */}
            <div className="mt-5">

              <p
                className="
                  text-xs
                  font-medium
                  text-[#6B7A74]
                  mb-3
                "
              >
                Select Wealth
              </p>

              <div className="grid grid-cols-3 gap-2">

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
                        h-11
                        rounded-xl
                        border
                        text-sm
                        font-semibold
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
                              `
                        }
                      `}
                    >
                      {value}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* Gems */}
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

                Wealth Gems

              </div>

              <div
                className="
                  mt-2
                  text-lg
                  font-bold
                  text-[#0a395c]
                "
              >
                💎 {gems}
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}