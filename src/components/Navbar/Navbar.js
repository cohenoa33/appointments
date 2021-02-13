import React from "react";
import Print from "./Print";

export default function Navbar({
  renderLanguages,
  renderSignUp,
  renderAddNewButton,
  jwt,
}) {
  const renderNavAfterLogin = () => (
    <div className="navbar">
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
