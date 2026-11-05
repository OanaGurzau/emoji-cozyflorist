"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useAdminStatus from "@/lib/useAdminStatus";

import {
  Trophy,
  Gem,
  Coins,
  Gift,
  Bell,
} from "lucide-react";

export default function DesktopSidebar() {

  const pathname = usePathname();
  const isAdmin = useAdminStatus();

  const links = [
    {
      href: "/quest-board",
      label: "Quest Board",
      icon: Bell
    },

    {
      href: "/guild-competition",
      label: "Guild Competition",
      icon: Trophy,
      adminOnly: true
    },
    {
      href: "/guild-wealth",
      label: "Guild Wealth",
      icon: Coins,
      adminOnly: true
    },
    {
      href: "/bonus-gems",
      label: "Bonus Gems",
      icon: Gift,
      adminOnly: true
    },
    {
      href: "/",
      label: "Member Rewards",
      icon: Gem,
      adminOnly: true
    }
  ];

  return (
    <aside
      className="
        hidden
        lg:flex
        w-65
        bg-[#f9f3e9]
        border-[#E8E2D6]
        border-r
        flex-col
        items-center
        pt-8
        shrink-0
      "
    >

      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Cozy Florist"
        width={170}
        height={120}
        className="object-contain"
      />

      {/* Navigation */}
      <div className="px-3 space-y-2 mt-10 w-full">

        {links.map(link => {

          if (
            link.adminOnly &&
            !isAdmin
          ) {
            return null;
          }

          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
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

              <Icon size={25} />

              {link.label}

            </Link>
          );
        })}

      </div>

      {/* Cat */}
      <div className="mt-auto relative -left-7">

        <Image
          src="/sleeping-cat.png"
          alt="Cat"
          width={400}
          height={160}
          className="object-contain"
        />

      </div>

    </aside>
  );
}