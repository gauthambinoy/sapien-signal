// Polished primitives v2 — beautiful, modern, Claude-themed
// Drop-in replacement for components.jsx

// ── Helpers ─────────────────────────────────────────────
const fmt = (n, d = 0) => {
  if (n == null) return '—';
  if (Math.abs(n) >= 1e12) return (n/1e12).toFixed(d || 2) + 'T';
  if (Math.abs(n) >= 1e9)  return (n/1e9).toFixed(d || 2) + 'B';
  if (Math.abs(n) >= 1e6)  return (n/1e6).toFixed(d || 2) + 'M';
  return n.toLocaleString('en-US', { maximumFractionDigits: d });
};

const useLive = (initial, jitter = 0.001) => {
  const [v, setV] = React.useState(initial);
  React.useEffect(() => {
    const t = setInterval(() => setV(p => p + p * (Math.random() * 2 - 1) * jitter), 1200);
    return () => clearInterval(t);
  }, [jitter]);
  return v;
};

// ── Sparkline (smooth) ──────────────────────────────────
const Spark = ({ data, color = '#D97757', height = 28, width = 80, fill = true, smooth = true }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - 4) - 2
  ]);
  let path;
  if (smooth) {
    path = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i-1], [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      path += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
    }
  } else {
    path = 'M ' + pts.map(p => p.join(',')).join(' L ');
  }
  const fillPath = path + ` L ${width},${height} L 0,${height} Z`;
  const id = React.useMemo(() => 'sg' + Math.random().toString(36).slice(2,8), []);
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.32" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={fillPath} fill={`url(#${id})`} />}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.2" fill={color} />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="5" fill={color} opacity="0.25" />
    </svg>
  );
};

const genSpark = (n = 20, trend = 0) => {
  let v = 50;
  return Array.from({length: n}, () => { v += (Math.random() - 0.5 + trend * 0.3) * 8; return v; });
};

// ──────────────────────────────────────────────────────────
// REAL DOTTED WORLD MAP
// A grid of dots that only paints where land exists.
// We use a coarse 200×100 land/water mask derived from continent
// silhouette polygons (hand-traced approximation, equirectangular).
// ──────────────────────────────────────────────────────────

// Continent polygons in lon/lat (equirect). Coarse but recognizable.
// x: -180..180 (lon), y: -85..85 (lat)
const CONTINENTS = [
  // North America
  [[-168,65],[-155,71],[-140,70],[-125,72],[-95,75],[-78,72],[-72,60],[-78,48],[-95,49],[-100,32],[-118,32],[-125,40],[-130,55],[-150,60],[-168,65]],
  // Greenland
  [[-55,82],[-30,83],[-20,75],[-30,65],[-50,60],[-55,72],[-55,82]],
  // Central America + Caribbean (simple)
  [[-95,18],[-85,15],[-75,8],[-78,15],[-90,20],[-95,18]],
  // South America
  [[-80,12],[-60,12],[-45,5],[-35,-5],[-40,-23],[-58,-35],[-72,-52],[-75,-45],[-80,-15],[-80,12]],
  // Europe
  [[-10,55],[5,60],[15,55],[30,55],[40,60],[35,70],[15,68],[5,62],[-10,62],[-10,55]],
  // Iberia/Italy/Greece simplified
  [[-10,43],[5,45],[18,42],[28,40],[35,38],[20,36],[5,38],[-10,43]],
  // UK
  [[-6,55],[2,58],[0,52],[-6,52],[-6,55]],
  // Scandinavia
  [[5,58],[15,65],[25,70],[18,68],[8,62],[5,58]],
  // Africa
  [[-18,32],[-5,35],[10,35],[35,30],[42,12],[50,5],[40,-15],[20,-35],[18,-22],[10,-5],[-10,5],[-15,15],[-18,32]],
  // Middle East / Arabia
  [[35,30],[55,28],[60,15],[50,12],[42,15],[35,25],[35,30]],
  // Asia (Russia + China + India + SE Asia)
  [[30,55],[60,70],[100,75],[140,70],[170,68],[180,65],[170,55],[140,45],[125,38],[120,22],[105,10],[95,5],[78,8],[72,18],[65,25],[55,28],[45,38],[35,42],[30,55]],
  // Japan
  [[135,36],[143,40],[140,32],[132,32],[135,36]],
  // Indonesia / Philippines (rough)
  [[95,5],[125,5],[140,-5],[125,-10],[105,-8],[95,-3],[95,5]],
  // Australia
  [[115,-12],[135,-12],[145,-18],[152,-25],[148,-38],[135,-35],[120,-32],[114,-22],[115,-12]],
  // New Zealand
  [[170,-37],[177,-40],[174,-46],[167,-44],[170,-37]],
];

// Point-in-polygon test
const pip = (x, y, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
};

const isLand = (lon, lat) => {
  for (const c of CONTINENTS) if (pip(lon, lat, c)) return true;
  return false;
};

// Dotted map. cols × rows. Returns SVG with dots only on land.
const DottedWorldMap = ({ cols = 110, rows = 50, dotSize = 1.5, color = '#A39E92', accent = '#D97757', markers = [], height = 320, glow = true, density = 1 }) => {
  const dots = React.useMemo(() => {
    const out = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lon = (c / (cols - 1)) * 360 - 180;
        const lat = 85 - (r / (rows - 1)) * 170;
        if (isLand(lon, lat)) {
          // Mercator-ish vertical compression toward poles for nicer look
          const cx = (c / (cols - 1)) * 1000;
          const cy = (r / (rows - 1)) * 480;
          // Random alpha jitter for organic look
          const a = 0.55 + Math.random() * 0.45;
          out.push([cx, cy, a]);
        }
      }
    }
    return out;
  }, [cols, rows]);

  // Project marker lon/lat → x/y
  const project = (lon, lat) => [((lon + 180) / 360) * 1000, ((85 - lat) / 170) * 480];

  return (
    <svg viewBox="0 0 1000 480" style={{ width: '100%', height, display: 'block' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="dotGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.4" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id="markerBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* Subtle longitude lines */}
      <g stroke={color} strokeOpacity="0.06" strokeWidth="0.5">
        {[...Array(7)].map((_,i)=><line key={i} x1={(i+1)*125} y1="0" x2={(i+1)*125} y2="480" />)}
        {[...Array(4)].map((_,i)=><line key={'h'+i} x1="0" y1={(i+1)*96} x2="1000" y2={(i+1)*96} />)}
      </g>
      {/* Land dots */}
      <g fill={color}>
        {dots.map(([x, y, a], i) => (
          <circle key={i} cx={x} cy={y} r={dotSize} opacity={a} />
        ))}
      </g>
      {/* Markers */}
      {markers.map((m, i) => {
        const [mx, my] = m.lon != null ? project(m.lon, m.lat) : [m.x, m.y];
        const c = m.color || accent;
        const r = m.r || 4;
        return (
          <g key={i} transform={`translate(${mx},${my})`}>
            {glow && <circle r={r * 4} fill={c} opacity="0.18" filter="url(#markerBlur)" />}
            <circle r={r * 2.5} fill="none" stroke={c} strokeWidth="0.8" opacity="0.5">
              <animate attributeName="r" from={r} to={r * 4} dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r={r} fill={c} />
            <circle r={r * 0.4} fill="#fff" opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
};

// ──────────────────────────────────────────────────────────
// REALISTIC LIT GLOBE (canvas, dotted continents on a sphere)
// ──────────────────────────────────────────────────────────
const RealisticGlobe = ({ size = 420, accent = '#D97757', spinSpeed = 0.08 }) => {
  const canvasRef = React.useRef(null);
  const rotRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Pre-compute land grid
    const grid = [];
    const STEP_LAT = 2.5; // degrees
    const STEP_LON = 2.5;
    for (let lat = -85; lat <= 85; lat += STEP_LAT) {
      for (let lon = -180; lon <= 180; lon += STEP_LON) {
        if (isLand(lon, lat)) grid.push([lon, lat]);
      }
    }

    let alive = true;
    const cx = size / 2, cy = size / 2, R = size / 2 - 6;

    const accentRgb = hexToRgb(accent);

    const draw = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, size, size);

      // Outer atmosphere glow
      const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.25);
      atmoGrad.addColorStop(0, `rgba(${accentRgb}, 0.18)`);
      atmoGrad.addColorStop(0.5, `rgba(${accentRgb}, 0.06)`);
      atmoGrad.addColorStop(1, `rgba(${accentRgb}, 0)`);
      ctx.fillStyle = atmoGrad;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx.fill();

      // Ocean sphere with directional lighting (warm-cocoa night side)
      const oceanGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.3, R * 0.05, cx, cy, R);
      oceanGrad.addColorStop(0, '#3D2F26');     // lit
      oceanGrad.addColorStop(0.4, '#2A2018');
      oceanGrad.addColorStop(0.85, '#1A130E');  // dark side
      oceanGrad.addColorStop(1, '#0E0A07');     // edge
      ctx.fillStyle = oceanGrad;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // Land dots — project orthographic
      const rot = rotRef.current;
      ctx.save();
      // Clip to sphere
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();

      for (const [lon, lat] of grid) {
        const lonR = ((lon + rot) * Math.PI) / 180;
        const latR = (lat * Math.PI) / 180;
        // Orthographic projection (centered at lat=15, looking slightly down)
        const tilt = -0.25;
        const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
        let x3 = Math.cos(latR) * Math.sin(lonR);
        let y3 = Math.sin(latR);
        let z3 = Math.cos(latR) * Math.cos(lonR);
        // tilt around X
        const yt = y3 * cosT - z3 * sinT;
        const zt = y3 * sinT + z3 * cosT;
        if (zt < 0) continue; // back of sphere
        const px = cx + x3 * R;
        const py = cy - yt * R;
        // Lighting: brighter where light direction (top-left) hits
        const lx = -0.5, ly = -0.5, lz = 0.7;
        const lnorm = Math.sqrt(lx*lx+ly*ly+lz*lz);
        const dot = (x3*lx + yt*ly + zt*lz) / lnorm;
        const lum = Math.max(0.15, dot * 0.95 + 0.25);
        // edge darken
        const edge = zt;
        const finalLum = lum * (0.4 + edge * 0.6);
        // warm earth tones
        const r = Math.floor(180 * finalLum);
        const g = Math.floor(150 * finalLum);
        const b = Math.floor(115 * finalLum);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(px - 0.9, py - 0.9, 1.8, 1.8);
      }
      ctx.restore();

      // Highlight (specular glow on lit side)
      const hi = ctx.createRadialGradient(cx - R*0.4, cy - R*0.4, 0, cx - R*0.4, cy - R*0.4, R*0.7);
      hi.addColorStop(0, 'rgba(255,220,180,0.18)');
      hi.addColorStop(1, 'rgba(255,220,180,0)');
      ctx.fillStyle = hi;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // Inner shadow on the right (terminator)
      const term = ctx.createRadialGradient(cx + R*0.6, cy + R*0.4, R*0.1, cx + R*0.6, cy + R*0.4, R*1.1);
      term.addColorStop(0, 'rgba(0,0,0,0.0)');
      term.addColorStop(0.7, 'rgba(0,0,0,0.5)');
      term.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = term;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // Crisp rim
      ctx.strokeStyle = `rgba(${accentRgb}, 0.55)`;
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      rotRef.current = (rot + spinSpeed) % 360;
      requestAnimationFrame(draw);
    };
    draw();
    return () => { alive = false; };
  }, [size, accent, spinSpeed]);

  // Pulse markers on top (just visual flair, not projected)
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, display: 'block' }} />
      {/* Floating pulse markers */}
      {[
        { l: 39, t: 32, c: accent, lbl: 'TYO' },
        { l: 62, t: 38, c: '#7FB069', lbl: 'NYC' },
        { l: 28, t: 42, c: '#E0A458', lbl: 'LON' },
        { l: 70, t: 60, c: accent, lbl: 'SYD' },
      ].map((m, i) => (
        <div key={i} style={{ position: 'absolute', left: `${m.l}%`, top: `${m.t}%`, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.c, boxShadow: `0 0 12px ${m.c}, 0 0 24px ${m.c}66` }} />
          <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: `1px solid ${m.c}`, animation: `gsPulse ${2 + i * 0.3}s ease-out infinite` }} />
        </div>
      ))}
    </div>
  );
};

const hexToRgb = (hex) => {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? `${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)}` : '255,255,255';
};

// ──────────────────────────────────────────────────────────
// LIVE TAG
// ──────────────────────────────────────────────────────────
const LiveTag = ({ color = '#7FB069', label = 'LIVE' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
    fontFamily: window.GS_FONTS.mono, color,
    padding: '2px 8px', border: `1px solid ${color}44`,
    borderRadius: 999, background: `${color}10`,
  }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, animation: 'gsPulse 1.5s ease-in-out infinite', boxShadow: `0 0 6px ${color}` }} />
    {label}
  </span>
);

// Back-compat aliases (older screens still call these)
const SimpleWorldMap = (props) => <DottedWorldMap {...props} />;
const MiniGlobe = (props) => <RealisticGlobe {...props} />;
const Counter = ({ value, color, size = 22, prefix = '', suffix = '' }) => (
  <div style={{ fontFamily: window.GS_FONTS.mono, fontSize: size, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1, textShadow: `0 0 16px ${color}33` }}>
    {prefix}{typeof value === 'number' ? fmt(value) : value}{suffix}
  </div>
);

Object.assign(window, { useLive, fmt, Spark, genSpark, RealisticGlobe, MiniGlobe, DottedWorldMap, SimpleWorldMap, LiveTag, Counter, hexToRgb });
