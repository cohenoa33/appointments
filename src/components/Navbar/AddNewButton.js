import React from "react";
import { Text } from "../../containers/Language";

export default function AddNewButton({ setAddNew }) {
  return (
    <button onClick={setAddNew}>
      <Text tid="newAppointment" />
    </button>
  );
}
