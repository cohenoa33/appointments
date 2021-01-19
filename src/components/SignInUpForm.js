import React, { useState } from "react";

export default function SignInUpForm({
  handleSubmit,
  handleChange,
  dictionary,
  email,
  password,
  password_confirmation,
}) {
  const [toggle, setToggle] = useState(true);

  const emailInput = (
    <input
      autoComplete="on"
      onChange={handleChange}
      type="text"
      value={email}
      name="email"
      placeholder={dictionary.email}
    />
  );
  const passwordInput = (
    <input
      onChange={handleChange}
      type="password"
      value={password}
      name="password"
      placeholder={dictionary.password}
    />
  );
  const passwordConfInput = (
    <input
      onChange={handleChange}
      type="password"
      value={password_confirmation}
      name="password_confirmation"
      placeholder={dictionary.passwordConfirmation}
    />
  );

  return (
    <div>
      {toggle ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {emailInput}
            <br />
            {passwordInput}
            <br />
            <button type="submit" color="primary" size="lg">
              {dictionary.login}
            </button>
            <br />
            <a onClick={() => setToggle(false)}>{dictionary.changeToSignup}</a>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {emailInput}
            <br />
            {passwordInput}
            <br />
            {passwordConfInput}
            <br />
            <button type="submit" color="primary" size="lg">
              {dictionary.signup}
            </button>
            <br />
            <a onClick={() => setToggle(true)}>{dictionary.changeToLogin}</a>
          </form>
        </div>
      )}
    </div>
  );
}
