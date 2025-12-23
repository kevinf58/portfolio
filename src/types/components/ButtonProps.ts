import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export type ButtonVariant = "hollow" | "solid";
export type ButtonSize = "small" | "default";

export type ButtonProps = BaseProps &
  Partial<Omit<Clickable, "target">> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  };
