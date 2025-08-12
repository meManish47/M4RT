"use client";

import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { ModeToggle } from "../ui/mode-toogle";
import UserDropDown from "./userdropdown";

export default function HeaderComponent() {
  const { user } = useContext(UserContext);
  return (
    <header className="w-full h-18 flex items-center px-4 sm:px-30  fixed justify-between z-10">
      <h1 className="font-bold  text-xl sm:font-extrabold sm:text-3xl tracking-wide">
        M<span className="text-[#8E51FF]">4</span>RT
      </h1>

      <div className="w-max flex gap-2">
        <UserDropDown/>
        <ModeToggle />
      </div>
    </header>
  );
}
