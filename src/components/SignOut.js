import React, { useContext } from "react";

import { LanguageContext } from "../containers/Language";

export default function SignOut({ setLogout }) {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div>
      <button onClick={setLogout}>{dictionary.logout}</button>
    </div>
  );
}
