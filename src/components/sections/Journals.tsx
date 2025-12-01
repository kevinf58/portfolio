"use client";

import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import TextAnimation from "../common/TextAnimation";
import { Journal } from "@/types/Document.type";
import DocumentCard from "../common/cards/DocumentCard";
import { DOCUMENTS_PER_LOAD } from "@/utils/constants";

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const loadMore = async () => {
    const res = await fetch(`${apiURL}/journal?offset=${offset}&limit=${DOCUMENTS_PER_LOAD}`);
    if (!res.ok) return;

    const data: Journal[] = await res.json();

    setJournals((prev) => [...prev, ...data]);
    setOffset((prev) => prev + DOCUMENTS_PER_LOAD);
    setHasMore(data.length === DOCUMENTS_PER_LOAD);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-2 py-20 px-6 bg-dark-gray">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Journals</span>
      </TextAnimation>

      <div className="flex flex-col w-[80rem]">
        {journals.map((journal) => (
          <TextAnimation element="div" key={journal.id}>
            <DocumentCard {...journal} />
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

export default Journals;
