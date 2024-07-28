import { useState } from "react";
import IpAddressForm from "./components/IpAddressForm";
import Map from "./components/Map";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Attributions from "./components/Attributions";

export default function App() {
  const [mapInformation, setMapInformation] = useState({
    location: "Brooklyn, NY 10001",
    timezone: "America/Los_Angeles",
    isp: "SpaceX Starlink",
    ip: "192.212.174.101",
    latitude: 51.505,
    longitude: -0.09,
  });

  return (
    <MainContainer>
      <IpAddressForm
        mapInformation={mapInformation}
        setMapInformation={setMapInformation}
      />
      <Map
        coordinates={{
          latitude: mapInformation.latitude,
          longitude: mapInformation.longitude,
        }}
      />
      <ToastContainer />
      <Attributions />
    </MainContainer>
  );
}

function MainContainer({ children }) {
  return <div className="flex min-h-[100vh] flex-col">{children}</div>;
}
