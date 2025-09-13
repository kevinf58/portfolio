import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export type ButtonProps = Partial<Omit<Clickable, "target">> & {
  type?: "hollow" | "solid";
} & BaseProps;
