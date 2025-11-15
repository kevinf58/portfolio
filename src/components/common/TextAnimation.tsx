import { TextAnimationProps } from "@/types/components/TextAnimation.type";
import { motion, useReducedMotion } from "motion/react";
import { JSX, useMemo } from "react";

const TextAnimation = (props: TextAnimationProps) => {
  const reduceMotion = useReducedMotion();
  const MotionComponent = useMemo(() => motion.create<keyof JSX.IntrinsicElements>(props.element), [props.element]);

  // render a plain element with no animation if reduceMotion is enabled
  if (reduceMotion) {
    const AnimationlessComponent = props.element as keyof JSX.IntrinsicElements;
    return <AnimationlessComponent className={props.className}>{props.children}</AnimationlessComponent>;
  } else {
    return (
      <MotionComponent
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: props.element === "h1" ? 0.25 : 0.5, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className={props.className}
      >
        {props.children}
      </MotionComponent>
    );
  }
};

export default TextAnimation;
