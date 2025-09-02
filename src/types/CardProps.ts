import { MouseEventHandler, ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
};
