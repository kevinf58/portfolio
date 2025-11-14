"use client";

import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef, type ReactNode } from "react";
import { getLocalDate } from "@/utils/dateUtils";
import type { Document } from "@/types/Document.type";
import { DocumentActions } from "@/types/Document.type";

function reducer(state: Document, action: DocumentActions): Document {
  switch (action.type) {
    case "SET_MARKDOWN":
      return { ...state, markdown: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "TOGGLE_DOC_TYPE":
      return { ...state, type: state.type === "journal" ? "project" : "journal" };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

const initialState: Document = {
  markdown: "",
  title: "",
  tags: [],
  date: getLocalDate(),
  type: "journal",
};

type DocumentFormContextValue = {
  state: Document;
  markdown: string;
  title: string;
  tags: string[];
  date: string;
  documentType: Document["type"];
  switchDocTypeLabel: "journal" | "project";

  setMarkdown: (markdown: string) => void;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  toggleDocumentType: () => void;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

const DocumentFormContext = createContext<DocumentFormContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  initial?: Partial<Document>;
};

export function DocumentFormProvider({ children, initial }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...initial });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const setMarkdown = useCallback((markdown: string) => dispatch({ type: "SET_MARKDOWN", payload: markdown }), []);
  const setTitle = useCallback((title: string) => dispatch({ type: "SET_TITLE", payload: title }), []);
  const setDate = useCallback((date: string) => dispatch({ type: "SET_DATE", payload: date }), []);
  const toggleDocumentType = useCallback(() => dispatch({ type: "TOGGLE_DOC_TYPE" }), []);

  const setTags: React.Dispatch<React.SetStateAction<string[]>> = useCallback(
    (updater) => {
      if (typeof updater === "function") {
        dispatch({
          type: "SET_TAGS",
          payload: (updater as (prev: string[]) => string[])(state.tags),
        });
      } else {
        dispatch({ type: "SET_TAGS", payload: updater });
      }
    },
    [state.tags],
  );

  const switchDocTypeLabel = useMemo<"journal" | "project">(
    () => (state.type === "journal" ? "project" : "journal"),
    [state.type],
  );

  const value = useMemo<DocumentFormContextValue>(
    () => ({
      state,
      markdown: state.markdown,
      title: state.title,
      tags: state.tags,
      date: state.date,
      documentType: state.type,
      switchDocTypeLabel,

      setMarkdown,
      setTitle,
      setDate,
      toggleDocumentType,
      setTags,

      fileInputRef,
    }),
    [state, switchDocTypeLabel, setMarkdown, setTitle, setDate, toggleDocumentType, setTags],
  );

  return <DocumentFormContext.Provider value={value}>{children}</DocumentFormContext.Provider>;
}

export function useDocumentFormContext() {
  const ctx = useContext(DocumentFormContext);
  if (!ctx) {
    throw new Error("useDocumentFormContext must be used within a DocumentFormProvider");
  }
  return ctx;
}
