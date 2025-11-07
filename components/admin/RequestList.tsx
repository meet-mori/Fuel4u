import React from 'react';
import { FuelRequest } from '../../types';
import { LocationPinIcon } from '../icons';

interface RequestListProps {
    requests: FuelRequest[];
    onSelectRequest: (request: FuelRequest) => void;
    selectedRequestId: string | null;
}

export const RequestList: React.FC<RequestListProps> = ({ requests, onSelectRequest, selectedRequestId }) => {
    const timeSince = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }

    if (requests.length === 0) {
        return <p className="text-gray-400 text-center py-8">No active requests.</p>;
    }

    return (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {requests.map((req) => (
                <button
                    key={req.id}
                    onClick={() => onSelectRequest(req)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                        selectedRequestId === req.id 
                        ? 'bg-gray-700 border-brand-primary' 
                        : 'bg-gray-800 border-transparent hover:bg-gray-700'
                    }`}
                >
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-white">{req.quantity}L of {req.fuelType}</p>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            req.status === 'Pending' ? 'bg-yellow-500 text-yellow-900' : 
                            req.status === 'En Route' ? 'bg-blue-500 text-blue-900' :
                            'bg-green-500 text-green-900'
                        }`}>{req.status}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <LocationPinIcon className="h-4 w-4 mr-1"/>
                        <span>{req.location.latitude.toFixed(2)}, {req.location.longitude.toFixed(2)}</span>
                        <span className="mx-2">·</span>
                        <span>{timeSince(req.createdAt)}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};
