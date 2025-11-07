import React from 'react';
import { Coordinates } from '../../types';

interface MapProps {
    coordinates: Coordinates;
    zoom?: number;
}

// NOTE: This component uses an OpenStreetMap iframe for demonstration.
// A production app should use a robust mapping library like Google Maps or Mapbox with an API key.
export const Map: React.FC<MapProps> = ({ coordinates }) => {
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.longitude-0.01}%2C${coordinates.latitude-0.01}%2C${coordinates.longitude+0.01}%2C${coordinates.latitude+0.01}&layer=mapnik&marker=${coordinates.latitude}%2C${coordinates.longitude}`;

    return (
        <div className="rounded-lg overflow-hidden border-2 border-gray-700 aspect-video">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapUrl}
                aria-label="Map showing delivery location"
                style={{ border: 0 }}
                title="Delivery Location Map"
            ></iframe>
        </div>
    );
};
