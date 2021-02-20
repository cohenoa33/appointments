import React, { useContext } from "react";
import { UserContext } from "../../containers/User";
import { Text } from "../../containers/Language";

import Print from "./Print";

export default function Navbar({
  renderLanguages,
  renderSignUp,
  renderAddNewButton,
  jwt
}) {
  const { user } = useContext(UserContext);
  const renderNavAfterLogin = () => (
    <div className="navbar">
      <div className="navbar-hello">
        <Text tid="hello" /> {user.email} ,
      </div>
      <ul>
        <li>{renderAddNewButton()}</li>
        <li>
          <Print />
        </li>
        <li> {renderLanguages()}</li>
        <li>{renderSignUp()}</li>
      </ul>
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
