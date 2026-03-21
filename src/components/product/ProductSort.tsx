import React from 'react';
import { Select } from 'antd';

interface SortOption {
  label: string;
  value: string;
}

interface ProductSortProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SortOption[];
}

export const ProductSort: React.FC<ProductSortProps> = ({
  value = 'default',
  onChange,
  options = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Best Selling', value: 'best_selling' },
    { label: 'Rating', value: 'rating' },
  ],
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600">Sort by:</span>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        className="w-48"
        placeholder="Select sort option"
      />
    </div>
  );
};

export default ProductSort;
