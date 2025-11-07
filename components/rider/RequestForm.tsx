import React, { useState } from 'react';
import { FuelType, FuelRequest } from '../../types';
import { createFuelRequest } from '../../services/apiService';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useAppContext } from '../../contexts/AppContext';
import { FuelTypeSelector } from '../common/FuelTypeSelector';
import { QuantityInput } from '../common/QuantityInput';
import { LocationDisplay } from '../common/LocationDisplay';
import { SpinnerIcon } from '../icons';

interface RequestFormProps {
    onSubmit: (request: FuelRequest) => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSubmit }) => {
    const [fuelType, setFuelType] = useState<FuelType | null>(null);
    const [quantity, setQuantity] = useState<number>(5);
    const { location, error: locationError, isLoading: isLocationLoading } = useGeolocation();
    const { user } = useAppContext();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fuelType || !location || !user) return;

        setIsSubmitting(true);
        try {
            const newRequest = await createFuelRequest(fuelType, quantity, location, user);
            onSubmit(newRequest);
        } catch (error) {
            console.error("Failed to create request:", error);
            // In a real app, show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = fuelType !== null && location !== null;

    return (
        <div className="bg-brand-secondary p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Request Fuel Delivery</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FuelTypeSelector selectedFuel={fuelType} onSelectFuel={setFuelType} />
                <QuantityInput quantity={quantity} onQuantityChange={setQuantity} />
                <LocationDisplay location={location} error={locationError} isLoading={isLocationLoading} />

                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting || isLocationLoading}
                    className="w-full flex justify-center items-center bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-300 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-primary"
                >
                    {isSubmitting || isLocationLoading ? (
                        <>
                            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                            Processing...
                        </>
                    ) : (
                        'Request Fuel Now'
                    )}
                </button>
            </form>
        </div>
    );
};