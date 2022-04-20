import { Button, LinkButton, IconButton } from "../build";
import { Trash } from "../icons";

const ButtonPage = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Buttons</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button>secondary</Button>
        </div>
        <div>
          <Button variant={"primary"}>primary</Button>
        </div>
        <div>
          <Button disabled>disabled</Button>
        </div>
        <div>
          <LinkButton href={"#"}>text</LinkButton>
        </div>
      </div>
      <h3>Large</h3>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button size={"large"}>secondary</Button>
        </div>
        <div>
          <Button size={"large"} variant={"primary"}>
            primary
          </Button>
        </div>
        <div>
          <Button size={"large"} disabled>
            disabled
          </Button>
        </div>
        <div>
          <LinkButton size={"large"} href={"#"}>
            text
          </LinkButton>
        </div>
      </div>
      <h3>Small</h3>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button size={"small"}>secondary</Button>
        </div>
        <div>
          <Button size={"small"} variant={"primary"}>
            primary
          </Button>
        </div>
        <div>
          <Button size={"small"} disabled>
            disabled
          </Button>
        </div>
        <div>
          <LinkButton size={"small"} href={"#"}>
            text
          </LinkButton>
        </div>
      </div>
      <h2>Danger Buttons</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button danger>secondary</Button>
        </div>
        <div>
          <Button danger variant={"primary"}>
            primary
          </Button>
        </div>
        <div>
          <LinkButton danger href={"#"}>
            text
          </LinkButton>
        </div>
      </div>
      <h3>Large</h3>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button danger size={"large"}>
            secondary
          </Button>
        </div>
        <div>
          <Button danger size={"large"} variant={"primary"}>
            primary
          </Button>
        </div>
        <div>
          <LinkButton danger size={"large"} href={"#"}>
            text
          </LinkButton>
        </div>
      </div>
      <h3>Small</h3>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button danger size={"small"}>
            secondary
          </Button>
        </div>
        <div>
          <Button danger size={"small"} variant={"primary"}>
            primary
          </Button>
        </div>
        <div>
          <LinkButton danger size={"small"} href={"#"}>
            text
          </LinkButton>
        </div>
      </div>
      <h2>Icons</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button icon={<Trash />}>Delete</Button>
        </div>
        <div>
          <Button variant={"primary"} icon={<Trash />}>
            Delete
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button size={"large"} icon={<Trash />}>
            Delete
          </Button>
        </div>
        <div>
          <Button size={"large"} variant={"primary"} icon={<Trash />}>
            Delete
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button size={"small"} icon={<Trash />}>
            Delete
          </Button>
        </div>
        <div>
          <Button size={"small"} variant={"primary"} icon={<Trash />}>
            Delete
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button size={"small"} icon={<Trash />} />
        </div>
        <div>
          <Button size={"small"} variant={"primary"} icon={<Trash />} />
        </div>
        <div>
          <Button icon={<Trash />} />
        </div>
        <div>
          <Button variant={"primary"} icon={<Trash />} />
        </div>
        <div>
          <Button size={"large"} icon={<Trash />} />
        </div>
        <div>
          <Button size={"large"} variant={"primary"} icon={<Trash />} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <Button rounded size={"small"} icon={<Trash />} />
        </div>
        <div>
          <Button rounded size={"small"} variant={"primary"} icon={<Trash />} />
        </div>
        <div>
          <Button rounded icon={<Trash />} />
        </div>
        <div>
          <Button rounded variant={"primary"} icon={<Trash />} />
        </div>
        <div>
          <Button rounded size={"large"} icon={<Trash />} />
        </div>
        <div>
          <Button rounded size={"large"} variant={"primary"} icon={<Trash />} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: "row" }}>
        <div>
          <IconButton size={"small"} icon={<Trash />} />
        </div>
        <div>
          <IconButton size={"small"} danger icon={<Trash />} />
        </div>
        <div>
          <IconButton icon={<Trash />} />
        </div>
        <div>
          <IconButton danger icon={<Trash />} />
        </div>
        <div>
          <IconButton size={"large"} icon={<Trash />} />
        </div>
        <div>
          <IconButton size={"large"} danger icon={<Trash />} />
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
