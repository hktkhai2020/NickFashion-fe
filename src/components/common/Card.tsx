import React from 'react';

interface CardProps {
  title?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  className = '',
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hoverable ? 'transition-shadow hover:shadow-lg cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || extra) && (
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
