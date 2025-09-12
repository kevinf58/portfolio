import { VerticalCarouselProps } from "@/types/VerticalCarouselProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdImageNotSupported } from "react-icons/md";

const VerticalCarousel = (props: VerticalCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({ startY: 0, top: 0 });
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverDelayRef = useRef<NodeJS.Timeout | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    dragStateRef.current = {
      startY: e.clientY,
      top: containerRef.current?.scrollTop,
    };
    setDragging(true);
    cancelAutoScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const y = e.clientY - dragStateRef.current.startY;
    containerRef.current.scrollTop = dragStateRef.current.top - y * 3.5;
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseEnter = () => {
    if (dragging) return;
    hoverDelayRef.current = setTimeout(() => {
      scrollIntervalRef.current = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop += 1.5;
        }
      }, 16);
    }, 1000);
  };

  const handleMouseLeave = () => {
    setDragging(false);
    cancelAutoScroll();
  };

  const handleWheel = () => {
    cancelAutoScroll();
  };

  const cancelAutoScroll = () => {
    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    return () => cancelAutoScroll();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onWheel={handleWheel}
      className={`relative flex justify-center rounded-lg border-2 border-black overflow-y-auto cursor-grab active:cursor-grabbing hide-scrollbar select-none ${props.className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-white bg-opacity-70">
          <MdImageNotSupported className="text-4xl text-gray-400 animate-pulse" />
        </div>
      )}
      {props.images[0] && (
        <div className="relative w-full flex flex-col gap-1">
          {props.images.map((imgSrc, index) => (
            <Image
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              width={500}
              height={10000}
              className="object-top"
              draggable={false}
              onLoad={() => {
                if (index === 0) setLoading(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalCarousel;
