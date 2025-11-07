import React, { useState, useEffect } from 'react';
import { FuelRequest, RequestStatus } from '../types';
import { RequestList } from '../components/admin/RequestList';
import { Map } from '../components/common/Map';
import { SpinnerIcon } from '../components/icons';

// Mock data is now managed locally within the component
const MOCK_REQUESTS: FuelRequest[] = [
    { id: 'req-1', userId: 'user-1', fuelType: 'Petrol', quantity: 10, location: { latitude: 12.9716, longitude: 77.5946 }, status: 'Pending', createdAt: new Date(Date.now() - 5 * 60000) },
    { id: 'req-2', userId: 'user-4', fuelType: 'Diesel', quantity: 25, location: { latitude: 12.9716, longitude: 77.5946 }, status: 'En Route', createdAt: new Date(Date.now() - 15 * 60000) },
];

export const AdminPage: React.FC = () => {
    const [requests, setRequests] = useState<FuelRequest[]>(MOCK_REQUESTS);
    const [selectedRequest, setSelectedRequest] = useState<FuelRequest | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // No API call needed, just initialize the view
        setIsLoading(true);
        if (requests.length > 0) {
          setSelectedRequest(requests[0]);
        }
        setIsLoading(false);
    }, []);

    const handleSelectRequest = (request: FuelRequest) => {
        setSelectedRequest(request);
    };

    const handleStatusChange = (status: RequestStatus) => {
        if (!selectedRequest) return;
        // Update local state directly instead of an API call
        const updatedRequest = { ...selectedRequest, status };
        setRequests(prev => prev.map(r => r.id === updatedRequest.id ? updatedRequest : r));
        setSelectedRequest(updatedRequest);
    };

    if (isLoading) {
        return <SpinnerIcon className="h-8 w-8 animate-spin text-brand-primary" />;
    }

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 p-4 animate-fade-in h-[80vh]">
            <div className="md:col-span-1 bg-brand-secondary p-4 rounded-xl flex flex-col">
                <h2 className="text-xl font-bold text-white mb-4 flex-shrink-0">Active Requests</h2>
                <div className="flex-grow overflow-y-auto">
                    <RequestList 
                        requests={requests} 
                        onSelectRequest={handleSelectRequest} 
                        selectedRequestId={selectedRequest?.id || null} 
                    />
                </div>
            </div>
            <div className="md:col-span-2 bg-brand-secondary p-6 rounded-xl">
                {selectedRequest ? (
                    <div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-4">Request Details</h3>
                        <div className="space-y-3 text-gray-200 mb-6">
                            <p><strong>Status:</strong> <span className="font-semibold">{selectedRequest.status}</span></p>
                            <p><strong>Fuel:</strong> {selectedRequest.quantity}L of {selectedRequest.fuelType}</p>
                            <p><strong>Requested:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                        </div>
                        <Map coordinates={selectedRequest.location} />
                        <div className="flex gap-4 mt-6">
                           <button onClick={() => handleStatusChange('En Route')} disabled={selectedRequest.status !== 'Pending'} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">Mark En Route</button>
                           <button onClick={() => handleStatusChange('Completed')} disabled={selectedRequest.status !== 'En Route'} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">Mark Completed</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Select a request to view details.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
