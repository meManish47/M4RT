"use client";
import { createContext } from "react";
import { User } from "../../../generated/prisma";

export const UserContext = createContext<{
  user: User|null;
}>({ user: null });

export default function NewUserContext({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: User | null;
}>) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
