import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export interface BaseCardProps extends Clickable, BaseProps {
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
}

export type CardState = [boolean, Dispatch<SetStateAction<boolean>>];

export interface CardProps {
  className?: string;
  state: CardState;
}
