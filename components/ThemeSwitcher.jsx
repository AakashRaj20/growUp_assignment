"use client";

import LightTheme from "@/icons/LightTheme";
import DarkTheme from "@/icons/DarkTheme";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [themedata, setThemeData] = useState(theme);

  const fetchTheme = async () => {
    try {
      const response = await axios.get(
        "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
      );
      setThemeData(response.data.theme);
      //console.log(response.data.theme);
      return response.data;
    } catch (error) {}
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    fetchTheme();
    setTheme("light");
    console.log(resolvedTheme);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleTheme = () => {
    setTheme(resolvedTheme === themedata ? "light" : "dark");
  };
  console.log(typeof resolvedTheme);
  console.log(themedata);
  console.log(resolvedTheme === "dark");
  return (
    <div>
      {resolvedTheme === "dark" ? (
        <LightTheme onClick={toggleTheme} />
      ) : (
        <DarkTheme onClick={toggleTheme} />
      )}
    </div>
  );
};

export default ThemeSwitch;
