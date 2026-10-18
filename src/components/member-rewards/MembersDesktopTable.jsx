"use client";

import Image from "next/image";

import {
  User,
  ShieldCheck,
  Gem,
  Sprout,
  Gift,
  Wallet,
  Check,
  Hourglass,
  MessageCircle
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function MembersDesktopTable({
  paginatedMembers,
  weeklyRewards,
  selectedMember,
  setSelectedMember,
  compactView,
  calculateBalance
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
        className={`
          grid

          ${
            compactView
              ? "grid-cols-[1fr_1fr_180px]"
              : "grid-cols-[1fr_1.2fr_1.2fr_1fr_1fr_1.2fr]"
          }

          rounded-t-2xl
          px-4
          py-3
          text-[#3c874e]
          font-bold
          text-sm
          bg-[#E7F1DD]
          border-b
          border-[#E8E2D6]
        `}
      >

        <div className="flex items-center gap-2">

          <User size={16} strokeWidth={3} />

          Member

        </div>

        <div className="flex items-center gap-2">

          <ShieldCheck
            size={16}
            strokeWidth={3}
          />

          Status

        </div>

        {!compactView && (
          <>
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Gem
                size={16}
                strokeWidth={3}
              />

              Guild Comp

            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Sprout
                size={16}
                strokeWidth={3}
              />

              Wealth

            </div>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Gift
                size={16}
                strokeWidth={3}
              />

              Bonus

            </div>
          </>
        )}

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
          "
        >

          <Wallet
            size={16}
            strokeWidth={3}
          />

          Lifetime Balance

        </div>

      </div>

      {/* Rows */}
      <div className="space-y-0">

        {paginatedMembers.map((member, index) => {

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

          const rowBg =
            index % 2 === 0
              ? "bg-[#FEFEFE]"
              : "bg-[#FBFBFC]";

          return (
            <div
              key={member.id}
              onClick={() =>
                setSelectedMember(member)
              }
              className={`
                grid

                ${
                  compactView
                    ? "grid-cols-[1fr_1fr_180px]"
                    : "grid-cols-[1fr_1.2fr_1.2fr_1fr_1fr_1.2fr]"
                }

                items-center
                px-4
                py-3
                cursor-pointer
                transition

                ${
                  isSelected
                    ? "bg-[#e7f1e8]"
                    : rowBg
                }

                hover:bg-[#FAF7F2]
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
                  width={26}
                  height={26}
                  className="rounded-full"
                />

                {member.name}

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

              {!compactView && (
                <>
                  {/* Guild Comp */}
                  <div
                    className="
                      text-[#5B3B2E]
                      text-center
                    "
                  >
                    {reward?.gc_gems || 0}
                  </div>

                  {/* Wealth */}
                  <div
                    className="
                      text-[#5B3B2E]
                      text-center
                    "
                  >
                    {reward?.wealth_gems || 0}
                  </div>

                  {/* Bonus */}
                  <div
                    className="
                      text-[#5B3B2E]
                      text-center
                    "
                  >
                    {reward?.bonus_gems || 0}
                  </div>
                </>
              )}

              {/* Lifetime Balance */}
              <div
                className="
                  text-[#5B3B2E]
                  text-center
                  font-semibold
                "
              >
                {calculateBalance(member.id)}
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}