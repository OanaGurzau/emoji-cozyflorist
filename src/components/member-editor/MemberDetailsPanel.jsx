"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import MemberHeader from
"./MemberHeader";

import MemberSummaryCards from
"./MemberSummaryCards";

import StatusDropdown from
"./StatusDropdown";

export default function MemberDetailsPanel({
  selectedMember,
  selectedPeriod,
  weeklyRewards,
  getMembers,
  setSelectedMember,
  allRewards,
  getAllRewards
}) {

  const [status, setStatus] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {

    if (!selectedMember) return;

    setStatus(
      selectedMember.status
    );

  }, [selectedMember]);

  if (!selectedMember) {
    return null;
  }

  function calculateBalance(
    memberId
  ) {

    const memberRewards =
      allRewards.filter(
        reward =>
          reward.member_id ===
          memberId
      );

    return memberRewards.reduce(
      (sum, reward) =>
        sum + reward.total_week,
      0
    );
  }

  const currentWeekReward =
    weeklyRewards.find(
      reward =>
        reward.member_id ===
          selectedMember.id &&
        reward.reward_period_id ===
          selectedPeriod?.id
    );


    function getEligibilityInfo() {

        if (
          status !== "Waiting Period"
        ) {
          return null;
        }

        const joinDate =
          new Date(
            selectedMember.join_date
          );

        // waiting period ends after 7 days
        const waitEndDate =
          new Date(joinDate);

        waitEndDate.setDate(
          waitEndDate.getDate() + 7
        );

        // find next monday
        const eligibleDate =
          new Date(waitEndDate);

        const day =
          eligibleDate.getDay();

        const daysUntilMonday =
          day === 1
            ? 7
            : day === 0
              ? 1
              : 8 - day;

        eligibleDate.setDate(
          eligibleDate.getDate() +
          daysUntilMonday
        );

        const today =
          new Date();

        const diffTime =
          eligibleDate - today;

        const diffDays =
          Math.ceil(
            diffTime /
            (1000 * 60 * 60 * 24)
          );

        return {
          date:
            eligibleDate.toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "long",
                year: "numeric"
              }
            ),

          days: diffDays
        };
      }

  async function handleSaveStatus() {

    await supabase
      .from("members")
      .update({
        status
      })
      .eq(
        "id",
        selectedMember.id
      );

    await getMembers();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  async function handleRemoveMember() {

  const confirmed =
    window.confirm(
      "Remove this member?\n\nAll rewards history will be permanently deleted."
    );

  if (!confirmed) {
    return;
  }

  await supabase
    .from("members")
    .delete()
    .eq(
      "id",
      selectedMember.id
    );

  await getMembers();
  await getAllRewards();

  setSelectedMember(null);
}

  return (

    <section
      className="
        bg-[#fefefe]
        rounded-2xl
        border
        border-[#f0e7d9]
        p-5
        shadow-sm
      "
    >

      <div className="mb-4">

        <MemberHeader
          selectedMember={
            selectedMember
          }
          setSelectedMember={
            setSelectedMember
          }
          calculateBalance={
            calculateBalance
          }
        />

      </div>

      <div className="mb-4">

        <MemberSummaryCards
          currentWeekReward={
            currentWeekReward
          }
          lifetimeBalance={
            calculateBalance(
              selectedMember.id
            )
          }
        />

      </div>

      <StatusDropdown
        status={status}
        setStatus={setStatus}
      />

            {status === "Waiting Period" &&
        getEligibilityInfo() && (

        <div
          className="
            mt-3
            rounded-xl
            bg-[#FFF4E8]
            border
            border-[#F4D3A8]
            px-4
            py-3
          "
        >

          <p
            className="
              text-sm
              font-medium
              text-[#B96A12]
            "
          >
            Eligible on{" "}
            {getEligibilityInfo().date}
          </p>

          <p
            className="
              text-xs
              text-[#C08339]
              mt-1
            "
          >
            {getEligibilityInfo().days} days
            remaining until the next
            full rewards period
          </p>

        </div>

      )}

      {saved && (

        <p
          className="
            text-sm
            text-[#1c672e]
            mt-3
            text-center
          "
        >
          Status updated ✨
        </p>

      )}

      <button
        onClick={handleSaveStatus}
        className="
          w-full
          bg-[#4FA36B]
          hover:bg-[#438B5B]
          text-white
          py-3
          rounded-2xl
          font-semibold
          transition
        "
      >
        Save Status
      </button>

      <button
        onClick={handleRemoveMember}
        className="
          w-full
          mt-3
          bg-[#C05673]
          hover:bg-[#A9445F]
          text-white
          py-3
          rounded-2xl
          font-semibold
          transition
          cursor-pointer
        "
      >
        Remove Member
      </button>

    </section>

  );
}