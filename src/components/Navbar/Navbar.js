import React, { useContext } from "react";
import { UserContext } from "../../containers/User";
import { Text } from "../../containers/Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "../Appointments/Search";

import Print from "./Print";

export default function Navbar({
  renderLanguages,
  renderSignUp,
  renderAddNewButton,
  jwt,
  setSearchWindow,
  searchWindow,
  setSearch
}) {
  const { user } = useContext(UserContext);
  const element = <FontAwesomeIcon icon={faSearch} size="xs" />;

  const renderSearch = () => (
    <div className="close-search-navbar">
      <button
        className="navbar-button"
        onClick={() => setSearchWindow(!searchWindow)}
      >
        {element} <Text tid="searchButton" />
      </button>
    </div>
  );

  const renderNavAfterLogin = () => (
    <div className="navbar">
      <div className="navbar-hello">
        <Text tid="hello" /> {user.email} ,
      </div>
      <ul>
        <li>{renderAddNewButton()}</li>
        <li>{renderSearch()}</li>
        <li>
          <Print />
        </li>
        <li> {renderLanguages()}</li>
        <li>{renderSignUp()}</li>
      </ul>
      {searchWindow ? (
        <Search setSearchWindow={setSearchWindow} setSearch={setSearch} />
      ) : null}
    </div>
  );

  const renderNav = () => (
    <div className="navbar-lang-only">
      <ul>
        <li> {renderLanguages()}</li>
      </ul>
    </div>
  );

  return <>{jwt ? renderNavAfterLogin() : renderNav()}</>;
}
