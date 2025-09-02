import { useState } from "react";
import ProjectCard from "../common/cards/ProjectCard";

const Projects = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="w-1/3">
      <h2 className="font-sans font-bold text-4xl text-tint">Featured Projects</h2>
      <div className="w-1/3 h-[3px] bg-primary mt-1" />
      <p className="mt-8 mb-12 font-serif">
        These are a few that I’m particularly proud of. Each of the cards below offers a closer look at my development
        journey - sharing the reasoning behind my decisions, any challenges I encountered, and the lessons I learned
        throughout the process of building each project.
      </p>
      <div className="flex flex-wrap gap-y-4 gap-x-6">
        <ProjectCard state={[isFocused, setIsFocused]} />
        <ProjectCard state={[isFocused, setIsFocused]} />
        <ProjectCard state={[isFocused, setIsFocused]} />
        <ProjectCard state={[isFocused, setIsFocused]} />
        <ProjectCard state={[isFocused, setIsFocused]} />
        <ProjectCard state={[isFocused, setIsFocused]} />
      </div>
    </section>
  );
};

export default Projects;
