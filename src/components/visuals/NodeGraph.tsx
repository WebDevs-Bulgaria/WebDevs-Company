const WIDTH = 900;
const HEIGHT = 560;
const NODE_COUNT = 46;
const LINK_DISTANCE = 150;

// Псевдослучайни числа с фиксирано начало: образът е еднакъв при всяко зареждане
// и на сървъра, и в браузъра (Math.random би дал разминаване).
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = createRandom(20261111);

const nodes = Array.from({ length: NODE_COUNT }, (_, index) => ({
  x: Math.round(40 + random() * (WIDTH - 80)),
  y: Math.round(40 + random() * (HEIGHT - 80)),
  radius: index % 7 === 0 ? 5 : index % 3 === 0 ? 3.2 : 2,
  highlight: index % 7 === 0,
}));

const links: { from: number; to: number; strength: number }[] = [];
for (let from = 0; from < nodes.length; from += 1) {
  for (let to = from + 1; to < nodes.length; to += 1) {
    const distance = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y);
    if (distance < LINK_DISTANCE) {
      links.push({ from, to, strength: Math.round((1 - distance / LINK_DISTANCE) * 100) / 100 });
    }
  }
}

/*
 * Абстрактен образ: мрежа от точки и връзки между тях — системи, които работят
 * заедно. Декоративен е (aria-hidden); цветовете идват от CSS променливите.
 */
export function NodeGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <g stroke="var(--color-night-accent)" strokeWidth="1.1">
        {links.map((link) => (
          <line
            key={`${link.from}-${link.to}`}
            x1={nodes[link.from].x}
            y1={nodes[link.from].y}
            x2={nodes[link.to].x}
            y2={nodes[link.to].y}
            opacity={0.2 + link.strength * 0.6}
          />
        ))}
      </g>
      {nodes.map((node, index) =>
        node.highlight ? (
          <g key={index}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius * 3.2}
              fill="var(--brand-from)"
              opacity="0.4"
              className="node-pulse"
              style={{ animationDelay: `${(index % 5) * 0.6}s` }}
            />
            <circle cx={node.x} cy={node.y} r={node.radius} fill="var(--color-night-accent)" />
          </g>
        ) : (
          <circle
            key={index}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill="var(--color-night-muted)"
            opacity="0.7"
          />
        ),
      )}
    </svg>
  );
}
