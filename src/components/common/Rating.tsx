import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';

interface RatingProps {
  value: number;
  max?: number;
  allowHalf?: boolean;
  disabled?: boolean;
  size?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  allowHalf = false,
  disabled = false,
  size = 20,
  onChange,
  className = '',
}) => {
  const handleClick = (index: number) => {
    if (!disabled && onChange) {
      onChange(index + 1);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < max; i++) {
      const isFilled = i < Math.floor(value);
      const isHalf = allowHalf && i === Math.floor(value) && value % 1 !== 0;

      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          className={`${disabled ? 'cursor-default' : 'cursor-pointer'} inline-block`}
          style={{ fontSize: `${size}px` }}
        >
          {isFilled || isHalf ? (
            <StarFilled className="text-yellow-400" />
          ) : (
            <StarOutlined className="text-gray-300" />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {renderStars()}
      {value > 0 && (
        <span className="ml-2 text-sm text-gray-600">({value.toFixed(1)})</span>
      )}
    </div>
  );
};

export default Rating;
