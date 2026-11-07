function getDayStatus(amount) {

  if (amount == null) {
    return "missing";
  }

  if (amount < 70) {
    return "fail";
  }

  if (amount >= 120) {
    return "perfect";
  }

  return "pass";
}

export default function WealthStatusTracker({
  memberDays,
  allDates
}) {



  return (

    <div className="flex gap-2 flex-wrap">

      {allDates.map(date => {

          const dayLetter =
  new Date(date)
    .toLocaleDateString("en-GB", {
      weekday: "short"
    })
    .charAt(0);


        const amount =
          memberDays[date];

        const status =
          getDayStatus(amount);

        return (

<div
  key={date}
  title={
    `${date}: ${
      amount ?? "No Data"
    }`
  }
  className={`
    w-7
    h-7
    rounded-md
    flex
    items-center
    justify-center
    text-white
    text-[10px]
    font-bold

    ${
      status === "perfect"
        ? "bg-[#1E6B47]"
        : status === "pass"
          ? "bg-[#4FA36B]"
          : status === "fail"
            ? "bg-[#D9534F]"
            : "bg-[#D9D9D9]"
    }
  `}
>

  {dayLetter}

</div>

        );
      })}

    </div>

  );
}