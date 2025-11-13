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
    <nav ref={scrollRef} className="transition-transform duration-150 ease-out">
      <div
        className={`w-full text-lg font-bold sm:px-28 px-8 pb-5 pt-7 flex items-center justify-between bg-dark-gray transition-shadow duration-100 ${
          isScrolled && "shadow-default"
        }`}
      >
        <Link className="flex items-center gap-2 text-lg text-tint" href={"/"} static>
          <FaCode />
          <h1>KF</h1>
        </Link>
        {currDeviceSize !== "sm" && currDeviceSize !== "md" && (
          <div className="flex ml-auto gap-6 font-sans">
            <Link href={"project"}>Projects</Link>
            <Link href={"/journal"}>Journal</Link>
            <Link href={"/contact"}>Contact</Link>
          </div>
        )}
        {(currDeviceSize === "sm" || currDeviceSize === "md") && <NavBarHamburger />}
      </div>
      <div className="h-0.5 w-full absolute">
        <div
          className="h-0.5 bg-primary origin-left transition-transform will-change-transform duration-50 ease-out transform-gpu"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        ></div>
      </div>
    </nav>
  );
};

export default NavBar;
