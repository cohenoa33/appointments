import React, { useState, useEffect } from "react";
import "./App.css";

import { LanguageProvider } from "./containers/Language";
import { UserProvider } from "./containers/User";
import LanguageSelector from "./components/LanguageSelector";
import LoginSignup from "./components/LoginSignup";
import Appointments from "./components/Appointments";
import Example from "./components/Example";
import SignOut from "./components/SignOut";
import AddNew from "./components/AddNew";
import { ThemeContext, themes } from "./theme/theme-context";
import api from "./services/api";
import NewAppointment from "./components/NewAppointment";

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
  const [addNew, setAddNew] = useState(false);

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
    (user.password_confirmation
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
  const newAppointment = (appointment) => {
    let updateList = user.appointments.concat(appointment);
    setUser((prevState) => ({ ...prevState, appointments: updateList }));
    setAddNew(!addNew);
  };
  const [appointments, setAppointments] = useState(user.appointments);
  useEffect(() => {
    setAppointments(user.appointments);
  }, [user]);

  const setLogout = () => {
    setUser({});
    setJwt();
    localStorage.clear();
  };

  return (
    <LanguageProvider>
      <UserProvider user={user}>
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
              <div className="no-margin">
                <SignOut setLogout={setLogout} />
                <AddNew setAddNew={() => setAddNew(!addNew)} />
                {!addNew ? (
                  <div className="no-margin">
                    <Example />
                    <Appointments appointments={appointments} />
                  </div>
                ) : (
                  <NewAppointment
                    user={user.id}
                    newAppointment={newAppointment}
                  />
                )}
              </div>
            )}
          </div>
        </ThemeContext.Provider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
