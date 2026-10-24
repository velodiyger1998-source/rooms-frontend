import client from "./axiosClient";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth";

export const loginRequest = (data: LoginPayload): Promise<AuthResponse> =>
  client.post<AuthResponse>("/auth/login", data).then((r) => r.data);

export const registerRequest = (data: RegisterPayload): Promise<AuthResponse> =>
  client.post<AuthResponse>("/auth/register", data).then((r) => r.data);