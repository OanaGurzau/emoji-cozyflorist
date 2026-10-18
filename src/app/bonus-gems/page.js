"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Sidebar from "@/components/sidebar/Sidebar";
import Banner from "@/components/Banner";

import DashboardToolbar from
"@/components/dashboard/DashboardToolbar";

import BonusGemsTable from
"@/components/bonus-gems/BonusGemsTable";

export default function BonusGemsPage() {

  const [members, setMembers] =
    useState([]);

  const [selectedPeriod, setSelectedPeriod] =
    useState(null);

  const [periods, setPeriods] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [bonusEntries, setBonusEntries] =
    useState([]);

  const filteredMembers =
    members.filter(member =>
      member.name
        .toLowerCase()
        .startsWith(
          searchTerm.toLowerCase()
        )
    );

  useEffect(() => {

    getMembers();
    getPeriods();

  }, []);

  useEffect(() => {

    if (selectedPeriod) {

      getBonusEntries(
        selectedPeriod.id
      );

    }

  }, [selectedPeriod]);

  async function getMembers() {

    const { data } =
      await supabase
        .from("members")
        .select("*")
        .order("id", {
          ascending: true
        });

    if (data) {
      setMembers(data);
    }
  }

    async function getPeriods() {

      const { data } =
        await supabase
          .from("reward_periods")
          .select("*")
          .order("week_start", {
            ascending: false
          });

      if (data) {

        setPeriods(data);

        // refresh selected period
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

        // initial load
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
  async function getBonusEntries(
    periodId
  ) {

    const { data } =
      await supabase
        .from("bonus_gems")
        .select("*")
        .eq(
          "reward_period_id",
          periodId
        );

    if (data) {

      setBonusEntries(data);

    }
  }

  return (
    <div
      className="
        min-h-screen
        flex
        bg-[#f6f5ef]
      "
    >

      <Sidebar />

      <main className="flex-1">

        <Banner />

        <div className="p-6">

          <DashboardToolbar
            selectedPeriod={selectedPeriod}
            periods={periods}
            setPeriods={setPeriods}
            setSelectedPeriod={
              setSelectedPeriod
            }
            searchTerm={searchTerm}
            setSearchTerm={
              setSearchTerm
            }
          />

          <div
            className="
              flex
              gap-6
              mt-4
            "
          >

            <div className="flex-1">

              <BonusGemsTable
                members={
                  filteredMembers
                }
                selectedPeriod={
                  selectedPeriod
                }
                bonusEntries={
                  bonusEntries
                }
                getBonusEntries={
                  getBonusEntries
                }
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}