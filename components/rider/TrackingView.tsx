import React, { useState, useEffect } from 'react';
import { FuelRequest } from '../../types';
import { generateConfirmationMessage } from '../../services/geminiService';
import { FuelPumpIcon, LocationPinIcon, SpinnerIcon } from '../icons';
import { Map } from '../common/Map';

interface TrackingViewProps {
  request: FuelRequest;
  onNewRequest: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ request, onNewRequest }) => {
  const [geminiResponse, setGeminiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      setIsLoading(true);
      const message = await generateConfirmationMessage(request.fuelType, request.quantity, request.location);
      setGeminiResponse(message);
      setIsLoading(false);
    };
    fetchMessage();
  }, [request]);

  return (
    <div className="bg-brand-secondary p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-brand-primary mb-4">Tracking Your Delivery</h2>

      <div className="space-y-4 mb-6 text-gray-200">
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FuelPumpIcon className="h-6 w-6 text-brand-primary mr-3" />
          <p><span className="font-bold">{request.quantity} Litres</span> of {request.fuelType}</p>
        </div>
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <LocationPinIcon className="h-6 w-6 text-brand-primary mr-3" />
          <p className="font-mono text-sm">{request.location.latitude.toFixed(4)}, {request.location.longitude.toFixed(4)}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <Map coordinates={request.location} />
        <p className="text-center text-gray-400 mt-2 text-sm">Supplier is on the way!</p>
      </div>

      <div className="bg-gray-700/50 p-4 rounded-lg mb-8 min-h-[100px] flex items-center justify-center">
        {isLoading ? (
          <SpinnerIcon className="animate-spin h-6 w-6 text-white" />
        ) : (
          <p className="text-white whitespace-pre-wrap text-center">{geminiResponse}</p>
        )}
      </div>

      <button
        onClick={onNewRequest}
        className="w-full bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-primary"
      >
        Make Another Request
      </button>
    </div>
  );
};
