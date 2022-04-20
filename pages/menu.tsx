import { Divider, Menu, MenuItem, Submenu, Sidebar, SidebarItem } from "../build";
import { Projects, Dashboard, Add } from "../icons";

const MenuPage = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Sidebar</h2>
      <div>
        <Sidebar>
          <SidebarItem active>
            <Projects />
            <a href={"/link"}>link</a>
          </SidebarItem>
          <Divider />
          <SidebarItem>
            <Dashboard />
          </SidebarItem>
        </Sidebar>
      </div>
      <h2>Menu</h2>
      <div>
        <Menu activeKeys={["2", "7"]}>
          <Submenu id={"1"} title={"Shift Counts"} />
          <Submenu id={"2"} title={"Temperature"}>
            <MenuItem id={"6"}>BBOR 1</MenuItem>
            <MenuItem id={"7"}>BBOR 2</MenuItem>
            <MenuItem id={"8"}>BBOR 3</MenuItem>
            <MenuItem id={"9"}>BBOR 4</MenuItem>
            <Divider />
            <MenuItem icon={<Add />}>New Section</MenuItem>
            <MenuItem>Edit Group</MenuItem>
          </Submenu>
          <Submenu id={"3"} title={"Length"} />
          <Submenu id={"4"} title={"Corner Pad"} />
          <Submenu id={"5"} title={"BBOR"} />
        </Menu>
      </div>
    </div>
  );
};

export default MenuPage;
