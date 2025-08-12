"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Switch } from "../animate-ui/radix/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = React.useState(theme === "dark");

  React.useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleChange = (value: boolean) => {
    setChecked(value);
    setTheme(value ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      {/* <Sun className="h-4 w-4" /> */}
      <Switch
        thumbIcon={
          checked ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />
        }
        checked={checked}
        onCheckedChange={handleChange}
        id="theme-switch"
      />
      {/* <Moon className="h-4 w-4" /> */}
    </div>
  );
}
