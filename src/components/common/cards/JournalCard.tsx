import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import { State } from "@/types/State";
import { useState } from "react";
import Tag from "../Tag";

const JournalCard = (props: State) => {
  const [blurred, setBlurred] = props.state;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Card
      href=""
      className={`!w-60 group transition-discrete duration-150 ${!isFocused && blurred ? "brightness-70" : ""}`}
      onMouseEnter={() => {
        setBlurred(true);
        setIsFocused(true);
      }}
      onMouseLeave={() => {
        setBlurred(false);
        setIsFocused(false);
      }}
    >
      <div className="mx-4 my-5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-4">
            <h3 className="font-sans font-bold text-2xl text-1.5xl leading-7">My Journal #28</h3>
            <FiArrowUpRight
              size={20}
              className="-translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5 duration-200"
            />
          </div>
          <h6 className="font-serif text-xs text-white/50 mb-5">Tuesday, April 21, 2024</h6>
          <p className="font-serif text-xs">This is a description...</p>
          <div className="flex flex-wrap space-x-2.5 space-y-2 font-sans text-xs mt-3">
            <Tag>TypeScript</Tag>
            <Tag>React</Tag>
            <Tag>Tailwind CSS</Tag>
          </div>
          <div className="flex items-center text-xs font-sans gap-1 mt-1">
            <FaTag />
            <h6>General</h6>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JournalCard;
