"use client";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";

import {
  Flower2,
  Clock3,
  Plus
} from "lucide-react";

export default function QuestBoardGrid() {

  const quests = Array.from(
    { length: 66 },
    (_, i) => ({
      id: i + 1
    })
  );

  const [flowers, setFlowers] =
    useState([]);

  const [selectedSlot, setSelectedSlot] =
    useState(null);

    const [selectedQuest, setSelectedQuest] =
  useState(null);

  const [search, setSearch] =
    useState("");

  const [assignedQuests, setAssignedQuests] =
    useState({});

    const [questEntries, setQuestEntries] =
  useState([]);

  const filteredFlowers =
    flowers.filter(flower =>
      flower.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  useEffect(() => {

    getFlowers();
    getQuestBoard();

  }, []);

  async function getFlowers() {

    const { data } =
      await supabase
        .from("flowers")
        .select("*")
        .order("name");

    if (data) {
      setFlowers(data);
    }
  }

async function getQuestBoard() {

  const { data } =
    await supabase
      .from("quest_board")
      .select(`
        *,
        flowers (*)
      `);

  if (data) {

    setQuestEntries(data);

    const mapped = {};

    data.forEach(entry => {

mapped[entry.slot_number] = {
  flower: entry.flowers,
  pingSent: entry.ping_sent,
  lastPingedAt: entry.last_pinged_at
};
    });

    setAssignedQuests(mapped);
  }
}

const mobileQuest =
  assignedQuests[selectedQuest];

const mobilePingSent =
  mobileQuest?.pingSent;

const mobileLastPingedAt =
  mobileQuest?.lastPingedAt;


  return (

    <section
      className="
        bg-[#FFF8EE]
        border
        border-[#E8E2D6]
        rounded-[32px]
        shadow-sm
        overflow-hidden
      "
    >

      {/* Header */}
      <div
        className="
        px-4 sm:px-8
        py-4 sm:py-6
          border-b
          border-[#EFE7DA]
          bg-[#FFFDF8]
        "
      >

        <div
          className="
flex
flex-col
sm:flex-row
sm:items-center
sm:justify-between
gap-3          "
        >

          <div>

            <h1
              className="
                text-xl sm:text-3xl
                font-bold
                text-[#5B3B2E]
              "
            >
              Quest Board 🌸
            </h1>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              bg-[#F6FAF2]
              border
              border-[#DDECCF]
              rounded-2xl
             px-3 sm:px-4
              py-2 sm:py-3
            "
          >

            <Clock3
              size={18}
              className="text-[#4FA36B]"
            />

            <span
              className="
                text-xs sm:text-sm
                font-medium
                text-[#21443B]
              "
            >
              66 Quest Slots
            </span>

          </div>

        </div>

      </div>

      {/* Grid */}
      <div className="p-6">

        <div
          className="
            grid
            grid-cols-3
            gap-2 sm:gap-5
          "
        >

          {quests.map((quest) => {

              const assignedFlower =
  assignedQuests[quest.id]?.flower;

const pingSent =
  assignedQuests[quest.id]?.pingSent;

const lastPingedAt =
  assignedQuests[quest.id]?.lastPingedAt;

            return (

              <button
                key={quest.id}
onClick={() => {

  // mobile
  if (window.innerWidth < 1024) {

    if (assignedFlower) {

      setSelectedQuest(
        quest.id
      );

    } else {

      setSelectedSlot(
        quest.id
      );
    }

    return;
  }

  // desktop
  if (!assignedFlower) {

    setSelectedSlot(
      quest.id
    );

  }
}}
                className={`
  group
  relative
  aspect-square
  rounded-2xl sm:rounded-[28px]
  border-2
  shadow-sm
  overflow-hidden
  transition
  hover:-translate-y-1
  hover:shadow-md

  ${
    pingSent
      ? `
          bg-[#EAF8EC]
          border-[#BFE5C7]
        `
      : `
          border-[#F0DFC9]
          bg-[#FFFDF8]
          hover:border-[#EBCFA7]
        `
  }
`}
              >

{/* Mobile Number */}
<div
  className="
    absolute
    top-2
    left-2
    text-[10px]
    font-semibold
    text-[#A07045]
    lg:hidden
  "
>
  #{quest.id}
</div>

{/* Desktop Number */}
<div
  className="
    hidden
    lg:flex
    absolute
    top-3
    left-3
    w-10
    h-10
    rounded-full
    bg-[#FFF1DD]
    border
    border-[#F0DFC9]
    items-center
    justify-center
    text-sm
    font-bold
    text-[#A07045]
  "
>
  {quest.id}
</div>

                {assignedFlower ? (

                  <div
                    className="
                      h-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                  >

                    <div
                      className="
                      hidden
    lg:flex
    w-24
    h-24
    rounded-full
    bg-[#FFF1DD]
    items-center
    justify-center
    mb-4
                      "
                    >

                      <Flower2
                        size={22}
                        
                        className="
                          text-[#D6A56C]
                        "
                      />

                    </div>

                    <p
                      className="
                        text-xs sm:text-lg
                        font-bold
                        text-[#5B3B2E]
                      "
                    >
                      {assignedFlower.name}
                    </p>

                    {!pingSent ? (

  <div
onClick={async (e) => {

  e.stopPropagation();

  await fetch(
    "/api/discord/ping",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        flowerName:
          assignedFlower.name,

        slotNumber:
          quest.id
      })
    }
  );

  await supabase
    .from("quest_board")
    .update({
      ping_sent: true,
      last_pinged_at:
        new Date()
    })
    .eq(
      "slot_number",
      quest.id
    );

  await getQuestBoard();
}}
    className="
      mt-4
      bg-[#4FA36B]
      hover:bg-[#438B5B]
      text-white
px-2 sm:px-4
py-1.5 sm:py-2
text-[10px] sm:text-sm
      rounded-xl
      font-medium
      transition
      cursor-pointer
      hidden lg:block
    "
  >
    Send Ping in Wallflower
  </div>

) : (

  <div className="hidden lg:block mt-4">

    <div
      className="
        bg-[#afefc1]
        text-[#249e45]
        px-4
        py-2
        rounded-xl
        text-sm
        font-medium
      "
    >
      Ping Sent Succesfully ✅
    </div>

    <p
      className="
        text-xs
        text-[#7A8A73]
        mt-2
      "
    >
      Last ping:
      {" "}
      {new Date(
        lastPingedAt
      ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      })}
    </p>

    <div
      onClick={async (e) => {

        e.stopPropagation();

        await supabase
          .from("quest_board")
          .update({
            ping_sent: false,
            last_pinged_at: null
          })
          .eq(
            "slot_number",
            quest.id
          );

        await getQuestBoard();
      }}
      className="
        mt-2
        text-xs
        text-[#C05673]
        hover:underline
        cursor-pointer
      "
    >
      Reset Ping
    </div>

  </div>

)}

<div
  onClick={async (e) => {

    e.stopPropagation();

    const existingEntry =
  questEntries.find(
    entry =>
      
      entry.slot_number === quest.id
  );

if (existingEntry) {

  await supabase
    .from("quest_board")
    .delete()
    .eq("id", existingEntry.id);
}

await getQuestBoard();
    
  
  
  }}
  className="
    mt-2
    bg-[#F9D9E1]
    hover:bg-[#F2C4D1]
    text-[#C05673]
    px-4
    py-2
    rounded-xl
    text-sm
    font-medium
    transition
    text-[10px] sm:text-sm
    cursor-pointer
    hidden lg:block
  "
>
  Remove Flower
</div>

                  </div>

                ) : (

                  <div
                    className="
                      h-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                  >

                    <div
                      className="
hidden
    lg:flex
    w-20
    h-20
                            rounded-full
                        bg-[#FDF3E7]
                        flex
                        items-center
                        justify-center
                        mb-5
                        transition
                        group-hover:bg-[#FBE8CF]
                      "
                    >

                      <Flower2
                        size={36}
                        className="
                          text-[#D6A56C]
                        "
                      />

                    </div>

                    <p
                      className="
                        text-[11px] sm:text-base
                        font-semibold
                        text-[#5B3B2E]
                      "
                    >
                      EMPTY
                    </p>

                    <p
                      className="
hidden sm:block
  text-sm
                          text-[#8A8176]
                        mt-2
                        leading-relaxed
                      "
                    >
                      Click to assign a
                      flower 
                    </p>

                    <div
                      className="
                      
                        hidden
                        lg:inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#F6FAF2]
                        border
                        border-[#DDECCF]
px-2 sm:px-4
py-1.5 sm:py-2
text-[10px] sm:text-sm
                        font-medium
                        text-[#3c874e]
                      "
                    >

                      <Plus size={16} />

                      Add Quest

                    </div>

                  </div>

                )}

              </button>

            );
          })}

        </div>

      </div>

      {/* Modal */}
      {selectedSlot !== null && (

        <div
          onClick={() => {
  setSelectedSlot(null);
  setSearch("");
}}
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
          onClick={(e) =>
  e.stopPropagation()
}
            className="
              w-full
max-w-[95vw] sm:max-w-md
p-4 sm:p-6
              bg-white
              rounded-3xl
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-[#5B3B2E]
              "
            >
              Select Flower 🌸
            </h2>

            <input
              type="text"
              placeholder="Search flower..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                mt-4
                h-12
                rounded-2xl
                border
                border-[#DDECCF]
                px-4
                outline-none
              "
            />

            <div
              className="
                mt-4
                max-h-80
                overflow-y-auto
                space-y-2
              "
            >

              {filteredFlowers.map(
                flower => (

                <button
                  key={flower.id}
onClick={async () => {

  const existingEntry =
    questEntries.find(
      entry =>
        entry.slot_number ===
        selectedSlot
    );

  if (existingEntry) {

    await supabase
      .from("quest_board")
      .update({
        flower_id: flower.id
      })
      .eq("id", existingEntry.id);

  } else {

    await supabase
      .from("quest_board")
      .insert({
        slot_number:
          selectedSlot,

        flower_id:
          flower.id
      });

  }

  await getQuestBoard();

  setSelectedSlot(null);

  setSearch("");
}}
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-2xl
                    hover:bg-[#F8F5EE]
                    transition
                  "
                >

                  <div
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-[#FFF8EE]
                    "
                  />

                  <p
                    className="
                      font-medium
                      text-[#21443B]
                    "
                  >
                    {flower.name}
                  </p>

                </button>

              ))}

             

            </div>

          </div>

        </div>

      )}


      {/* Mobile Quest Actions */}
{selectedQuest && (

  <div
    onClick={() =>
      setSelectedQuest(null)
    }
    className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
      lg:hidden
    "
  >

    <div
      onClick={(e) =>
        e.stopPropagation()
      }
      className="
        w-full
        max-w-sm
        bg-white
        rounded-3xl
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-[#5B3B2E]
        "
      >
        {
          assignedQuests[
            selectedQuest
          ]?.flower?.name
        }
      </h2>


      <div className="mt-6 space-y-3">

        

{!mobilePingSent ? (

  <button
    onClick={async () => {

      const flower =
        assignedQuests[
          selectedQuest
        ]?.flower;

      await fetch(
        "/api/discord/ping",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            flowerName:
              flower.name,

            slotNumber:
              selectedQuest
          })
        }
      );

      await supabase
        .from("quest_board")
        .update({
          ping_sent: true,
          last_pinged_at:
            new Date()
        })
        .eq(
          "slot_number",
          selectedQuest
        );

      await getQuestBoard();

      setSelectedQuest(null);
    }}
    className="
      w-full
      bg-[#4FA36B]
      hover:bg-[#438B5B]
      text-white
      py-3
      rounded-2xl
      font-semibold
    "
  >
    Send Ping
  </button>

) : (

  <div
    className="
      rounded-2xl
      bg-[#EAF8EC]
      border
      border-[#BFE5C7]
      p-4
    "
  >

    <p
      className="
        text-[#249e45]
        font-semibold
        text-center
      "
    >
      ✅ Ping Sent Successfully
    </p>

    <p
      className="
        text-xs
        text-[#5B6B65]
        mt-2
        text-center
      "
    >
      Last ping:
      {" "}
      {new Date(
        mobileLastPingedAt
      ).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      })}
    </p>

<div
  onClick={async () => {

    await supabase
      .from("quest_board")
      .update({
        ping_sent: false,
        last_pinged_at: null
      })
      .eq(
        "slot_number",
        selectedQuest
      );

    await getQuestBoard();

    setSelectedQuest(null);
  }}
  className="
    mt-3
    text-xs
    text-[#C05673]
    hover:underline
    cursor-pointer
    text-center
  "
>
  Reset Ping
</div>
  </div>

)}


        {/* Remove */}
        <button
          onClick={async () => {

            const existingEntry =
              questEntries.find(
                entry =>
                  entry.slot_number ===
                  selectedQuest
              );

            if (existingEntry) {

              await supabase
                .from("quest_board")
                .delete()
                .eq(
                  "id",
                  existingEntry.id
                );
            }

            await getQuestBoard();

            setSelectedQuest(null);
          }}
          className="
            w-full
            bg-[#F9D9E1]
            hover:bg-[#F2C4D1]
            text-[#C05673]
            py-3
            rounded-2xl
            font-semibold
          "
        >
          Remove Flower
        </button>

      </div>

    </div>

  </div>

)}

    </section>

  );
}