import React from "react";
import { Text } from "../containers/Language";

export default function SignOut({ setLogout }) {
  return (
    <div>
      <button onClick={setLogout}>
        <Text tid="logout" />
      </button>
    </div>
  );
}
