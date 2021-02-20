import React, { useContext } from "react";
import { Text } from "../../containers/Language";

export default function SignOut({ setLogout }) {
  return (
    <button onClick={setLogout}>
      <Text tid="logout" />
    </button>
  );
}
