// retrieves the current date of your local time
export const getLocalDate = (): string => {
  const today = new Date();
  const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return currentDate;
};

// turns ISO date formats like "2025-01-08T16:45:00.000Z" to "2026-01-02" format in local time
export const isoToLocalDate = (isoString: string): string => {
  const date = new Date(isoString);
  const currentDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  return currentDate;
};

export const dateToReadable = (isoString: string): string => {
  const normalized = isoString.length === 10 ? `${isoString}T00:00:00` : isoString.replace("Z", "");
  const date = new Date(normalized);

  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${weekday}, ${month} ${ordinalSuffix(day)}, ${year}`;
};

const ordinalSuffix = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
