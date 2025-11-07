import React from 'react';

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => onQuantityChange(Math.max(1, quantity - 1));

  return (
    <div>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">Quantity (in Litres)</label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-l-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-primary"
        >
          -
        </button>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="w-full text-center bg-brand-secondary text-white font-semibold text-lg p-3 outline-none border-t-2 border-b-2 border-gray-700"
          min="1"
        />
        <button
          type="button"
          onClick={handleIncrement}
          aria-label="Increase quantity"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-5 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-primary"
        >
          +
        </button>
      </div>
    </div>
  );
};
