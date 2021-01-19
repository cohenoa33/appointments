import React, { useState, useContext, useEffect } from "react";
import "./App.css";

import { LanguageProvider } from "./containers/Language";
import { userContext } from "./containers/User";
import LanguageSelector from "./components/LanguageSelector";
import LoginSignup from "./components/LoginSignup";
import Example from "./components/Example";
import { ThemeContext, themes } from "./theme/theme-context";
import api from "./services/api";

function App() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("user-lang") === "en" ||
      window.localStorage.getItem("user-lang") == null
      ? themes.light
      : themes.dark
  );

  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState(
    localStorage.token ? localStorage.token : null
  );

  useEffect(() => {
    if (localStorage.token) {
      api.auth.reauth().then((data) => {
        if (!data.message) {
          setUser(data.user);
        } else {
          alert(data.message);
        }
      });
    }
  }, []);

  const handleSignInUp = (user) => {
    let data = (user.password_confirmation
      ? api.auth.signup(user)
      : api.auth.login(user)
    ).then((data) => {
      !data.error ? handleAuthResponse(data) : alert(data.error);
    });
  };

  const handleAuthResponse = (data) => {
    !data.user ? alert(data) : (localStorage.token = data.jwt);
    setUser(data.user);
    setJwt(data.jwt);
  };
  const setLogout = () => {
    setUser({});
    setJwt();
    localStorage.clear();
  };

  console.log(jwt ? "yes" : "no", "jwt");
  console.log(user, "user");
  return (
    <userContext.Provider value={user}>
      <LanguageProvider>
        <ThemeContext.Provider value={theme}>
          <div className="container" style={theme}>
            <header id="header">
              <LanguageSelector
                changeTheme={() =>
                  setTheme(
                    window.localStorage.getItem("user-lang") === "en"
                      ? themes.light
                      : themes.dark
                  )
                }
              />
            </header>
            {!jwt ? (
              <LoginSignup handleSignInUp={handleSignInUp} />
            ) : (
              <Example setLogout={setLogout} />
            )}
          </div>
        </ThemeContext.Provider>
      </LanguageProvider>
    </userContext.Provider>
  );
}

export default App;
