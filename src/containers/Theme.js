import { createContext } from "react";

export const themes = {
  light: {
    textAlign: "left",
    direction: "ltr",
    float: "left",
  },
  dark: {
    textAlign: "right",
    direction: "rtl",
    float: "right",
  },
};

export const ThemeContext = createContext({ themes: themes.dark });
