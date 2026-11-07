"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Sidebar from "@/components/sidebar/Sidebar";
import Banner from "@/components/Banner";

import WealthStatusLegend
  from "@/components/wealth-status/WealthStatusLegend";

import WealthStatusMemberCard
  from "@/components/wealth-status/WealthStatusMemberCard";

function getDatesBetween(
  startDate,
  endDate
) {

  const dates = [];

  const current =
    new Date(startDate);

  const end =
    new Date(endDate);

  while (current <= end) {

    dates.push(
      current
        .toISOString()
        .split("T")[0]
    );

    current.setDate(
      current.getDate() + 1
    );
  }

  return dates;
}

function formatLocalDate(date) {

  return (
    date.getFullYear() +
    "-" +
    String(
      date.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      date.getDate()
    ).padStart(2, "0")
  );
}

export default function WealthStatusPage() {

  const [members, setMembers] =
    useState([]);

  const [wealthEntries, setWealthEntries] =
    useState([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // Default current month
useEffect(() => {

  const today = new Date();

  // first day of current month
  const firstDay =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

  // yesterday
  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

setStartDate(
  formatLocalDate(firstDay)
);

setEndDate(
  formatLocalDate(yesterday)
);

}, []);
  useEffect(() => {

    getMembers();

  }, []);

  useEffect(() => {

    if (startDate && endDate) {
      getWealthEntries();
    }

  }, [startDate, endDate]);

  async function getMembers() {

    const { data } = await supabase
      .from("members")
      .select("*")
      .order("id", {
        ascending: true
      });

    setMembers(data || []);
  }

  async function getWealthEntries() {

    setLoading(true);

    const { data } = await supabase
      .from("daily_wealth")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate);

    setWealthEntries(data || []);

    setLoading(false);
  }

  const filteredMembers =
    members.filter(member =>
      member.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  // Build wealth map
  const wealthMap = {};

  wealthEntries.forEach(entry => {

    if (!wealthMap[entry.member_id]) {
      wealthMap[entry.member_id] = {};
    }

    wealthMap[entry.member_id][
      entry.date
    ] = entry.amount;
  });

  const allDates =
    getDatesBetween(
      startDate,
      endDate
    );

  // Sort by fail count
  const sortedMembers =
    [...filteredMembers].sort(
      (a, b) => {

        const aFails =
          Object.values(
            wealthMap[a.id] || {}
          ).filter(
            amount => amount < 70
          ).length;

        const bFails =
          Object.values(
            wealthMap[b.id] || {}
          ).filter(
            amount => amount < 70
          ).length;

        return bFails - aFails;
      }
    );

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

          {/* Header */}
          <div
            className="
              flex
              flex-wrap
              gap-4
              items-center
              justify-between
              mb-6
            "
          >

            <h1
              className="
                text-3xl
                font-bold
                text-[#5B3B2E]
              "
            >
              Wealth Status Monitor
            </h1>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                  bg-white
                  border
                  border-[#DDECCF]
                  rounded-xl
                  px-4
                  py-3
                "
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                className="
                  bg-white
                  border
                  border-[#DDECCF]
                  rounded-xl
                  px-4
                  py-3
                "
              />

              <input
                type="text"
                placeholder="Search member..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="
                  bg-white
                  border
                  border-[#DDECCF]
                  rounded-xl
                  px-4
                  py-3
                "
              />

            </div>

          </div>

          <WealthStatusLegend />

          {loading ? (

            <div>
              Loading...
            </div>

          ) : (

      <div className="space-y-4">

        {sortedMembers.map(
          member => (

            <WealthStatusMemberCard
              key={member.id}
              member={member}
              memberDays={
                wealthMap[
                  member.id
                ] || {}
              }
              allDates={allDates}
            />

          )
        )}

      </div>
          )}

        </div>

      </main>

    </div>
  );
}