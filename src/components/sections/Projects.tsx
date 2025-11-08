"use client";

import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import TextAnimation from "../common/TextAnimation";
import { Project } from "@/types/api/Document.type";
import DocumentCard from "../common/cards/DocumentCard";

const Projects = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${apiURL}/project`);
      if (res.ok) {
        const data: Project[] = await res.json();
        const formattedData = data.map((project) => ({
          ...project,
          date: new Date(project.date),
        }));

        setProjects(formattedData);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="lg:w-1/3 sm:w-3/4 w-full">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-4xl text-tint">Hobby Projects</span>
        <div className="w-1/3 h-[3px] bg-primary mt-1" />
      </TextAnimation>
      <TextAnimation className="mt-8 mb-12 font-serif" element="p">
        These are a few that I’m particularly proud of. Each of the cards below offers a closer look at my development
        journey - sharing the reasoning behind my decisions, any challenges I encountered, and the lessons I learned
        throughout the process of building each project.
      </TextAnimation>
      <div className="flex flex-col space-y-4 md:items-start items-center">
        {projects.map((project) => (
          <TextAnimation element="div" key={project.id}>
            <DocumentCard
              state={[isFocused, setIsFocused]}
              id={project.id}
              title={project.title}
              date={project.date}
              tags={project.tags}
              markdown={project.markdown}
              type={project.type}
            />
          </TextAnimation>
        ))}
        <Button href={"/journal"} type="hollow">
          Read More
          <MdKeyboardArrowRight className="lg:group-hover:translate-x-0.5 transition-transform duration-150 ease-in" />
        </Button>
      </div>
    </section>
  );
};

export default Projects;
