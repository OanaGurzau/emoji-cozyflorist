import SearchBar from "@/components/dashboard/SearchBar";
import AddMemberButton from "@/components/dashboard/AddMemberButton";
import "react-datepicker/dist/react-datepicker.css";
import CurrentWeekCard from "@/components/dashboard/CurrentWeekCard";
import WeeklyMaxCard from "@/components/dashboard/WeeklyMaxCard";

export default function DashboardToolbar({selectedPeriod, periods, setPeriods, setSelectedPeriod, searchTerm, setSearchTerm, showFinalizeButton, onFinalizeWeek, onReopenWeek}) {

  return (
    <div className="flex
    flex-col
    xl:grid
    xl:grid-cols-[2fr_200px_320px]
    gap-4
    xl:gap-6
    mt-4
    w-full
    items-stretch
    xl:items-center">

      {/*left*/}
      <div className="grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-3
    gap-3">
        <CurrentWeekCard selectedPeriod={selectedPeriod} periods={periods} setPeriods={setPeriods} setSelectedPeriod={setSelectedPeriod}/>


          {/* Weekly Max */}
          <WeeklyMaxCard />

          {/*Finalize week button */}

          {showFinalizeButton && (

            selectedPeriod?.is_finalized ? (

              <div
                className="
                  bg-[#E8F6EA]
                  text-[#2E7D4F]
                  border
                  border-[#CFE8D6]
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  whitespace-nowrap
                "
              >
                ✅ Rewards Saved
                <button
                  onClick={onReopenWeek}
                  className="
                    bg-[#F4A261]
                    hover:bg-[#E58E4B]
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    font-semibold
                    transition
                    shadow-sm
                    whitespace-nowrap
                    cursor-pointer
                  "
                >
                  Reopen Week
              </button>
              </div>

            ) : (

              <button
                className="
                  bg-[#ee7e9e]
                  hover:bg-[#438B5B]
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                  shadow-sm
                  whitespace-nowrap
                  cursor-pointer
                "
                onClick={onFinalizeWeek}
              >
                Finalize Week
              </button>

            )

          )}

      </div>
     
      {/*middle*/}
      <SearchBar  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {/*right*/}
      <AddMemberButton />
    </div>


  );
}