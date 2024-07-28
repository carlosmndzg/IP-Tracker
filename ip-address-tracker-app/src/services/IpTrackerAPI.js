/**
 * Returns information related to a given IP. If no IP is provided, it will take the current IP being used (the client one)
 * @param {*} ip
 * @returns Object with information related to the IP
 */
const getInformationByIP = async (ip = "") => {
  const response = await fetch(
    `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,as,query`,
    {
      referrerPolicy: "unsafe-url",
    },
  );
  const data = await response.json();

  return data;
};

export { getInformationByIP };
