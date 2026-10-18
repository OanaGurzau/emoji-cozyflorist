"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/sidebar/Sidebar";
import Banner from "@/components/Banner";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import GuildCompetitionTable from "@/components/guild-competition/GuildCompetitionTable";
import CompetitionRulesCard from "@/components/guild-competition/CompetitionRulesCard";

export default function GuildCompetitionPage() {
      const [members, setMembers] = useState([]);
      const [selectedPeriod, setSelectedPeriod] = useState(null);
      const [periods, setPeriods] = useState([]); 
      const [searchTerm, setSearchTerm] = useState("");
      const [competitionScores, setCompetitionScores] = useState([]);
      const filteredMembers = members.filter(member => member.name.toLowerCase().startsWith(searchTerm.toLowerCase()));

      useEffect(() => {

    getMembers();
    getPeriods();

  }, []);

  useEffect(() => {

    if (selectedPeriod) {
      getCompetitionScores(selectedPeriod.id);
    }

  }, [selectedPeriod]);

  async function getMembers() {

    const { data } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: true });

    if (data) {
      setMembers(data);
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
    async function getCompetitionScores(periodId) {

        const { data } = await supabase
            .from("guild_competition_scores")
            .select("*")
            .eq("reward_period_id", periodId);

        if (data) {
            setCompetitionScores(data);
        }
    }
    
    return(
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
              />
        
            <div className="flex gap-6 mt-4">
        
        
            {/* Workspace */}
            <div className="flex-1">
        
        
                {/* Members Table */}
                  <GuildCompetitionTable
                    members={filteredMembers}
                    competitionScores={competitionScores} 
                    selectedPeriod={selectedPeriod}  
                    getCompetitionScores={getCompetitionScores}             />

                            
        
            </div>
        
            {/* Right Rules Panel */}
            <aside className="hidden lg:block w-80">
              <CompetitionRulesCard />
            </aside>
        
          </div>
          </div>
        
          </main>
        
          </div>
        
    )
}
