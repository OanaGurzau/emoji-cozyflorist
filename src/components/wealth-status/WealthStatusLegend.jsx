export default function WealthStatusLegend() {

  return (
    <div
      className="
        flex
        flex-wrap
        gap-4
        text-sm
        mb-8
        text-[#5B3B2E]
      "
    >

      {/* Fail */}
      <div className="flex items-center gap-2">

        <div
          className="
            w-4
            h-4
            rounded
            bg-[#D9534F]
          "
        />

        {"<70"}

      </div>

      {/* Pass */}
      <div className="flex items-center gap-2">

        <div
          className="
            w-4
            h-4
            rounded
            bg-[#4FA36B]
          "
        />

        70 → 119

      </div>

      {/* Perfect */}
      <div className="flex items-center gap-2">

        <div
          className="
            w-4
            h-4
            rounded
            bg-[#1E6B47]
          "
        />

        120+

      </div>

      {/* Missing */}
      <div className="flex items-center gap-2">

        <div
          className="
            w-4
            h-4
            rounded
            bg-[#D9D9D9]
          "
        />

        No Data

      </div>

    </div>
  );
}