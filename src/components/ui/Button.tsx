"use client";

import { ButtonProps } from "@/types/components/ui/Button.type";
import { useRef } from "react";
import { CgSpinner } from "react-icons/cg";

const Button = ({ variant = "primary", size = "md", ...props }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDisabled = props.disabled || props.loading;

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

  const buttonSizeStyles =
    size === "sm" ? "text-xs font-light py-1.5 px-2.5" : size === "md" ? "text-sm py-1.5 px-3.5" : "text-lg font-semibold py-2.5 px-5.5";

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        if (variant === "secondary") createRipple(e);
        props.onClick?.(e);
      }}
      title={props.title}
      className={`relative overflow-hidden group border-2 border-primary lg:hover:cursor-pointer hover:scale-[101%] active:transition-none active:scale-98 rounded-full transition-all duration-100 ease-in-out ${
        props.className
      }
      ${isDisabled && "pointer-events-none brightness-70"} ${
        variant === "secondary" ? "bg-transparent lg:hover:bg-primary/15" : "bg-primary"
      }`}
    >
      <div className={`flex items-center gap-2 font-sans text-white whitespace-nowrap ${buttonSizeStyles}`}>
        {props.loading ? <CgSpinner className="animate-spin text-white" style={{ fontSize: "inherit" }} /> : props.children}
      </div>
    </button>
  );
};

export default Button;
