import React from "react";
import { Text } from "../../containers/Language";

export default function SignOut({ setLogout }) {
  return (
    <button className="navbar-button" onClick={setLogout}>
      <Text tid="logout" />
    </button>
  );
}
