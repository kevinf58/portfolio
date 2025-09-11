import { Dispatch, SetStateAction } from "react";

export type State = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};
