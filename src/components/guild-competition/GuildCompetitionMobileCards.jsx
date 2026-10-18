"use client";

import Image from "next/image";
import {
  Check,
  Hourglass,
  MessageCircle,
  Clock,
  Gem,
  Trophy
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function GuildCompetitionMobileCards({
  paginatedMembers,
  competitionScores,
  draftScores,
  setDraftScores,
  selectedPeriod,
  calculateGcGems
}) {

  return (
    <div className="space-y-4">

      {paginatedMembers.map((member) => {

        const existingScore = competitionScores.find(
          item => item.member_id === member.id
        );

        const score =
          draftScores[member.id] ??
          existingScore?.score ??
          0;

        const isEligible =
          member.status === "Eligible";

        const gems =
          isEligible
            ? calculateGcGems(score)
            : 0;

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
            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">

                <Image
                  src={
                    avatars[
                      member.id % avatars.length
                    ]
                  }
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full"
                />

                <div>

                  <p className="font-semibold text-[#5B3B2E]">
                    {member.name} 🌸
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

            </div>

            {/* Score + Gems */}
            <div className="grid grid-cols-2 gap-4 mt-5">

              {/* Score */}
              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-[#6B7A74]
                    mb-2
                  "
                >

                  <Trophy size={14} />

                  GC Score

                </div>

                <input
                  type="number"
                  value={score}
                  onChange={(e) =>
                    setDraftScores(prev => ({
                      ...prev,
                      [member.id]:
                        Number(e.target.value)
                    }))
                  }
                  className="
                    w-full
                    border
                    border-[#DDECCF]
                    rounded-xl
                    px-3
                    py-2
                    outline-none

                    disabled:bg-[#F3F1EC]
                    disabled:text-[#B7AEA4]
                    disabled:border-[#E5DED3]
                    disabled:cursor-not-allowed
                  "
                  disabled={selectedPeriod?.is_finalized}
                />

              </div>

              {/* Gems */}
              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-[#6B7A74]
                    mb-2
                  "
                >

                  <Gem size={14} />

                  Gems

                </div>

                <div
                  className="
                    h-[42px]
                    flex
                    items-center
                    px-3
                    rounded-xl
                    bg-[#F7FAF7]
                    font-semibold
                    text-[#0a395c]
                  "
                >
                  💎 {gems}
                </div>

              </div>

            </div>

            {/* Last Updated */}
            <div
              className="
                mt-4
                pt-4
                border-t
                border-[#F1ECE3]
                text-xs
                text-[#5B6B65]
                flex
                items-start
                gap-2
              "
            >

              <Clock size={14} className="mt-[1px]" />

              <div>

                <span className="font-medium">
                  Last Updated:
                </span>{" "}

                {existingScore?.updated_at
                  ? new Date(
                      existingScore.updated_at
                    ).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true
                    })
                  : "-"}

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}