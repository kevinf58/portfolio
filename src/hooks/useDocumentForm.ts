import { DocumentPayload, DOCUMENT_TYPE, DocumentType, Document } from "@/types/Document.type";
import {
  BaseFormContextValue,
  DOCUMENT_MODE,
  DocumentModeState,
  DocumentDraftActions,
  EditorActions,
  FormContextValue,
  JournalFormContextValue,
  ProjectFormContextValue,
} from "@/types/DocumentForm.type";
import { JournalCategory } from "@/types/Journal.type";
import emptyState from "@/utils/emptyState";
import excludeDocumentID from "@/utils/excludeDocumentID";
import { createContext, useCallback, useContext, useMemo, useReducer, useRef } from "react";

//TODO: CONSIDER KEEPING A LOADING STATE HERE SO THAT WHEN EXPENSIVE COMPUTATIONS EXIST LIKE IMAGE UPLOADS, DOCUMENT CREATION REQUESTS, ETC, BUTTONS & INPUTS CAN DISABLE
//TODO: UPDATE THIS CONTEXT LATER ACCOMODATE AN EDITING FUNCTIONALITY AND ALLOW PROPS TO BE PASSED INSTEAD OF AN EMPTY INITIALSTATE
const documentDraftReducer = (state: DocumentPayload, action: DocumentDraftActions): DocumentPayload => {
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
      return emptyState(action.payload);
    default:
      return state;
  }
};

const editReducer = (state: DocumentModeState, action: EditorActions): DocumentModeState => {
  switch (action.type) {
    case "START_CREATE":
      return {
        mode: DOCUMENT_MODE.CREATE,
        draft: emptyState(action.payload),
      };

    case "START_EDIT":
      return {
        mode: DOCUMENT_MODE.EDIT,
        original: action.payload,
        draft: excludeDocumentID(action.payload),
      };

    case "UPDATE_DRAFT":
      return {
        ...state,
        draft: documentDraftReducer(state.draft, action.payload),
      };

    default:
      return state;
  }
};

export const DocumentFormContext = createContext<FormContextValue | null>(null);

export const useDocumentForm = (initialState: DocumentModeState) => {
  const [state, dispatch] = useReducer(editReducer, initialState);

  const imageInputPreviewRef = useRef<HTMLInputElement>(null);

  const toggleDocumentType = useCallback(() => dispatch({ type: "UPDATE_DRAFT", payload: { type: "TOGGLE_DOCUMENT_TYPE" } }), []);
  const setTitle = useCallback((title: string) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_TITLE", payload: title } }), []);
  const setDate = useCallback((date: string) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_DATE", payload: date } }), []);
  const setTags = useCallback((tags: string[]) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_TAGS", payload: tags } }), []);
  const setContent = useCallback(
    (content: string) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_CONTENT", payload: content } }),
    []
  );
  const resetFields = useCallback(
    (type: DocumentType) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "RESET", payload: type } }),
    []
  );

  // conditionals based on document type
  const setCategory = useCallback(
    (category: JournalCategory) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_CATEGORY", payload: category } }),
    []
  );
  const setImagePreview = useCallback(
    (imagePreview: string) => dispatch({ type: "UPDATE_DRAFT", payload: { type: "SET_IMAGE_PREVIEW", payload: imagePreview } }),
    []
  );

  const startEdit = useCallback((document: Document) => dispatch({ type: "START_EDIT", payload: document }), []);
  const startCreate = useCallback((type: DocumentType) => dispatch({ type: "START_CREATE", payload: type }), []);

  const contextValue: FormContextValue = useMemo(() => {
    const { mode, draft } = state;

    const base: BaseFormContextValue = {
      title: draft.title,
      date: draft.createdAt,
      tags: draft.tags,
      content: draft.content,
      toggleDocumentType,
      setTitle,
      setDate,
      setTags,
      setContent,
      resetFields,

      startEdit,
      startCreate,
    };

    // journal document handling
    if (draft.type === DOCUMENT_TYPE.JOURNAL) {
      const journalValue: JournalFormContextValue = {
        ...base,
        type: DOCUMENT_TYPE.JOURNAL,
        category: draft.category,
        setCategory,
      };

      if (mode === DOCUMENT_MODE.EDIT) {
        const { original } = state;
        return { ...journalValue, mode, draft, original };
      }

      return { ...journalValue, mode: DOCUMENT_MODE.CREATE, draft };
    }

    // project document handling
    const projectValue: ProjectFormContextValue = {
      ...base,
      type: DOCUMENT_TYPE.PROJECT,
      imagePreview: draft.imagePreview || "",
      setImagePreview,
      imageInputPreviewRef,
    };

    if (mode === DOCUMENT_MODE.EDIT) {
      const { original } = state;
      return { ...projectValue, mode, draft, original };
    }

    return { ...projectValue, mode: DOCUMENT_MODE.CREATE, draft };
  }, [
    state,
    toggleDocumentType,
    setTitle,
    setDate,
    setCategory,
    setImagePreview,
    setTags,
    setContent,
    resetFields,
    startEdit,
    startCreate,
  ]);

  return contextValue;
};

export const useDocumentFormContext = () => {
  const context = useContext(DocumentFormContext);
  if (!context) throw new Error("useDocumentFormContext is out of scope and must be used within a DocumentFormProvider");
  return context;
};
