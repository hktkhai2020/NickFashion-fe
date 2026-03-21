import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>404 - Page Not Found</Title>
    </div>
  );
};

export default NotFoundPage;
