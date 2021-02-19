const API_ROOT = process.env.REACT_APP_URL;

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`
};

export const login = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user })
  }).then((res) => res.json());
};

export const signup = (user) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user })
  }).then((res) => res.json());
};
export const reAuthentication = () => {
  return fetch(`${API_ROOT}/reauth`, {
    method: "GET",
    headers: headers
  }).then((res) => res.json());
};

export const deleteAppointment = (id) => {
  return fetch(`${API_ROOT}/appointments/${id}`, {
    method: "DELETE",
    headers: headers
  }).then((res) => res.json());
};
export const updateAppointment = (appointment) => {
  return fetch(`${API_ROOT}/appointments/${appointment.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ appointment })
  }).then((res) => res.json());
};
export const addAppointment = (appointment) => {
  return fetch(`${API_ROOT}/appointments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(appointment)
  }).then((res) => res.json());
};
