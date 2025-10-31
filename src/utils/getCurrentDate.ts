// retrieves the current date of your local time
const getCurrentDate = (): string => {
  const today = new Date();
  const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  return currentDate;
};

export default getCurrentDate;
