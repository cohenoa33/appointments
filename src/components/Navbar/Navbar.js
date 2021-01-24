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
            <li>{renderSignUp()}</li>
            <li>{renderAddNewButton()}</li>
          </>
        ) : null}
      </ul>
    </div>
  );
}
