import {Gem, X} from "lucide-react";
import Image from "next/image";
import {avatars} from "@/lib/avatars";

export default function MemberHeader({
    selectedMember,
    setSelectedMember,
    calculateBalance
}){
    return(
        <>
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-full bg-[#F7E7F1] flex items-center justify-center text-2xl ">
                  🌸
                </div>

                <div className="flex items-center gap-2">

                  <h2 className="text-2xl font-bold text-[#204B3B]">
                    {selectedMember.name}
                  </h2>

                  <span className=" inline-flex items-center gap-1 bg-[#DDECCF] text-[#4FA36B] text-xs px-3 py-1 rounded-full 
                  font-medium " >
                    Eligible
                  </span>

                </div>

              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="
                  text-[#7A8B83]
                  hover:bg-[#F5F5F5]
                  p-2
                  rounded-full
                  transition
                "
              >
                <X size={18} />
              </button>

            </div>     

            <div className=" bg-[#FDF1F6] rounded-2xl p-4 border border-[#F5DCE8] " > 
                
                {/*Pink Banner*/}

                  <div className="flex items-center gap-4">

                    <div className=" w-16 h-16 rounded-full bg-white flex items-center justify-center text-4xl " > 
                        <Image src={ avatars[ selectedMember.id % avatars.length ] } alt="avatar" width={64} 
                        height={64} className="rounded-full"
                    />

                    </div>
                    
                    <div>

                      <h3 className="text-xl font-bold text-[#21443B]">
                        {selectedMember.name}
                      </h3>
                      <p className="text-sm text-[#5B6B65]"> Member since: {new Date(selectedMember.join_date).toLocaleDateString("en-GB")} </p>

                        <div className="flex items-center gap-1 text-sm text-[#5B6B65]">
                            <span>Current Balance:</span>
                            <span className="font-bold">
                                {calculateBalance(selectedMember.id)}
                            </span>
                            <Gem size={14} className="text-[#3B82F6] fill-[#93C5FD]" strokeWidth={2} />
                       </div>
                    </div>
                </div>
            </div>

            </>        
    );
}
