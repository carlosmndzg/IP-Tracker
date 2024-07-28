export default async (request) => {
  const url = new URL(request.url);

  const ip = url.searchParams.get("ip") ?? "";

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
