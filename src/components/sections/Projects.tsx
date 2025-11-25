"use client";

import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import TextAnimation from "../common/TextAnimation";
import { Project } from "@/types/Document.type";
import DocumentCard from "../common/cards/DocumentCard";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const fetchProjects = async () => {
      const res = await fetch(`${apiURL}/project`);
      if (res.ok) {
        const data: Project[] = await res.json();
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-2">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Projects</span>
      </TextAnimation>
      {/* <TextAnimation className="text-base text-center lg:w-1/3 sm:w-3/4" element="p">
        Each of the cards below offers a closer look at my development journey - sharing the reasoning behind my
        decisions, any challenges I encountered, and the lessons I learned throughout the process of building each
        project!
      </TextAnimation> */}
      <div className="flex flex-col w-[80rem]">
        {projects.map((project) => (
          <TextAnimation element="div" key={project.id}>
            <DocumentCard
              id={project.id}
              title={project.title}
              date={project.date}
              tags={project.tags}
              markdown={project.markdown}
              type={project.type}
              imagePreviewLink={project.imagePreviewLink}
            />
          </TextAnimation>
        ))}
      </div>
      <Button href={"/journal"} variant="hollow">
        Read More
        <MdKeyboardArrowRight className="lg:group-hover:translate-x-0.5 transition-transform duration-150 ease-in" />
      </Button>
    </section>
  );
};

export default Projects;
