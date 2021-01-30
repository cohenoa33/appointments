import React, { useContext } from "react";
import { languageOptions } from "../../languages";
import { LanguageContext } from "../../containers/Language";

export default function LanguageSelector({ changeTheme }) {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const handleLanguageChange = (e) => {
    userLanguageChange(e.target.value);
    changeTheme();
  };

  return (
    <select onChange={handleLanguageChange} value={userLanguage}>
      {Object.entries(languageOptions).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
