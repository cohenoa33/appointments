import React, { useState, useEffect } from "react";
import "./App.css";

import { LanguageProvider } from "./containers/Language";
import { UserProvider } from "./containers/User";
import LanguageSelector from "./components/Header/LanguageSelector";
import LoginSignup from "./components/SigninSignup/LoginSignup";
import Appointments from "./components/Appointments/Appointments";
import Title from "./components/Appointments/Title";
import SignOut from "./components/Navbar/SignOut";
import Navbar from "./components/Navbar/Navbar";
import AddNewButton from "./components/Navbar/AddNewButton";
import Footer from "./components/Footer/Footer";
import { ThemeContext, themes } from "./containers/Theme";
import api from "./services/api";
import NewAppointment from "./components/Appointments/NewAppointment";

function App() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("user-lang") === "en" ||
      window.localStorage.getItem("user-lang") == null
      ? themes.ltr
      : themes.rtl
  );

  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState(
    localStorage.token ? localStorage.token : null
  );
  const [addNew, setAddNew] = useState(false);
  const [error, setError] = useState();
  const [footer, setFooter] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      api.auth.reauth().then((data) => {
        if (!data.message) {
          setUser(data.user);
        } else {
          debugger;
          setError(data.message);
        }
      });
    }
  }, []);

  const handleSignInUp = (user) => {
    (user.password_confirmation
      ? api.auth.signup(user)
      : api.auth.login(user)
    ).then((data) => {
      !data.error ? handleAuthResponse(data) : setError(data.error);
    });
  };

  const handleAuthResponse = (data) => {
    !data.user ? alert(data) : (localStorage.token = data.jwt);
    setUser(data.user);
    setJwt(data.jwt);
    setError();
  };
  const addNewAppointment = (appointment) => {
    const updateList = user.appointments.concat(appointment);
    setUser((prevState) => ({ ...prevState, appointments: updateList }));
    setAddNew(!addNew);
  };
  const updateAppointmentsList = (appointment, action) => {
    let id = typeof appointment === "number" ? appointment : appointment.id;
    let filteredList = user.appointments.filter((a) => a.id !== id);
    let updateList =
      action === "edit" ? filteredList.concat(appointment) : filteredList;
    setUser((prevState) => ({ ...prevState, appointments: updateList }));
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

  const renderLanguages = () => (
    <LanguageSelector
      changeTheme={() =>
        setTheme(
          window.localStorage.getItem("user-lang") === "en"
            ? themes.ltr
            : themes.rtl
        )
      }
    />
  );

  const renderLoginSignup = () => (
    <LoginSignup handleSignInUp={handleSignInUp} error={error} />
  );

  const renderAddNewButton = () => (
    <AddNewButton setAddNew={() => setAddNew(!addNew)} />
  );
  const renderSignUp = () => <SignOut setLogout={setLogout} />;

  return (
    <LanguageProvider>
      <UserProvider user={user}>
        <ThemeContext.Provider value={theme}>
          <div className="container" style={theme}>
            <Navbar
              jwt={jwt}
              renderLanguages={renderLanguages}
              renderAddNewButton={renderAddNewButton}
              renderSignUp={renderSignUp}
            />
            {!jwt ? (
              renderLoginSignup()
            ) : (
              <div className="content">
                {!addNew ? (
                  <div>
                    <Title />
                    <Appointments
                      appointments={appointments}
                      updateAppointmentsList={updateAppointmentsList}
                    />
                  </div>
                ) : (
                  <NewAppointment
                    user={user.id}
                    addNewAppointment={addNewAppointment}
                    addNew={addNew}
                    setAddNew={setAddNew}
                  />
                )}
              </div>
            )}
            {footer ? <Footer /> : null}
          </div>
        </ThemeContext.Provider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
