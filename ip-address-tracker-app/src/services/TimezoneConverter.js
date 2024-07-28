const getUTCOffset = (timeZone) => {
  const now = new Date();

  const options = { timeZone, timeZoneName: "short" };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const parts = dateTimeFormat.formatToParts(now);

  const timeZoneName = parts.find((part) => part.type === "timeZoneName").value;

  return timeZoneName;
};

export { getUTCOffset };
