"use client";

import { useState } from "react";

const VisibilityToggle = () => {
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <button
      onClick={() => setIsPrivate(!isPrivate)}
      className="relative inline-flex h-8 w-40 items-center rounded-full bg-light-gray p-1 transition-colors cursor-pointer"
    >
      <span
        className={`absolute left-1 top-1 h-6 w-[calc(50%-4px)] rounded-full bg-gray shadow transition-transform duration-200
          ${isPrivate ? "translate-x-0" : "translate-x-full"}`}
      />
      <span className="relative z-10 flex w-full text-xs text-dark-white font-medium">
        <span className="flex w-1/2 items-center justify-center">Public</span>
        <span className="flex w-1/2 items-center justify-center">Private</span>
      </span>
    </button>
  );
};

export default VisibilityToggle;
