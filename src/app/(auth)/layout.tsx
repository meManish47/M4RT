import NewUserContext from "@/components/contexts/userContext";
import HeaderComponent from "@/components/header/header";
import { getUserFromCookies } from "@/helper/helper";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserFromCookies();

  return (
    <div className="overflow-x-hidden relative">
      <NewUserContext user={user}>
        <HeaderComponent />
        <div className="pt-18">{children}</div>
      </NewUserContext>
    </div>
  );
}
