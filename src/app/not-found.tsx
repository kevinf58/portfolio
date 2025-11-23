"use client";

import Link from "@/components/common/Link";

const NotFound = () => {
  return (
    <section className="z-10 relative flex justify-center h-[calc(100vh-4.75rem)] w-full bg-dark-gray shadow-default">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold">404</h1>
        <h6 className="text-lg font-medium">Page Not Found</h6>
        <Link href={"/"} underlined className="mt-4">
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
