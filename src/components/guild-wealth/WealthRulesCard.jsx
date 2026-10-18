import { Gem, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function WealthRulesCard() {

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

      <div className="flex items-center gap-2 mb-4">

        <Gem
          size={20}
          className="text-[#4DA6FF]"
        />

        <h3 className="font-bold text-[#673f3a]">
          Guild Wealth Rules
        </h3>

      </div>

      <div className="space-y-3">

        {/* 70-119 */}
        <div
          className="
            border
            border-[#DDECCF]
            rounded-2xl
            p-4
            bg-[#F6FAF2]
          "
        >

          <div className="flex items-center gap-4">

            <Image
              src="/icons/gem2.png"
              alt="gem"
              width={46}
              height={46}
            />

            <div>

              <p className="font-semibold text-[#21443B]">
                70–119 every day
              </p>

              <div className="flex items-center gap-2 mt-2">

                <span className="text-[#7A8B83]">
                  →
                </span>

                <span className="font-bold text-[#0a395c]">
                  1 💎
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* 120+ */}
        <div
          className="
            border
            border-[#DDECCF]
            rounded-2xl
            p-4
            bg-[#F6FAF2]
          "
        >

          <div className="flex items-center gap-4">

            <Image
              src="/icons/gem2.png"
              alt="gem"
              width={46}
              height={46}
            />

            <div>

              <p className="font-semibold text-[#21443B]">
                120+ every day
              </p>

              <div className="flex items-center gap-2 mt-2">

                <span className="text-[#7A8B83]">
                  →
                </span>

                <span className="font-bold text-[#0a395c]">
                  3 💎💎💎
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Important Rules */}
        <div
          className="
            border
            border-[#F4D8D8]
            rounded-2xl
            p-4
            bg-[#FFF7F7]
          "
        >

          <div className="flex items-start gap-3">

            <ShieldCheck
              size={36}
              className="
                text-[#C05673]
                mt-0.5
                shrink-0
              "
            />

            <div
              className="
                text-sm
                text-[#6B4B4B]
                space-y-2
              "
            >

              <p>
                Contributions must be made
                every day of the rewards
                period.
              </p>

              <p>
                If any day is missed or
                falls below 70, no wealth
                gems are awarded.
              </p>

              <p>
                Only the highest tier
                applies.
              </p>

            </div>

          </div>

        </div>

        {/* Max Gems */}
        <div
          className="
            rounded-2xl
            bg-[#EAF4FF]
            border
            border-[#CFE3FF]
            p-4
          "
        >

          <p
            className="
              text-sm
              font-semibold
              text-[#245C9E]
            "
          >
            Maximum 6 regular gems per
            rewards period
          </p>

          <p
            className="
              text-sm
              text-[#4A6B91]
              mt-1
            "
          >
            3 Guild Competition + 3 Guild
            Wealth
          </p>

        </div>

      </div>

    </div>
  );
}