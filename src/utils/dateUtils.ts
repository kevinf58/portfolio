// retrieves the current date of your local time
export const getLocalDate = (): string => {
  const today = new Date();
  const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return currentDate;
};

export function dateToReadable(isoString: string): string {
  const date = new Date(isoString);

  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${weekday}, ${month} ${ordinalSuffix(day)}, ${year}`;
}

function ordinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
