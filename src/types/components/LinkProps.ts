import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export interface LinkProps extends Clickable, BaseProps {
  static?: boolean;
  underlined?: boolean;
}
