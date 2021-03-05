import React, { useState, useContext } from "react";
import { LanguageContext } from "../../containers/Language";
import { createClassName, xSVG } from "../../services";

export default function Search({ setSearch, setSearchWindow }) {
  const [searchInput, setSearchInput] = useState();
  const { dictionary, userLanguage } = useContext(LanguageContext);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handelSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    if (document.getElementById("search")) {
      document.getElementById("search").value = "";
      setError(false);
    }
  };
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput && searchInput.trim() === "") {
      setError(true);
      setTimeout(clearSearch, 3000);
    } else {
      setSearch(searchInput);
      setMessage(`${dictionary.searchResults} ${searchInput}`);
    }
  };
  return (
    <div className="open-search">
      <div className="close-search">
        <button
          className={createClassName("close-search-btn", userLanguage)}
          onClick={() => setSearchWindow(false)}
        >
          {xSVG}
        </button>
      </div>
      <div className="search">
        <input type="text" onChange={handelSearchInput} />
      </div>
      <button className="search-form-btn" onClick={handelSearchSubmit}>
        {dictionary.search}
      </button>
    </div>
  );
}
