"use client";

import React from "react";
import TextAnimation from "../common/TextAnimation";
import DocumentCard from "../common/cards/DocumentCard";
import { Button } from "../common/Button";
import { usePaginatedDocuments } from "@/hooks/useDocuments";
import { Project } from "@/types/Document.type";

const MemoizedDocumentCard = React.memo(DocumentCard);

const Projects = () => {
  const {
    documents: projects,
    loadMore,
    hasMore,
    loading,
  } = usePaginatedDocuments<Project>({
    type: "project",
  });

  return (
    <section className="flex flex-col items-center w-full gap-2 pb-20">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Projects</span>
      </TextAnimation>

      <div className="flex flex-col w-full max-w-6xl mx-auto gap-4">
        {projects.map((project) => (
          <TextAnimation element="div" key={project.id}>
            <MemoizedDocumentCard {...project} />
          </TextAnimation>
        ))}
      </div>

      {hasMore && (
        <Button onClick={loadMore} variant="hollow" disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </section>
  );
};

export default Projects;
