import jwtDecode from "jwt-decode";

export interface Token {
  username: string;
  email: string;
  _id: string;
  exp: number;
}
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const decodeToken = () => {
  try {
    const token = getToken();
    const decodeToken = jwtDecode(token || "");
    const updatedToken: Token = decodeToken as Token;
    return updatedToken;
  } catch (error) {
    console.log("error in decoding token");
  }
};
