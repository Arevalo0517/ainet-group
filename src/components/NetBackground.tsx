import { useEffect, useMemo, useRef, useState } from "react";

const W = 1200;
const H = 600;

function build(count: number) {
  // fixed seed: same map on every render
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes = Array.from({ length: count }, () => ({
    x: rnd() * W,
    y: rnd() * H,
    r: 1.6 + rnd() * 2.4,
  }));
  const lines = nodes
    .map((a, i) => ({ a, b: nodes[(i * 7 + 3) % count] }))
    .filter(({ a, b }) => Math.hypot(a.x - b.x, a.y - b.y) < W * 0.4);
  return { nodes, lines };
}

export default function NetBackground({ className = "" }: { className?: string }) {
  const [count] = useState(() =>
    window.matchMedia("(max-width: 639px)").matches ? 14 : 30,
  );
  const { nodes, lines } = useMemo(() => build(count), [count]);
  const ref = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);

  // stop animating off-screen so phones don't burn paint
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`net ${paused ? "net--paused" : ""} ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="net-a">
        {lines.map(({ a, b }, i) =>
          i % 2 === 0 ? <line key={i} className="net-line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} /> : null,
        )}
      </g>
      <g className="net-b">
        {lines.map(({ a, b }, i) =>
          i % 2 === 1 ? (
            <line
              key={i}
              className={i % 5 === 1 ? "net-line flow" : "net-line"}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
            />
          ) : null,
        )}
      </g>
      <g className="net-b">
        {nodes.map((n, i) => (
          <circle
            key={i}
            className="node"
            cx={n.x}
            cy={n.y}
            r={n.r}
            style={{ animationDelay: `${(i % 7) * 0.4}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
