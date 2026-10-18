import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {CalendarDays} from "lucide-react";


export default function CurrentWeekCard({selectedPeriod, periods, setPeriods, setSelectedPeriod }) {
    return(
          <div
            className="
              bg-white
              border
              border-[#E8E2D6]
              rounded-2xl
              px-4
              py-3
              shadow-sm
            "
          >

              <div className="flex items-center gap-3">
                <CalendarDays
                  size={26}
                  className="text-[#4FA36B]"
                />
                <div>

                  <p className="font-semibold text-sm text-[#21443B]">
                    Current Week
                  </p>

                  <div className="text-sm text-[#5B6B65]">
                    <DatePicker
                        selected={
                          selectedPeriod
                            ? new Date(selectedPeriod.week_start)
                            : null
                        }

                        onChange={async (date) => {

                          const selected = new Date(date);

                          const day = selected.getDay();

                          const normalizedDay = day === 0 ? 7 : day;

                          // Monday
                          const monday = new Date(selected);

                          monday.setDate(
                            selected.getDate() - (normalizedDay - 1)
                          );

                          // Sunday
                          const sunday = new Date(monday);

                          sunday.setDate(monday.getDate() + 6);

                          const mondayString =
                            monday.toISOString().split("T")[0];

                          const sundayString =
                            sunday.toISOString().split("T")[0];

                          const matchingPeriod = periods.find(
                            p =>
                              p.week_start === mondayString &&
                              p.week_end === sundayString
                          );

                          if (matchingPeriod) {

                              setSelectedPeriod(matchingPeriod);

                            } else {


                              const { data, error } = await supabase
                                .from("reward_periods")
                                .insert({
                                  week_start: mondayString,
                                  week_end: sundayString,
                                  is_active: false
                                })
                                .select()
                                .single();
                                console.log(data);
                                console.log(error);     


                              setPeriods(prev => [data, ...prev]);

                              setSelectedPeriod(data);
                              console.log("NEW PERIOD", data);
                            }

                        }}



                          calendarStartDay={1}

                          dayClassName={(date) => {

                            if (!selectedPeriod) return "";

                            const start = new Date(selectedPeriod.week_start);
                            const end = new Date(selectedPeriod.week_end);

                            if (date >= start && date <= end) {
                              return "week-highlight";
                            }

                            return "";
                          }}

                          customInput={
                            <div
                              className="
                                text-sm
                                text-[#5B6B65]
                                cursor-pointer
                              "
                            >

                              {selectedPeriod?.week_start}
                              {" — "}
                              {selectedPeriod?.week_end}

                            </div>
                          }
                        />                      
                  </div>
                </div>
            </div>
          </div>

    );
}