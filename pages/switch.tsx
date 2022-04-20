import { useState } from "react";
import { Button, Switch } from "../build";

const SwitchPage = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Switch</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button>Hello</Button>
        </div>
        <div>
          <Switch variant={"outline"} value={a} onChange={setA} />
        </div>
        <div>
          <Switch variant={"filled"} value={b} onChange={setB} />
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
