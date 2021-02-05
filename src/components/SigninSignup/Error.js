import React from "react";
import { Text } from "../../containers/Language";

export default function Error({ error }) {
  const errorToPrint = (error) => {
    if (error === "Please check your password") return "checkPassword";
    if (error === "Please check your email") return "checkEmail";
    if (error === "Email has already been taken") return "emailTaken";
    if (error === "Password confirmation doesn't match Password")
      return "checkPasswordConfirmation";
  };

  return (
    <div>
      <Text tid={errorToPrint(error)} />
    </div>
  );
}
