import { Url } from "next/dist/shared/lib/router/router";

export interface Clickable {
  disabled?: boolean;
  href: Url;
  title?: string;
  target?: string;
  onClick?: () => void;
}
