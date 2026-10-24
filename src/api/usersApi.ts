import client from "./axiosClient";
import type { User } from "../types/user";

export const getMe = (): Promise<User> =>
  client.get<User>("/users/me").then((r) => r.data);