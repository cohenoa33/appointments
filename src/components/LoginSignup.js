import React, { useState, useContext } from "react";
import { LanguageContext } from "../containers/Language";
import SignInUpForm from "./SignInUpForm";

function LoginSignup({ handleSignInUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const { dictionary } = useContext(LanguageContext);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "password_confirmation") {
      setPassword_confirmation(e.target.value);
    }
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
  };

  return (
    <div>
      <SignInUpForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        dictionary={dictionary}
        email={email}
        password={password}
        password_confirmation={password_confirmation}
      />
    </div>
  );
}

export default LoginSignup;
