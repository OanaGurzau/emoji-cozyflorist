"use client";

import Image from "next/image";

import {
  Check,
  Hourglass,
  MessageCircle,
  Gem,
  Sprout,
  Gift,
  Wallet
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function MembersMobileCards({
  paginatedMembers,
  weeklyRewards,
  selectedMember,
  setSelectedMember,
  compactView,
  calculateBalance
}) {

  return (
    <div className="space-y-4">

      {paginatedMembers.map(member => {

        const reward =
          weeklyRewards.find(
            reward =>
              reward.member_id === member.id
          );

        const isSelected =
          selectedMember?.id === member.id;

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

          StatusIcon =
            Check;
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
            onClick={() =>
              setSelectedMember(member)
            }
            className={`
              border
              rounded-2xl
              p-4
              shadow-sm
              transition
              cursor-pointer

              ${
                isSelected
                  ? `
                    bg-[#F6FBF7]
                    border-[#A7D7B5]
                  `
                  : `
                    bg-white
                    border-[#E8E2D6]
                  `
              }
            `}
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
                width={46}
                height={46}
                className="rounded-full"
              />

              <div className="flex-1">

                <p
                  className="
                    font-semibold
                    text-[#5B3B2E]
                  "
                >
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

            {/* Rewards */}
            {!compactView && (

              <div
                className="
                  grid
                  grid-cols-3
                  gap-3
                  mt-5
                "
              >

                {/* Guild Comp */}
                <div
                  className="
                    rounded-xl
                    bg-[#F8FBF7]
                    p-3
                    text-center
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1
                      text-xs
                      text-[#6B7A74]
                    "
                  >

                    <Gem size={14} />

                    GC

                  </div>

                  <div
                    className="
                      mt-2
                      font-bold
                      text-[#0a395c]
                    "
                  >
                    {reward?.gc_gems || 0}
                  </div>

                </div>

                {/* Wealth */}
                <div
                  className="
                    rounded-xl
                    bg-[#F8FBF7]
                    p-3
                    text-center
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1
                      text-xs
                      text-[#6B7A74]
                    "
                  >

                    <Sprout size={14} />

                    Wealth

                  </div>

                  <div
                    className="
                      mt-2
                      font-bold
                      text-[#0a395c]
                    "
                  >
                    {reward?.wealth_gems || 0}
                  </div>

                </div>

                {/* Bonus */}
                <div
                  className="
                    rounded-xl
                    bg-[#F8FBF7]
                    p-3
                    text-center
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1
                      text-xs
                      text-[#6B7A74]
                    "
                  >

                    <Gift size={14} />

                    Bonus

                  </div>

                  <div
                    className="
                      mt-2
                      font-bold
                      text-[#0a395c]
                    "
                  >
                    {reward?.bonus_gems || 0}
                  </div>

                </div>

              </div>

            )}

            {/* Lifetime Balance */}
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

                <Wallet size={16} />

                Lifetime Balance

              </div>

              <div
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-[#0a395c]
                "
              >
                💎 {calculateBalance(member.id)}
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}