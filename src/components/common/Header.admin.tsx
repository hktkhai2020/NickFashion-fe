import useUserStore from "@/store/useUserStore";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services";
const HeaderAdmin: React.FC<{
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}> = (props) => {
  const navigate = useNavigate();
  const { setIsSidebarOpen } = props;
  const item = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/customer/account");
          }}
        >
          Profile
        </div>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            authService.logout();
            navigate("/");
          }}
        >
          Logout
        </div>
      ),
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
                    src={user?.avatar ? user?.avatar : ""}
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
