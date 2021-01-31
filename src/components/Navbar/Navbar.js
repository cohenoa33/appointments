import React from "react";

export default function Navbar({
  renderLanguages,
  renderSignUp,
  renderAddNewButton,
  jwt,
}) {
  return (
    <div className="navbar">
      <ul>
        {jwt ? <li>{renderAddNewButton()}</li> : null}
        <li> {renderLanguages()}</li>
        {jwt ? <li>{renderSignUp()}</li> : null}
      </ul>
    </div>
  );
}
