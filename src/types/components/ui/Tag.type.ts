import { BaseProps } from "./Base.type";

export interface TagProps extends BaseProps {
  label: string;
  onClick?: () => void;
}
