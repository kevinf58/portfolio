import { RawJournalType } from "@/types/api/Journal.type";

const truncateText = (text: string, type: Exclude<keyof RawJournalType, "date">): string => {
  switch (type) {
    case "title":
      return text.length > 25 ? text.slice(0, 25) + "…" : text;
    case "markdown":
      return text.length > 55 ? text.slice(0, 55) + "…" : text;
    default:
      return "";
  }
};

export default truncateText;
