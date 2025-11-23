import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";
import { DocumentType } from "@/types/Document.type";

export type ButtonVariant = "hollow" | "solid";
export type ButtonSize = "small" | "default";

export type ButtonProps = BaseProps &
  Partial<Omit<Clickable, "target">> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  };

export type DeleteButtonProps = { id: number; type: DocumentType };
