import React from 'react';
import { Coordinates } from '../../types';
import { LocationPinIcon, SpinnerIcon } from '../icons';

interface LocationDisplayProps {
  location: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ location, error, isLoading }) => {
  return (
    <div className="bg-brand-secondary p-4 rounded-lg border border-gray-700">
      <div className="flex items-center">
        {isLoading ? (
          <SpinnerIcon className="animate-spin h-5 w-5 text-brand-primary mr-3" />
        ) : (
          <LocationPinIcon className="h-5 w-5 text-brand-primary mr-3" />
        )}
        <div>
          <p className="text-sm font-medium text-gray-300">Your Location</p>
          {isLoading && <p className="text-white">Fetching location...</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {location && !isLoading && (
            <p className="text-white font-mono text-sm">
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
