import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  lazy?: boolean;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  fallback = '/placeholder.png',
  lazy = false,
  width,
  height,
  style,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  const imageSrc = error ? fallback : src;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, ...style }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <LoadingOutlined style={{ fontSize: 24 }} />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default Image;
