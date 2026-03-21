import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>About Page</Title>
    </div>
  );
};

export default AboutPage;
