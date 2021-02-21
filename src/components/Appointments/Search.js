import React, { useState } from "react";

export default function Search({ setFilter }) {
  const [search, setSearch] = useState();
  const handelSearchInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handelSearchSubmit = (e) => {
    e.preventDefault();
    setFilter(search);
    // setSearch();
  };

  return (
    <>
      <form onSubmit={handelSearchSubmit}>
        <input type="text" onChange={handelSearchInput} />
      </form>
    </>
  );
}
