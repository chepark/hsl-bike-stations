import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LeafletEvent } from 'leaflet';
import { chooseIconBasedonZoom } from '../utils/mapUtils';
import { StationType } from '../models/stationsInterface';

function MapComponent({
  setZoomLevel,
}: {
  setZoomLevel: (zoom: number) => void;
}) {
  const map = useMap();

  const handleZoomChange = (event: LeafletEvent) => {
    const newZoom = event.target.getZoom();
    setZoomLevel(newZoom);
  };

  useEffect(() => {
    map.on('zoom', handleZoomChange);

    return () => {
      map.off('zoom', handleZoomChange);
    };
  }, [map]);

  return null;
}

interface IProps<T> {
  data: T[];
  center?: [number, number];
  zoom?: number;
}

function InteractiveMap<T extends StationType>({
  data,
  center = [60.1699, 24.93], // Helsinki
  zoom = 13,
}: IProps<T>) {
  const [zoomLevel, setZoomLevel] = useState<number>(zoom);

  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      style={{ width: '100%', height: '100%' }}
    >
      <MapComponent setZoomLevel={setZoomLevel} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((set, i) => (
        <Marker
          key={i}
          icon={chooseIconBasedonZoom(zoomLevel)}
          position={[
            Number(set.station_latitude),
            Number(set.station_longitude),
          ]}
        >
          <Popup>
            <b>{set.station_name}</b>
            <br />
            <span
              style={{
                border: '1px solid grey',
                width: 'fit-content',
                padding: '0 1px',
                color: 'grey',
              }}
            >
              {set.station_id}
            </span>
            <span style={{ color: 'grey', marginLeft: '3px' }}>
              {set.station_address}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default InteractiveMap;
