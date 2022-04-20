import { useState } from "react";
import { Checkbox } from "../build";

const CheckboxPage = () => {
  const [a, setA] = useState(false);
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Checkbox</h2>
      <div>
        <Checkbox value={a} onChange={setA}>
          Hello
        </Checkbox>
      </div>
      <div>
        <Checkbox disabled>Disabled</Checkbox>
      </div>
    </div>
  );
};

export default CheckboxPage;
