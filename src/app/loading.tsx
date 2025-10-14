"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <section className="relative flex justify-center h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="flex flex-col items-center">
        <DotLottieReact src="/animations/loading-dark.lottie" loop autoplay speed={3} />{" "}
      </div>
    </section>
  );
};

export default Loading;
