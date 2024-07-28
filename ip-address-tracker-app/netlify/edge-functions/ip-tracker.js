const getIPv4FromIPv6 = (ipv6) => {
  if (!ipv6 || typeof ipv6 !== "string") {
    return "";
  }

  const ipv4MappedPrefix = "::ffff:";
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (ipv6.startsWith(ipv4MappedPrefix)) {
    const ipv4Part = ipv6.substring(ipv4MappedPrefix.length);

    if (ipv4Regex.test(ipv4Part)) {
      return ipv4Part;
    }
  } else {
    if (ipv4Regex.test(ipv6)) {
      return ipv6;
    }
  }

  return "";
};

const isPrivateIP = (ip) => {
  if (!ip || typeof ip !== "string") {
    return false;
  }

  var parts = ip.split(".");
  return (
    parts[0] === "10" ||
    (parts[0] === "172" &&
      parseInt(parts[1], 10) >= 16 &&
      parseInt(parts[1], 10) <= 31) ||
    (parts[0] === "192" && parts[1] === "168")
  );
};

const getClientIP = (request) => {
  const ipWithoutParsing = request.headers
    .get("x-forwarded-for")
    ?.split(/\s*,\s*/)[0];

  const ip = getIPv4FromIPv6(ipWithoutParsing);

  if (isPrivateIP(ip)) {
    return "";
  }

  return ip;
};

export default async (request) => {
  const url = new URL(request.url);

  const ip = url.searchParams.get("ip") || getClientIP(request);

  console.log("Request IP: " + ip);

  const response = await fetch(
    `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,as,query`,
  );
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify(data),
  });
};

export const config = { path: "/ip-tracker" };
