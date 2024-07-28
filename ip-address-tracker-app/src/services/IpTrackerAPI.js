const ENDPOINT = import.meta.env.PROD
  ? "https://ip-tracker-carlosmndzg.netlify.app/ip-tracker"
  : "http://localhost:8888/ip-tracker";

/**
 * Returns information related to a given IP. If no IP is provided, it will take the current IP being used (the client one)
 * @param {*} ip
 * @returns Object with information related to the IP
 */
const getInformationByIP = async (ip = "") => {
  const response = await fetch(`${ENDPOINT}?ip=${ip}`);
  const data = await response.json();

  return data;
};

export { getInformationByIP };
