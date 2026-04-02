import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router";
import { api, token } from "../clients/api";

type User = {
  username: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const initialUser = token() ? { username: null } : null;

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);

    localStorage.removeItem("token");

    navigate("/");
  };

  useEffect(() => {
    async function getUser() {
      try {
        if (!token()) return;

        const { data } = await api.get("/me");

        setUser(data);
      } catch (err) {
        console.log(err);
        logout();
      }
    }

    getUser();
  }, []);

  const value = {
    user,
    setUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}

export default UserProvider;
