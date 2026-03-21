import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Discover Your Style',
  subtitle = 'Shop the latest fashion trends with up to 50% off',
  backgroundImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920',
  ctaText = 'Shop Now',
  ctaLink = '/products',
}) => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={ctaLink}>
                <Button
                  variant="primary"
                  size="large"
                  className="!bg-white !text-gray-900 hover:!bg-gray-100"
                >
                  {ctaText}
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="outline"
                  size="large"
                  className="!border-white !text-white hover:!bg-white/20"
                >
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
