import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export type LinkProps = Clickable & {
  static?: boolean;
  underlined?: boolean;
} & BaseProps;
