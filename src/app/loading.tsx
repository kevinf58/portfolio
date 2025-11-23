"use client";

import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <section className="relative flex justify-center h-[calc(100vh-4.75rem)] w-full bg-dark-gray shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="flex flex-col items-center justify-center">
        <CgSpinner className="size-10 animate-spin text-white" />
      </div>
    </section>
  );
};

export default Loading;
