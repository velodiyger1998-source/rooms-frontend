import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import { loginRequest } from "../../api/authApi";
import { getMe } from "../../api/usersApi";
import type { User } from "../../types/user";
import type { LoginPayload } from "../../types/auth";

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = async (data: LoginPayload): Promise<User> => {
    const { accessToken } = await loginRequest(data);
    localStorage.setItem("token", accessToken);
    try {
      const me = await getMe();
      localStorage.setItem("user", JSON.stringify(me));
      setUser(me);
      return me;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
