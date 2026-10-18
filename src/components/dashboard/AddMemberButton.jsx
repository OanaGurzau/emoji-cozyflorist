"use client";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import AddMemberModal from"@/components/add-members/AddMemberModal";

export default function AddMemberButton() {
  const [openAddMember, setOpenAddMember] =
  useState(false);

  return (
          <div className="flex justify-end">
              <button
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#4FA36B]
              hover:bg-[#438B5B]
              text-white
              px-5
              py-3
              rounded-2xl
              font-semibold
              transition
              shadow-sm
              cursor-pointer
            "
            onClick={() =>
            setOpenAddMember(true)
          }
          >

            <UserPlus size={16} />

            Add Member

          </button>
          <AddMemberModal
            open={openAddMember}
            onClose={() =>
              setOpenAddMember(false)
            }
          />

        </div>
  );
}