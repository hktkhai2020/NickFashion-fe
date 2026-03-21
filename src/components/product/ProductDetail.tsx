import React, { useState } from 'react';
import { Breadcrumb } from '@/components/common';
import { Image } from '@/components/common';
import { Rating } from '@/components/common';
import { Button } from '@/components/common';
import { SizeSelector } from './SizeSelector';
import { ColorSelector } from './ColorSelector';
import type { Product } from '@/types';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number, size?: string, color?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity, selectedSize, selectedColor);
  };

  const images = product.images?.length ? product.images : ['/placeholder.png'];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: product.category, path: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <Rating value={product.rating || 0} />
              <span className="text-gray-500">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 space-y-6">
            {product.sizes && (
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            )}

            {product.colors && (
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />
            )}

            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="large"
            >
              Buy Now
            </Button>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
