import React from "react";
import { Text } from "../../containers/Language";

export default function Print() {
  return (
    <div>
      <button onClick={() => window.print()} className="print">
        <Text tid="print" />
      </button>
    </div>
  );
}
