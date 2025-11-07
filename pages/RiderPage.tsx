import React, { useState } from 'react';
import { FuelRequest } from '../types';
import { RequestForm } from '../components/rider/RequestForm';
import { TrackingView } from '../components/rider/TrackingView';

export const RiderPage: React.FC = () => {
    const [submittedRequest, setSubmittedRequest] = useState<FuelRequest | null>(null);

    const handleRequestSubmit = (request: FuelRequest) => {
        setSubmittedRequest(request);
    };
    
    const handleNewRequest = () => {
        setSubmittedRequest(null);
    }

    return (
        <div className="w-full max-w-md animate-fade-in">
            {submittedRequest ? (
                <TrackingView request={submittedRequest} onNewRequest={handleNewRequest} />
            ) : (
                <RequestForm onSubmit={handleRequestSubmit} />
            )}
        </div>
    );
};
