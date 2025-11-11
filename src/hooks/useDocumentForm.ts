import { Document } from "@/types/api/Document.type";
import { getLocalDate } from "@/utils/dateUtils";

const initialState: Document = {
  markdown: "",
  title: "",
  tags: [],
  date: getLocalDate(),
  type: "journal",
};
