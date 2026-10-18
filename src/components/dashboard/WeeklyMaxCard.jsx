import { Gem} from "lucide-react";

export default function WeeklyMaxCard({}){
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
        
                      <Gem
                        size={26}
                        className="text-[#4DA6FF]"
                      />
        
                      <div>
                          <p className="font-semibold text-sm text-[#21443B]">
                            Weekly Max
                          </p>
        
                          <p className="text-sm text-[#5B6B65]">
                            6 max + Bonus Gems
                          </p>
                        </div>
                      </div>
        
                  </div>
        
    )
}
