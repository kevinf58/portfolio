"use client";

import { ClientWrapperProps } from "@/types/ClientWrapperProps";
import React from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Cursor from "./common/Cursor";

const ClientWrapper = (props: ClientWrapperProps) => {
  const currDeviceSize = useBreakpoint();

  return (
    <section className="flex flex-col min-h-screen">
      {/* {!(currDeviceSize === "sm" || currDeviceSize === "md") && <Cursor />} */}
      {props.children}
    </section>
  );
};

export default ClientWrapper;
