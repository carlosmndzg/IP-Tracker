import "leaflet/dist/leaflet.css";
import { useMap } from "../hooks/useMap";

function Map({ coordinates }) {
  useMap({ id: "map", coordinates });

  return (
    <div className="isolate min-h-[60vh] flex-grow bg-slate-500" id="map"></div>
  );
}

export default Map;
