import { Gem } from "lucide-react";
import Image from "next/image";

export default function CompetitionRulesCard() {

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
                    Rewards
                </h3>

            </div>

            <div className="space-y-3">

                {/* 500-999 */}
                <div
                    className="
            border
            border-[#f2cfcf]
            rounded-2xl
            p-4
            bg-[#fff4ed]
          "
                >

                    <div className="flex items-center gap-4">

                        {/* Left Icon */}
                        <div
                            className="
                flex
                items-center
                justify-center
            "
                        >

                            <Image
                                src="/icons/gem2.png"
                                alt="gem"
                                width={46}
                                height={46}
                            />

                        </div>

                        {/* Right Content */}
                        <div>

                            <p className="font-semibold text-[#21443B]">
                                500–999 points
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

                {/* 1000+ */}
                {/* 1000+ */}
                <div
                    className="
                    border
                    border-[#f2cfcf]
                    rounded-2xl
                    p-4
                    bg-[#fff4ed]
                "
                >

                    <div className="flex items-center gap-4">

                        {/* Left Icon */}
                        <div
                            className="
        flex
        items-center
        justify-center
      "
                        >

                            <Image
                                src="/icons/gem2.png"
                                alt="gem"
                                width={46}
                                height={46}
                            />

                        </div>

                        {/* Right Content */}
                        <div>

                            <p className="font-semibold text-[#21443B]">
                                1000+ points
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
            </div>
        </div>
    );
}