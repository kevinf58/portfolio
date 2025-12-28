"use client";

import DocumentCard from "@/components/DocumentCard";
import Button from "@/components/ui/Button";
import { getDocuments } from "@/services/getDocuments.service";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { DOCUMENTS_LOADED_LIMIT } from "@/utils/constants";
import { useState, useEffect, useCallback } from "react";
import { Document } from "@/types/Document.type";

const Journals = () => {
  const [journals, setJournals] = useState<Array<Document>>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadJournals = useCallback(async () => {
    try {
      if (!hasMore) return;

      setLoading(true);

      const res = await getDocuments({ type: DOCUMENT_TYPE.JOURNAL, limit: DOCUMENTS_LOADED_LIMIT, offset });

      if (!res.success) {
        throw new Error(res.info.code + " " + res.info.message);
      }

      setJournals((prev) => [...prev, ...res.data]);
      console.log(res.meta);

      if (res.meta && res.meta.total <= res.meta.offset + DOCUMENTS_LOADED_LIMIT) {
        setHasMore(false);
      }

      setOffset((prev) => prev + DOCUMENTS_LOADED_LIMIT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, offset]);

  useEffect(() => {
    loadJournals();
  }, []);

  return !journals || journals.length === 0 ? (
    <div>No Journals Found.</div>
  ) : (
    <section className="flex flex-col items-center w-full gap-2 py-20 px-6 bg-dark-gray">
      <span className="font-sans font-bold text-5xl text-tint">Journals</span>

      <div className="flex flex-col w-full max-w-6xl mx-auto">
        {journals.map((journal) => (
          <DocumentCard {...journal} key={journal.id} />
        ))}
      </div>

      {hasMore && (
        <Button onClick={loadJournals} variant="secondary" loading={loading}>
          {"Load More"}
        </Button>
      )}
    </section>
  );
};

export default Journals;
