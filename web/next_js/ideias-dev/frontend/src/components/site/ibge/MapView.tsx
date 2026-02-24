'use client';

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Municipality } from "./IBGEExplorer";

type MarkerData = {
  name: string;
  lat: number;
  lon: number;
};

const cache: Record<string, MarkerData> = {};

type Props = {
  municipalities: Municipality[];
};

export const MapView = ({ municipalities }: Props) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const results: MarkerData[] = [...markers];

      for (const m of municipalities) {
        if (cache[m.nome]) {
          if (!markers.find(marker => marker.name === m.nome)) {
            results.push(cache[m.nome]);
          }
          continue;
        }

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              m.nome + ", Brasil"
            )}`
          );
          const data = await response.json();
          if (data[0]) {
            const marker = {
              name: m.nome,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
            };
            cache[m.nome] = marker;
            results.push(marker);
          }
        } catch (error) {
          console.error("Erro no geocoding:", error);
        }
      }

      setMarkers(results);
    };

    if (municipalities.length > 0) fetchCoordinates();
  }, [municipalities]);

  const center = markers[0] ? [markers[0].lat, markers[0].lon] : [-14.235, -51.9253];

  return (
    <div className="h-96">
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => (
          <Marker
            key={i}
            position={[m.lat, m.lon]}
            icon={L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
