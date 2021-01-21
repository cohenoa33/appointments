import React from "react";
import { Text } from "../containers/Language";

export default function AddNew({ setAddNew }) {
  return (
    <div>
      <button onClick={setAddNew}>
        <Text tid="newAppointment" />
      </button>
    </div>
  );
}
