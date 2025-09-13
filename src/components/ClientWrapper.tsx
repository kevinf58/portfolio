"use client";

import { ClientWrapperProps } from "@/types/hooks/ClientWrapper.type";

const ClientWrapper = (props: ClientWrapperProps) => {
  return <section className="flex flex-col min-h-screen">{props.children}</section>;
};

export default ClientWrapper;
