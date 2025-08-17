"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { User } from "lucide-react";
import { UserContext } from "../contexts/userContext";
import { deleteCookies } from "@/helper/helper";
export default function UserDropDown() {
  const context = useContext(UserContext);
  const user = context?.user;
  async function handleLogout() {
    await deleteCookies();
    window.location.href = "/";
  }
  return (
    <main className="h-full w-max flex justify-center items-center ">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <User
            size={28}
            color={user ? "green" : "crimson"}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent className="mt-4 me-20">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {user.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              LogOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="mt-4 me-12">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              LogIn
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              SignUp
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </main>
  );
}
