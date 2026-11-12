import client from "./axiosClient";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

export const loginRequest = (data: LoginPayload): Promise<AuthResponse> =>
  client.post<AuthResponse>("/auth/login", data).then((r) => r.data);

export const registerRequest = (data: RegisterPayload): Promise<void> =>
  client.post("/users", data).then(() => undefined);