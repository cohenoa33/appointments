import React, { useContext } from "react";

import { Text } from "../containers/Language";
import { UserContext } from "../containers/User";

export default function Example() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>
        <Text tid="exploreHeader" />
      </h1>
    </div>
  );
}
