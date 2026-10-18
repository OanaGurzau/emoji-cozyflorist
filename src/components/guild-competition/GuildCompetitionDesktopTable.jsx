"use client";

import Image from "next/image";
import {
  Trophy,
  Gem,
  ShieldCheck,
  Check,
  Hourglass,
  MessageCircle,
  Clock
} from "lucide-react";

import { avatars } from "@/lib/avatars";

export default function GuildCompetitionDesktopTable({
  paginatedMembers,
  competitionScores,
  draftScores,
  setDraftScores,
  selectedPeriod,
  calculateGcGems
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
          grid-cols-[1.2fr_1fr_1fr_1fr_1fr]
          rounded-t-2xl
          px-4
          py-3
          text-[#3c874e]
          font-bold
          text-sm
          bg-[#E7F1DD]
          border-b
          border-[#E8E2D6]
        "
      >

        <div className="flex items-center gap-2">
          Member
        </div>

        <div className="flex items-center gap-2">
          <Trophy size={16} />
          GC Score
        </div>

        <div className="flex items-center gap-2">
          <Gem size={16} />
          Gems Earned
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck size={16} />
          Status
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          Last Updated
        </div>


      </div>

      {/* Rows */}
      <div className="space-y-0">

        {paginatedMembers.map((member, index) => {

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

          const rowBg =
            index % 2 === 0
              ? "bg-[#FEFEFE]"
              : "bg-[#FBFBFC]";

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
              className={`
                grid
                grid-cols-[1.2fr_1fr_1fr_1fr_1fr]
                items-center
                px-4
                py-3
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
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                {member.name} 🌸

              </div>

              {/* Score */}
              <div>

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
                    border
                    border-[#DDECCF]
                    rounded-xl
                    px-3
                    py-2
                    w-28
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

              {/* Last Updated */}

              <div className="text-sm text-[#5B6B65]">

                    {existingScore?.updated_at
                        ? new Date(
                            existingScore.updated_at
                        ).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year:"numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12:true
                        })
                        : "-"
                    }

                    </div>

            </div>
          );
        })}

      </div>




    </section>
    
  );
}