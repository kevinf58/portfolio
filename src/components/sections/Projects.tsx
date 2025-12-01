"use client";

import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import TextAnimation from "../common/TextAnimation";
import { Project } from "@/types/Document.type";
import DocumentCard from "../common/cards/DocumentCard";
import { DOCUMENTS_PER_LOAD } from "@/utils/constants";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const loadMore = async () => {
    const res = await fetch(`${apiURL}/project?offset=${offset}&limit=${DOCUMENTS_PER_LOAD}`);
    if (!res.ok) return;

    const data: Project[] = await res.json();

    setProjects((prev) => [...prev, ...data]);
    setOffset((prev) => prev + DOCUMENTS_PER_LOAD);
    setHasMore(data.length === DOCUMENTS_PER_LOAD);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-2 pb-20">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Projects</span>
      </TextAnimation>

      <div className="flex flex-col w-[80rem]">
        {projects.map((project) => (
          <TextAnimation element="div" key={project.id}>
            <DocumentCard {...project} />
          </TextAnimation>
        ))}
      </div>

      {hasMore && (
        <Button onClick={loadMore} variant="hollow">
          Load More
        </Button>
      )}
    </section>
  );
};

export default Projects;
