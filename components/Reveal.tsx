"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children?: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
};

/** Fades its children in when scrolled into view. `delay` (ms) staggers siblings. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          // drop the stagger delay afterwards so hover transitions stay snappy
          setTimeout(() => el.style.setProperty("--d", "0ms"), delay + 1000);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms`, ...style } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
