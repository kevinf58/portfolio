"use client";

import Link from "@/components/common/Link";
import { PiMapPinSimpleFill } from "react-icons/pi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { SiTypescript, SiReact, SiPython, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import JournalEntries from "@/components/sections/JournalEntries";
import Projects from "@/components/sections/Projects";
import Tag from "@/components/common/Tag";

export default function Home() {
  return (
    <>
      <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-default">
        <div className="2xl:w-[40%] xl:w-[55%] lg:w-[60%] md:w-[80%] w-full sm:px-28 px-6">
          <div className="flex items-end">
            <h1 className="sm:text-7xl text-5xl font-bold text-tint">Kevin Feng</h1>
          </div>
          <div className="flex sm:flex-row sm:items-center sm:justify-start flex-col justify-center mb-16">
            <div className="flex items-center gap-1.5 whitespace-nowrap font-serif">
              Toronto, ON
              <PiMapPinSimpleFill />
            </div>
          </div>
          <span className="font-serif sm:text-3xl text-2xl">
            Computer Science Student @ The University of Western Ontario
          </span>
          <ul className="flex flex-col space-y-1 mt-10 text-sm">
            <li>
              <Link href={"https://ca.linkedin.com/"} target="_blank">
                <FaLinkedin className="h-full" />
                <span>https://ca.linkedin.com/</span>
              </Link>
            </li>
            <li>
              <Link href={"https://github.com/"} target="_blank">
                <FaGithub className="h-full" />
                <span>https://github.com/</span>
              </Link>
            </li>
            <li>
              <Link href={"kevinfng12@gmail.com"} target="_blank">
                <IoMailSharp className="h-full" />
                <span>kevinfng12@gmail.com</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap group w-full absolute bottom-6 sm:px-28 px-6 font-sans text-xs gap-4">
          <Tag>
            <SiTypescript color="#2F6CB4" />
            <span>TypeScript</span>
          </Tag>
          <Tag>
            <SiReact color="#66DBFB" />
            <span>React</span>
          </Tag>
          <Tag>
            <SiPython />
            <span>Python</span>
          </Tag>
          <Tag>
            <SiTailwindcss color="#3FBFF8" />
            <span>Tailwind CSS</span>
          </Tag>
          <Tag>
            <SiNextdotjs color="#080808" />
            <span>Next JS</span>
          </Tag>
        </div>
      </section>
      <section
        className="w-full flex lg:flex-row lg:items-start items-center flex-col sm:gap-40 gap-24 sm:px-28 px-6 py-32 bg-black shadow-default"
        id="scroll"
      >
        <JournalEntries />
        <Projects />
      </section>
      {/* <section className='h-screen w-full bg-green-300' /> */}
    </>
  );
}
