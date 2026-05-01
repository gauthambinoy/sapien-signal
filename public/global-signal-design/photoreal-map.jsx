// Photoreal world map — uses real Natural Earth GeoJSON (low-res countries)
// loaded from a public CDN, projected with equirectangular, with terrain-style
// shading (soft warm fill, terminator gradient overlay, country borders, graticules).

const PMAP_GEO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
// world-atlas uses TopoJSON. We need to convert. Pull topojson-client too.
const PMAP_TOPOJSON_URL = 'https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js';

let pmapTopojsonReady = null;
const ensureTopojson = () => {
  if (pmapTopojsonReady) return pmapTopojsonReady;
  pmapTopojsonReady = new Promise((res, rej) => {
    if (window.topojson) return res(window.topojson);
    const s = document.createElement('script');
    s.src = PMAP_TOPOJSON_URL;
    s.onload = () => res(window.topojson);
    s.onerror = rej;
    document.head.appendChild(s);
  });
  return pmapTopojsonReady;
};

// Cache geo data globally
let pmapGeoCache = null;
const loadGeo = async () => {
  if (pmapGeoCache) return pmapGeoCache;
  const tj = await ensureTopojson();
  const r = await fetch(PMAP_GEO_URL);
  const topo = await r.json();
  const countries = tj.feature(topo, topo.objects.countries);
  pmapGeoCache = countries;
  return countries;
};

const PhotorealMap = ({
  height = 360,
  accent = '#D97757',
  fill = '#3D2F26',         // warm earth
  stroke = '#1B1A18',        // outline
  ocean = 'transparent',
  graticule = true,
  markers = [],
  showTerminator = true,
}) => {
  const [paths, setPaths] = React.useState(null);
  const W = 1000, H = 500;

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const fc = await loadGeo();
        if (!alive) return;
        // Build SVG path strings via equirectangular projection
        const project = ([lon, lat]) => [
          ((lon + 180) / 360) * W,
          ((90 - lat) / 180) * H,
        ];
        const polyToPath = (rings) => rings.map(ring => {
          if (!ring.length) return '';
          const pts = ring.map(project);
          return 'M ' + pts.map(p => p.map(n => n.toFixed(1)).join(',')).join(' L ') + ' Z';
        }).join(' ');
        const out = [];
        for (const f of fc.features) {
          const geom = f.geometry;
          if (!geom) continue;
          if (geom.type === 'Polygon') {
            out.push(polyToPath(geom.coordinates));
          } else if (geom.type === 'MultiPolygon') {
            out.push(geom.coordinates.map(polyToPath).join(' '));
          }
        }
        setPaths(out);
      } catch (e) {
        console.warn('Map geo load failed', e);
        setPaths('fallback');
      }
    })();
    return () => { alive = false; };
  }, []);

  if (paths === 'fallback' || !paths) {
    // Fallback while loading or on error — use the dotted map
    if (window.DottedWorldMap) {
      return <window.DottedWorldMap height={height} accent={accent} markers={markers} />;
    }
    return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6E6A62', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.2em' }}>LOADING MAP…</div>;
  }

  const project = (lon, lat) => [
    ((lon + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height, display: 'block' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Land fill — warm gradient with subtle terrain shading */}
        <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5A4334" />
          <stop offset="0.5" stopColor="#4A3A2C" />
          <stop offset="1" stopColor="#3D2F26" />
        </linearGradient>
        {/* Ocean wash */}
        <radialGradient id="oceanWash" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#1F2A38" stopOpacity="0.15" />
          <stop offset="1" stopColor="#0E0D0B" stopOpacity="0" />
        </radialGradient>
        {/* Terminator — sun is off to the right side, so dark on the right */}
        <linearGradient id="terminator" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        {/* Marker glow */}
        <filter id="mkGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        {/* Inner shadow to give "globe-on-flat" feel */}
        <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.85">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
      </defs>

      {/* Ocean */}
      <rect width={W} height={H} fill="url(#oceanWash)" />

      {/* Graticules */}
      {graticule && (
        <g stroke="rgba(245,240,232,0.05)" strokeWidth="0.5">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={'v'+i} x1={(i+1) * W/12} y1="0" x2={(i+1) * W/12} y2={H} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={'h'+i} x1="0" y1={(i+1) * H/6} x2={W} y2={(i+1) * H/6} />
          ))}
          {/* Equator */}
          <line x1="0" y1={H/2} x2={W} y2={H/2} stroke="rgba(217,119,87,0.18)" strokeWidth="0.6" strokeDasharray="3 4" />
          {/* Tropics */}
          <line x1="0" y1={H/2 - H * 23.5/180} x2={W} y2={H/2 - H * 23.5/180} stroke="rgba(245,240,232,0.06)" strokeWidth="0.4" strokeDasharray="2 6" />
          <line x1="0" y1={H/2 + H * 23.5/180} x2={W} y2={H/2 + H * 23.5/180} stroke="rgba(245,240,232,0.06)" strokeWidth="0.4" strokeDasharray="2 6" />
        </g>
      )}

      {/* Country fills */}
      <g fill="url(#landFill)" stroke="rgba(27,26,24,0.6)" strokeWidth="0.4" strokeLinejoin="round">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* Country highlights — subtle warm rim on north edges using a second pass */}
      <g fill="none" stroke="rgba(245,240,232,0.06)" strokeWidth="0.3" strokeLinejoin="round">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* Terminator overlay (day/night) */}
      {showTerminator && <rect width={W} height={H} fill="url(#terminator)" pointerEvents="none" />}

      {/* Vignette */}
      <rect width={W} height={H} fill="url(#vignette)" pointerEvents="none" />

      {/* Markers */}
      {markers.map((m, i) => {
        const [mx, my] = m.lon != null ? project(m.lon, m.lat) : [m.x, m.y];
        const c = m.color || accent;
        const r = m.r || 4;
        return (
          <g key={i} transform={`translate(${mx},${my})`}>
            <circle r={r * 4} fill={c} opacity="0.22" filter="url(#mkGlow)" />
            <circle r={r * 2.5} fill="none" stroke={c} strokeWidth="0.8" opacity="0.5">
              <animate attributeName="r" from={r} to={r * 4} dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r={r} fill={c} />
            <circle r={r * 0.4} fill="#fff" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
};

window.PhotorealMap = PhotorealMap;
