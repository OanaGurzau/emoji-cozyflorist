"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
  Trophy,
  Gem,
  Coins,
  Gift,
  Menu,
  X
} from "lucide-react";

export default function MobileSidebar() {

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/guild-competition",
      label: "Guild Competition",
      icon: Trophy
    },
    {
      href: "/guild-wealth",
      label: "Guild Wealth",
      icon: Coins
    },
    {
      href: "/bonus-gems",
      label: "Bonus Gems",
      icon: Gift
    },
    {
      href: "/",
      label: "Member Rewards",
      icon: Gem
    }
  ];

  return (
    <>
      {/* TOP BAR */}
      <div
        className="
          md:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          h-16
          bg-[#f9f3e9]
          border-b
          border-[#E8E2D6]
          flex
          items-center
          justify-between
          px-4
        "
      >

        <Image
          src="/logo.png"
          alt="Cozy Florist"
          width={110}
          height={40}
          className="object-contain"
        />

        <button
          onClick={() => setOpen(true)}
          className="
            p-2
            rounded-xl
            hover:bg-[#EEF7E8]
            transition
          "
        >
          <Menu size={28} />
        </button>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="
            md:hidden
            fixed
            inset-0
            bg-black/40
            z-40
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`
          md:hidden
          fixed
          top-0
          left-0
          z-50
          h-full
          w-72
          bg-[#f9f3e9]
          border-r
          border-[#E8E2D6]
          transform
          transition-transform
          duration-300
          flex
          flex-col

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            p-4
            border-b
            border-[#E8E2D6]
          "
        >

          <Image
            src="/logo.png"
            alt="Cozy Florist"
            width={120}
            height={50}
            className="object-contain"
          />

          <button
            onClick={() => setOpen(false)}
            className="
              p-2
              rounded-xl
              hover:bg-[#EEF7E8]
              transition
            "
          >
            <X size={24} />
          </button>

        </div>

        {/* Navigation */}
        <div className="px-3 space-y-2 mt-6">

          {links.map(link => {

            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3.5
                  rounded-2xl
                  transition
                  font-bold
                  text-[#673f3a]

                  ${
                    pathname === link.href
                      ? "bg-[#DDECCF] text-[#21443B]"
                      : "hover:bg-[#EEF7E8]"
                  }
                `}
              >

                <Icon size={24} />

                {link.label}

              </Link>
            );
          })}

        </div>

        {/* Cat */}
        <div className="mt-auto relative -left-5">

          <Image
            src="/sleeping-cat.png"
            alt="Cat"
            width={260}
            height={120}
            className="object-contain"
          />

        </div>

      </aside>
    </>
  );
}