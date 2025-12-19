"use client";

import { useState, useCallback, useEffect } from "react";
import { DOCUMENTS_PER_LOAD } from "@/utils/constants";
import { DocumentType } from "@/types/Document.type";

interface PaginatedResponse<T> {
  documents: T[];
  hasMore: boolean;
}

export function usePaginatedDocuments<T>({ type }: { type: DocumentType }) {
  const [documents, setDocuments] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const loadInitial = useCallback(async () => {
    if (!apiURL) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/${type}?offset=0&limit=${DOCUMENTS_PER_LOAD}`);
      if (!res.ok) return;

      const data: PaginatedResponse<T> = await res.json();
      setDocuments(data.documents);
      setOffset(data.documents.length);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [apiURL, type]);

  const loadMore = useCallback(async () => {
    if (!apiURL || loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/${type}?offset=${offset}&limit=${DOCUMENTS_PER_LOAD}`);
      if (!res.ok) return;

      const data: PaginatedResponse<T> = await res.json();
      setDocuments((prev) => [...prev, ...data.documents]);
      setOffset((prev) => prev + data.documents.length);
      setHasMore(data.hasMore);
    } finally {
      setLoading(false);
    }
  }, [apiURL, type, offset, loading, hasMore]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return { documents, loadMore, hasMore, loading };
}
