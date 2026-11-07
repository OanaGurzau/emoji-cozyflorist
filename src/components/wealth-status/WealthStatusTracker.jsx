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

    <div className="flex flex-wrap gap-2">

      {allDates.map(date => {

        const amount =
          memberDays[date];

        const status =
          getDayStatus(amount);

        const parsedDate =
          new Date(date);

        const dayLetter =
          parsedDate
            .toLocaleDateString(
              "en-GB",
              {
                weekday: "short"
              }
            )
            .charAt(0);

        const dayNumber =
          parsedDate.getDate();

        return (

          <div
            key={date}
            className="
              flex
              flex-col
              items-center
              gap-1
            "
          >

            {/* Day */}
            <span
              className="
                text-[9px]
                text-[#B7AEA4]
                font-medium
                uppercase
                leading-none
              "
            >
              {dayLetter}
            </span>

            {/* Date */}
            <span
              className="
                text-[10px]
                text-[#B7AEA4]
                font-bold
                leading-none
              "
            >
              {dayNumber}
            </span>

            {/* Value */}
            <div
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
                text-[11px]
                font-semibold

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

              {amount != null
                ? amount
                : ""}

            </div>

          </div>

        );
      })}

    </div>

  );
}