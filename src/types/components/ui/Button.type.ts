import { BaseProps, ClickableProps, Size, Variant } from "../../Base.type";

export interface ButtonProps extends BaseProps, ClickableProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}
