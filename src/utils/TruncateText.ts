import { Document } from "@/types/api/Document.type";

const truncateText = (text: string, type: Exclude<keyof Document, "date">): string => {
  switch (type) {
    case "title":
      return text.length > 25 ? text.slice(0, 25) + "…" : text;
    case "markdown":
      return text.length > 60 ? text.slice(0, 90) + "…" : text;
    default:
      return "";
  }
};

export default truncateText;
