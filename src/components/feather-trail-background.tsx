// src/components/feather-trail-background.tsx
import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Décale la plume vers le bas après centrage (proportionnel à la hauteur). */
const FEATHER_SHIFT_DOWN_RATIO = 0.032;

/** Aligné sur `src/index.css` — effet vanilla porté avec cette palette */
const THEME = {
  brand: "#23413b",
  brandDark: "#1a322e",
  brandMid: "#2f5a52",
  feather: "#e86888",
  featherSoft: "#f0a8b8",
  cream: "#faf6f2",
} as const;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgba(hex: string, a: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

interface Point {
  x: number;
  y: number;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function quadBezier(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

export function FeatherTrailBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const rootCanvas = canvasRef.current;
    if (!rootCanvas) return;
    const maybeCtx = rootCanvas.getContext("2d");
    if (!maybeCtx) return;
    const c = maybeCtx;

    let width = rootCanvas.offsetWidth;
    let height = rootCanvas.offsetHeight;
    let dpr = window.devicePixelRatio || 1;

    const featherOffset = { x: 0, y: 0 };

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      alpha: number;
    }> = [];

    const DURATION = 8500;
    const HOLD_PORTION = 0.18;
    let startTime = performance.now();

    function featherSpineLocal(t: number): Point {
      const p0 = { x: width * 0.78, y: height * 0.12 };
      const p1 = { x: width * 0.38, y: height * 0.05 };
      const p2 = { x: width * 0.22, y: height * 0.82 };
      return quadBezier(p0, p1, p2, t);
    }

    function addOffset(p: Point): Point {
      return { x: p.x + featherOffset.x, y: p.y + featherOffset.y };
    }

    function featherSpine(t: number): Point {
      return addOffset(featherSpineLocal(t));
    }

    function spineTangentLocal(t: number): { tx: number; ty: number } {
      const a = featherSpineLocal(clamp(t - 0.01, 0, 1));
      const b = featherSpineLocal(clamp(t + 0.01, 0, 1));
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.max(Math.hypot(dx, dy), 0.0001);
      return { tx: dx / len, ty: dy / len };
    }

    function spineNormalLocal(t: number): { nx: number; ny: number } {
      const { tx, ty } = spineTangentLocal(t);
      return { nx: -ty, ny: tx };
    }

    function barbProfile(t: number): number {
      const base =
        Math.sin(Math.PI * Math.pow(t, 0.82)) *
        lerp(22, 124, 1 - Math.abs(t - 0.45) / 0.55);
      return Math.max(0, base * 0.88);
    }

    function barbTiltFactor(t: number): number {
      return lerp(0.35, 1.0, t);
    }

    function getBarbEndLocal(t: number, side: "left" | "right"): Point {
      const p = featherSpineLocal(t);
      const { tx, ty } = spineTangentLocal(t);
      const { nx, ny } = spineNormalLocal(t);
      const length = barbProfile(t);
      const taper = 1 - Math.pow(t, 1.8);
      const sideMul = side === "left" ? -1 : 1;
      const spread = length * (side === "left" ? 1.28 : 1.02);
      const sweep = length * barbTiltFactor(t) * 0.5;
      return {
        x: p.x + nx * spread * sideMul - tx * sweep,
        y:
          p.y +
          ny * spread * sideMul -
          ty * sweep +
          taper * (side === "left" ? -2 : 1),
      };
    }

    function getBarbEnd(t: number, side: "left" | "right"): Point {
      return addOffset(getBarbEndLocal(t, side));
    }

    function recomputeFeatherOffset() {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      function expand(p: Point) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }
      for (let i = 0; i <= 180; i++) {
        expand(featherSpineLocal(i / 180));
      }
      const barbs = 56;
      for (let i = 0; i < barbs; i++) {
        const t = 0.04 + (i / (barbs - 1)) * 0.84;
        expand(getBarbEndLocal(t, "left"));
        expand(getBarbEndLocal(t, "right"));
      }
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      featherOffset.x = width / 2 - cx;
      featherOffset.y = height / 2 - cy + height * FEATHER_SHIFT_DOWN_RATIO;
    }

    function resize() {
      const el = canvasRef.current;
      if (!el) return;
      width = el.offsetWidth;
      height = el.offsetHeight;
      dpr = window.devicePixelRatio || 1;
      el.width = width * dpr;
      el.height = height * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      recomputeFeatherOffset();
    }

    resize();
    window.addEventListener("resize", resize);

    function drawBackground() {
      c.clearRect(0, 0, width, height);
      const bg = c.createRadialGradient(
        width * 0.5,
        height * 0.48,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.82,
      );
      const { r: r0, g: g0, b: b0 } = hexToRgb(THEME.brandMid);
      const { r: r1, g: g1, b: b1 } = hexToRgb(THEME.brand);
      const { r: r2, g: g2, b: b2 } = hexToRgb(THEME.brandDark);
      bg.addColorStop(0, `rgba(${r0},${g0},${b0},0.16)`);
      bg.addColorStop(0.55, `rgba(${r1},${g1},${b1},0.11)`);
      bg.addColorStop(1, `rgba(${r2},${g2},${b2},0.07)`);
      c.fillStyle = bg;
      c.fillRect(0, 0, width, height);
    }

    function drawBackgroundDust() {
      const { r, g, b } = hexToRgb(THEME.cream);
      for (let i = 0; i < 110; i++) {
        const x = (Math.sin(i * 89.73) * 0.5 + 0.5) * width;
        const y = (Math.cos(i * 47.21) * 0.5 + 0.5) * height;
        const rDot = 0.25 + ((i * 13) % 5) * 0.14;
        c.save();
        c.fillStyle = `rgba(${r},${g},${b},0.055)`;
        c.beginPath();
        c.arc(x, y, rDot, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    interface GlowPolylineOptions {
      alpha?: number;
      outerWidth?: number;
      innerWidth?: number;
      outerBlur?: number;
      innerBlur?: number;
    }

    function drawGlowPolyline(points: Point[], options: GlowPolylineOptions = {}) {
      const {
        alpha = 1,
        outerWidth = 5,
        innerWidth = 1.6,
        outerBlur = 24,
        innerBlur = 10,
      } = options;

      if (points.length < 2) return;

      c.save();
      c.lineCap = "round";
      c.lineJoin = "round";

      c.shadowBlur = outerBlur;
      c.shadowColor = rgba(THEME.feather, 0.95 * alpha);
      c.strokeStyle = rgba(THEME.featherSoft, 0.9 * alpha);
      c.lineWidth = outerWidth;
      c.beginPath();
      c.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        c.lineTo(points[i].x, points[i].y);
      }
      c.stroke();

      c.shadowBlur = innerBlur;
      c.shadowColor = rgba(THEME.cream, 0.82 * alpha);
      c.strokeStyle = rgba(THEME.cream, 0.92 * alpha);
      c.lineWidth = innerWidth;
      c.beginPath();
      c.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        c.lineTo(points[i].x, points[i].y);
      }
      c.stroke();

      c.restore();
    }

    function buildSpinePoints(progress: number): Point[] {
      const res = 180;
      const points: Point[] = [];
      const maxT = progress;
      for (let i = 0; i <= res * maxT; i++) {
        const t = i / res;
        points.push(featherSpine(t));
      }
      return points;
    }

    function drawBarb(t: number, side: "left" | "right", reveal: number) {
      if (reveal <= 0) return;

      const p = featherSpine(t);
      const end = getBarbEnd(t, side);
      const cp = {
        x: lerp(p.x, end.x, 0.52) + (side === "left" ? -8 : 8),
        y: lerp(p.y, end.y, 0.52) - 10,
      };
      const visibleEnd = quadBezier(p, cp, end, reveal);

      c.save();
      c.lineCap = "round";
      c.lineJoin = "round";
      c.shadowBlur = 30;
      c.shadowColor = rgba(THEME.feather, 0.78);
      c.strokeStyle = rgba(THEME.featherSoft, 0.72);
      c.lineWidth = 3.25;
      c.beginPath();
      c.moveTo(p.x, p.y);
      const segments = 14;
      for (let i = 1; i <= segments; i++) {
        const tt = (i / segments) * reveal;
        const q = quadBezier(p, cp, end, tt);
        c.lineTo(q.x, q.y);
      }
      c.stroke();
      c.restore();

      c.save();
      c.shadowBlur = 28;
      c.fillStyle = rgba(THEME.cream, 0.94);
      c.beginPath();
      c.arc(visibleEnd.x, visibleEnd.y, 1.35, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function drawFeatherVanes(progress: number) {
      const barbs = 56;
      for (let i = 0; i < barbs; i++) {
        const t = 0.04 + (i / (barbs - 1)) * 0.84;
        const appearAt = t * 0.9;
        const reveal = clamp((progress - appearAt) / 0.12, 0, 1);
        drawBarb(t, "left", easeOutCubic(reveal));
        drawBarb(t, "right", easeOutCubic(reveal * 0.96));
      }
    }

    function drawTip(point: Point) {
      c.save();
      c.shadowBlur = 50;
      c.shadowColor = rgba(THEME.featherSoft, 0.92);
      c.fillStyle = rgba(THEME.cream, 0.98);
      c.beginPath();
      c.arc(point.x, point.y, 6.8, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 72;
      c.fillStyle = rgba(THEME.feather, 0.3);
      c.beginPath();
      c.arc(point.x, point.y, 19, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function spawnParticles(x: number, y: number, intensity = 4) {
      for (let i = 0; i < intensity; i++) {
        const life = Math.random() * 50 + 40;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.75) * 1.4,
          vy: Math.random() * 1.2 + 0.15,
          size: Math.random() * 2.2 + 0.6,
          life,
          maxLife: life,
          alpha: Math.random() * 0.6 + 0.25,
        });
      }
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.life -= 1;
        if (p.life <= 0) particles.splice(i, 1);
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const fade = p.life / p.maxLife;
        c.save();
        c.shadowBlur = 16;
        c.shadowColor = rgba(THEME.feather, 0.5 * fade);
        c.fillStyle = rgba(THEME.featherSoft, p.alpha * fade * 0.85);
        c.beginPath();
        c.arc(p.x, p.y, Math.max(0.2, p.size * fade), 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    function animate(now: number) {
      const cycle = (now - startTime) % DURATION;
      const raw = cycle / DURATION;
      const drawPhase = 1 - HOLD_PORTION;
      const drawingProgress =
        raw < drawPhase ? easeInOutCubic(raw / drawPhase) : 1;

      drawBackground();
      drawBackgroundDust();

      const linePoints = buildSpinePoints(drawingProgress);

      drawFeatherVanes(drawingProgress);

      drawGlowPolyline(linePoints, {
        alpha: 1,
        outerWidth: 12.5,
        innerWidth: 4.2,
        outerBlur: 46,
        innerBlur: 22,
      });

      if (linePoints.length > 1) {
        const tip = linePoints[linePoints.length - 1];
        drawTip(tip);
        if (raw < drawPhase) spawnParticles(tip.x, tip.y, 3);
      }

      updateParticles();
      drawParticles();

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-svh min-h-0 w-full overflow-hidden mix-blend-multiply opacity-[0.38] mask-[radial-gradient(ellipse_85%_75%_at_50%_42%,black_20%,transparent_72%)]"
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
