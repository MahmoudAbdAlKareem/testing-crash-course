import axios from "axios";
const sharedUrl = `https://api.realworld.io/api`;
export interface User {
  username: string;
  email: string;
  token: string;
  bio: string;
}

export type Errors = Record<string, string[]>;

export interface SignUpBody {
  email: string;
  password: string;
  username: string;
}

export function signUp(body: SignUpBody): Promise<User | Errors[]> {
  return axios.post(`${sharedUrl}/users`, { user: body });
}
