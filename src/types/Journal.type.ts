import { BaseDocument, DOCUMENT_TYPE } from "./Document.type";

type JournalCategory = "learning" | "trading" | "recruiting" | "daily" | "development";

export interface Journal extends BaseDocument {
  type: typeof DOCUMENT_TYPE.JOURNAL;
  category: JournalCategory;
}
