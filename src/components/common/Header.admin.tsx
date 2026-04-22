import useUserStore from "@/store/useUserStore";
import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown } from "antd";

const HeaderAdmin: React.FC<{
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}> = (props) => {
  const { setIsSidebarOpen } = props;
  const item = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];
  const user = useUserStore((state) => state.user);
  return (
    <header className="header">
      <Button
          icon={<MenuOutlined />}
          onClick={() => setIsSidebarOpen(true)}
          className="toggle-sidebar"
        />
      <div className="header-left">
        <SearchOutlined />
        <input type="text" placeholder="Search for something ... " />
      </div>
      <div className="header-right">
        <div className="notification">
          <Badge count={10}>
            <BellOutlined className="bell-icon" />
          </Badge>
        </div>
        <div className="user">
          <Dropdown
            menu={{ items: item }}
            trigger={["click"]}
            placement="bottom"
          >
            <div className="user-info">
              <Avatar
                src={
                  <img
                    draggable={false}
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "https://lh3.googleusercontent.com/a/ACg8ocJ2zOcb5kg0OGBjWqX6MK22slxz4YcGPbZwKLWsceaihXtmdF1n=s96-c"
                    }
                    alt="avatar"
                  />
                }
                size={40}
              />
              <span className="hidden md:block">
                {user?.name ? user?.name : "Nguyễn Băng Băng"}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
