import { createContext, useContext } from "react";
import type { User } from "../../types/user";
import type { LoginPayload } from "../../types/auth";


export interface AuthContextValue {
  user: User | null;
  login: (data: LoginPayload) => Promise<User>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextValue | null>(null);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться строго внутри AuthProvider");
  }
  return context;
};
