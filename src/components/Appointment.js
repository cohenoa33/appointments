import React, { useContext, useState } from "react";

import { LanguageContext } from "../containers/Language";
import Row from "./Row";
import Edit from "./Edit";

function Appointment({ appointment, updateAppointmentsList }) {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <Edit
          dictionary={dictionary}
          appointment={appointment}
          edit={edit}
          setEdit={setEdit}
          updateAppointmentsList={updateAppointmentsList}
        />
      ) : (
        <Row
          userLanguage={userLanguage}
          dictionary={dictionary}
          appointment={appointment}
          edit={edit}
          setEdit={setEdit}
          updateAppointmentsList={updateAppointmentsList}
        />
      )}
    </>
  );
}

export default Appointment;
