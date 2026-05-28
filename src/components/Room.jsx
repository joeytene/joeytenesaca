import React from 'react';

/*
 * Isometric room SVG.
 * iso(x,y,z) → screen [px,py]
 *   x: depth axis toward screen-right
 *   y: height (up)
 *   z: depth axis toward screen-left
 * Room: 400x400 floor, 300 wall height.
 */

export default function Room({ onHotspot, hovered, setHovered }) {
  const iso = (x, y, z) => [
    +(450 + (x - z) * 0.8660254).toFixed(2),
    +(300 + (x + z) * 0.5 - y).toFixed(2),
  ];

  const pt = (x, y, z) => iso(x, y, z).join(',');
  const poly = (corners) => corners.map((c) => pt(...c)).join(' ');

  const OUTLINE = '#2a2825';

  // Smooth cable through 3D waypoints (Catmull-Rom → cubic Bézier), projected to
  // screen. Place a waypoint wherever a real cable bends: a port it plugs into,
  // an edge it drapes over, where it lands on the floor, etc. Slack/sag is baked
  // into the waypoint spacing so runs read as limp, not taut.
  const cablePath = (pts3d) => {
    const P = pts3d.map((p) => iso(...p));
    if (P.length < 2) return '';
    let d = `M ${P[0][0]} ${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i];
      const p1 = P[i];
      const p2 = P[i + 1];
      const p3 = P[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  };

  // A cable = a soft contact-shadow stroke under a darker core stroke.
  const Cable = ({ pts, w = 1.7, opacity = 0.95 }) => {
    const d = cablePath(pts);
    return (
      <g>
        <path d={d} fill="none" stroke="#0d0c0b" strokeWidth={w + 1.2}
          strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity * 0.3} />
        <path d={d} fill="none" stroke="#1a1816" strokeWidth={w}
          strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity} />
      </g>
    );
  };

  // Small jack/connector dot at a plug point.
  const Plug = ({ x, y, z, r = 2.2 }) => {
    const [px, py] = iso(x, y, z);
    return <circle cx={px} cy={py} r={r} fill="#1a1816" stroke="#0d0c0b" strokeWidth="0.5" />;
  };

  const Hot = ({ id, label, anchor, children }) => (
    <g
      className="hot"
      onMouseEnter={() => setHovered({ id, label, anchor })}
      onMouseLeave={() => setHovered(null)}
      onClick={() => onHotspot(id)}
    >
      {children}
    </g>
  );

  const polaroid = (x, y, w, h, fill, label) => {
    const x1 = x,
      x2 = x + w,
      y1 = y,
      y2 = y + h;
    return (
      <g key={`${x}-${y}-${label}`}>
        <polygon
          points={poly([
            [x1, y1, 0],
            [x2, y1, 0],
            [x2, y2, 0],
            [x1, y2, 0],
          ])}
          fill="#f0eeea"
          stroke={OUTLINE}
          strokeWidth="0.8"
        />

        <polygon
          points={poly([
            [x1 + 3, y1 + 3, 0],
            [x2 - 3, y1 + 3, 0],
            [x2 - 3, y2 - 10, 0],
            [x1 + 3, y2 - 10, 0],
          ])}
          fill={fill}
          stroke={OUTLINE}
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 900 760"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="wallR" x1="0" x2="1" y1="0" y2="0.4">
          <stop offset="0" stopColor="#dadcd9" />
          <stop offset="1" stopColor="#a8acaa" />
        </linearGradient>
        <linearGradient id="wallL" x1="1" x2="0" y1="0" y2="0.4">
          <stop offset="0" stopColor="#ced0cd" />
          <stop offset="1" stopColor="#9a9d9a" />
        </linearGradient>

        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5e6260" />
          <stop offset="1" stopColor="#363a38" />
        </linearGradient>

        <linearGradient id="desktop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a89c80" />
          <stop offset="1" stopColor="#7e7458" />
        </linearGradient>

        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3e45" />
          <stop offset="1" stopColor="#22252c" />
        </linearGradient>

        <filter id="warmGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix values="1 0 0 0 0.8  0 1 0 0 0.5  0 0 1 0 0.3  0 0 0 1 0" />
        </filter>

        <pattern id="cork" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#c5c8c0" />
          <circle cx="2" cy="2" r="0.5" fill="#a5a89e" opacity=".55" />
          <circle cx="5" cy="4" r="0.4" fill="#a5a89e" opacity=".4" />
          <circle cx="1" cy="5" r="0.3" fill="#a5a89e" opacity=".3" />
        </pattern>

        <pattern id="concrete" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="transparent" />
          <circle cx="2" cy="3" r="0.4" fill="#2a2825" opacity=".22" />
          <circle cx="9" cy="2" r="0.3" fill="#2a2825" opacity=".18" />
          <circle cx="5" cy="8" r="0.3" fill="#2a2825" opacity=".15" />
          <circle cx="12" cy="10" r="0.35" fill="#2a2825" opacity=".2" />
          <circle cx="3" cy="12" r="0.25" fill="#2a2825" opacity=".14" />
          <circle cx="8" cy="13" r="0.4" fill="#2a2825" opacity=".22" />
        </pattern>
      </defs>

      {/* Back-right wall (z=0) */}
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 300, 0],
          [400, 300, 0],
          [400, 0, 0],
        ])}
        fill="url(#wallR)"
        stroke={OUTLINE}
        strokeWidth="1.2"
      />
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 300, 0],
          [400, 300, 0],
          [400, 0, 0],
        ])}
        fill="url(#concrete)"
        stroke="none"
      />
      {/* Vertical streak marks on back-right wall (weathered concrete) */}
      {[60, 145, 210, 290, 348].map((x, i) => (
        <line
          key={`sr-${i}`}
          x1={iso(x, 280, 0)[0]}
          y1={iso(x, 280, 0)[1]}
          x2={iso(x, 20, 0)[0]}
          y2={iso(x, 20, 0)[1]}
          stroke="#2a2825"
          strokeOpacity={[0.08, 0.12, 0.06, 0.1, 0.07][i]}
          strokeWidth={[0.8, 1.2, 0.6, 1, 0.7][i]}
        />
      ))}

      {/* Back-left wall (x=0) */}
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 300, 0],
          [0, 300, 400],
          [0, 0, 400],
        ])}
        fill="url(#wallL)"
        stroke={OUTLINE}
        strokeWidth="1.2"
      />
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 300, 0],
          [0, 300, 400],
          [0, 0, 400],
        ])}
        fill="url(#concrete)"
        stroke="none"
      />
      {/* Vertical streak marks on back-left wall */}
      {[45, 175, 240, 310, 360].map((z, i) => (
        <line
          key={`sl-${i}`}
          x1={iso(0, 280, z)[0]}
          y1={iso(0, 280, z)[1]}
          x2={iso(0, 20, z)[0]}
          y2={iso(0, 20, z)[1]}
          stroke="#2a2825"
          strokeOpacity={[0.07, 0.11, 0.05, 0.13, 0.08][i]}
          strokeWidth={[0.7, 1.1, 0.6, 1.2, 0.8][i]}
        />
      ))}

      {/* Baseboard trim */}
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 8, 0],
          [400, 8, 0],
          [400, 0, 0],
        ])}
        fill="#d5d8d2"
        stroke={OUTLINE}
        strokeWidth="0.8"
      />
      <polygon
        points={poly([
          [0, 0, 0],
          [0, 8, 0],
          [0, 8, 400],
          [0, 0, 400],
        ])}
        fill="#c6cac1"
        stroke={OUTLINE}
        strokeWidth="0.8"
      />

      {/* Brutalist window — back-left wall, grid of teal panes */}
      <g>
        {/* Outer frame (dark concrete) */}
        <polygon
          points={poly([
            [0, 170, 60],
            [0, 260, 60],
            [0, 260, 170],
            [0, 170, 170],
          ])}
          fill="#2a2825"
          stroke={OUTLINE}
          strokeWidth="1.2"
        />
        {/* Glass panel grid: 2 rows × 3 columns of teal panes */}
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => {
            const yBase = 178 + row * 40;
            const zBase = 68 + col * 32;
            // Slightly different teal saturation per pane for variation
            const tones = [
              ['#7d938d', '#637c76', '#8ba39d'],
              ['#4d635d', '#7d938d', '#637c76'],
            ];
            const fill = tones[row][col];
            return (
              <g key={`win-${row}-${col}`}>
                <polygon
                  points={poly([
                    [0, yBase, zBase],
                    [0, yBase + 34, zBase],
                    [0, yBase + 34, zBase + 28],
                    [0, yBase, zBase + 28],
                  ])}
                  fill={fill}
                  stroke="none"
                />
                {/* Reflection highlight at top of pane */}
                <polygon
                  points={poly([
                    [0, yBase + 2, zBase + 2],
                    [0, yBase + 8, zBase + 2],
                    [0, yBase + 8, zBase + 14],
                    [0, yBase + 2, zBase + 14],
                  ])}
                  fill="#b6c4bf"
                  opacity=".22"
                />
              </g>
            );
          })
        )}
        {/* Vertical mullions */}
        {[100, 132].map((z, i) => (
          <line
            key={`mv-${i}`}
            x1={iso(0, 172, z)[0]}
            y1={iso(0, 172, z)[1]}
            x2={iso(0, 258, z)[0]}
            y2={iso(0, 258, z)[1]}
            stroke="#1a1816"
            strokeWidth="1.5"
          />
        ))}
        {/* Horizontal mullion (middle) */}
        <line
          x1={iso(0, 216, 62)[0]}
          y1={iso(0, 216, 62)[1]}
          x2={iso(0, 216, 168)[0]}
          y2={iso(0, 216, 168)[1]}
          stroke="#1a1816"
          strokeWidth="1.5"
        />
        {/* Bottom sill ledge */}
        <polygon
          points={poly([
            [0, 168, 58],
            [0, 174, 58],
            [0, 174, 172],
            [0, 168, 172],
          ])}
          fill="#4a4845"
          stroke={OUTLINE}
          strokeWidth="0.7"
        />
      </g>

      {/* Wall sconce */}
      <line
        {...(() => {
          const [a, b] = iso(80, 300, 0);
          const [c, d] = iso(80, 235, 0);
          return { x1: a, y1: b, x2: c, y2: d };
        })()}
        stroke={OUTLINE}
        strokeWidth="0.8"
      />
      <circle
        cx={iso(80, 228, 0)[0]}
        cy={iso(80, 228, 0)[1]}
        r="9"
        fill="#ece8de"
        stroke={OUTLINE}
        strokeWidth="1"
      />
      <ellipse
        cx={iso(80, 222, 0)[0]}
        cy={iso(80, 222, 0)[1]}
        rx="5"
        ry="2"
        fill="#fff"
        opacity=".8"
      />

      {/* Moodboard hotspot */}
      <Hot id="moodboard" label="thoughts" anchor={iso(250, 175, 0)}>
        <polygon
          points={poly([
            [110, 60, 0],
            [370, 60, 0],
            [370, 260, 0],
            [110, 260, 0],
          ])}
          fill="url(#cork)"
          stroke={OUTLINE}
          strokeWidth="1.4"
        />
        <polygon
          points={poly([
            [114, 64, 0],
            [366, 64, 0],
            [366, 256, 0],
            [114, 256, 0],
          ])}
          fill="none"
          stroke="#a8a49e"
          strokeWidth="0.5"
          strokeOpacity=".5"
        />

        {polaroid(125, 80, 50, 55, '#9aa0a8', 'p1')}
        {polaroid(185, 72, 55, 60, '#637c76', 'p2')}
        {polaroid(250, 82, 50, 50, '#cac6c0', 'p3')}
        {polaroid(310, 75, 50, 55, '#3a3835', 'p4')}
        {polaroid(128, 150, 55, 55, '#a9b2ad', 'p5')}
        {polaroid(245, 148, 60, 60, '#8b9a93', 'p6')}
        {polaroid(315, 145, 45, 65, '#dedad6', 'p7')}

        <polygon
          points={poly([
            [193, 150, 0],
            [235, 150, 0],
            [235, 200, 0],
            [193, 200, 0],
          ])}
          fill="#637c76"
          stroke={OUTLINE}
          strokeOpacity=".3"
          strokeWidth="0.5"
        />

        {[157, 167, 177, 187].map((y, i) => (
          <line
            key={i}
            x1={iso(195, y, 0)[0]}
            y1={iso(195, y, 0)[1]}
            x2={iso(233, y, 0)[0]}
            y2={iso(233, y, 0)[1]}
            stroke="#3c4044"
            strokeOpacity=".5"
            strokeWidth="0.5"
          />
        ))}

        <polygon
          points={poly([
            [125, 215, 0],
            [200, 215, 0],
            [200, 248, 0],
            [125, 248, 0],
          ])}
          fill="#eceae6"
          stroke={OUTLINE}
          strokeWidth="0.7"
        />

        {[222, 228, 234, 240].map((y, i) => (
          <line
            key={i}
            x1={iso(130, y, 0)[0]}
            y1={iso(130, y, 0)[1]}
            x2={iso(190 - (i % 2 ? 8 : 0), y, 0)[0]}
            y2={iso(190 - (i % 2 ? 8 : 0), y, 0)[1]}
            stroke="#3a2d22"
            strokeOpacity=".55"
            strokeWidth="0.6"
          />
        ))}

        {[
          [150, 82],
          [210, 75],
          [275, 84],
          [335, 77],
          [155, 152],
          [275, 150],
          [337, 148],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={iso(x, y, 0)[0]}
            cy={iso(x, y, 0)[1]}
            r="1.8"
            fill="#3a3835"
            stroke={OUTLINE}
            strokeWidth="0.4"
          />
        ))}
      </Hot>

      {/* Floor */}
      <polygon
        points={poly([
          [0, 0, 0],
          [400, 0, 0],
          [400, 0, 400],
          [0, 0, 400],
        ])}
        fill="url(#floor)"
        stroke={OUTLINE}
        strokeWidth="1.4"
      />

      {[35, 75, 115, 155, 195, 235, 275, 315, 355].map((z) => (
        <line
          key={z}
          x1={iso(0, 0, z)[0]}
          y1={iso(0, 0, z)[1]}
          x2={iso(400, 0, z)[0]}
          y2={iso(400, 0, z)[1]}
          stroke="#2a2825"
          strokeOpacity=".2"
          strokeWidth="0.6"
        />
      ))}

      {[
        [120, 90],
        [260, 170],
        [80, 250],
        [330, 300],
      ].map(([x, z], i) => (
        <line
          key={i}
          x1={iso(x, 0, z)[0]}
          y1={iso(x, 0, z)[1]}
          x2={iso(x + 18, 0, z)[0]}
          y2={iso(x + 18, 0, z)[1]}
          stroke="#2a2825"
          strokeOpacity=".15"
          strokeWidth="0.5"
        />
      ))}

      {/* Rug */}
      <polygon
        points={poly([
          [80, 0.4, 90],
          [330, 0.4, 90],
          [330, 0.4, 330],
          [80, 0.4, 330],
        ])}
        fill="#7a7e78"
        stroke="#4a4e48"
        strokeWidth="1.2"
      />
      <polygon
        points={poly([
          [92, 0.5, 102],
          [318, 0.5, 102],
          [318, 0.5, 318],
          [92, 0.5, 318],
        ])}
        fill="none"
        stroke="#5e625c"
        strokeWidth="0.6"
        strokeDasharray="3 3"
      />
      <polygon
        points={poly([
          [205, 0.6, 160],
          [260, 0.6, 210],
          [205, 0.6, 260],
          [150, 0.6, 210],
        ])}
        fill="none"
        stroke="#5e625c"
        strokeWidth="0.8"
      />

      {/* ── Floor-level cables: drawn before the desk so the desk occludes the
             stretches that run behind/under it (correct depth sorting). ── */}
      <g style={{ pointerEvents: 'none' }}>
        {/* Power strip on floor against the back-right wall — the room's one outlet */}
        <polygon
          points={poly([
            [350, 0.4, 118],
            [385, 0.4, 118],
            [385, 0.4, 128],
            [350, 0.4, 128],
          ])}
          fill="#2a2825"
          stroke="#1a1816"
          strokeWidth="0.6"
        />
        {[356, 364, 372, 380].map((x, i) => (
          <circle
            key={`out-${i}`}
            cx={iso(x, 0.6, 123)[0]}
            cy={iso(x, 0.6, 123)[1]}
            r="0.9"
            fill="#0a0908"
          />
        ))}

        {/* Synth power: out the back of the synth, hugs the back-left baseboard,
            turns the corner along the back wall, and into the power strip. The
            mid-run passes behind the desk and is occluded by it — exactly how a
            wall-run cable would read. */}
        <Cable
          pts={[
            [40, 10, 266],   // exits synth back-left (tucked behind the body)
            [30, 1, 258],    // onto the floor behind the synth
            [12, 1, 236],    // reaches the back-left wall
            [8, 1, 175],     // runs along the back-left baseboard
            [9, 1, 95],
            [12, 1, 42],     // back corner
            [44, 1, 14],     // turns along the back-right baseboard
            [150, 1, 11],
            [262, 1, 13],
            [330, 1, 26],    // peels off the wall toward the strip
            [351, 1, 116],
            [356, 1, 123],   // into the power strip
          ]}
          w={1.8}
        />

        {/* Loose coil of slack cable on the floor beside the synth */}
        <Cable
          pts={[
            [96, 1, 250],
            [108, 1, 256],
            [110, 1, 268],
            [98, 1, 274],
            [88, 1, 267],
            [92, 1, 255],
            [104, 1, 252],
          ]}
          w={1.4}
          opacity={0.85}
        />
      </g>

      {/* Desk */}
      {(() => {
        const x1 = 130,
          x2 = 285,
          z1 = 105,
          z2 = 235,
          yt = 85;
        return (
          <g>
            <polygon
              points={poly([
                [x1, yt, z2],
                [x2, yt, z2],
                [x2, 0, z2],
                [x1, 0, z2],
              ])}
              fill="#8a7858"
              stroke={OUTLINE}
              strokeWidth="1.1"
            />
            <polygon
              points={poly([
                [x2, yt, z1],
                [x2, yt, z2],
                [x2, 0, z2],
                [x2, 0, z1],
              ])}
              fill="#6e5e44"
              stroke={OUTLINE}
              strokeWidth="1.1"
            />
            <polygon
              points={poly([
                [x1, yt, z1],
                [x2, yt, z1],
                [x2, yt, z2],
                [x1, yt, z2],
              ])}
              fill="url(#desktop)"
              stroke={OUTLINE}
              strokeWidth="1.2"
            />
            <polygon
              points={poly([
                [x2 - 6, 80, z2 - 6],
                [x2 - 2, 80, z2 - 6],
                [x2 - 2, 4, z2 - 6],
                [x2 - 6, 4, z2 - 6],
              ])}
              fill="#5a4e38"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <polygon
              points={poly([
                [x1 + 2, 80, z2 - 6],
                [x1 + 6, 80, z2 - 6],
                [x1 + 6, 4, z2 - 6],
                [x1 + 2, 4, z2 - 6],
              ])}
              fill="#5a4e38"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
          </g>
        );
      })()}

      {/* Pencil cup */}
      {(() => {
        const cx = 150,
          cz = 120;
        return (
          <g>
            <polygon
              points={poly([
                [cx - 7, 85, cz - 7],
                [cx + 7, 85, cz - 7],
                [cx + 7, 85, cz + 7],
                [cx - 7, 85, cz + 7],
              ])}
              fill="#6a6864"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <polygon
              points={poly([
                [cx - 7, 85, cz + 7],
                [cx + 7, 85, cz + 7],
                [cx + 7, 105, cz + 7],
                [cx - 7, 105, cz + 7],
              ])}
              fill="#54524e"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <polygon
              points={poly([
                [cx + 7, 85, cz - 7],
                [cx + 7, 85, cz + 7],
                [cx + 7, 105, cz + 7],
                [cx + 7, 105, cz - 7],
              ])}
              fill="#3a3835"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <polygon
              points={poly([
                [cx - 7, 105, cz - 7],
                [cx + 7, 105, cz - 7],
                [cx + 7, 105, cz + 7],
                [cx - 7, 105, cz + 7],
              ])}
              fill="#1e1c1a"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <line
              x1={iso(cx + 2, 105, cz + 1)[0]}
              y1={iso(cx + 2, 105, cz + 1)[1]}
              x2={iso(cx + 5, 130, cz + 3)[0]}
              y2={iso(cx + 5, 130, cz + 3)[1]}
              stroke="#637c76"
              strokeWidth="2"
            />
            <line
              x1={iso(cx - 1, 105, cz - 1)[0]}
              y1={iso(cx - 1, 105, cz - 1)[1]}
              x2={iso(cx - 3, 122, cz - 3)[0]}
              y2={iso(cx - 3, 122, cz - 3)[1]}
              stroke="#3a3835"
              strokeWidth="2"
            />
          </g>
        );
      })()}

      {/* Laptop hotspot */}
      <Hot id="computer" label="projects" anchor={iso(190, 145, 165)}>
        {(() => {
          const x1 = 160,
            x2 = 235,
            z1 = 130,
            z2 = 200;
          const baseTop = 92;
          return (
            <g>
              <polygon
                points={poly([
                  [x1, baseTop, z2],
                  [x2, baseTop, z2],
                  [x2, 85, z2],
                  [x1, 85, z2],
                ])}
                fill="#6a6e74"
                stroke={OUTLINE}
                strokeWidth="0.9"
              />
              <polygon
                points={poly([
                  [x2, baseTop, z1],
                  [x2, baseTop, z2],
                  [x2, 85, z2],
                  [x2, 85, z1],
                ])}
                fill="#4a4e54"
                stroke={OUTLINE}
                strokeWidth="0.9"
              />
              <polygon
                points={poly([
                  [x1, baseTop, z1],
                  [x2, baseTop, z1],
                  [x2, baseTop, z2],
                  [x1, baseTop, z2],
                ])}
                fill="#828890"
                stroke={OUTLINE}
                strokeWidth="1"
              />

              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3, 4, 5, 6].map((c) => (
                  <polygon
                    key={`${r}-${c}`}
                    points={poly([
                      [x1 + 6 + c * 9, baseTop + 0.5, z1 + 12 + r * 10],
                      [x1 + 13 + c * 9, baseTop + 0.5, z1 + 12 + r * 10],
                      [x1 + 13 + c * 9, baseTop + 0.5, z1 + 19 + r * 10],
                      [x1 + 6 + c * 9, baseTop + 0.5, z1 + 19 + r * 10],
                    ])}
                    fill="#c4c8ce"
                    stroke="#4a4e54"
                    strokeWidth="0.3"
                  />
                ))
              )}

              <polygon
                points={poly([
                  [x1 + 18, baseTop + 0.6, z1 + 58],
                  [x2 - 18, baseTop + 0.6, z1 + 58],
                  [x2 - 18, baseTop + 0.6, z2 - 4],
                  [x1 + 18, baseTop + 0.6, z2 - 4],
                ])}
                fill="#bec2c8"
                stroke="#4a4e54"
                strokeWidth="0.4"
              />

              <polygon
                points={poly([
                  [x1, baseTop, z1],
                  [x2, baseTop, z1],
                  [x2, baseTop + 58, z1 - 8],
                  [x1, baseTop + 58, z1 - 8],
                ])}
                fill="url(#screen)"
                stroke={OUTLINE}
                strokeWidth="1"
              />

              <polygon
                points={poly([
                  [x1 + 4, baseTop + 4, z1 - 0.5],
                  [x2 - 4, baseTop + 4, z1 - 0.5],
                  [x2 - 4, baseTop + 54, z1 - 7.5],
                  [x1 + 4, baseTop + 54, z1 - 7.5],
                ])}
                fill="#1e2229"
                stroke="none"
              />

              {[10, 18, 26, 34, 42, 50].map((dy, i) => {
                const off1 = x1 + 8 + (i % 2 ? 6 : 0);
                const off2 = x1 + 8 + [40, 30, 52, 22, 46, 34][i];
                return (
                  <line
                    key={i}
                    x1={iso(off1, baseTop + dy, z1 - dy * 0.13)[0]}
                    y1={iso(off1, baseTop + dy, z1 - dy * 0.13)[1]}
                    x2={iso(off2, baseTop + dy, z1 - dy * 0.13)[0]}
                    y2={iso(off2, baseTop + dy, z1 - dy * 0.13)[1]}
                    stroke={i === 2 ? '#637c76' : i === 4 ? '#eceae6' : '#9aa0a8'}
                    strokeOpacity=".9"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          );
        })()}
      </Hot>

      {/* Paper hotspot */}
      <Hot id="paper" label="resume" anchor={iso(258, 95, 165)}>
        {(() => {
          const x1 = 242,
            x2 = 278,
            z1 = 130,
            z2 = 210,
            y = 86;
          return (
            <g>
              <polygon
                points={poly([
                  [x1 + 2, 85.5, z1 + 3],
                  [x2 + 2, 85.5, z1 + 3],
                  [x2 + 2, 85.5, z2 + 3],
                  [x1 + 2, 85.5, z2 + 3],
                ])}
                fill="#2a2825"
                opacity=".12"
              />
              <polygon
                points={poly([
                  [x1, y, z1],
                  [x2, y, z1],
                  [x2, y, z2],
                  [x1, y, z2],
                ])}
                fill="#f0eeea"
                stroke={OUTLINE}
                strokeWidth="0.9"
              />
              <polygon
                points={poly([
                  [x1 + 3, y + 0.5, z1 + 4],
                  [x2 - 3, y + 0.5, z1 + 4],
                  [x2 - 3, y + 0.5, z1 + 12],
                  [x1 + 3, y + 0.5, z1 + 12],
                ])}
                fill="#2a2825"
                opacity=".85"
              />
              <line
                x1={iso(x1 + 3, y + 0.6, z1 + 18)[0]}
                y1={iso(x1 + 3, y + 0.6, z1 + 18)[1]}
                x2={iso(x2 - 12, y + 0.6, z1 + 18)[0]}
                y2={iso(x2 - 12, y + 0.6, z1 + 18)[1]}
                stroke="#637c76"
                strokeWidth="1"
              />
              {[24, 30, 36, 42, 50, 56, 62, 68].map((dz, i) => {
                const w = [22, 28, 18, 26, 24, 20, 28, 16][i];
                return (
                  <line
                    key={i}
                    x1={iso(x1 + 3, y + 0.6, z1 + dz)[0]}
                    y1={iso(x1 + 3, y + 0.6, z1 + dz)[1]}
                    x2={iso(x1 + 3 + w, y + 0.6, z1 + dz)[0]}
                    y2={iso(x1 + 3 + w, y + 0.6, z1 + dz)[1]}
                    stroke="#2a2825"
                    strokeOpacity=".45"
                    strokeWidth="0.6"
                  />
                );
              })}
            </g>
          );
        })()}
      </Hot>

      {/* Mug — drawn after laptop/paper since it sits in front (z=218) */}
      {(() => {
        const cx = 175,
          cz = 218;
        return (
          <g>
            <ellipse
              cx={iso(cx, 85.4, cz + 4)[0]}
              cy={iso(cx, 85.4, cz + 4)[1]}
              rx="9"
              ry="3"
              fill="#1e1c1a"
              opacity=".28"
            />
            <polygon
              points={poly([
                [cx - 7, 85, cz - 6],
                [cx + 7, 85, cz - 6],
                [cx + 7, 98, cz - 6],
                [cx - 7, 98, cz - 6],
              ])}
              fill="#dedad6"
              stroke={OUTLINE}
              strokeWidth="0.7"
            />
            <polygon
              points={poly([
                [cx + 7, 85, cz - 6],
                [cx + 7, 85, cz + 6],
                [cx + 7, 98, cz + 6],
                [cx + 7, 98, cz - 6],
              ])}
              fill="#bab6b0"
              stroke={OUTLINE}
              strokeWidth="0.7"
            />
            <polygon
              points={poly([
                [cx - 7, 98, cz - 6],
                [cx + 7, 98, cz - 6],
                [cx + 7, 98, cz + 6],
                [cx - 7, 98, cz + 6],
              ])}
              fill="#637c76"
              stroke={OUTLINE}
              strokeWidth="0.5"
            />
            <path
              d={`M ${iso(cx + 7, 88, cz - 2)[0]} ${iso(cx + 7, 88, cz - 2)[1]} q 5 -2 5 4 q 0 4 -5 4`}
              fill="none"
              stroke={OUTLINE}
              strokeWidth="1.1"
            />
          </g>
        );
      })()}

      {/* Synth hotspot */}
      <Hot id="music" label="music" anchor={iso(60, 95, 280)}>
        {(() => {
          const cx = 60,
            cz = 280;
          const sw = 90,
            sd = 28;
          const yTop = 72;
          const L1 = [cx - 25, 0, cz + 18];
          const L2 = [cx + 25, 0, cz + 18];
          const T1 = [cx - 25, yTop - 2, cz - 6];
          const T2 = [cx + 25, yTop - 2, cz - 6];
          const segs = [
            [L1, T2],
            [L2, T1],
            [[cx - 25, 0, cz - 10], [cx + 25, yTop - 2, cz + 22]],
            [[cx + 25, 0, cz - 10], [cx - 25, yTop - 2, cz + 22]],
          ];
          return (
            <g>
              <ellipse
                cx={iso(cx, 0.5, cz + 4)[0]}
                cy={iso(cx, 0.5, cz + 4)[1]}
                rx="58"
                ry="14"
                fill="#1e1c1a"
                opacity=".18"
              />
              {segs.map((s, i) => (
                <line
                  key={i}
                  x1={iso(...s[0])[0]}
                  y1={iso(...s[0])[1]}
                  x2={iso(...s[1])[0]}
                  y2={iso(...s[1])[1]}
                  stroke="#2a2825"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}
              <line
                x1={iso(cx - 30, yTop - 4, cz + 8)[0]}
                y1={iso(cx - 30, yTop - 4, cz + 8)[1]}
                x2={iso(cx + 30, yTop - 4, cz + 8)[0]}
                y2={iso(cx + 30, yTop - 4, cz + 8)[1]}
                stroke="#2a2825"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {(() => {
                const x1 = cx - sw / 2,
                  x2 = cx + sw / 2;
                const z1 = cz - sd / 2,
                  z2 = cz + sd / 2;
                return (
                  <g>
                    <polygon
                      points={poly([
                        [x1, yTop, z2],
                        [x2, yTop, z2],
                        [x2, yTop - 10, z2],
                        [x1, yTop - 10, z2],
                      ])}
                      fill="#2a2825"
                      stroke={OUTLINE}
                      strokeWidth="0.9"
                    />
                    <polygon
                      points={poly([
                        [x2, yTop, z1],
                        [x2, yTop, z2],
                        [x2, yTop - 10, z2],
                        [x2, yTop - 10, z1],
                      ])}
                      fill="#1e1c1a"
                      stroke={OUTLINE}
                      strokeWidth="0.9"
                    />
                    <polygon
                      points={poly([
                        [x1, yTop, z1],
                        [x2, yTop, z1],
                        [x2, yTop, z2],
                        [x1, yTop, z2],
                      ])}
                      fill="#3a3835"
                      stroke={OUTLINE}
                      strokeWidth="1"
                    />
                    <polygon
                      points={poly([
                        [x1 + 2, yTop + 0.4, z1 + 2],
                        [x2 - 2, yTop + 0.4, z1 + 2],
                        [x2 - 2, yTop + 0.4, z1 + 10],
                        [x1 + 2, yTop + 0.4, z1 + 10],
                      ])}
                      fill="#1e1c1a"
                      stroke="#637c76"
                      strokeOpacity=".5"
                      strokeWidth="0.4"
                    />
                    {[0, 1, 2, 3, 4].map((i) => (
                      <circle
                        key={i}
                        cx={iso(x1 + 8 + i * 16, yTop + 0.6, z1 + 6)[0]}
                        cy={iso(x1 + 8 + i * 16, yTop + 0.6, z1 + 6)[1]}
                        r="2.2"
                        fill={['#637c76', '#eceae6', '#637c76', '#9aa0a8', '#3a3835'][i]}
                        stroke="#eceae6"
                        strokeWidth="0.4"
                      />
                    ))}
                    {Array.from({ length: 14 }).map((_, i) => {
                      const kx1 = x1 + 4 + (i * (sw - 8)) / 14;
                      const kx2 = x1 + 4 + ((i + 1) * (sw - 8)) / 14 - 0.6;
                      return (
                        <polygon
                          key={i}
                          points={poly([
                            [kx1, yTop + 0.5, z1 + 12],
                            [kx2, yTop + 0.5, z1 + 12],
                            [kx2, yTop + 0.5, z2 - 2],
                            [kx1, yTop + 0.5, z2 - 2],
                          ])}
                          fill="#f0eeea"
                          stroke="#3a2d22"
                          strokeWidth="0.4"
                        />
                      );
                    })}
                    {[1, 2, 4, 5, 6, 8, 9, 11, 12, 13].map((i, idx) => {
                      const kx1 = x1 + 4 + (i * (sw - 8)) / 14 - 2.2;
                      const kx2 = kx1 + 4.4;
                      return (
                        <polygon
                          key={idx}
                          points={poly([
                            [kx1, yTop + 0.7, z1 + 12],
                            [kx2, yTop + 0.7, z1 + 12],
                            [kx2, yTop + 0.7, z1 + 22],
                            [kx1, yTop + 0.7, z1 + 22],
                          ])}
                          fill="#1d150f"
                          stroke="#3a2d22"
                          strokeWidth="0.3"
                        />
                      );
                    })}
                  </g>
                );
              })()}
            </g>
          );
        })()}
      </Hot>

      {/* Plant */}
      {(() => {
        const px = 330,
          pz = 300;
        return (
          <g>
            <ellipse
              cx={iso(px, 0.4, pz)[0]}
              cy={iso(px, 0.4, pz)[1]}
              rx="26"
              ry="7"
              fill="#1e1c1a"
              opacity=".22"
            />
            {/* Saucer base under pot — drawn before the pot so pot sits on it */}
            <ellipse
              cx={iso(px, 0.3, pz)[0]}
              cy={iso(px, 0.3, pz)[1]}
              rx="20"
              ry="5.5"
              fill="#3a3835"
              stroke={OUTLINE}
              strokeWidth="0.6"
            />
            <ellipse
              cx={iso(px, 0.7, pz)[0]}
              cy={iso(px, 0.7, pz)[1]}
              rx="17.5"
              ry="4.7"
              fill="#5a5854"
              stroke="none"
            />
            <polygon
              points={poly([
                [px - 15, 0, pz - 12],
                [px + 15, 0, pz - 12],
                [px + 12, 30, pz - 9],
                [px - 12, 30, pz - 9],
              ])}
              fill="#8a8480"
              stroke={OUTLINE}
              strokeWidth="0.9"
            />
            <polygon
              points={poly([
                [px - 15, 0, pz - 12],
                [px - 15, 0, pz + 12],
                [px - 12, 30, pz + 9],
                [px - 12, 30, pz - 9],
              ])}
              fill="#6e6c68"
              stroke={OUTLINE}
              strokeWidth="0.9"
            />
            <polygon
              points={poly([
                [px + 15, 0, pz - 12],
                [px + 15, 0, pz + 12],
                [px + 12, 30, pz + 9],
                [px + 12, 30, pz - 9],
              ])}
              fill="#6a6864"
              stroke={OUTLINE}
              strokeWidth="0.9"
            />
            {/* Front face (z = pz + 12) — was missing */}
            <polygon
              points={poly([
                [px - 15, 0, pz + 12],
                [px + 15, 0, pz + 12],
                [px + 12, 30, pz + 9],
                [px - 12, 30, pz + 9],
              ])}
              fill="#92908c"
              stroke={OUTLINE}
              strokeWidth="0.9"
            />
            {/* Pot rim (top edge band, slightly darker) */}
            <polygon
              points={poly([
                [px - 12, 30, pz - 9],
                [px + 12, 30, pz - 9],
                [px + 12, 30, pz + 9],
                [px - 12, 30, pz + 9],
              ])}
              fill="#3e3c38"
              stroke={OUTLINE}
              strokeWidth="0.7"
            />
            {/* Soil inside the rim */}
            <polygon
              points={poly([
                [px - 10, 30.5, pz - 7],
                [px + 10, 30.5, pz - 7],
                [px + 10, 30.5, pz + 7],
                [px - 10, 30.5, pz + 7],
              ])}
              fill="#2a221c"
              stroke="none"
            />
            {[
              { dx: -2, dz: -2, h: 55, w: 14, c: '#4a6e5a', rot: -12 },
              { dx: 6, dz: 2, h: 48, w: 12, c: '#3a5c4a', rot: 8 },
              { dx: -8, dz: 4, h: 42, w: 10, c: '#2e4a3a', rot: -20 },
              { dx: 2, dz: -8, h: 52, w: 11, c: '#4a6e5a', rot: 18 },
            ].map((l, i) => (
              <ellipse
                key={i}
                cx={iso(px + l.dx, 30 + l.h / 2, pz + l.dz)[0]}
                cy={iso(px + l.dx, 30 + l.h / 2, pz + l.dz)[1]}
                rx={l.w}
                ry={l.h / 2}
                fill={l.c}
                stroke={OUTLINE}
                strokeWidth="0.8"
                transform={`rotate(${l.rot} ${iso(px + l.dx, 30 + l.h / 2, pz + l.dz)[0]} ${iso(px + l.dx, 30 + l.h / 2, pz + l.dz)[1]})`}
              />
            ))}
          </g>
        );
      })()}

      {/* Headphones */}
      {(() => {
        const hx = 215,
          hy = 0.8,
          hz = 252;
        const [lx, ly] = iso(hx - 10, hy, hz + 4);
        const [rx, ry] = iso(hx + 10, hy, hz - 4);
        const [mx, my] = iso(hx, hy, hz);
        return (
          <g>
            <path
              d={`M ${lx} ${ly} Q ${mx} ${my - 13} ${rx} ${ry}`}
              fill="none"
              stroke="#2a2825"
              strokeWidth="2.5"
              strokeOpacity="0.65"
              strokeLinecap="round"
            />
            <ellipse
              cx={lx}
              cy={ly}
              rx="5.5"
              ry="3.5"
              fill="#3a3835"
              stroke="#2a2825"
              strokeWidth="0.8"
              transform={`rotate(-18 ${lx} ${ly})`}
            />
            <ellipse
              cx={rx}
              cy={ry}
              rx="5.5"
              ry="3.5"
              fill="#3a3835"
              stroke="#2a2825"
              strokeWidth="0.8"
              transform={`rotate(-18 ${rx} ${ry})`}
            />
          </g>
        );
      })()}

      {/* ── Raised cables: drawn last so they sit on top of the gear they plug
             into and the surfaces they drape over. Each ends on a real port. ── */}
      <g style={{ pointerEvents: 'none' }}>
        {/* Laptop power (USB-C): right-back port → runs behind the résumé → drapes
            over the desk's right edge → down the side → along the floor to the strip. */}
        <Cable
          pts={[
            [234, 90, 136],   // port on the laptop's right side, toward the back
            [260, 87, 126],   // slack across the desktop, behind the résumé
            [285, 85.5, 122], // over the right edge of the desk
            [288, 50, 124],   // hangs down the desk's right face
            [287, 1, 127],    // lands on the floor
            [314, 1, 131],    // floor run toward the strip
            [345, 1, 126],
            [355, 1, 123],    // into the power strip
          ]}
          w={1.7}
        />
        <Plug x={234} y={90} z={136} />

        {/* Headphone cable: jack on the laptop's front edge → drapes over the desk's
            front lip → down to the headphones resting on the floor in front. */}
        <Cable
          pts={[
            [232, 90, 196],   // headphone jack, front-right of the laptop
            [227, 86, 216],   // slack toward the front edge
            [223, 85.5, 235], // over the desk's front lip
            [219, 46, 241],   // hangs down the front face
            [216, 3, 248],    // floor
            [212, 2, 252],    // into the headphones
          ]}
          w={1.4}
        />
        <Plug x={232} y={90} z={196} r={2} />

        {/* Synth audio → laptop: out the synth's right side → across the floor →
            climbs the desk's front-left leg → across the desktop → laptop input. */}
        <Cable
          pts={[
            [106, 30, 282],   // output jack on the synth's right side
            [110, 5, 280],    // drops to the floor
            [122, 1.5, 266],  // floor run toward the desk
            [134, 1.5, 244],
            [136, 6, 232],    // base of the desk's front-left leg
            [137, 44, 229],   // climbs the leg
            [138, 82, 228],   // up onto the desktop
            [150, 87, 206],   // across the surface toward the laptop
            [159, 90, 186],   // approaches the laptop's left side
            [163, 90, 180],   // into the laptop input
          ]}
          w={1.5}
        />
        <Plug x={106} y={30} z={282} r={2} />
        <Plug x={163} y={90} z={180} r={2} />
      </g>

      {/* Tooltip */}
      {hovered && (
        <foreignObject
          x={hovered.anchor[0] - 90}
          y={hovered.anchor[1] - 60}
          width="180"
          height="40"
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                background: '#211f1c',
                color: '#e6e5df',
                padding: '6px 12px',
                borderRadius: '0',
                font: '500 12px/1 "JetBrains Mono", ui-monospace, monospace',
                letterSpacing: '.04em',
                textTransform: 'lowercase',
                whiteSpace: 'nowrap',
                position: 'relative',
              }}
            >
              {hovered.label}
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '-4px',
                  width: 8,
                  height: 8,
                  background: '#211f1c',
                  transform: 'translateX(-50%) rotate(45deg)',
                }}
              ></span>
            </div>
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

