import React, { useRef, useState, useEffect, useCallback } from "react";

interface AvatarPixelCardProps {
  primarySrc: string;
  secondarySrc: string;
  alt: string;
  className?: string;
  gridSize?: number;
  duration?: number; // duration of one phase in ms
}

export function AvatarPixelCard({
  primarySrc,
  secondarySrc,
  alt,
  className = "w-24 h-24 sm:w-36 sm:h-36 rounded-full",
  gridSize = 7,
  duration = 320,
}: AvatarPixelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLDivElement[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isTouchRef = useRef(false);

  const totalCells = gridSize * gridSize;

  // Initialize pixels array (7x7 grid for larger, distinct mosaic tiles)
  const pixelCells = [];
  const cellSize = 100 / gridSize;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      pixelCells.push({
        id: `${r}-${c}`,
        top: `${r * cellSize}%`,
        left: `${c * cellSize}%`,
        width: `${cellSize}%`,
        height: `${cellSize}%`,
      });
    }
  }

  // Shuffle utility
  const shuffleArray = useCallback((arr: number[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  // Run mosaic transition
  const triggerTransition = useCallback((toSecondary: boolean) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const order1 = shuffleArray([...Array(totalCells).keys()]);
    const order2 = shuffleArray([...Array(totalCells).keys()]);
    const phaseDuration = duration;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;

      if (elapsed < phaseDuration) {
        // Phase 1: Random pixels appear, covering old photo
        const progress = elapsed / phaseDuration;
        const count = Math.min(totalCells, Math.floor(progress * totalCells));
        for (let i = 0; i < totalCells; i++) {
          const el = pixelsRef.current[order1[i]];
          if (el) el.style.display = i < count ? "block" : "none";
        }
        animFrameRef.current = requestAnimationFrame(step);
      } else if (elapsed < phaseDuration * 2) {
        // Midpoint: switch image
        setShowSecondary(toSecondary);

        // Phase 2: Random pixels disappear, revealing new photo
        const progress2 = (elapsed - phaseDuration) / phaseDuration;
        const hideCount = Math.min(totalCells, Math.floor(progress2 * totalCells));
        for (let i = 0; i < totalCells; i++) {
          const el = pixelsRef.current[order2[i]];
          if (el) el.style.display = i < hideCount ? "none" : "block";
        }
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Complete
        for (let i = 0; i < totalCells; i++) {
          const el = pixelsRef.current[i];
          if (el) el.style.display = "none";
        }
        setShowSecondary(toSecondary);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, [duration, shuffleArray, totalCells]);

  // Handle hover on desktop
  const handleMouseEnter = () => {
    if (isTouchRef.current) return;
    if (!isHovered) {
      setIsHovered(true);
      triggerTransition(true);
    }
  };

  const handleMouseLeave = () => {
    if (isTouchRef.current) return;
    if (isHovered) {
      setIsHovered(false);
      triggerTransition(false);
    }
  };

  // Handle click / tap on mobile or desktop
  const handleClick = () => {
    const next = !showSecondary;
    setIsHovered(next);
    triggerTransition(next);
  };

  const handleTouchStart = () => {
    isTouchRef.current = true;
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Переключить аватар"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative overflow-hidden shrink-0 border border-zinc-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 shadow-xs cursor-pointer select-none touch-manipulation transition-transform duration-200 active:scale-95 ${className}`}
    >
      {/* Primary (Anime) Image */}
      <img
        src={primarySrc}
        alt={alt}
        className={`w-full h-full object-cover select-none pointer-events-none transition-opacity duration-150 ${
          showSecondary ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
      />

      {/* Secondary (Real Photo) Image - zoomed out slightly from the initial variant so more context is visible */}
      <img
        src={secondarySrc}
        alt={alt}
        className={`w-full h-full object-cover object-[center_18%] scale-112 select-none pointer-events-none absolute inset-0 transition-opacity duration-150 ${
          showSecondary ? "opacity-100" : "opacity-0"
        }`}
        loading="eager"
      />

      {/* Pixel mosaic overlay layer: white tiles with faint, delicate hairline border matching reference */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {pixelCells.map((cell, idx) => (
          <div
            key={cell.id}
            ref={(el) => {
              if (el) pixelsRef.current[idx] = el;
            }}
            style={{
              top: cell.top,
              left: cell.left,
              width: cell.width,
              height: cell.height,
              display: "none",
            }}
            className="absolute bg-white border-[0.5px] border-black/25 box-border"
          />
        ))}
      </div>
    </div>
  );
}
