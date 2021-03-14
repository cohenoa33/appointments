import React from "react";
import { Text } from "../../containers/Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddNewButton({ setAddNew }) {
  const element = <FontAwesomeIcon icon={faPlus} size="xs" />;

  return (
    <button className="navbar-button" onClick={setAddNew}>
      {element} <Text tid="add" />
    </button>
  );
}
