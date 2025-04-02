import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { setMapLoaded } from "../store/profileSlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
// This is needed because the default marker icons are missing when using webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Component to handle map view updates when coordinates change
function FlyToMarker({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 14, {
        duration: 1.5,
        animate: true,
      });

      // Once flying is complete, ensure loading state is cleared
      setTimeout(() => {
        // This will clear any lingering loading state
        map.invalidateSize();
      }, 2000);
    }
  }, [coordinates, map]);

  return null;
}

// Component to handle map loading
function MapLoadHandler() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Map is ready - trigger the setMapLoaded action immediately
    dispatch(setMapLoaded());
  }, [dispatch]);

  return null;
}

const MapView = () => {
  const { selectedProfile, isMapLoading, mapError } = useSelector(
    (state) => state.profiles
  );
  const dispatch = useDispatch();

  // Directly clear loading state when component mounts or unmounts
  useEffect(() => {
    return () => {
      dispatch(setMapLoaded());
    };
  }, [dispatch]);

  if (!selectedProfile) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <div className="text-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-gray-500 text-sm md:text-base">
            Select a profile to view their location on the map
          </p>
        </div>
      </div>
    );
  }

  // Prepare coordinates in the correct format for Leaflet
  const coordinates = [
    selectedProfile.coordinates.lat,
    selectedProfile.coordinates.lng,
  ];

  // Use a key to force the MapContainer to re-render when the profile changes
  const mapKey = `map-${selectedProfile.id}`;

  return (
    <div className="relative w-full h-full">
      {isMapLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-xs mx-auto text-center">
            <p className="text-sm">{mapError}</p>
          </div>
        </div>
      )}

      <MapContainer
        key={mapKey}
        center={coordinates}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup className="text-sm">
            <strong>{selectedProfile.name}</strong>
            <br />
            {selectedProfile.address}
          </Popup>
        </Marker>
        <FlyToMarker coordinates={coordinates} />
        <MapLoadHandler />
        <div className="absolute right-2 top-2 z-[1000]">
          <button
            onClick={() =>
              document.querySelector(".leaflet-control-zoom-in")?.click()
            }
            className="bg-white p-1 rounded-t border border-gray-300 hover:bg-gray-100"
            aria-label="Zoom in"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              document.querySelector(".leaflet-control-zoom-out")?.click()
            }
            className="bg-white p-1 rounded-b border border-t-0 border-gray-300 hover:bg-gray-100"
            aria-label="Zoom out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>
        </div>
      </MapContainer>
    </div>
  );
};

export default MapView;
