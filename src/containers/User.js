import React, { createContext } from "react";

//set default language
export const UserContext = createContext({
  user: {},
});

// provides context, using the local storage instead of using state
export function UserProvider({ children, user }) {
  const provider = {
    user: user,
  };
  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
}
