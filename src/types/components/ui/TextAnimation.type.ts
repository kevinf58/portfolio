import { BaseProps } from "../../Base.type";
import { JSX } from "react";

export interface TextAnimationProps extends BaseProps {
  element: keyof JSX.IntrinsicElements;
}
