import React from "react";
import { Text } from "../../containers/Language";

export default function Error({ error }) {
  const errorToPrint = (error) => {
    // errors for login
    if (typeof error === "string") {
      if (error === "Please check your password") return "checkPassword";
      if (error === "Please check your email") return "checkEmail";
      else {
        return "checkEmailPassword";
      }
    }
    // errors for signup
    if (error.length > 0) {
      if (error.includes("Email has already been taken")) return "emailTaken";
      if (error.includes("Password is invalid")) return "invalidPassword";
      if (error.includes("Password confirmation doesn't match Password"))
        return "checkPasswordConfirmation";
    }
    return "error";
  };

  return (
    <div>
      <Text tid={errorToPrint(error)} />
    </div>
  );
}
