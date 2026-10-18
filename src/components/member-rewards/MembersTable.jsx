"use client";

import { useState } from "react";

import MembersDesktopTable from "./MembersDesktopTable";
import MembersMobileCards from "./MembersMobileCards";

export default function MembersTable({
  members,
  weeklyRewards,
  allRewards,
  selectedMember,
  setSelectedMember
}) {

  const compactView = !!selectedMember;

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

  function calculateBalance(memberId) {

    const memberRewards =
      allRewards.filter(
        reward =>
          reward.member_id === memberId
      );

    return memberRewards.reduce(
      (sum, reward) =>
        sum + reward.total_week,
      0
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">

        <MembersDesktopTable
          paginatedMembers={paginatedMembers}
          weeklyRewards={weeklyRewards}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          compactView={compactView}
          calculateBalance={calculateBalance}
        />

      </div>

      {/* Mobile */}
      <div className="md:hidden">

        <MembersMobileCards
          paginatedMembers={paginatedMembers}
          weeklyRewards={weeklyRewards}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          compactView={compactView}
          calculateBalance={calculateBalance}
        />

      </div>

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