import { useEffect, useState } from "react";
import { getInformationByIP } from "../services/IpTrackerAPI";
import { getUTCOffset } from "../services/TimezoneConverter";

import { emitErrorToast, emitSuccessfullToast } from "../services/ToastEmitter";

function IpAddressForm({ mapInformation, setMapInformation }) {
  const [ipField, setIpField] = useState("");
  const { location, timezone, isp, ip } = mapInformation;

  const onSubmit = (event) => {
    event.preventDefault();

    (async () => {
      const data = await getInformationByIP(ipField);

      if (data.status === "success") {
        emitSuccessfullToast("IP found successfully!");

        setMapInformation({
          location: `${data.city}, ${data.country}`,
          timezone: data.timezone,
          isp: data.isp,
          ip: data.query,
          latitude: data.lat,
          longitude: data.lon,
        });
      } else {
        emitErrorToast("An error was found while finding the provided IP.");
      }

      setIpField("");
    })();
  };

  useEffect(() => {
    (async () => {
      const data = await getInformationByIP();

      setMapInformation({
        location: `${data.city}, ${data.country}`,
        timezone: data.timezone,
        isp: data.isp,
        ip: data.query,
        latitude: data.lat,
        longitude: data.lon,
      });
    })();
  }, [setMapInformation]);

  useEffect(() => {
    const onResize = () => {
      const element = document.getElementById("information");
      const height = element.offsetHeight;
      element.style.marginBottom = `-${height / 2}px`;
    };

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="bg-pattern-bg-mobile bg-cover bg-no-repeat px-5 pb-[0.1px] pt-5 lg:bg-pattern-bg-desktop lg:pt-8">
      <h1 className="mb-8 text-center font-['Rubik'] text-2xl font-medium text-white lg:text-3xl">
        IP Address Tracker
      </h1>
      <form className="mx-auto mb-8 flex max-w-3xl" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-full rounded-l-xl px-6 py-4 text-lg font-medium text-very_dark_grey focus:outline-none"
          placeholder="Search for any IP address or domain"
          value={ipField}
          onChange={(e) => setIpField(e.target.value)}
        />
        <input
          type="submit"
          value=">"
          className="cursor-pointer rounded-r-xl bg-very_dark_grey px-5 pb-3 pt-2 text-2xl leading-8 text-white hover:bg-gray-800 focus:outline-none"
        />
      </form>
      <InformationContainer>
        <InformationField title="IP Address" value={ip} />
        <Separator />
        <InformationField title="Location" value={location} />
        <Separator />
        <InformationField title="Timezone" value={getUTCOffset(timezone)} />
        <Separator />
        <InformationField title="ISP" value={isp} />
      </InformationContainer>
    </div>
  );
}

function InformationContainer({ children }) {
  return (
    <ul
      id="information"
      className="relative z-[1000] mx-auto mb-[-96px] flex flex-col items-center gap-3 rounded-2xl bg-white p-6 lg:max-w-6xl lg:flex-row lg:items-start lg:justify-between lg:p-8"
    >
      {children}
    </ul>
  );
}

function InformationField({ title, value }) {
  return (
    <li className="flex flex-col items-center gap-1 px-6 lg:w-full lg:items-start">
      <h2 className="text-[0.625rem] font-extrabold uppercase tracking-widest text-dark_grey lg:text-xs lg:font-bold">
        {title}
      </h2>
      <p className="text-center text-lg font-bold text-very_dark_grey lg:text-left lg:text-2xl">
        {value}
      </p>
    </li>
  );
}

function Separator() {
  return (
    <li className="hidden w-[1px] self-stretch bg-dark_grey lg:block"></li>
  );
}

export default IpAddressForm;
