"use client";

import DocumentCard from "@/components/documents/DocumentCard";
import Button from "@/components/ui/Button";
import getDocuments from "@/services/getDocuments.service";
import { DOCUMENT_TYPE, DocumentsProps } from "@/types/Document.type";
import { DOCUMENTS_LOADED_LIMIT } from "@/lib/constants";
import { useState, useEffect, useCallback } from "react";
import { Document } from "@/types/Document.type";
import { toast } from "react-toastify";

const Documents = (props: DocumentsProps) => {
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { type } = props;

  const loadDocuments = useCallback(async () => {
    try {
      if (!hasMore) return;

      setLoading(true);

      const res = await getDocuments({ type, limit: DOCUMENTS_LOADED_LIMIT, offset });

      if (res.success) {
        console.log(res.meta?.hasMore, res.meta?.limit, res.meta?.offset, res.meta?.total);
      }

      if (!res.success) {
        toast.error(res.info.message);
        throw new Error(res.info.code + " " + res.info.message);
      }

      setDocuments((prev) => [...prev, ...res.data]);

      // offset the number of documents already loaded
      if (!res.meta || (res.meta && res.meta.total <= res.meta.offset + DOCUMENTS_LOADED_LIMIT)) {
        setHasMore(false);
      }

      setOffset((prev) => prev + DOCUMENTS_LOADED_LIMIT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, offset, type]);

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <section className={`flex flex-col items-center w-full gap-2 py-20 px-6 ${props.className}`}>
      <span className="font-sans font-bold text-5xl text-tint">{type === DOCUMENT_TYPE.JOURNAL ? "Journals" : "Projects"}</span>

      {!loading && documents.length === 0 ? (
        <div>No {type === DOCUMENT_TYPE.JOURNAL ? "Journals" : "Projects"} Found.</div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          {documents
            .filter((document) => {
              if (document.type !== DOCUMENT_TYPE.JOURNAL) return true;
              if (!props.category) return true;

              return document.category === props.category;
            })
            .map((document) => (
              <DocumentCard key={`${type}-${document.id}`} {...document} />
            ))}

          {hasMore && (
            <Button onClick={loadDocuments} variant="secondary" loading={loading} className="mt-2">
              Load More
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default Documents;
