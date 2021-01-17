import React, { useContext } from "react";

import { Text, LanguageContext } from "../containers/Language";

export default function Example() {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div>
      <h1>
        <Text tid="exploreHeader" />
      </h1>
      <p>
        <Text tid="welcomeDescription" />
      </p>

      <div>
        <input type="text" placeholder={dictionary.welcomeDescription} />
      </div>
    </div>
  );
}
