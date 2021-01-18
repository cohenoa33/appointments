import { ThemeContext } from "../theme/theme-context";
import React, { useContext } from "react";

function ThemedButton(props) {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{ backgroundColor: theme.background, color: theme.color }}
      {...props}
    />
  );
}

export default ThemedButton;
