import React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  tip,
  fullScreen = false,
  className = '',
}) => {
  const spinSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'default';

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-white/80 z-50 ${className}`}>
        <Spin size={spinSize} tip={tip} />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <Spin size={spinSize} tip={tip} />
    </div>
  );
};

export default Loading;
