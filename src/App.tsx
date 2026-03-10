import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Layout, Menu, Typography, Card, Row, Col } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined, 
  AppstoreOutlined 
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function App() {
  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Người dùng',
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: 'Danh mục',
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="h-16 flex items-center justify-center bg-white/10 mb-4">
            <Title level={4} className="!text-white !m-0">My App</Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center' }}>
            <Text strong>Dashboard</Text>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Card title="Thống kê 1" bordered={false}>
                    <Title level={2}>1,234</Title>
                    <Text type="secondary">Lượt truy cập</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card title="Thống kê 2" bordered={false}>
                    <Title level={2}>567</Title>
                    <Text type="secondary">Người dùng mới</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card title="Thống kê 3" bordered={false}>
                    <Title level={2}>890</Title>
                    <Text type="secondary">Đơn hàng</Text>
                  </Card>
                </Col>
              </Row>
              
              <div className="mt-8">
                <Title level={4}>Chào mừng!</Title>
                <Text>Dự án React + Tailwind + Ant Design + Axios đã sẵn sàng.</Text>
                <div className="mt-4">
                  <Button type="primary" className="mr-2">Primary Button</Button>
                  <Button>Default Button</Button>
                </div>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design + Tailwind CSS ©2026 Created with Vite
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
