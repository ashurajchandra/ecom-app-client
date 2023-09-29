import { createContext, Dispatch } from "react";
import { Action } from "../models";
import { Authentication } from "./Reducer";

export type AuthState = Authentication | Partial<Authentication>;

export interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<AuthContextProps>({
  state: {},
  dispatch: () => {
    // do nothing
  },
});
