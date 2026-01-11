import { BaseProps } from "@/types/Base.type";

type Element = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "ul" | "ol" | "li";

export interface TextAnimationProps extends BaseProps {
  element: Element;
  delay?: number;
  replay?: boolean;
}
