"use client";

import { TextAnimationProps } from "@/types/components/ui/TextAnimation.type";
import { motion } from "framer-motion";

export function TextAnimation({ replay = false, ...props }: TextAnimationProps) {
  const MotionComponent = motion[props.element];

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: props.delay,
      }}
      viewport={{ once: !replay, amount: 0.2 }}
      className={` ${props.className}`}
    >
      {props.children}
    </MotionComponent>
  );
}
