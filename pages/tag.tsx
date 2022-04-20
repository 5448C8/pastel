import { Input, TextArea, Tag } from "../build";

const TagPage = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Tags</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Tag>hello</Tag>
        </div>
        <div>
          <Tag onClose={() => {}}>Closable</Tag>
        </div>
      </div>
    </div>
  );
};

export default TagPage;
