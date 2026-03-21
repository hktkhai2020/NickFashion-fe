import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
}) => {
  const breadcrumbItems = items.map((item, index) => ({
    title: item.path ? (
      <Link to={item.path} className="text-gray-600 hover:text-blue-600">
        {item.label}
      </Link>
    ) : (
      <span className="text-gray-900">{item.label}</span>
    ),
    key: index,
  }));

  return (
    <AntBreadcrumb
      items={breadcrumbItems}
      separator={separator}
      className={`mb-4 ${className}`}
    />
  );
};

export default Breadcrumb;
