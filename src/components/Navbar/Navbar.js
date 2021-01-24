import React from "react";

export default function Navbar({
  renderLanguages,
  renderSignUp,
  renderAddNewButton,
  jwt,
}) {
  return (
    <div>
      <ul>
        <li> {renderLanguages()}</li>
        {jwt ? (
          <>
            <li>{renderAddNewButton()}</li>
            <li>{renderSignUp()}</li>
          </>
        ) : null}
      </ul>
    </div>
  );
}
