"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import GuildCompetitionDesktopTable from "./GuildCompetitionDesktopTable";
import GuildCompetitionMobileCards from "./GuildCompetitionMobileCards";

export default function GuildCompetitionTable({
  members,
  competitionScores,
  selectedPeriod,
  getCompetitionScores
}) {

  const [draftScores, setDraftScores] = useState({});
  const [saved, setSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  setDraftScores({});
}, [selectedPeriod]);

  const itemsPerPage = 30;

  const totalPages = Math.ceil(
    members.length / itemsPerPage
  );

  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function calculateGcGems(score) {

    if (score >= 1000) return 3;

    if (score >= 500) return 1;

    return 0;
  }

  async function handleSaveAll() {

    if (selectedPeriod?.is_finalized) {
      return;
    }

    for (const memberId in draftScores) {

      const score = draftScores[memberId];

      const member = members.find(
        m => m.id === Number(memberId)
      );

      const isEligible =
        member?.status === "Eligible";

      const gems =
        isEligible
          ? calculateGcGems(score)
          : 0;

      const existingScore =
        competitionScores.find(
          item =>
            item.member_id === Number(memberId) &&
            item.reward_period_id === selectedPeriod.id
        );

      if (existingScore) {

        await supabase
          .from("guild_competition_scores")
          .update({
            score: score,
            gems_earned: gems,
            updated_at: new Date()
          })
          .eq("id", existingScore.id);

      } else {

        await supabase
          .from("guild_competition_scores")
          .insert({
            member_id: Number(memberId),
            reward_period_id: selectedPeriod.id,
            score: score,
            gems_earned: gems,
            updated_at: new Date()
          });

      }
    }

    await getCompetitionScores(
      selectedPeriod.id
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <>

      {/* Desktop */}
      <div className="hidden md:block">

        <GuildCompetitionDesktopTable
          paginatedMembers={paginatedMembers}
          competitionScores={competitionScores}
          draftScores={draftScores}
          setDraftScores={setDraftScores}
          selectedPeriod={selectedPeriod}
          calculateGcGems={calculateGcGems}
        />

      </div>

      {/* Mobile */}
      <div className="md:hidden">

        <GuildCompetitionMobileCards
          paginatedMembers={paginatedMembers}
          competitionScores={competitionScores}
          draftScores={draftScores}
          setDraftScores={setDraftScores}
          selectedPeriod={selectedPeriod}
          calculateGcGems={calculateGcGems}
        />

      </div>

      {/* Save Button */}
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

      {/* Saved Message */}
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