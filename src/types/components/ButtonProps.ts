import { BaseProps } from "./Base.type";
import { Clickable } from "./Clickable.type";

export type ButtonProps = Omit<Clickable, "href" | "target"> & BaseProps;
