import React, { useState, useContext } from "react";
import { LanguageContext } from "../../containers/Language";
import SignInUpForm from "./SignInUpForm";

function LoginSignup({ handleSignInUp, error }) {
  const initialState = {
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [{ email, password, password_confirmation }, setState] = useState(
    initialState
  );

  const clearState = () => {
    setState({ ...initialState });
  };
  const { dictionary } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = password_confirmation
      ? {
          email: email.toLowerCase(),
          password: password,
          password_confirmation: password_confirmation,
        }
      : { email: email.toLowerCase(), password: password };
    handleSignInUp(user);
    clearState();
  };
  return (
    <div className="login-signup">
      <SignInUpForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        dictionary={dictionary}
        email={email}
        error={error}
        password={password}
        password_confirmation={password_confirmation}
      />
    </div>
  );
}

export default LoginSignup;
