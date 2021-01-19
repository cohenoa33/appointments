import React, { useContext } from "react";

import { Text, LanguageContext } from "../containers/Language";

export default function Example({ setLogout }) {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div>
      <h1>
        <Text tid="exploreHeader" />
      </h1>
      <button onClick={setLogout}>Clear</button>
      <div>
        {/* <input type="text" placeholder={dictionary.welcomeDescription} /> */}
      </div>
    </div>
  );
}
