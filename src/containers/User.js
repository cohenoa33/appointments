import React, { createContext } from "react";

//set default user to empty object
export const UserContext = createContext({
  user: {},
});

// provides context,passing user as props
export function UserProvider({ children, user }) {
  const provider = {
    user: user,
  };
  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
}
