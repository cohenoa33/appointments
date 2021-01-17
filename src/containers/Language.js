import React, { useState, createContext, useContext } from "react";

import { languageOptions, dictionaryList } from "../languages";

//set default language
export const LanguageContext = createContext({
  userLanguage: "en",
  dictionary: dictionaryList.en,
});

// provides context, using the local storage instead of using state
export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem("user-lang");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "en");

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected) => {
      const newLanguage = languageOptions[selected] ? selected : "en";
      setUserLanguage(newLanguage);
      window.localStorage.setItem("user-lang", newLanguage);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid] || tid;
}
