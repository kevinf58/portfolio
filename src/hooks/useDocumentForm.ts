import { CreateDocumentPayload, DOCUMENT_TYPE, DocumentType } from "@/types/Document.type";
import { DocumentFormActions, DocumentFormContextValue } from "@/types/DocumentForm.type";
import { JournalCategory } from "@/types/Journal.type";
import { getLocalDate } from "@/utils/dateUtils";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const initialState = (type: DocumentType): CreateDocumentPayload =>
  type === DOCUMENT_TYPE.JOURNAL
    ? {
        type: DOCUMENT_TYPE.JOURNAL,
        title: "",
        createdAt: getLocalDate(),
        updatedAt: getLocalDate(),
        content: "",
        tags: [],
        category: "daily",
      }
    : {
        type: DOCUMENT_TYPE.PROJECT,
        title: "",
        createdAt: getLocalDate(),
        updatedAt: getLocalDate(),
        content: "",
        tags: [],
        imagePreview: "",
      };

const documentFormReducer = (state: CreateDocumentPayload, action: DocumentFormActions): CreateDocumentPayload => {
  switch (action.type) {
    case "TOGGLE_DOCUMENT_TYPE":
      return state.type === DOCUMENT_TYPE.JOURNAL
        ? {
            type: DOCUMENT_TYPE.PROJECT,
            title: state.title,
            createdAt: state.createdAt,
            updatedAt: state.updatedAt,
            content: state.content,
            tags: state.tags,
            imagePreview: "",
          }
        : {
            type: DOCUMENT_TYPE.JOURNAL,
            title: state.title,
            createdAt: state.createdAt,
            updatedAt: state.updatedAt,
            content: state.content,
            tags: state.tags,
            category: "daily",
          };
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        createdAt: action.payload,
        updatedAt: action.payload,
      };
    case "SET_CATEGORY":
      if (state.type !== DOCUMENT_TYPE.JOURNAL) {
        return state;
      }
      return {
        ...state,
        category: action.payload,
      };
    case "SET_IMAGE_PREVIEW":
      if (state.type !== DOCUMENT_TYPE.PROJECT) {
        return state;
      }
      return {
        ...state,
        imagePreview: action.payload,
      };
    case "SET_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    case "RESET":
      return initialState(action.payload);
    default:
      return state;
  }
};

export const DocumentFormContext = createContext<DocumentFormContextValue | null>(null);

export const useDocumentForm = (initialType: DocumentType) => {
  const [state, dispatch] = useReducer(documentFormReducer, initialState(initialType));

  const toggleDocumentType = useCallback(() => dispatch({ type: "TOGGLE_DOCUMENT_TYPE" }), []);
  const setTitle = useCallback((title: string) => dispatch({ type: "SET_TITLE", payload: title }), []);
  const setDate = useCallback((date: string) => dispatch({ type: "SET_DATE", payload: date }), []);
  const setCategory = useCallback((category: JournalCategory) => dispatch({ type: "SET_CATEGORY", payload: category }), []);
  const setImagePreview = useCallback((imagePreview: string) => dispatch({ type: "SET_IMAGE_PREVIEW", payload: imagePreview }), []);
  const setTags = useCallback((tags: string[]) => dispatch({ type: "SET_TAGS", payload: tags }), []);
  const setContent = useCallback((content: string) => dispatch({ type: "SET_CONTENT", payload: content }), []);
  const resetFields = useCallback((type: DocumentType) => dispatch({ type: "RESET", payload: type }), []);

  const contextValue: DocumentFormContextValue = useMemo(() => {
    if (state.type === DOCUMENT_TYPE.JOURNAL) {
      return {
        type: state.type,
        title: state.title,
        date: state.createdAt,
        category: state.category,
        tags: state.tags,
        content: state.content,
        state,
        toggleDocumentType,
        setTitle,
        setDate,
        setCategory,
        setTags,
        setContent,
        resetFields,
      };
    } else {
      return {
        type: state.type,
        title: state.title,
        date: state.createdAt,
        imagePreview: state.imagePreview,
        tags: state.tags,
        content: state.content,
        state,
        toggleDocumentType,
        setTitle,
        setDate,
        setImagePreview,
        setTags,
        setContent,
        resetFields,
      };
    }
  }, [state, toggleDocumentType, setTitle, setDate, setCategory, setImagePreview, setTags, setContent, resetFields]);

  return contextValue;
};

export const useDocumentFormContext = () => {
  const context = useContext(DocumentFormContext);
  if (!context) throw new Error("useDocumentFormContext must be used within a DocumentFormProvider");
  return context;
};
