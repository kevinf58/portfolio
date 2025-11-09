// retrieves the current date of your local time
export const getCurrentDate = (): string => {
  const today = new Date();
  const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return currentDate;
};

export const dateToReadable = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleDateString("en-US", { month: "long" });

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const ordinal = getOrdinal(day);
  const yearNum = date.getFullYear();

  return `${weekday}, ${monthName} ${day}${ordinal}, ${yearNum}`;
};
