"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  ChevronDown
} from "lucide-react";

export default function Banner() {

  const [username, setUsername] =
    useState("");
  const [openDropdown, setOpenDropdown] =
  useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] =
  useState(false);

  useEffect(() => {

    async function getUser() {

      const {
        data: { session }
      } = await supabase.auth
        .getSession();

      if (session?.user?.email) {

        const name =
          session.user.email
            .split("@")[0];

        setUsername(name);
      }

      if (session?.user?.email) {

  const name =
    session.user.email
      .split("@")[0];

  setUsername(name);

  setIsLoggedIn(true);
}
    }

    getUser();

  }, []);

  async function handleLogout() {

  await supabase.auth.signOut();

  router.push("/login");

  router.refresh();
}

  return (

    <header
      className="
        relative
        h-40
        overflow-hidden
        bg-cover
        bg-[center_45%]
      "
      style={{
        backgroundImage:
          "url('/banner.png')"
      }}
    >

      {/* Profile Bubble */}
      <div
      onClick={() =>
    setOpenDropdown(prev => !prev)
  }
        className="
 absolute
  top-20
  right-4

  sm:top-24
  sm:right-6

  lg:top-5
  lg:right-6
  
  flex
          items-center
          gap-3
          bg-white/95
          rounded-full
          pl-2
          pr-4
          py-2
          shadow-md
          border
          border-[#ECE6DA]
          backdrop-blur-sm
          cursor-pointer
        "
      >

        <img
          src="/avatars/avatar1.png"
          alt="avatar"
          className="
            w-14
            h-14
            rounded-full
            object-cover
            border-4
            border-white
          "
        />

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <p
            className="
              text-lg
              font-semibold
              text-[#4B2E2B]
            "
          >
            {username} 🌸 
          </p>

          <ChevronDown
            size={18}
            className="
              text-[#7A8A73]
            "
          />

        </div>

      </div>

      {openDropdown && (

  <div
    className="
      absolute
      top-24
      right-6
      w-52
      bg-white
      border
      border-[#ECE6DA]
      rounded-2xl
      shadow-xl
      overflow-hidden
      z-50
    "
  >

{isLoggedIn ? (
    <button
       onClick={(e) => {
    e.stopPropagation();
    handleLogout();
  }}
      className="
        w-full
        text-left
        px-4
        py-3
        text-sm
        text-[#5B3B2E]
        hover:bg-[#F8F5EE]
        transition
        cursor-pointer
      "
    >
      Logout
    </button>

) : (

  <button
    onClick={(e) => {

      e.stopPropagation();

      router.push("/login");
    }}
    className="
      w-full
      text-left
      px-4
      py-3
      text-sm
      text-[#5B3B2E]
      hover:bg-[#F8F5EE]
      transition
      cursor-pointer
    "
  >
    Admin Login
  </button>
)}

  </div>

)}

    </header>

  );
}