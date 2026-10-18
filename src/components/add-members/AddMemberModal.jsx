"use client";

import {
  User,
  CalendarDays,
  ShieldCheck,
  Gem,
  X
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddMemberModal({
  open,
  onClose
}) {


    const [name, setName] =
    useState("");

    const [joiningDate, setJoiningDate] =
    useState("");

    const [status, setStatus] =
    useState("Waiting Period");

    const [startBalance, setStartBalance] =
    useState(0);

    const [error, setError] =
    useState("");

    const [loading, setLoading] =
    useState(false);

    if (!open) return null;

    async function handleAddMember() {

      setError("");

      if (!name.trim()) {

        setError("Member name is required.");

        return;
      }

      if (!joiningDate) {

        setError("Joining date is required.");

        return;
      }

      setLoading(true);

      try {

        // CHECK EXISTING MEMBER
        const { data: existingMember } =
          await supabase
            .from("members")
            .select("id")
            .ilike("name", name.trim())
            .maybeSingle();

        if (existingMember) {

          setError(
            "A member with this name already exists."
          );

          return;
        }

        // INSERT MEMBER
        const { error: insertError } =
          await supabase
            .from("members")
            .insert({
              name: name.trim(),
              join_date: joiningDate,
              status,
              balance: startBalance
            });

        if (insertError) {

          setError(
            "Failed to add member."
          );

          return;
        }

        // RESET FORM
        handleClose();
      } finally {

        setLoading(false);

      }
    }

    function handleClose() {
      setName("");
      setJoiningDate("");
      setStatus("Waiting Period");
      setStartBalance(0);
      setError("");
      onClose();
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
        backdrop-blur-sm
        p-4
      "
    >

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          bg-[#FFFDF8]
          border
          border-[#ECE6DA]
          rounded-[32px]
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          overflow-hidden
        "
      >

        {/* Close */}
        <button
          onClick={handleClose}
          className="
            absolute
            top-5
            right-5
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-[#E7E0D2]
            flex
            items-center
            justify-center
            text-[#7A6A58]
            hover:bg-[#F8F5EE]
            transition
            cursor-pointer
          "
        >

          <X size={20} />

        </button>

        {/* Header */}
        <div
          className="
            px-10
            pt-10
            pb-6
            border-b
            border-[#F1EBDD]
          "
        >

          <h2
            className="
              text-4xl
              font-bold
              text-[#5B3B2E]
            "
          >
            Add Member
          </h2>

          <p
            className="
              mt-2
              text-[#7A8A73]
              text-base
            "
          >
            Add a new member to your guild ✨
          </p>

        </div>

        {/* Form */}
        <div className="px-10 py-8 space-y-6">

          {/* Name */}
          <div>

            <label
              className="
                flex
                items-center
                gap-2
                text-[#5B3B2E]
                font-semibold
                mb-3
              "
            >

              <User
                size={18}
                className="text-[#4FA36B]"
              />

              Name

            </label>

            <input
              type="text"
              placeholder="Enter member name"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-[#E6DFD2]
                bg-white
                px-5
                outline-none
                text-[#5B3B2E]
                placeholder:text-[#B7AEA4]
                focus:border-[#4FA36B]
                transition
              "
              value={name}
              onChange={(e) =>
              setName(e.target.value)
                }
            />

          </div>

          {/* Joining Date */}
          <div>

            <label
              className="
                flex
                items-center
                gap-2
                text-[#5B3B2E]
                font-semibold
                mb-3
              "
            >

              <CalendarDays
                size={18}
                className="text-[#4FA36B]"
              />

              Joining Date

            </label>

            <input
              type="date"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-[#E6DFD2]
                bg-white
                px-5
                outline-none
                text-[#5B3B2E]
                focus:border-[#4FA36B]
                transition
              "
                value={joiningDate}
                onChange={(e) =>
                setJoiningDate(e.target.value)
                }
            />

          </div>

          {/* Status */}
          <div>

            <label
              className="
                flex
                items-center
                gap-2
                text-[#5B3B2E]
                font-semibold
                mb-3
              "
            >

              <ShieldCheck
                size={18}
                className="text-[#4FA36B]"
              />

              Status

            </label>

            <select
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-[#E6DFD2]
                bg-white
                px-5
                outline-none
                text-[#5B3B2E]
                focus:border-[#4FA36B]
                transition
              "
                value={status}
                onChange={(e) =>
                setStatus(e.target.value)
                }
            >

              <option>
                Waiting Period
              </option>

              <option>
                Eligible
              </option>

              <option>
                Discord Required
              </option>

            </select>

          </div>

          {/* Start Balance */}
          <div>

            <label
              className="
                flex
                items-center
                gap-2
                text-[#5B3B2E]
                font-semibold
                mb-3
              "
            >

              <Gem
                size={18}
                className="text-[#4FA36B]"
              />

              Start Balance

            </label>

            <input
              type="number"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-[#E6DFD2]
                bg-white
                px-5
                outline-none
                text-[#5B3B2E]
                focus:border-[#4FA36B]
                transition
              "
                value={startBalance}
                onChange={(e) =>
                setStartBalance(
                    Number(e.target.value)
                )
                }
            />

          </div>

        </div>

          {error && (

            <p
              className="
                px-10
                pb-4
                text-sm
                text-[#C05673]
                font-medium
              "
            >
              {error}
            </p>

          )}
        {/* Footer */}
        <div
          className="
            px-10
            pb-10
            flex
            items-center
            justify-end
            gap-4
          "
        >

          <button
            onClick={handleClose}
            className="
              h-14
              px-8
              rounded-2xl
              border
              border-[#E6DFD2]
              bg-white
              text-[#6B5B4D]
              font-semibold
              hover:bg-[#F8F5EE]
              transition
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            className="
              h-14
              px-10
              rounded-2xl
              bg-[#4FA36B]
              hover:bg-[#438B5B]
              text-white
              font-semibold
              shadow-sm
              transition
              cursor-pointer
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            onClick={handleAddMember}
            disabled={loading}
            
          >
            {loading ? "Adding..." : "Add Member"}
          </button>

        </div>

      </div>

    </div>
  );
}