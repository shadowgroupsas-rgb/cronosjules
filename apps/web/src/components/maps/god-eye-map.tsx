"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 4.7110, // Bogota
  lng: -74.0721,
};

interface GodEyeMapProps {
  users: any[];
  onSelectUser: (user: any) => void;
  selectedUser?: any;
}

export function GodEyeMap({ users, onSelectUser, selectedUser }: GodEyeMapProps) {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    // Only access env on client if needed, or pass from server
    const k = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (k) setKey(k);
  }, []);

  if (!key) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 border border-zinc-800 rounded-md">
        <p>Google Maps API Key not configured (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedUser ? { lat: selectedUser.lat, lng: selectedUser.lng } : defaultCenter}
        zoom={selectedUser ? 15 : 12}
        options={{
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                {
                  featureType: "administrative.locality",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#d59563" }],
                },
                // Dark mode styles simplified
            ]
        }}
      >
        {users.map((user) => (
          <Marker
            key={user.id}
            position={{ lat: user.lat, lng: user.lng }}
            onClick={() => onSelectUser(user)}
            icon={user.id === selectedUser?.id ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : undefined}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
