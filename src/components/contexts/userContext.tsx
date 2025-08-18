"use client";
import { createContext, useState, useEffect } from "react";
import { User } from "../../../generated/prisma";

export const UserContext = createContext<{
  user: User | null;
  refreshUser: () => Promise<void>; // function to refresh user after login/logout
}>({
  user: null,
  refreshUser: async () => {},
});

export default function NewUserContext({
  children,
  user: initialUser,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  // Function to call the API route
  async function refreshUser() {
    try {
      const res = await fetch("/api/current-user", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch (err) {
      setUser(null);
    }
  }

  // (Optional) Auto-refresh on mount (useful after login without reload)
  useEffect(() => {
    if (!user) refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}
