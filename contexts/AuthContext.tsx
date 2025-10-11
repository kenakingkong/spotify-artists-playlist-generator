import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { ERRORS } from "@/lib/errors";
import { parseUserProfile } from "@/lib/spotify/parse";
import { IUser } from "@/types/user";

type TAuthContext = {
  user: IUser | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

type TAuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: TAuthProviderProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = Boolean(user);

  async function logout() {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const response = await axios.get("/api/spotify/me/profile");
        if (!isMounted) return;

        setUser(parseUserProfile(response.data.data));
        // toast success
      } catch (err) {
        if (!isMounted) return;

        console.error(err);
        setUser(null);
        // toast error
      }
    }

    if (isLoading) return;
    if (!!user) return;

    if (!user || router.query.new_session) {
      fetchUser();
    }

    if (router.query.new_session) {
      router.replace("/", undefined, { shallow: true });
    }

    return () => {
      isMounted = false;
    };
  }, [router, user, isLoading, setIsLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(ERRORS.USE_AUTH);
  }
  return context;
}
