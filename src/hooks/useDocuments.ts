"use client";

import { useState, useCallback, useEffect } from "react";
import { DOCUMENTS_PER_LOAD } from "@/utils/constants";
import { DocumentType } from "@/types/Document.type";

export function usePaginatedDocuments<T>({ type }: { type: DocumentType }) {
  const [items, setItems] = useState<T[]>([]);
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

      const data: T[] = await res.json();
      setItems(data);
      setOffset(DOCUMENTS_PER_LOAD);
      setHasMore(data.length === DOCUMENTS_PER_LOAD);
    } finally {
      setLoading(false);
    }
  }, [apiURL, type]);

  const loadMore = useCallback(async () => {
    if (!apiURL || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiURL}/${type}?offset=${offset}&limit=${DOCUMENTS_PER_LOAD}`);
      if (!res.ok) return;

      const data: T[] = await res.json();
      setItems((prev) => [...prev, ...data]);
      setOffset((prev) => prev + DOCUMENTS_PER_LOAD);
      setHasMore(data.length === DOCUMENTS_PER_LOAD);
    } finally {
      setLoading(false);
    }
  }, [apiURL, type, offset, loading]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return { items, loadMore, hasMore, loading };
}
