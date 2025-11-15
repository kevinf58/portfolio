import type { MouseEvent } from "react";

export interface Clickable {
  disabled?: boolean;
  href?: string | URL;
  title?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}
