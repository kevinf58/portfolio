"use client";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";

const DateInput = () => {
  const { date, setDate } = useDocumentFormContext();

  return (
    <input
      type="date"
      className={`w-min h-min outline-none py-2 px-2 text-xs! text-dark-white ease-in cursor-pointer input-base`}
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};

export default DateInput;
