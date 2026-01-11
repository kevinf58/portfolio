import { BaseDocument, DOCUMENT_TYPE } from "./Document.type";

export type JournalCategory = "learning" | "trading" | "recruiting" | "daily" | "development";

export const JOURNAL_CATEGORY = {
  LEARNING: "learning",
  TRADING: "trading",
  RECRUITING: "recruiting",
  DAILY: "daily",
  DEVELOPMENT: "development",
} as const;

export const VISIBILITY_VALUES = {
  PUBLIC: "public",
  PRIVATE: "private",
} as const;

export type Visibility = (typeof VISIBILITY_VALUES)[keyof typeof VISIBILITY_VALUES];

export interface Journal extends BaseDocument {
  type: typeof DOCUMENT_TYPE.JOURNAL;
  category: JournalCategory;
  visibility: Visibility;
}
