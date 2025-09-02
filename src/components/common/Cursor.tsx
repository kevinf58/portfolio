"use client";

import { useEffect, useState } from "react";

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoveringClickable, setHoveringClickable] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleCursorMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const elem = e.target as HTMLElement | null;

      let clickable = false;
      if (elem instanceof Element) {
        const clickableElems = elem.closest("a, button");
        if (clickableElems) {
          clickable = true;
        }
      }
      setHoveringClickable(clickable);
    };
    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mousemove", handleCursorMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleCursorMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const conditionalSizing = hoveringClickable
    ? mouseDown
      ? "w-9 h-9 duration-0"
      : "w-12 h-12 duration-200"
    : mouseDown
      ? "w-2.5 h-2.5 duration-0"
      : "w-3 h-3 duration-200";

  const conditionalBg = hoveringClickable ? "bg-black/55" : "bg-primary/65";

  return (
    <div
      className={`fixed z-50 pointer-events-none ${hoveringClickable && "mix-blend-difference"}`}
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div className={`rounded-full transition-all ${conditionalSizing} ${conditionalBg}`} />
    </div>
  );
};

export default Cursor;
