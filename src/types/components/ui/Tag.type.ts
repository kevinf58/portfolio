import { BaseProps, ClickableProps } from "./Base.type";
import { JournalCategory } from "@/types/Journal.type";

export type TagProps =
  | (BaseProps & ClickableProps & { type: "category"; children: JournalCategory })
  | (BaseProps & ClickableProps & { type: "tag"; children: string });
