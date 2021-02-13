import React from "react";
import { Text } from "../../containers/Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Print() {
  const element = <FontAwesomeIcon icon={faPrint} />;

  return (
    <div>
      <button onClick={() => window.print()} className="print">
        {element} <Text tid="print" />
      </button>
    </div>
  );
}
