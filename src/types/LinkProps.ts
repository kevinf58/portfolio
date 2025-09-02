import { SharedProps } from "./SharedProps";

export type LinkProps = {
  disabled?: boolean;
  href: string;
  underlined?: boolean;
  title?: string;
  target?: string;
  onClick?: () => void;
} & SharedProps;
