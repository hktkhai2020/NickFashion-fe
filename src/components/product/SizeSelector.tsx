import React from 'react';
import { Tag } from 'antd';

interface Size {
  label: string;
  value: string;
  available?: boolean;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  const handleSelect = (size: string, available?: boolean) => {
    if (available !== false) {
      onSelectSize?.(size);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">Size</span>
        {selectedSize && (
          <button className="text-sm text-blue-600 hover:underline">
            Size guide
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size.value;
          const isAvailable = size.available !== false;
          
          return (
            <Tag
              key={size.value}
              className={`
                px-4 py-2 cursor-pointer text-center min-w-[50px]
                transition-all duration-200
                ${isSelected 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : isAvailable 
                    ? 'bg-white text-gray-700 border-gray-300 hover:border-blue-600' 
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                }
              `}
              onClick={() => handleSelect(size.value, size.available)}
            >
              {size.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
