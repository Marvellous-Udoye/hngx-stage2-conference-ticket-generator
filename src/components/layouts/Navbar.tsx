"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HugeIcons from "../../../public/images/hugeicons_ticket-01.svg";
import Ticx from "../../../public/images/ticz.svg";

interface MenuItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const menus: MenuItem[] = [
  { label: "Events", href: "/", isActive: true },
  { label: "My Tickets", href: "/my-tickets" },
  { label: "About Project", href: "/about-project" },
];

export default function Navbar() {
  const location = usePathname();

  const isActive = (href: string) => {
    if (
      href === "/" &&
      (location === "/" || location === "/details" || location === "/checkout")
    ) {
      return true;
    }
    return location === href;
  };

  return (
    <nav
      className="max-xl:px-6 pb-6 md:pb-10 pt-5"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] w-full mx-auto px-4 py-3 flex items-center justify-between rounded-3xl border border-[#197686] bg-[rgba(5,37,44,0.40)] backdrop-blur-[2px]">
        <Link
          href="/"
          className="flex gap-2 items-center p-1.5 rounded-xl border-[#0E464F]"
          aria-label="Ticz Home"
        >
          <div
            className="border border-[#0E464F] rounded-xl bg-[#052F35]"
            aria-hidden="true"
          >
            <Image
              width={24}
              height={24}
              src={HugeIcons}
              alt="Conference Ticket logo"
              className="py-1.5 px-2 w-full h-full border-[#0E464F]"
              priority
            />
          </div>
          <Image
            width={43.79}
            height={22.62}
            src={Ticx}
            alt="Ticz Logo"
            priority
          />
        </Link>

        <ul
          className="flex items-center gap-4 max-md:hidden"
          role="menubar"
          aria-label="Main menu"
        >
          {menus.map((menu, index) => (
            <li key={index} role="none">
              <Link
                href={menu.href}
                className={`p-2.5 font-normal text-[18px] ${
                  isActive(menu.href) ? "text-white" : "text-[#B3B3B3]"
                } cursor-pointer jeju hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-[#197686] rounded-lg transition-colors`}
                role="menuitem"
                aria-current={isActive(menu.href) ? "page" : undefined}
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/my-tickets"
          className="flex items-center gap-2 py-3 md:py-4 px-4 md:x-6 uppercase font-normal text-[14px] sm:text-base leading-5 rounded-xl bg-white border border-[rgba(213,234,0,0.10)] text-[#0A0C11] jeju hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#197686] transition-colors"
        >
          <span>My tickets</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            aria-hidden="true"
            role="presentation"
            className="w-5 md:w-[18px] h-auto md:h-2"
          >
            <path
              d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5L17 4.5V3.5L1 3.5V4.5Z"
              fill="#0A0C11"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
