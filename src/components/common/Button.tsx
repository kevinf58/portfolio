"use client";

import { ButtonProps } from "@/types/components/ButtonProps";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export const Button = ({ variant = "solid", size = "default", ...props }: ButtonProps) => {
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
        if (variant === "hollow") createRipple(e);
        props.onClick?.(e);
        if (props.href) router.push(props.href.toString());
      }}
      title={props.title}
      className={`relative overflow-hidden group border-2 border-primary lg:hover:cursor-pointer hover:scale-[102%] active:transition-none active:scale-97 rounded-full transition-all duration-100 ease-in-out ${props.className}
      ${props.disabled && "pointer-events-none brightness-70"} ${variant === "hollow" ? "bg-transparent lg:hover:bg-primary/15" : "bg-primary"}`}
    >
      <div
        className={`flex items-center gap-2 font-sans font-medium text-white ${size === "default" ? "text-sm mx-4 my-1.5" : "text-xs mx-3 my-1.5"}`}
      >
        {props.children}
      </div>
    </button>
  );
};
