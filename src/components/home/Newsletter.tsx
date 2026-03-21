import React, { useState } from 'react';
import { Button } from '@/components/common';
import { Input } from '@/components/common';

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  title = 'Join Our Newsletter',
  subtitle = 'Subscribe to get special offers, free giveaways, and exclusive deals.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Thank you for subscribing!',
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 mb-8">
            {subtitle}
          </p>

          {isSubscribed ? (
            <div className="bg-green-600 text-white p-6 rounded-lg">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">{successMessage}</p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="mt-4 text-white/80 hover:text-white underline"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border ${
                    error ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:border-blue-500 transition-colors`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400 text-left">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isLoading}
                className="sm:w-auto whitespace-nowrap"
              >
                {buttonText}
              </Button>
            </form>
          )}

          <p className="mt-6 text-sm text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
