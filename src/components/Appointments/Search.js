import React, { useState, useContext } from "react";
import { LanguageContext } from "../../containers/Language";

export default function Search({ setSearch }) {
  const [searchInput, setSearchInput] = useState();
  const { dictionary } = useContext(LanguageContext);

  const [error, setError] = useState(false);

  const handelSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    document.getElementById("search").value("");
    setError(false);
  };
  const handelSearchSubmit = () => {
    if (searchInput && searchInput.trim() === "") {
      setError(true);
      setTimeout(clearSearch, 5000);
    } else {
      setSearch(searchInput);
    }
  };
  return (
    <>
      {error ? (
        <div className="error-message">{dictionary.searchError}</div>
      ) : null}
      <div className="search-area">
        <input id="search" type="text" onChange={handelSearchInput} />
        <button onClick={handelSearchSubmit}>{dictionary.search}</button>
      </div>
    </>
  );
}
