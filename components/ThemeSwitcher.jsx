"use client";

import LightTheme from "@/icons/LightTheme";
import DarkTheme from "@/icons/DarkTheme";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };


  return (
    <div>
      {resolvedTheme === "dark" ? (
        <div onClick={toggleTheme}>
          <LightTheme />
        </div>
      ) : (
        <div onClick={toggleTheme}>
          <DarkTheme />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
