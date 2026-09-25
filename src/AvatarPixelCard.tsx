import React, { useRef, useState, useEffect, useCallback } from "react";

interface AvatarPixelCardProps {
  primarySrc: string;
  secondarySrc: string;
  alt: string;
  className?: string;
  duration?: number; // duration of one phase in ms
}

export function AvatarPixelCard({
  primarySrc,
  secondarySrc,
  alt,
  className = "w-24 h-24 sm:w-36 sm:h-36 rounded-full",
  duration = 330,
}: AvatarPixelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bigSquaresRef = useRef<HTMLDivElement[]>([]);
  const pixelsRef = useRef<HTMLDivElement[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isTouchRef = useRef(false);

  const BIG_GRID = 4; // 4x4 big squares
  const SMALL_PER_BIG = 2; // 2x2 small squares inside each big square
  const TOTAL_SMALL = (BIG_GRID * SMALL_PER_BIG) * (BIG_GRID * SMALL_PER_BIG); // 64 small squares

  // Build 4x4 big squares, each holding 4 small squares of the same size as current (12.5%)
  const bigSquares = [];
  let pixelIndex = 0;

  for (let br = 0; br < BIG_GRID; br++) {
    for (let bc = 0; bc < BIG_GRID; bc++) {
      const bigIdx = br * BIG_GRID + bc;
      const smallSquares = [];

      for (let sr = 0; sr < SMALL_PER_BIG; sr++) {
        for (let sc = 0; sc < SMALL_PER_BIG; sc++) {
          smallSquares.push({
            idx: pixelIndex++,
            top: `${sr * 50}%`,
            left: `${sc * 50}%`,
          });
        }
      }

      bigSquares.push({
        id: `big-${br}-${bc}`,
        bigIdx,
        top: `${br * 25}%`,
        left: `${bc * 25}%`,
        isTop: br === 0,
        isLeft: bc === 0,
        smallSquares,
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

  // Update big squares border visibility only when at least one small square inside is shown
  const updateBigSquaresVisibility = () => {
    for (let b = 0; b < 16; b++) {
      const b0 = b * 4;
      const hasVisible =
        pixelsRef.current[b0]?.style.display === "block" ||
        pixelsRef.current[b0 + 1]?.style.display === "block" ||
        pixelsRef.current[b0 + 2]?.style.display === "block" ||
        pixelsRef.current[b0 + 3]?.style.display === "block";

      if (bigSquaresRef.current[b]) {
        bigSquaresRef.current[b].style.display = hasVisible ? "block" : "none";
      }
    }
  };

  // Run mosaic transition
  const triggerTransition = useCallback((toSecondary: boolean) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const order1 = shuffleArray([...Array(TOTAL_SMALL).keys()]);
    const order2 = shuffleArray([...Array(TOTAL_SMALL).keys()]);
    const phaseDuration = duration;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;

      if (elapsed < phaseDuration) {
        // Phase 1: Random small pixels appear, covering old photo
        const progress = elapsed / phaseDuration;
        const count = Math.min(TOTAL_SMALL, Math.floor(progress * TOTAL_SMALL));
        for (let i = 0; i < TOTAL_SMALL; i++) {
          const el = pixelsRef.current[order1[i]];
          if (el) el.style.display = i < count ? "block" : "none";
        }
        updateBigSquaresVisibility();
        animFrameRef.current = requestAnimationFrame(step);
      } else if (elapsed < phaseDuration * 2) {
        // Midpoint: switch image
        setShowSecondary(toSecondary);

        // Phase 2: Random small pixels disappear, revealing new photo
        const progress2 = (elapsed - phaseDuration) / phaseDuration;
        const hideCount = Math.min(TOTAL_SMALL, Math.floor(progress2 * TOTAL_SMALL));
        for (let i = 0; i < TOTAL_SMALL; i++) {
          const el = pixelsRef.current[order2[i]];
          if (el) el.style.display = i < hideCount ? "none" : "block";
        }
        updateBigSquaresVisibility();
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Complete
        for (let i = 0; i < TOTAL_SMALL; i++) {
          const el = pixelsRef.current[i];
          if (el) el.style.display = "none";
        }
        for (let b = 0; b < 16; b++) {
          if (bigSquaresRef.current[b]) {
            bigSquaresRef.current[b].style.display = "none";
          }
        }
        setShowSecondary(toSecondary);
        animFrameRef.current = null;
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, [duration, shuffleArray, TOTAL_SMALL]);

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

      {/* Secondary (Real Photo) Image */}
      <img
        src={secondarySrc}
        alt={alt}
        className={`w-full h-full object-cover object-[center_18%] scale-112 select-none pointer-events-none absolute inset-0 transition-opacity duration-150 ${
          showSecondary ? "opacity-100" : "opacity-0"
        }`}
        loading="eager"
      />

      {/* Pixel mosaic overlay: 4x4 big squares with delicate black borders, each containing 2x2 white small squares */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {bigSquares.map((big) => (
          <div
            key={big.id}
            ref={(el) => {
              if (el) bigSquaresRef.current[big.bigIdx] = el;
            }}
            style={{
              top: big.top,
              left: big.left,
              width: "25%",
              height: "25%",
              display: "none",
            }}
            className={`absolute border-r-[0.5px] border-b-[0.5px] border-black/35 box-border ${
              big.isTop ? "border-t-[0.5px]" : ""
            } ${big.isLeft ? "border-l-[0.5px]" : ""}`}
          >
            {big.smallSquares.map((small) => (
              <div
                key={small.idx}
                ref={(el) => {
                  if (el) pixelsRef.current[small.idx] = el;
                }}
                style={{
                  top: small.top,
                  left: small.left,
                  width: "50%",
                  height: "50%",
                  display: "none",
                }}
                className="absolute bg-white box-border"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
