import axios from "axios";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { ERRORS } from "@/lib/errors";
import { parseUserProfile } from "@/lib/spotify/parse";
import { IUser } from "@/types/user";
import useFetch from "@/hooks/useFetch";

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

  const { data, isLoading, error, mutate } = useFetch(
    "/api/spotify/me/profile"
  );

  const user = data?.data ? parseUserProfile(data?.data) : null;
  const isAuthenticated = Boolean(user);

  async function logout() {
    try {
      await axios.get("/api/auth/logout");
      mutate(null, { revalidate: false });
    } catch (err) {
      console.error(err);
      // toast
    }
  }

  useEffect(() => {
    if (isLoading || error) return;

    if (!user || router.query.new_session) {
      mutate();
    }

    if (router.query.new_session) {
      router.replace("/", undefined, { shallow: true });
    }
  }, [router, user, isLoading]);

  useEffect(() => {
    if (error) {
      // toast
    }
  }, [error]);

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
