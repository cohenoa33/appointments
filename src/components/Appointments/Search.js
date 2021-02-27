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
    <>
      <span className="open-search">
        <button
          className={createClassName("close-search-btn", userLanguage)}
          onClick={() => setSearchWindow(false)}
        >
          {xSVG}
        </button>
        {/* {error ? (
          <p className="error-message">{dictionary.searchError} </p>
        ) : (
          <p className="error-message"> {message}</p>
        )} */}
        <form onSubmit={handelSearchSubmit}>
          <input id="search" type="text" onChange={handelSearchInput} />
          <button onClick={handelSearchSubmit}>{dictionary.search}</button>
        </form>
      </span>
    </>
  );
}
