"use client";

import { BaseProps } from "@/types/components/ui/Base.type";
import { SessionProvider } from "next-auth/react";

const ClientWrapper = (props: BaseProps) => {
  return (
    <SessionProvider>
      <section className="flex flex-col min-h-screen">{props.children}</section>
    </SessionProvider>
  );
};

export default ClientWrapper;
