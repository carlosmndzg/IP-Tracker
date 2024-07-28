import { useEffect } from "react";
import L from "leaflet";

export function useMap({ id = "map", coordinates }) {
  useEffect(() => {
    const { latitude, longitude } = coordinates;

    var map = L.map(id).setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    return () => {
      map.off();
      map.remove();
    };
  }, [id, coordinates]);
}
