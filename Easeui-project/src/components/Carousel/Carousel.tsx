import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/libs/utils";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  interval?: number;
}

const Carousel = ({ children, interval = 0, className, ...props }: CarouselProps) => {
  const slides = React.Children.toArray(children);
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % slides.length);
  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!interval) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [interval, slides.length]);

  return (
    <div
      className={cn(
        "relative w-full max-w-xl overflow-hidden rounded-lg select-none",
        className
      )}
      {...props}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === active ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
