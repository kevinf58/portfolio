'use client';

import { ButtonProps } from '@/types/ButtonProps';
import { useRef } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

export const Button = (props: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.();
      }}
      className={`relative overflow-hidden group border-2 border-primary hover:bg-primary/15 hover:cursor-pointer hover:shadow-primary px-5 py-2 rounded-full transition-colors duration-400 ease-in-out ${props.className}`}
    >
      <div className='flex items-center gap-3 font-medium text-white mr-1'>
        {props.children} <FaArrowRightLong className='group-hover:translate-x-1 transition-transform duration-200 ease-in' />
      </div>
    </button>
  );
};
