import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { ProductGrid } from '@/components/product';
import type { Product } from '@/types/product';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
  limit?: number;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  title = 'Featured Products',
  subtitle = 'Check out our most popular items this season',
  loading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  limit = 8,
}) => {
  const displayedProducts = products.slice(0, limit);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            View All Products
          </Link>
        </div>

        <ProductGrid
          products={displayedProducts}
          loading={loading}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlistIds={wishlistIds}
          columns={4}
        />

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" size="large">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
