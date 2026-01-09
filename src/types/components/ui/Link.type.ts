import { BaseProps, ClickableProps } from "../../Base.type";

export interface LinkProps extends BaseProps, ClickableProps {
  href: string;
  target?: "_blank" | "_self";
  static?: boolean;
  underlined?: boolean;
}
