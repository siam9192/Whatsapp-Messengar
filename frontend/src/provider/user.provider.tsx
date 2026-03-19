"use client";
import { clearCookie, getMe, setCookie } from "@/services/auth.service";
import { User } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => void;
  logout: () => void;
  refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // reusable fetch function
  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getMe();

      if (result?.data) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Fetch user failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (token: string) => {
    await setCookie(token);
    refetchUser();
  };

  const logout = async () => {
    setUser(null);
    await clearCookie();
  };

  // 🔥 refetch method
  const refetchUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        login,
        logout,
        refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// custom hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export default UserProvider;
