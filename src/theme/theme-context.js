import React, { createContext } from "react";

export const themes = {
  light: {
    background: "gold",
    textAlign: "right",
    color: "#222222",
  },
  dark: {
    background: "#222222",
    color: "gold",
    textAlign: "left",
  },
};

export const ThemeContext = createContext({ themes: themes.dark });
