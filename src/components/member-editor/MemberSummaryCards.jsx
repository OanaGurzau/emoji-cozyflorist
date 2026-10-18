import Image from "next/image";

export default function MemberSummaryCards({
  currentWeekReward,
  lifetimeBalance
}) {

  const gc =
    currentWeekReward?.gc_gems || 0;

  const wealth =
    currentWeekReward?.wealth_gems || 0;

  const bonus =
    currentWeekReward?.bonus_gems || 0;

  const total =
    currentWeekReward?.total_week || 0;

  return (

    <div className="space-y-4">

      {/* Top Cards */}
      <div className="grid grid-cols-2 gap-3">

        {/* Current Week */}
        <div
          className="
            bg-[#EEF1FF]
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              font-bold
              text-[#11549d]
            "
          >
            Current Week
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              mt-2
            "
          >

            <Image
              src="/icons/gem2.png"
              alt="gem"
              width={36}
              height={36}
            />

            <p
              className="
                text-3xl
                font-bold
                text-[#0a395c]
              "
            >
              {total}
            </p>

          </div>

          <p
            className="
              text-xs
              text-[#5B6B65]
              mt-2
            "
          >
            GC: {gc}
            {" • "}
            Wealth: {wealth}
            {" • "}
            Bonus: {bonus}
          </p>

        </div>

        {/* Lifetime Balance */}
        <div
          className="
            bg-[#F6FAF2]
            rounded-2xl
            p-4
          "
        >

          <p
            className="
              text-sm
              font-bold
              text-[#3c874e]
            "
          >
            Lifetime Balance
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              mt-2
            "
          >

            <Image
              src="/icons/gem2.png"
              alt="gem"
              width={36}
              height={36}
            />

            <p
              className="
                text-3xl
                font-bold
                text-[#21443B]
              "
            >
              {lifetimeBalance}
            </p>

          </div>

          <p
            className="
              text-xs
              text-[#5B6B65]
              mt-2
            "
          >
            Total gems earned
          </p>

        </div>

      </div>

      {/* Reward Breakdown */}
      <div
        className="
          bg-[#FFFDF8]
          border
          border-[#ECE6DA]
          rounded-2xl
          p-4
        "
      >

        <h3
          className="
            text-sm
            font-semibold
            text-[#5B3B2E]
            mb-3
          "
        >
          Current Week Reward Breakdown
        </h3>

        <div
          className="
            space-y-2
            text-sm
            text-[#5B6B65]
          "
        >

          <div className="flex justify-between">

            <span>
              Guild Competition
            </span>

            <span className="font-semibold">
              💎 {gc}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Guild Wealth
            </span>

            <span className="font-semibold">
              💎 {wealth}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Bonus Gems
            </span>

            <span className="font-semibold">
              💎 {bonus}
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}