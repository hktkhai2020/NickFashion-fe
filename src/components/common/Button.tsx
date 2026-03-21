import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'middle' | 'large';
}

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'middle',
  children,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700';
      default:
        return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <AntButton
      className={`rounded font-medium transition-colors ${getVariantClass()} ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
