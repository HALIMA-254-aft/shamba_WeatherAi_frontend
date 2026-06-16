import { useState } from "react";

const PRESETS = [
  { label: "Nairobi", lat: -1.2921, lon: 36.8219 },
  { label: "Bomet", lat: -0.7813, lon: 35.3416 },
  { label: "Mombasa", lat: -4.0435, lon: 39.6682 },
  { label: "Kisumu", lat: -0.0917, lon: 34.768 },
  { label: "Eldoret", lat: 0.5143, lon: 35.2698 },
  { label: "Nakuru", lat: -0.3031, lon: 36.08 },
];

export default function LocationPicker({ onSelect, activeLat }) {
  const [geoError, setGeoError] = useState(null);

  function useMyLocation() {
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation isn’t available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSelect({
          label: "My location",
          lat: Number(pos.coords.latitude.toFixed(4)),
          lon: Number(pos.coords.longitude.toFixed(4)),
        });
      },
      () => setGeoError("Couldn’t get your location — pick a city instead.")
    );
  }

  return (
    <div className="picker">
      <div className="picker__cities">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className={
              "chip" + (activeLat === p.lat ? " chip--active" : "")
            }
            onClick={() => onSelect(p)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button className="picker__geo" onClick={useMyLocation}>
        Use my location
      </button>
      {geoError && <p className="picker__error">{geoError}</p>}
    </div>
  );
}
