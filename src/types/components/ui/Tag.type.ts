import { ReactNode } from "react";
import { BaseProps, ClickableProps } from "../../Base.type";
import { JournalCategory } from "@/types/Journal.type";

export type TagProps =
  | (Omit<BaseProps, "children"> & ClickableProps & { type: "category"; children: JournalCategory })
  | (Omit<BaseProps, "children"> & ClickableProps & { type: "tag"; children: ReactNode | string });
