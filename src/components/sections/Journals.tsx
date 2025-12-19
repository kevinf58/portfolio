"use client";

import React from "react";
import TextAnimation from "../common/TextAnimation";
import DocumentCard from "../common/cards/DocumentCard";
import { Button } from "../common/Button";
import { usePaginatedDocuments } from "@/hooks/useDocuments";
import { Journal } from "@/types/Document.type";

const MemoizedDocumentCard = React.memo(DocumentCard);

const Journals = () => {
  const {
    documents: journals,
    loadMore,
    hasMore,
    loading,
  } = usePaginatedDocuments<Journal>({
    type: "journal",
  });

  return (
    <section className="flex flex-col items-center w-full gap-2 py-20 px-6 bg-dark-gray">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Journals</span>
      </TextAnimation>

      <div className="flex flex-col w-full max-w-6xl mx-auto gap-4">
        {journals.map((journal) => (
          <TextAnimation element="div" key={journal.id}>
            <MemoizedDocumentCard {...journal} />
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

export default Journals;
