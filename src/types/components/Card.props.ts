import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export type BaseCardProps = Clickable & {
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
} & BaseProps;

//TODO: OPTIONAL BASE PROPS ARE TEMPORARY. MAKE CHILDREN REQUIRED DURING DEVELOPMENT OF API
export type CardProps = Partial<BaseProps> & {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};
