import React from 'react';
import { Empty } from 'antd';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
  emptyText?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  emptyText = 'No products found',
}) => {
  if (!loading && products.length === 0) {
    return (
      <Empty
        description={emptyText}
        className="py-12"
      />
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={product.images?.[0] || '/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => onAddToCart?.(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
