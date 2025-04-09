import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { CircuitProps } from 'types/circuits';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({ points }: { points: CircuitProps[] }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [lng, setLng] = useState<string | number>(-70.9);
    const [lat, setLat] = useState<string | number>(42.35);
    const [zoom, setZoom] = useState<string | number>(9);

    useEffect(() => {
        if (mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-74.5, 40],
                zoom: 9,
            });

            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });

            points?.map((point) => {
                new mapboxgl.Marker({
                    draggable: false,
                })
                    .setLngLat([point.longitude, point.latitude])
                    .addTo(map);
            });
            return () => map.remove();
        }
    }, []);

    return (
        <div className="mt-10">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} style={{ width: '100%', height: '75vh' }} />
        </div>
    );
};

export default Map;
