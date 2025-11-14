"use client";

import { BaseProps } from "@/types/components/Base.type";

const ClientWrapper = (props: BaseProps) => {
  return <section className="flex flex-col min-h-screen">{props.children}</section>;
};

export default ClientWrapper;
