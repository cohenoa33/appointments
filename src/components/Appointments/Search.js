import React, { useState, useContext } from "react";
import { LanguageContext } from "../../containers/Language";
import { createClassName, xSVG } from "../../services";

export default function Search({ setSearch, setSearchWindow }) {
  const [searchInput, setSearchInput] = useState();
  const { dictionary, userLanguage } = useContext(LanguageContext);

  const handelSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    if (document.getElementById("search")) {
      document.getElementById("search").value = "";
    }
  };
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput && searchInput.trim() === "") {
      setTimeout(clearSearch, 3000);
    } else {
      setSearch(searchInput);
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
        <form onSubmit={handelSearchSubmit}>
          <input id="search" type="text" onChange={handelSearchInput} />
          <button className="search-btn" onClick={handelSearchSubmit}>
            {dictionary.search}
          </button>
        </form>
      </span>
    </>

  );
}
