import { BaseDocument, DOCUMENT_TYPE } from "./Document.type";

export type JournalCategory = "learning" | "trading" | "recruiting" | "daily" | "development";

export const JOURNAL_CATEGORY = {
  LEARNING: "learning",
  TRADING: "trading",
  RECRUITING: "recruiting",
  DAILY: "daily",
  DEVELOPMENT: "development",
} as const;

export interface Journal extends BaseDocument {
  type: typeof DOCUMENT_TYPE.JOURNAL;
  category: JournalCategory;
}
