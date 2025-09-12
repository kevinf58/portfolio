"use client";

import { ButtonProps } from "@/types/components/ButtonProps";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Button = (props: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const createRipple = (event: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.();
        if (props.href) router.push(props.href.toString());
      }}
      title={props.title}
      className={`relative overflow-hidden group border-2 border-primary lg:hover:bg-primary/15 lg:hover:cursor-pointer lg:hover:shadow-primary hover:scale-[102%] lg:active:scale-100 active:transition-none active:scale-[103%] px-4 py-1.5 rounded-sm transition-all duration-400 ease-in-out ${props.className}
      ${props.disabled && "pointer-events-none brightness-70"}`}
    >
      <div className="flex items-center gap-2 font-sans font-medium text-white text-sm">{props.children}</div>
    </button>
  );
};
