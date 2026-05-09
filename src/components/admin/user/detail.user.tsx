import { User } from '@/types';
import { Avatar, Badge, Descriptions, DescriptionsProps, Drawer } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const DetailUser = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: User | null;
}) => {
  const { isOpen, setIsOpen, user } = props;

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      case 'other':
        return 'Khác';
      default:
        return '-';
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'moderator':
        return 'Người kiểm duyệt';
      case 'user':
        return 'Người dùng';
      default:
        return '-';
    }
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Họ và tên',
      children: user?.name || '-',
    },
    {
      key: '2',
      label: 'Email',
      children: user?.email || '-',
    },
    {
      key: '3',
      label: 'Số điện thoại',
      children: user?.phone || '-',
    },
    {
      key: '4',
      label: 'Giới tính',
      children: getGenderLabel(user?.gender),
    },
    {
      key: '5',
      label: 'Ngày sinh',
      children: user?.dateOfBirth || '-',
    },
    {
      key: '6',
      label: 'Địa chỉ',
      children: user?.address || '-',
    },
    {
      key: '7',
      label: 'Vai trò',
      children: (
        <span
          style={{
            color:
              user?.role === 'admin'
                ? '#1677ff'
                : user?.role === 'moderator'
                  ? '#fa8c16'
                  : '#52c41a',
            fontWeight: 600,
          }}
        >
          {getRoleLabel(user?.role)}
        </span>
      ),
    },
    {
      key: '8',
      label: 'Trạng thái',
      children: user?.isActive ? (
        <Badge status="success" text="Hoạt động" />
      ) : (
        <Badge status="error" text="Không hoạt động" />
      ),
    },
    {
      key: '9',
      label: 'Ngày tạo',
      children: user?.createdAt
        ? new Date(user.createdAt).toLocaleString('vi-VN')
        : '-',
    },
    {
      key: '10',
      label: 'Ngày cập nhật',
      children: user?.updatedAt
        ? new Date(user.updatedAt).toLocaleString('vi-VN')
        : '-',
    },
  ];

  return (
    <Drawer
      title="Chi tiết người dùng"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      width={600}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Avatar
          size={100}
          src={user?.avatar}
          icon={<UserOutlined />}
        />
      </div>
      <Descriptions
        title="Thông tin người dùng"
        items={items}
        bordered
        column={1}
      />
    </Drawer>
  );
};

export default DetailUser;
