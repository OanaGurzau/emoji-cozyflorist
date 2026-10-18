import {
  Gem,
  Sprout,
  Trophy,
  Leaf,
  CalendarDays
} from "lucide-react";

function RewardKeyRow({
  category,
  requirement,
  gems
}) {

  return (
    <div
      className="
        grid
        grid-cols-[90px_1fr_70px]
        text-sm
        border-t
        border-[#F1EBDD]
        bg-white
      "
    >

      {/* Category */}
      <div
        className="
          px-4
          py-3
          bg-[#FFF8EE]
          border-r
          border-[#F1EBDD]
          font-medium
          text-[#8A5A1E]
        "
      >
        {category}
      </div>

      {/* Requirement */}
      <div
        className="
          px-4
          py-3
          border-r
          border-[#F1EBDD]
          text-[#5B6B65]
        "
      >
        {requirement}
      </div>

      {/* Gems */}
      <div
        className="
          px-4
          py-3
          text-center
          font-semibold
          text-[#0a395c]
        "
      >
        {gems}
      </div>

    </div>
  );
}

function RewardRow({
  icon,
  title,
  subtitle,
  gems
}) {

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[#F1EBDD]
        px-4
        py-3
        bg-[#FFFEFB]
      "
    >

      <div className="flex items-start gap-3">

        <div
          className="
            w-8
            h-8
            rounded-full
            bg-[#F8F5EE]
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          {icon}
        </div>

        <div>

          <p
            className="
              text-sm
              font-semibold
              text-[#21443B]
            "
          >
            {title}
          </p>

          <p
            className="
              text-xs
              text-[#7A8A73]
              mt-1
            "
          >
            {subtitle}
          </p>

        </div>

      </div>

      <span
        className="
          text-sm
          font-bold
          text-[#0a395c]
        "
      >
        {gems}
      </span>

    </div>
  );
}

function RoutineStep({
  number,
  text
}) {

  return (
    <div className="flex items-center gap-3">

      <div
        className="
          w-8
          h-8
          rounded-full
          bg-[#4FA36B]
          text-white
          flex
          items-center
          justify-center
          text-sm
          font-bold
          shrink-0
        "
      >
        {number}
      </div>

      <p
        className="
          text-sm
          text-[#5B6B65]
        "
      >
        {text}
      </p>

    </div>

  )
};


export default function RulesPanel() {

  return (
    <div className="space-y-4">

      {/* Rewards Key */}
      <section
        className="
          bg-white
          border
          border-[#ECE6DA]
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        {/* Header */}
        <div
          className="
            flex
            items-center
            gap-2
            px-5
            py-4
            bg-[#FFF8EE]
            border-b
            border-[#F3E8D7]
          "
        >

          <Gem
            size={20}
            className="text-[#4DA6FF]"
          />

          <h3
            className="
              text-lg
              font-bold
              text-[#5B3B2E]
            "
          >
            Rewards Key
          </h3>

        </div>

        {/* Table */}
        <div className="p-4">

          {/* Header */}
          <div
            className="
              grid
              grid-cols-[90px_1fr_70px]
              bg-[#E7F1DD]
              text-[#3c874e]
              text-sm
              font-semibold
              rounded-t-xl
              border
              border-[#E5E0D6]
              overflow-hidden
            "
          >

            <div
              className="
                px-4
                py-3
                border-r
                border-[#DCE8CF]
              "
            >
              Category
            </div>

            <div
              className="
                px-4
                py-3
                border-r
                border-[#DCE8CF]
              "
            >
              Points
            </div>

            <div className="px-4 py-3 text-center">
              Gems
            </div>

          </div>

          {/* Rows */}
          <div
            className="
              border-x
              border-b
              border-[#E5E0D6]
              rounded-b-xl
              overflow-hidden
            "
          >

            <RewardKeyRow
              category="GC"
              requirement="500–999 points"
              gems="1 💎"
            />

            <RewardKeyRow
              category="GC"
              requirement="1000+ points"
              gems="3 💎"
            />

            <RewardKeyRow
              category="Wealth"
              requirement="70–119 every day"
              gems="1 💎"
            />

            <RewardKeyRow
              category="Wealth"
              requirement="120+ every day"
              gems="3 💎"
            />

          </div>

        </div>

      </section>

      {/* Eligibility */}
<section
  className="
    bg-white
    border
    border-[#ECE6DA]
    rounded-2xl
    shadow-sm
    overflow-hidden
  "
>

  {/* Header */}
  <div
    className="
      flex
      items-center
      gap-2
      px-5
      py-4
      bg-[#F6FAF2]
      border-b
      border-[#E3EED7]
    "
  >

    <Leaf
      size={20}
      className="text-[#4FA36B]"
    />

    <h3
      className="
        text-lg
        font-bold
        text-[#5B3B2E]
      "
    >
      Eligibility
    </h3>

  </div>

  {/* Content */}
  <div className="p-5">

    <ul
      className="
        space-y-3
        text-sm
        text-[#5B6B65]
      "
    >

      <li className="flex gap-2">
        <span className="text-[#4FA36B]">
          •
        </span>

        Waiting members earn 0 💎
        until eligible.
      </li>

      <li className="flex gap-2">
        <span className="text-[#4FA36B]">
          •
        </span>

        Discord is required for
        Member Rewards.
      </li>

      <li className="flex gap-2">
        <span className="text-[#4FA36B]">
          •
        </span>

        Gems are account-specific
        and cannot be transferred.
      </li>

      <li className="flex gap-2">
        <span className="text-[#4FA36B]">
          •
        </span>

        Leaving the guild removes
        reward access.
      </li>

    </ul>

  </div>

</section>

{/* Weekly Routine */}
<section
  className="
    bg-white
    border
    border-[#ECE6DA]
    rounded-2xl
    shadow-sm
    overflow-hidden
  "
>

  {/* Header */}
  <div
    className="
      flex
      items-center
      gap-2
      px-5
      py-4
      bg-[#F7F4EE]
      border-b
      border-[#ECE3D6]
    "
  >

    <CalendarDays
      size={20}
      className="text-[#A07B52]"
    />

    <h3
      className="
        text-lg
        font-bold
        text-[#5B3B2E]
      "
    >
      Weekly Routine
    </h3>

  </div>

  {/* Steps */}
  <div className="p-5 space-y-4">

    <RoutineStep
      number="1"
      text="
        Record Guild Competition
        scores
      "
    />

    <RoutineStep
      number="2"
      text="
        Record Guild Wealth
        contributions
      "
    />

    <RoutineStep
      number="3"
      text="
        Add bonus gems if needed
      "
    />

    <RoutineStep
      number="4"
      text="
        Finalize weekly rewards
      "
    />

  </div>

</section>

    </div>
  );
};