import { useState } from "react";
import { Checkbox } from "../build";

const CheckboxPage = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState<boolean | undefined>(false);
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Checkbox</h2>
      <div>
        <Checkbox value={a} onChange={setA}>
          Hello
        </Checkbox>
      </div>
      <div>
        <Checkbox
          value={b}
          indeterminate={typeof b === "undefined"}
          onChange={() => {
            setB((old) => {
              if (old === true) {
                return false;
              }

              if (old === false) {
                return undefined;
              }

              return true;
            });
          }}>
          indeterminate
        </Checkbox>
      </div>
      <div>
        <Checkbox disabled>Disabled</Checkbox>
      </div>
    </div>
  );
};

export default CheckboxPage;
