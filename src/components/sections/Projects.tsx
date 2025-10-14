"use client";

import { useState } from "react";
import ProjectCard from "../common/cards/ProjectCard";
import { Button } from "../common/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import TextAnimation from "../common/TextAnimation";

const Projects = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="lg:w-1/3 sm:w-3/4 w-full">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-4xl text-tint">Featured Projects</span>
        <div className="w-1/3 h-[3px] bg-primary mt-1" />
      </TextAnimation>
      <TextAnimation className="mt-8 mb-12 font-serif" element="p">
        These are a few that I’m particularly proud of. Each of the cards below offers a closer look at my development
        journey - sharing the reasoning behind my decisions, any challenges I encountered, and the lessons I learned
        throughout the process of building each project.
      </TextAnimation>
      <div className="flex flex-wrap gap-y-4 gap-x-6 md:justify-start justify-center">
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <TextAnimation element="div">
          <ProjectCard state={[isFocused, setIsFocused]} />
        </TextAnimation>
        <Button href={"/projects"} type="hollow">
          Read More
          <MdKeyboardArrowRight className="lg:group-hover:translate-x-0.5 transition-transform duration-150 ease-in" />
        </Button>
      </div>
    </section>
  );
};

export default Projects;
