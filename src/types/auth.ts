export interface LoginPayload {
  email: string;
  password: string;
}

export type RegisterPayload = LoginPayload;

export interface AuthResponse {
  accessToken: string;
}
