"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import Banner from "@/components/Banner";

import QuestBoardGrid from
"@/components/quest-board/QuestBoardGrid";

export default function QuestBoardPage() {

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

          <QuestBoardGrid />

        </div>

      </main>

    </div>

  );
}