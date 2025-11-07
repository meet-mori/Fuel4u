import React from 'react';
import { FuelType } from '../../types';

interface FuelTypeSelectorProps {
  selectedFuel: FuelType | null;
  onSelectFuel: (fuel: FuelType) => void;
}

export const FuelTypeSelector: React.FC<FuelTypeSelectorProps> = ({ selectedFuel, onSelectFuel }) => {
  const fuelOptions: FuelType[] = ['Petrol', 'Diesel'];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Fuel Type</label>
      <div className="grid grid-cols-2 gap-4">
        {fuelOptions.map((fuel) => (
          <button
            key={fuel}
            type="button"
            onClick={() => onSelectFuel(fuel)}
            className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-primary ${
              selectedFuel === fuel
                ? 'bg-brand-primary text-brand-dark'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {fuel}
          </button>
        ))}
      </div>
    </div>
  );
};
