import React from 'react';

interface Color {
  label: string;
  value: string;
  hex: string;
  available?: boolean;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  const handleSelect = (color: string, available?: boolean) => {
    if (available !== false) {
      onSelectColor?.(color);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="font-medium">Color</span>
        {selectedColor && (
          <span className="text-gray-500">
            {colors.find((c) => c.value === selectedColor)?.label}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;
          const isAvailable = color.available !== false;
          
          return (
            <button
              key={color.value}
              onClick={() => handleSelect(color.value, color.available)}
              disabled={!isAvailable}
              className={`
                relative w-10 h-10 rounded-full border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2' 
                  : isAvailable 
                    ? 'border-gray-300 hover:border-blue-600' 
                    : 'border-gray-200 cursor-not-allowed opacity-50'
                }
              `}
              style={{ backgroundColor: color.hex }}
              title={`${color.label}${!isAvailable ? ' (Out of stock)' : ''}`}
            >
              {!isAvailable && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-[2px] h-full bg-red-500 rotate-45 absolute"></span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
