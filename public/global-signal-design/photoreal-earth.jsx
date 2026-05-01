// Photoreal 3D Earth — real NASA Blue Marble texture, proper sphere mapping,
// lit with sun direction, atmosphere bloom, terminator, city lights on dark side, clouds.
// Pure canvas, no WebGL needed — uses a procedurally-loaded equirectangular texture
// from a public CDN, then samples it per-pixel against a sphere normal.

const PE_TEX_DAY    = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
const PE_TEX_NIGHT  = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg';
const PE_TEX_CLOUDS = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';

const loadImg = (src) => new Promise((res, rej) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

// Build a sampled image data buffer from an HTMLImage
const sampleBuffer = (img, w, h) => {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const cx = c.getContext('2d');
  cx.drawImage(img, 0, 0, w, h);
  return cx.getImageData(0, 0, w, h);
};

const PhotorealEarth = ({ size = 520, spinSpeed = 0.045, sunAngle = -25, atmosphere = '#7AB8E8', glowAccent = '#D97757' }) => {
  const canvasRef = React.useRef(null);
  const rotRef = React.useRef(0);
  const cloudRotRef = React.useRef(0);
  const [ready, setReady] = React.useState(false);
  const buffersRef = React.useRef({});

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // Texture resolution we sample at — high enough to look photoreal at 600px
        const TEX_W = 1024, TEX_H = 512;
        const [day, night, clouds] = await Promise.all([
          loadImg(PE_TEX_DAY),
          loadImg(PE_TEX_NIGHT),
          loadImg(PE_TEX_CLOUDS),
        ]);
        if (!alive) return;
        buffersRef.current = {
          day:    sampleBuffer(day,    TEX_W, TEX_H),
          night:  sampleBuffer(night,  TEX_W, TEX_H),
          clouds: sampleBuffer(clouds, TEX_W, TEX_H),
          w: TEX_W, h: TEX_H,
        };
        setReady(true);
      } catch (e) {
        console.warn('Earth texture load failed', e);
        setReady('fallback');
      }
    })();
    return () => { alive = false; };
  }, []);

  React.useEffect(() => {
    if (!ready || ready === 'fallback') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    const { day, night, clouds, w: TW, h: TH } = buffersRef.current;
    const dD = day.data, dN = night.data, dC = clouds.data;

    // Pre-render the sphere onto an offscreen low-res buffer, then upscale (faster).
    const RES = Math.floor(size * 0.85); // render resolution
    const offCanvas = document.createElement('canvas');
    offCanvas.width = RES; offCanvas.height = RES;
    const offCtx = offCanvas.getContext('2d');
    const imgData = offCtx.createImageData(RES, RES);
    const buf = imgData.data;

    const cx = RES / 2, cy = RES / 2, R = RES / 2 - 2;
    // Sun direction (in world space, lit from upper-left)
    const sunRad = (sunAngle * Math.PI) / 180;
    const sunDir = [Math.cos(sunRad) * 0.4, -0.35, Math.sin(sunRad) * 0.85];
    const sunLen = Math.hypot(...sunDir);
    sunDir[0] /= sunLen; sunDir[1] /= sunLen; sunDir[2] /= sunLen;

    let alive = true;
    const tilt = -0.41; // ~23.5° axial tilt

    const renderSphere = (rotDeg, cloudRotDeg) => {
      const rotRad = (rotDeg * Math.PI) / 180;
      const cloudRotRad = (cloudRotDeg * Math.PI) / 180;
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

      for (let py = 0; py < RES; py++) {
        const dy = (py - cy) / R;
        for (let px = 0; px < RES; px++) {
          const dx = (px - cx) / R;
          const d2 = dx * dx + dy * dy;
          const idx = (py * RES + px) * 4;
          if (d2 > 1) {
            buf[idx] = 0; buf[idx+1] = 0; buf[idx+2] = 0; buf[idx+3] = 0;
            continue;
          }
          // Point on sphere
          const dz = Math.sqrt(1 - d2);
          // Apply axial tilt around X axis (rotate y/z)
          const ny = dy * cosT - dz * sinT;
          const nz = dy * sinT + dz * cosT;
          const nx = dx;

          // Convert sphere point → lon/lat
          const lat = Math.asin(ny);                  // -π/2 .. π/2
          let lon = Math.atan2(nx, nz) - rotRad;       // rotate around Y
          // wrap lon to [-π, π]
          lon = ((lon + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;

          // Sample equirect texture
          const u = (lon + Math.PI) / (2 * Math.PI);
          const v = 1 - (lat + Math.PI / 2) / Math.PI;
          const tx = Math.min(TW - 1, Math.max(0, Math.floor(u * TW)));
          const ty = Math.min(TH - 1, Math.max(0, Math.floor(v * TH)));
          const ti = (ty * TW + tx) * 4;

          // Cloud sample (rotates faster than earth)
          let lonC = Math.atan2(nx, nz) - cloudRotRad;
          lonC = ((lonC + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
          const uC = (lonC + Math.PI) / (2 * Math.PI);
          const txC = Math.min(TW - 1, Math.max(0, Math.floor(uC * TW)));
          const tiC = (ty * TW + txC) * 4;

          // Lighting — Lambert dot
          const lightDot = nx * sunDir[0] + ny * sunDir[1] + nz * sunDir[2];
          // Smooth terminator
          const terminator = Math.max(0, Math.min(1, lightDot * 1.5 + 0.1));
          const dayWeight = terminator;
          const nightWeight = 1 - terminator;

          // Day color
          const dr = dD[ti], dg = dD[ti+1], db = dD[ti+2];
          // Night color (city lights baked in)
          const nr = dN[ti], ng = dN[ti+1], nb = dN[ti+2];
          // Cloud (use red channel of topology as a cloud-ish mask, very subtle)
          const cloudVal = dC[tiC] / 255;

          // Blend day + night
          let r = dr * dayWeight + nr * nightWeight * 1.4;
          let g = dg * dayWeight + ng * nightWeight * 1.2;
          let b = db * dayWeight + nb * nightWeight * 0.9;

          // Add cloud highlights on day side
          const cloudMix = cloudVal * 0.3 * dayWeight;
          r = r * (1 - cloudMix) + 255 * cloudMix;
          g = g * (1 - cloudMix) + 255 * cloudMix;
          b = b * (1 - cloudMix) + 255 * cloudMix;

          // Fresnel rim — atmosphere glow at edges
          const rim = Math.pow(1 - dz, 3);
          const atmoR = 122, atmoG = 184, atmoB = 232; // #7AB8E8
          r = r + (atmoR - r) * rim * 0.55;
          g = g + (atmoG - g) * rim * 0.55;
          b = b + (atmoB - b) * rim * 0.55;

          // Slight warm tint on lit side toward sun
          if (dayWeight > 0.1) {
            const warm = Math.pow(Math.max(0, lightDot), 4) * 0.15;
            r = Math.min(255, r + warm * 30);
            g = Math.min(255, g + warm * 15);
          }

          buf[idx]   = Math.min(255, Math.max(0, r));
          buf[idx+1] = Math.min(255, Math.max(0, g));
          buf[idx+2] = Math.min(255, Math.max(0, b));
          buf[idx+3] = 255;
        }
      }
      offCtx.putImageData(imgData, 0, 0);
    };

    const draw = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Star field
      const starsCount = 80;
      for (let i = 0; i < starsCount; i++) {
        const sx = (Math.sin(i * 12.9898) * 43758.5453) % 1;
        const sy = (Math.sin(i * 78.233)  * 43758.5453) % 1;
        const x = ((sx + 1) % 1) * size;
        const y = ((sy + 1) % 1) * size;
        const sR = ((Math.sin(i * 3.7) + 1) / 2) * 0.9 + 0.3;
        const tw = 0.6 + Math.sin(rotRef.current * 0.05 + i) * 0.3;
        ctx.fillStyle = `rgba(245,240,232,${tw * 0.7})`;
        ctx.fillRect(x, y, sR, sR);
      }

      // Outer atmosphere bloom
      const center = size / 2;
      const SR = size / 2 - 12;
      const outer = ctx.createRadialGradient(center, center, SR * 0.96, center, center, SR * 1.35);
      outer.addColorStop(0, 'rgba(122,184,232,0.32)');
      outer.addColorStop(0.4, 'rgba(122,184,232,0.10)');
      outer.addColorStop(1, 'rgba(122,184,232,0)');
      ctx.fillStyle = outer;
      ctx.beginPath(); ctx.arc(center, center, SR * 1.35, 0, Math.PI * 2); ctx.fill();

      // Warm accent halo on lit side
      const accentRgb = window.hexToRgb ? window.hexToRgb(glowAccent) : '217,119,87';
      const halo = ctx.createRadialGradient(
        center - SR * 0.4, center - SR * 0.3, SR * 0.2,
        center, center, SR * 1.4
      );
      halo.addColorStop(0, `rgba(${accentRgb},0.22)`);
      halo.addColorStop(0.6, `rgba(${accentRgb},0.05)`);
      halo.addColorStop(1, `rgba(${accentRgb},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(center, center, SR * 1.4, 0, Math.PI * 2); ctx.fill();

      // Render sphere offscreen, then blit centered
      renderSphere(rotRef.current, cloudRotRef.current);
      const drawSize = SR * 2;
      ctx.drawImage(offCanvas, center - SR, center - SR, drawSize, drawSize);

      // Crisp atmosphere ring
      ctx.strokeStyle = 'rgba(122,184,232,0.65)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(center, center, SR + 0.5, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(122,184,232,0.18)';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(center, center, SR + 3, 0, Math.PI * 2); ctx.stroke();

      ctx.restore();

      rotRef.current = (rotRef.current + spinSpeed) % 360;
      cloudRotRef.current = (cloudRotRef.current + spinSpeed * 1.3) % 360;
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    return () => { alive = false; };
  }, [ready, size, spinSpeed, sunAngle, glowAccent]);

  // Fallback: dotted earth if textures fail
  if (ready === 'fallback') {
    return <window.RealisticGlobe size={size} accent={glowAccent} spinSpeed={spinSpeed} />;
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, display: 'block' }} />
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.2em',
        }}>LOADING EARTH…</div>
      )}
      {/* Floating pulse markers (city overlays) */}
      {ready && [
        { l: 38, t: 32, c: glowAccent, lbl: 'TYO' },
        { l: 28, t: 38, c: '#7AB8E8', lbl: 'NYC' },
        { l: 50, t: 35, c: '#E8A260', lbl: 'LON' },
        { l: 70, t: 62, c: glowAccent, lbl: 'SYD' },
        { l: 56, t: 58, c: '#D9B679', lbl: 'JNB' },
      ].map((m, i) => (
        <div key={i} style={{ position: 'absolute', left: `${m.l}%`, top: `${m.t}%`, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: m.c, boxShadow: `0 0 10px ${m.c}, 0 0 22px ${m.c}88` }} />
          <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `1px solid ${m.c}`, animation: `gsPulse ${2 + i * 0.4}s ease-out infinite` }} />
        </div>
      ))}
    </div>
  );
};

window.PhotorealEarth = PhotorealEarth;
