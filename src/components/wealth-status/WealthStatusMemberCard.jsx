import WealthStatusTracker from "./WealthStatusTracker";

export default function WealthStatusMemberCard({
  member,
  memberDays,
  allDates
}) {

  const failCount =
    Object.values(memberDays)
      .filter(amount => amount < 70)
      .length;

  return (

    <div
      className="
        bg-white
        border
        border-[#E8E2D6]
        rounded-2xl
        p-5
        shadow-sm
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              font-semibold
              text-[#5B3B2E]
              text-lg
            "
          >
            {member.name}
          </p>

          <p
            className="
              text-sm
              text-[#8A7E74]
              mt-1
            "
          >

            {failCount === 0
              ? "Perfect Week ✨"
              : `${failCount} fails for this selected period`}

          </p>

        </div>

        <WealthStatusTracker
          memberDays={memberDays}
          allDates={allDates}
        />

      </div>

    </div>
  );
}