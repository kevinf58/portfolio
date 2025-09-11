"use client";

import { ClientWrapperProps } from "@/types/ClientWrapperProps";
import React from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const ClientWrapper = (props: ClientWrapperProps) => {
  const currDeviceSize = useBreakpoint();

  return <section className="flex flex-col min-h-screen">{props.children}</section>;
};

export default ClientWrapper;
