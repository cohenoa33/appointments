import { createContext } from "react";

export const themes = {
  ltr: {
    textAlign: "left",
    direction: "ltr",
    float: "left",
  },
  rtl: {
    textAlign: "right",
    direction: "rtl",
    float: "right",
  },
};

export const ThemeContext = createContext({ themes: themes.rtl });
