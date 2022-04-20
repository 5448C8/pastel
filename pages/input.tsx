import { Input, TextArea } from "../build";

const InputPage = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Inputs</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Input placeholder={"Hello"} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Input placeholder={"disabled"} disabled />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <TextArea />
        </div>
      </div>
    </div>
  );
};

export default InputPage;
