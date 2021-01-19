import { createContext } from "react";

const userContext = createContext({ user: {} });
export {
  userContext, // Export it so it can be used by other Components
};
