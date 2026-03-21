import React from 'react';
import { Checkbox, Slider, InputNumber } from 'antd';
import { Card } from '@/components/common';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProductFilterProps {
  categories?: FilterOption[];
  brands?: FilterOption[];
  priceRange?: [number, number];
  selectedCategories?: string[];
  selectedBrands?: string[];
  minPrice?: number;
  maxPrice?: number;
  onCategoryChange?: (categories: string[]) => void;
  onBrandChange?: (brands: string[]) => void;
  onPriceChange?: (range: [number, number]) => void;
  onClearFilters?: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories = [],
  brands = [],
  priceRange = [0, 1000000],
  selectedCategories = [],
  selectedBrands = [],
  minPrice = 0,
  maxPrice = 1000000,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onClearFilters,
}) => {
  const handleCategoryChange = (checkedValues: string[]) => {
    onCategoryChange?.(checkedValues);
  };

  const handleBrandChange = (checkedValues: string[]) => {
    onBrandChange?.(checkedValues);
  };

  const handlePriceChange = (value: number[]) => {
    onPriceChange?.(value as [number, number]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedBrands.length > 0 || 
    minPrice > priceRange[0] || 
    maxPrice < priceRange[1];

  return (
    <Card className="sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Categories</h4>
          <Checkbox.Group
            value={selectedCategories}
            onChange={(values) => handleCategoryChange(values as string[])}
            className="flex flex-col gap-2"
          >
            {categories.map((category) => (
              <Checkbox key={category.value} value={category.value}>
                {category.label}
                {category.count !== undefined && (
                  <span className="text-gray-400 text-sm ml-1">
                    ({category.count})
                  </span>
                )}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Brands</h4>
          <Checkbox.Group
            value={selectedBrands}
            onChange={(values) => handleBrandChange(values as string[])}
            className="flex flex-col gap-2"
          >
            {brands.map((brand) => (
              <Checkbox key={brand.value} value={brand.value}>
                {brand.label}
                {brand.count !== undefined && (
                  <span className="text-gray-400 text-sm ml-1">
                    ({brand.count})
                  </span>
                )}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
          value={[minPrice, maxPrice]}
          onChange={handlePriceChange}
          marks={{
            [priceRange[0]]: formatPrice(priceRange[0]),
            [priceRange[1]]: formatPrice(priceRange[1]),
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <InputNumber
            value={minPrice}
            onChange={(value) => onPriceChange?.([value || 0, maxPrice])}
            formatter={(value) => `${formatPrice(value || 0)}`}
            parser={(value) => parseInt(value?.replace(/[^\d]/g, '') || '0')}
            min={priceRange[0]}
            max={maxPrice}
            className="w-24"
          />
          <span className="text-gray-400">-</span>
          <InputNumber
            value={maxPrice}
            onChange={(value) => onPriceChange?.([minPrice, value || priceRange[1]])}
            formatter={(value) => `${formatPrice(value || 0)}`}
            parser={(value) => parseInt(value?.replace(/[^\d]/g, '') || '0')}
            min={minPrice}
            max={priceRange[1]}
            className="w-24"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductFilter;
