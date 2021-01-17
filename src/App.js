import React, { useState } from "react";
import "./App.css";

import { LanguageProvider } from "./containers/Language";
import LanguageSelector from "./components/LanguageSelector";
import Example from "./components/Example";
import { ThemeContext, themes } from "./theme/theme-context";
import ThemedButton from "./components/ThemedButton";

function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
}

function App() {
  const [theme, setTheme] = useState(themes.dark);

  return (
    <LanguageProvider>
      <ThemeContext.Provider value={theme}>
        <div className="container" style={{ textAlign: theme.textAlign }}>
          <header id="header">
            <LanguageSelector />
            <Toolbar
              changeTheme={() =>
                setTheme(theme === themes.dark ? themes.light : themes.dark)
              }
            />
          </header>

          <Example />
        </div>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
}

export default App;
