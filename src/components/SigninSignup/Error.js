import React from "react";
import { Text } from "../../containers/Language";

export default function Error({ error }) {
  const errorToPrint = (error) => {
    // debugger;
    console.log(typeof error);
    if (typeof error === "string") {
      return error === "Please check your password"
        ? "checkPassword"
        : "checkEmail";
    }
    if (typeof error === "object") {
      if (error.length === 1) {
        return error[0] === "Email has already been taken"
          ? "emailTaken"
          : "checkPasswordConfirmation";
      }
      if (error.length === 2) {
        return "emailTaken";
      }
    }

    return "error";
  };

  return (
    <div>
      <Text tid={errorToPrint(error)} />
    </div>
  );
}
