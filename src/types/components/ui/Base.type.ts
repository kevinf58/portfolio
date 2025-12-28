export type Variant = "primary" | "secondary";

export type Size = "sm" | "md" | "lg";

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export interface ClickableProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}
