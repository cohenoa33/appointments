import React, { useContext, useState } from "react";

import { LanguageContext } from "../../containers/Language";
import Appointment from "./Appointment";
import Edit from "./Edit";

export default function Row({ appointment, updateAppointmentsList, mobile }) {
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
          mobile={mobile}
          updateAppointmentsList={updateAppointmentsList}
        />
      ) : (
        <Appointment
          userLanguage={userLanguage}
          dictionary={dictionary}
          appointment={appointment}
          edit={edit}
          setEdit={setEdit}
          updateAppointmentsList={updateAppointmentsList}
          mobile={mobile}
        />
      )}
    </>
  );
}
