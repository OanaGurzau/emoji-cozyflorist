import { Search } from "lucide-react";

export default function SearchBar({searchTerm, setSearchTerm}) {
    return(
                <div
          className="
            flex
            items-center
            gap-2
            bg-white
            border
            border-[#E8E2D6]
            rounded-2xl
            px-4
            py-3
            shadow-sm
          "
        >

          <Search
              size={16}
              className="text-[#7A8B83]"
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search member..."
              className="
                bg-transparent
                outline-none
                text-sm
                w-full
              "
            />

        </div>
    )
}