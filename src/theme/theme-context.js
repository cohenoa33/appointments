import React from "react";

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

export const ThemeContext = React.createContext(
  themes.dark // default value
);
