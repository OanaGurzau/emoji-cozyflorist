"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/sidebar/Sidebar";
import Banner from "@/components/Banner";
import MembersTable from "@/components/member-rewards/MembersTable";
import MemberDetailsPanel from"@/components/member-editor/MemberDetailsPanel";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import RulesPanel from "@/components/RulesPanel";
import { useRouter } from "next/navigation";

export default function Home() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [weeklyRewards, setWeeklyRewards] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [periods, setPeriods] = useState([]); 
  const [allRewards, setAllRewards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredMembers = members.filter(member => member.name.toLowerCase().startsWith(searchTerm.toLowerCase()));


  useEffect(() => {
    getMembers();
    getPeriods();
    getAllRewards();
  }, []);

  useEffect(() => {

  if (selectedPeriod) {
    getWeeklyRewards(selectedPeriod.id);
  }

}, [selectedPeriod]);

  async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id", {ascending: true});

    if (data) {
      setMembers(data);
    }
  }

  async function getWeeklyRewards(periodId) {
    const { data } = await supabase
      .from("weekly_rewards")
      .select("*")
      .eq("reward_period_id", periodId);

    if (data) {
      setWeeklyRewards(data);
    }
  }

    async function getPeriods() {

      const { data } = await supabase
        .from("reward_periods")
        .select("*")
        .order("week_start", {
          ascending: false
        });

      if (data) {

        setPeriods(data);

        // refresh current selected period
        if (selectedPeriod) {

          const refreshed =
            data.find(
              period =>
                period.id ===
                selectedPeriod.id
            );

          if (refreshed) {

            setSelectedPeriod(
              refreshed
            );

            return;
          }
        }

        // first load
        const today = new Date();

        const current =
          data.find(period => {

            const start =
              new Date(
                period.week_start
              );

            const end =
              new Date(
                period.week_end
              );
              end.setHours(23, 59, 59, 999);

            return (
              today >= start &&
              today <= end
            );
          });

        setSelectedPeriod(current);
      }
    }

  async function getAllRewards() {

    const { data } = await supabase
      .from("weekly_rewards")
      .select("*");

    if (data) {
      setAllRewards(data);
    }
  }

      async function handleFinalizeWeek() {

      if (!selectedPeriod) return;
      if (!weeklyRewards.length) {
    return;
  }

      // prevent double finalize
      if (selectedPeriod.is_finalized) {
        return;
      }

      const confirmed =
        window.confirm(
          "Finalize this rewards period?\n\nThis will distribute all rewards and lock editing."
        );

      if (!confirmed) {
        return;
      }

      // add rewards to balances
      for (const reward of weeklyRewards) {

        const member =
          members.find(
            member =>
              member.id === reward.member_id
          );

        if (!member) continue;

        const currentBalance =
          member.balance || 0;

        const rewardAmount =
          reward.total_week || 0;

        await supabase
          .from("members")
          .update({
            balance:
              currentBalance +
              rewardAmount
          })
          .eq(
            "id",
            member.id
          );
      }

      // finalize period
      await supabase
        .from("reward_periods")
        .update({
          is_finalized: true
        })
        .eq(
          "id",
          selectedPeriod.id
        );

      // refresh data
      await getMembers();
      await getPeriods();
      await getAllRewards();

      router.refresh();
    }

        async function handleReopenWeek() {

      if (!selectedPeriod) return;

      // only reopen finalized periods
      if (!selectedPeriod.is_finalized) {
        return;
      }

      const confirmed =
        window.confirm(
          "Reopen this rewards period?\n\nThis will remove distributed rewards from balances and unlock editing."
        );

      if (!confirmed) {
        return;
      }

      // remove rewards from balances
      for (const reward of weeklyRewards) {

        const member =
          members.find(
            member =>
              member.id === reward.member_id
          );

        if (!member) continue;

        const currentBalance =
          member.balance || 0;

        const rewardAmount =
          reward.total_week || 0;

        await supabase
          .from("members")
          .update({
            balance:
              Math.max(
                currentBalance -
                rewardAmount,
                0
              )
          })
          .eq(
            "id",
            member.id
          );
      }

      // unlock period
      await supabase
        .from("reward_periods")
        .update({
          is_finalized: false
        })
        .eq(
          "id",
          selectedPeriod.id
        );

      // refresh
      await getMembers();
      await getPeriods();
      await getAllRewards();

      router.refresh();
    }

return (
  <div className="min-h-screen flex bg-[#f6f5ef]">

    {/* Sidebar */}
    <Sidebar/>

    {/* Main Area */}
    <main className="flex-1">

    <Banner/>


  <div className="p-6">
    <DashboardToolbar  
      selectedPeriod={selectedPeriod} 
      periods={periods} 
      setPeriods={setPeriods} 
      setSelectedPeriod={setSelectedPeriod}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showFinalizeButton={true}
      onFinalizeWeek={handleFinalizeWeek}
      onReopenWeek={handleReopenWeek}
      />



    <div className="flex gap-6 mt-4">

     


    {/* Workspace */}
    <div className="flex-1">

      <div className={`grid gap-6 ${selectedMember ? "grid-cols-[1fr_450px]" : "grid-cols-1"}`}>

        {/* Members Table */}
          <MembersTable
            members={filteredMembers}
            weeklyRewards={weeklyRewards}
            allRewards={allRewards}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />

        {/* Member Editor */}

        {selectedMember && (
          <div className="animate-[fadeIn_.3s_ease-in-out]">
            <MemberDetailsPanel
              selectedMember={selectedMember}
              selectedPeriod={selectedPeriod}
              weeklyRewards={weeklyRewards}
              getMembers={getMembers}
              setSelectedMember={setSelectedMember}
              allRewards={allRewards}            />
          </div>
        )}
      </div>

    </div>

    {/* Right Rules Panel */}
    <aside className="hidden lg:block w-80">
      <RulesPanel />
    </aside>

  </div>
  </div>

  </main>

  </div>
);
}