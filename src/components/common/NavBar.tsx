"use client";

import Link from "./Link";
import { FaCode } from "react-icons/fa";
import { useRef } from "react";
import { useScrollFollow } from "@/hooks/useScrollFollow";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import NavBarHamburger from "./NavBarHamburger";

const NavBar = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isScrolled = useScrollFollow(scrollRef, 2);
  const scrollProgress = useScrollProgress();
  const currDeviceSize = useBreakpoint();

  return (
    <nav ref={scrollRef} className="transition-transform duration-300 ease-out">
      <div
        className={`w-full text-lg font-bold sm:px-28 px-8 pb-5 pt-7 flex items-center justify-between bg-light-black ${
          isScrolled && "shadow-primary"
        }`}
      >
        <div className="flex items-center gap-2 text-lg">
          <FaCode />
          <h1 className="text-tint">KF</h1>
        </div>
        {currDeviceSize !== "sm" && currDeviceSize !== "md" && (
          <div className="flex ml-auto gap-6 font-sans">
            <Link href={"/"}>Home</Link>
            <Link href={"projects"}>Projects</Link>
            <Link href={"/journal"}>Journal</Link>
            <Link href={"/contact"}>Contact</Link>
          </div>
        )}
        {(currDeviceSize === "sm" || currDeviceSize === "md") && <NavBarHamburger />}
      </div>
      <div
        className="h-0.5 w-min absolute bg-primary transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};

export default NavBar;
