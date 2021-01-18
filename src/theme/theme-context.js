import React, { createContext } from "react";

export const themes = {
  light: {
    background: "gold",
    textAlign: "left",
    color: "#222222",
    direction: "ltr",
    float: "left",
  },
  dark: {
    background: "#222222",
    color: "gold",
    textAlign: "right",
    direction: "rtl",
    float: "right",
  },
};

export const ThemeContext = createContext({ themes: themes.dark });
