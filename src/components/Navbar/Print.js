import React from "react";
import { Text } from "../../containers/Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Print() {
  const element = <FontAwesomeIcon icon={faPrint} />;

  return (
    <div>
      <button className="navbar-button" onClick={() => window.print()}>
        {element} <Text tid="print" />
      </button>
    </div>
  );
}
