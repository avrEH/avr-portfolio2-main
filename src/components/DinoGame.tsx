import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Constants ─────────────────────────────────── */
const CANVAS_H   = 180;
const GROUND_H   = 2;        
const GROUND_Y   = 140;      
const DINO_X     = 80;
const DINO_W     = 36;
const DINO_H     = 44;
const GRAVITY    = 0.75;
const JUMP_VEL   = -14;

/* Pacman Constants */
const PAC_RADIUS   = 14;
const PAC_SPEED    = 4;
const GHOST_RADIUS = 14;
const GHOST_SPEED  = 2.5;
const FRIGHT_SPEED = 1.2;

/* Colours */
const C_BLUE     = "#007AFF";
const C_GREEN    = "#30D158";
const C_ORANGE   = "#FF9F0A";
const C_GROUND   = "rgba(255,255,255,0.15)";
const C_CACTUS   = "#FF9F0A";
const C_CLOUD    = "rgba(255,255,255,0.06)";
const DINO_COLORS = ["#ffffff", "#007AFF", "#30D158", "#FF9F0A", "#BF5AF2", "#FF375F"];
const GHOST_COLORS = ["#FF3B30", "#FF9500", "#5AC8FA", "#FFCC00"]; // Red, Orange, Light Blue, Yellow

/* ─── Types ──────────────────────────────────────── */
interface DinoState { y: number; vy: number; onGround: boolean; }
interface Obstacle  { x: number; w: number; h: number; variant: number; }
interface Cloud     { x: number; y: number; w: number; }

interface PacmanState { x: number; y: number; vx: number; vy: number; nextVx: number; nextVy: number; }
interface GhostState  { x: number; y: number; vx: number; vy: number; color: string; frightened: boolean; frightTime: number; }
interface Pellet      { x: number; y: number; r: number; isPower: boolean; }

/* ─── Draw helpers (Dino) ────────────────────────── */
function drawDino(ctx: CanvasRenderingContext2D, dino: DinoState, frame: number) {
  const x = DINO_X, y = dino.y;
  const leg1y = dino.onGround && frame % 20 < 10 ? 6 : 0;
  const leg2y = dino.onGround && frame % 20 >= 10 ? 6 : 0;

  const score = Math.floor(frame / 6);
  const dinoColor = DINO_COLORS[Math.floor(score / 100) % DINO_COLORS.length];

  ctx.fillStyle = dinoColor;
  ctx.beginPath(); ctx.roundRect(x, y, DINO_W, DINO_H - 10, 8); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x + DINO_W - 14, y - 14, 22, 18, 6); ctx.fill();
  
  ctx.fillStyle = "#000";
  ctx.beginPath(); ctx.arc(x + DINO_W + 4, y - 8, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath(); ctx.arc(x + DINO_W + 5, y - 9, 1.2, 0, Math.PI * 2); ctx.fill();
  
  ctx.strokeStyle = "#000"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(x + DINO_W + 6, y - 2); ctx.lineTo(x + DINO_W + 10, y - 2); ctx.stroke();
  
  ctx.fillStyle = dinoColor;
  ctx.beginPath(); ctx.roundRect(x + 6,  y + DINO_H - 10 + leg1y, 10, 12, 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(x + 20, y + DINO_H - 10 + leg2y, 10, 12, 4); ctx.fill();
}

function drawCactus(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  const { x, w, h, variant } = obs;
  const base = GROUND_Y - h;
  ctx.fillStyle = C_CACTUS;
  ctx.beginPath(); ctx.roundRect(x + w * 0.35, base, w * 0.3, h, 4); ctx.fill();
  if (variant === 0) {
    ctx.beginPath(); ctx.roundRect(x, base + h * 0.3, w * 0.38, h * 0.25, 3); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x, base + h * 0.1, w * 0.12, h * 0.35, 3); ctx.fill();
  } else {
    ctx.beginPath(); ctx.roundRect(x + w * 0.62, base + h * 0.3, w * 0.38, h * 0.25, 3); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x + w * 0.88, base + h * 0.1, w * 0.12, h * 0.35, 3); ctx.fill();
  }
  ctx.beginPath(); ctx.roundRect(x + w * 0.38, base - 6, w * 0.24, 10, 3); ctx.fill();
}

function drawCloud(ctx: CanvasRenderingContext2D, c: Cloud) {
  ctx.fillStyle = C_CLOUD;
  ctx.beginPath();
  ctx.ellipse(c.x, c.y, c.w * 0.5, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(c.x + c.w * 0.25, c.y - 8, c.w * 0.3, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(c.x - c.w * 0.2, c.y - 4, c.w * 0.25, 9, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* ─── Draw helpers (Pacman) ──────────────────────── */
function drawPacman(ctx: CanvasRenderingContext2D, p: PacmanState, frame: number) {
  const mouthAngle = 0.15 + Math.abs(Math.sin(frame * 0.25)) * 0.45;
  let angleOffset = 0;
  if (p.vx > 0) angleOffset = 0;
  else if (p.vx < 0) angleOffset = Math.PI;
  else if (p.vy > 0) angleOffset = Math.PI / 2;
  else if (p.vy < 0) angleOffset = -Math.PI / 2;

  ctx.fillStyle = "#FFD60A";
  ctx.beginPath();
  ctx.arc(p.x, p.y, PAC_RADIUS, angleOffset + mouthAngle, angleOffset + 2 * Math.PI - mouthAngle);
  ctx.lineTo(p.x, p.y);
  ctx.fill();
}

function drawGhost(ctx: CanvasRenderingContext2D, g: GhostState, frame: number) {
  const x = g.x, y = g.y, r = GHOST_RADIUS;
  
  let isFlashing = false;
  if (g.frightened && g.frightTime < 180 && Math.floor(frame / 10) % 2 === 0) {
    isFlashing = true;
  }
  
  ctx.fillStyle = g.frightened ? (isFlashing ? "#FFFFFF" : "#0055FF") : g.color;

  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 0);
  ctx.lineTo(x + r, y + r);
  for (let i = 1; i <= 3; i++) {
    ctx.lineTo(x + r - (r * 2 * i) / 3, y + r - (i % 2 === 0 ? 0 : 3));
  }
  ctx.lineTo(x - r, y + r);
  ctx.fill();

  if (!g.frightened) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); ctx.arc(x - 5, y - 3, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 5, y - 3, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#0000FF";
    let dx = g.vx > 0 ? 2 : g.vx < 0 ? -2 : 0;
    let dy = g.vy > 0 ? 2 : g.vy < 0 ? -2 : 0;
    ctx.beginPath(); ctx.arc(x - 5 + dx, y - 3 + dy, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 5 + dx, y - 3 + dy, 2, 0, Math.PI*2); ctx.fill();
  } else {
    ctx.strokeStyle = isFlashing ? "#FF0000" : "#FFB8AE";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x - 5, y - 3); ctx.lineTo(x - 1, y - 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 1, y - 3); ctx.lineTo(x + 5, y - 3); ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(x - 6, y + 4); ctx.lineTo(x - 3, y + 1); ctx.lineTo(x, y + 4); 
    ctx.lineTo(x + 3, y + 1); ctx.lineTo(x + 6, y + 4); ctx.stroke();
  }
}

/* ─── Component ──────────────────────────────────── */
const DinoGame = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  
  const gameRef = useRef({
    mode:       "dino" as "dino" | "pacman",
    running:    false,
    started:    false,
    gameOver:   false,
    score:      0,
    highScore:  0,
    speed:      5,
    frame:      0,
    
    // Dino State
    nextObst:   80,
    dino:       { y: GROUND_Y - DINO_H, vy: 0, onGround: true },
    obstacles:  [] as Obstacle[],
    clouds:     [{ x: 200, y: 40, w: 80 }, { x: 500, y: 60, w: 60 }, { x: 800, y: 30, w: 90 }] as Cloud[],
    
    // Pacman State
    pacman:     { x: 0, y: 0, vx: PAC_SPEED, vy: 0, nextVx: PAC_SPEED, nextVy: 0 },
    ghosts:     [] as GhostState[],
    pellets:    [] as Pellet[],
  });
  
  const [uiState, setUiState] = useState<"idle" | "playing" | "gameover">("idle");
  const [displayScore, setDisplayScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasW = useRef(800);

  // Touch tracking for swiping in Pacman
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("dinoHS") || "0");
    setHighScore(stored);
    gameRef.current.highScore = stored;
  }, []);

  const initPacman = useCallback(() => {
    const g = gameRef.current;
    const W = canvasW.current;
    g.mode = "pacman";
    g.pacman = { x: DINO_X, y: GROUND_Y - PAC_RADIUS, vx: PAC_SPEED, vy: 0, nextVx: PAC_SPEED, nextVy: 0 };
    
    // Generate pellets
    g.pellets = [];
    for (let x = 40; x < W; x += 40) {
      for (let y = 30; y < CANVAS_H - 10; y += 40) {
        // Leave space for pacman and center spawn
        if (x < 120 || (x > W/2 - 60 && x < W/2 + 60 && y > CANVAS_H/2 - 40 && y < CANVAS_H/2 + 40)) continue;
        const isPower = Math.random() < 0.05;
        g.pellets.push({ x, y, r: isPower ? 6 : 2.5, isPower });
      }
    }
    
    // Generate ghosts
    g.ghosts = GHOST_COLORS.map(color => ({
      x: W / 2 + (Math.random() - 0.5) * 40,
      y: CANVAS_H / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * GHOST_SPEED * 2,
      vy: (Math.random() - 0.5) * GHOST_SPEED * 2,
      color,
      frightened: false,
      frightTime: 0
    }));
  }, []);

  useEffect(() => {
    const handleTrigger = () => {
      const g = gameRef.current;
      if (!g.started) { g.started = true; g.running = true; setUiState("playing"); }
      if (g.mode === "dino" && !g.gameOver) {
        initPacman();
      }
    };
    window.addEventListener('triggerPacman', handleTrigger);
    return () => window.removeEventListener('triggerPacman', handleTrigger);
  }, [initPacman]);

  const setPacmanDir = useCallback((vx: number, vy: number) => {
    const p = gameRef.current.pacman;
    p.nextVx = vx * PAC_SPEED;
    p.nextVy = vy * PAC_SPEED;
  }, []);

  const actionJump = useCallback(() => {
    const g = gameRef.current;
    if (g.gameOver) return;
    if (!g.started) { g.started = true; g.running = true; setUiState("playing"); }
    if (g.mode === "dino" && g.dino.onGround) {
      g.dino.vy = JUMP_VEL;
      g.dino.onGround = false;
    }
  }, []);

  const restart = useCallback(() => {
    const g = gameRef.current;
    g.mode       = "dino";
    g.running    = true;
    g.started    = true;
    g.gameOver   = false;
    g.score      = 0;
    g.speed      = 5;
    g.frame      = 0;
    g.nextObst   = 80;
    g.obstacles  = [];
    g.dino       = { y: GROUND_Y - DINO_H, vy: 0, onGround: true };
    setDisplayScore(0);
    setUiState("playing");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const tick = () => {
      const g = gameRef.current;
      const W = canvasW.current;

      if (containerRef.current) {
        const newW = containerRef.current.clientWidth;
        if (newW !== canvasW.current) {
          canvasW.current = newW;
          canvas.width    = newW;
        }
      }

      ctx.clearRect(0, 0, W, CANVAS_H);

      if (!g.started) {
        ctx.fillStyle = C_GROUND; ctx.fillRect(0, GROUND_Y, W, GROUND_H);
        drawDino(ctx, g.dino, 0);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (g.gameOver) {
        if (g.mode === "dino") {
          ctx.fillStyle = C_GROUND; ctx.fillRect(0, GROUND_Y, W, GROUND_H);
          drawDino(ctx, g.dino, g.frame);
          g.obstacles.forEach((o) => drawCactus(ctx, o));
        } else {
          g.pellets.forEach(pel => {
            ctx.fillStyle = pel.isPower ? "#FF9F0A" : "#FFFFFF";
            ctx.beginPath(); ctx.arc(pel.x, pel.y, pel.r, 0, Math.PI*2); ctx.fill();
          });
          drawPacman(ctx, g.pacman, g.frame);
          g.ghosts.forEach((gh) => drawGhost(ctx, gh, g.frame));
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      g.frame++;

      // ── DINO MODE ──
      if (g.mode === "dino") {
        ctx.fillStyle = C_GROUND; ctx.fillRect(0, GROUND_Y, W, GROUND_H);

        g.clouds.forEach((c) => {
          drawCloud(ctx, c);
          c.x -= 0.4;
          if (c.x + c.w < 0) c.x = W + c.w;
        });

        const d = g.dino;
        d.vy += GRAVITY;
        d.y  += d.vy;
        if (d.y >= GROUND_Y - DINO_H) { d.y = GROUND_Y - DINO_H; d.vy = 0; d.onGround = true; } 
        else { d.onGround = false; }

        g.speed = 5 + g.frame * 0.004;
        g.nextObst--;
        if (g.nextObst <= 0) {
          const h = 40 + Math.random() * 35;
          const w = 28 + Math.random() * 20;
          g.obstacles.push({ x: W, w, h, variant: Math.random() < 0.5 ? 0 : 1 });
          g.nextObst = 60 + Math.random() * 80;
        }

        g.obstacles.forEach((o) => { o.x -= g.speed; });
        g.obstacles = g.obstacles.filter((o) => o.x + o.w > 0);

        const pad = 8;
        const dx  = DINO_X + pad, dw = DINO_W - pad * 2;
        const dy  = d.y + pad,    dh = DINO_H - pad;
        for (const o of g.obstacles) {
          const ox = o.x + 4, ow = o.w - 8;
          const oy = GROUND_Y - o.h, oh = o.h;
          if (dx + dw > ox && dx < ox + ow && dy + dh > oy && dy < oy + oh) {
            g.gameOver = true;
          }
        }

        g.score++;
        const currentScore = Math.floor(g.score / 6);
        if (g.frame % 6 === 0) setDisplayScore(currentScore);

        drawDino(ctx, d, g.frame);
        g.obstacles.forEach((o) => drawCactus(ctx, o));
      } 
      
      // ── PACMAN MODE ──
      else if (g.mode === "pacman") {
        const p = g.pacman;
        
        // Input handling (turn instantly)
        p.vx = p.nextVx;
        p.vy = p.nextVy;
        
        p.x += p.vx;
        p.y += p.vy;

        // Wrap & Bounce
        if (p.x > W + PAC_RADIUS) p.x = -PAC_RADIUS;
        if (p.x < -PAC_RADIUS) p.x = W + PAC_RADIUS;
        if (p.y > CANVAS_H - PAC_RADIUS) { p.y = CANVAS_H - PAC_RADIUS; p.vy = 0; p.nextVy = 0; }
        if (p.y < PAC_RADIUS) { p.y = PAC_RADIUS; p.vy = 0; p.nextVy = 0; }

        // Pellets
        g.pellets = g.pellets.filter(pel => {
          const dx = p.x - pel.x, dy = p.y - pel.y;
          if (dx*dx + dy*dy < (PAC_RADIUS + pel.r)**2) {
             g.score += pel.isPower ? 60 : 12; // 10 pts and 2 pts visually
             if (pel.isPower) g.ghosts.forEach(gh => { gh.frightened = true; gh.frightTime = 600; });
             return false;
          }
          return true;
        });

        // Ghosts
        g.ghosts.forEach(gh => {
          if (gh.frightened) gh.frightTime--;
          if (gh.frightTime <= 0) gh.frightened = false;

          // AI Logic
          if (Math.random() < 0.02 || gh.y <= GHOST_RADIUS || gh.y >= CANVAS_H - GHOST_RADIUS) {
             if (gh.frightened) {
                gh.vx = (Math.random() - 0.5) * 4;
                gh.vy = (Math.random() - 0.5) * 4;
             } else {
                const dx = p.x - gh.x, dy = p.y - gh.y;
                const mag = Math.sqrt(dx*dx + dy*dy) || 1;
                gh.vx = (dx / mag) * GHOST_SPEED + (Math.random() - 0.5);
                gh.vy = (dy / mag) * GHOST_SPEED + (Math.random() - 0.5);
             }
          }
          
          const speed = gh.frightened ? FRIGHT_SPEED : GHOST_SPEED;
          const mag = Math.sqrt(gh.vx*gh.vx + gh.vy*gh.vy) || 1;
          gh.vx = (gh.vx / mag) * speed;
          gh.vy = (gh.vy / mag) * speed;

          gh.x += gh.vx;
          gh.y += gh.vy;

          if (gh.x > W + GHOST_RADIUS) gh.x = -GHOST_RADIUS;
          if (gh.x < -GHOST_RADIUS) gh.x = W + GHOST_RADIUS;
          if (gh.y > CANVAS_H - GHOST_RADIUS) { gh.y = CANVAS_H - GHOST_RADIUS; gh.vy *= -1; }
          if (gh.y < GHOST_RADIUS) { gh.y = GHOST_RADIUS; gh.vy *= -1; }

          // Collision
          const distSq = (p.x - gh.x)**2 + (p.y - gh.y)**2;
          if (distSq < (PAC_RADIUS + GHOST_RADIUS - 6)**2) {
             if (gh.frightened) {
               g.score += 1200; // 200 pts
               gh.x = W/2; gh.y = CANVAS_H/2;
               gh.frightened = false;
             } else {
               g.gameOver = true;
             }
          }
        });

        // Regen pellets if empty
        if (g.pellets.length === 0) {
           for (let x = 40; x < W; x += 40) {
             for (let y = 30; y < CANVAS_H - 10; y += 40) {
               if (Math.abs(x - p.x) < 60 && Math.abs(y - p.y) < 60) continue; // don't spawn on pacman
               g.pellets.push({ x, y, r: 2.5, isPower: Math.random() < 0.05 });
             }
           }
        }

        if (g.frame % 6 === 0) setDisplayScore(Math.floor(g.score / 6));

        // Draw
        g.pellets.forEach(pel => {
          ctx.fillStyle = pel.isPower ? "#FF9F0A" : "rgba(255,255,255,0.4)";
          if (pel.isPower && Math.floor(g.frame/10)%2===0) ctx.fillStyle = "#FFFFFF";
          ctx.beginPath(); ctx.arc(pel.x, pel.y, pel.r, 0, Math.PI*2); ctx.fill();
        });
        drawPacman(ctx, p, g.frame);
        g.ghosts.forEach(gh => drawGhost(ctx, gh, g.frame));
      }

      if (g.gameOver) {
        setUiState("gameover");
        const currentScore = Math.floor(g.score / 6);
        if (currentScore > g.highScore) {
          g.highScore = currentScore;
          localStorage.setItem("dinoHS", String(currentScore));
          setHighScore(currentScore);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Keyboard & Touch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const g = gameRef.current;
      if (e.code === "Space") {
        e.preventDefault();
        if (g.gameOver) restart();
        else actionJump();
      }
      
      // Also trigger Pacman cheat to test easily
      if (e.code === "KeyP" && !g.gameOver && g.started) {
        g.score = 495 * 6; // Set score to 495 so it transitions in 5 points
      }

      if (g.mode === "pacman" && !g.gameOver) {
        if (e.code === "ArrowUp")    { e.preventDefault(); setPacmanDir(0, -1); }
        if (e.code === "ArrowDown")  { e.preventDefault(); setPacmanDir(0, 1); }
        if (e.code === "ArrowLeft")  { e.preventDefault(); setPacmanDir(-1, 0); }
        if (e.code === "ArrowRight") { e.preventDefault(); setPacmanDir(1, 0); }
      } else if (g.mode === "dino" && e.code === "ArrowUp") {
        e.preventDefault();
        if (g.gameOver) restart();
        else actionJump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actionJump, restart, setPacmanDir]);

  const handleInteraction = () => {
    if (uiState === "gameover") restart();
    else if (gameRef.current.mode === "dino") actionJump();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (gameRef.current.mode === "pacman") {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) setPacmanDir(1, 0);
        else if (dx < -30) setPacmanDir(-1, 0);
      } else {
        if (dy > 30) setPacmanDir(0, 1);
        else if (dy < -30) setPacmanDir(0, -1);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full relative cursor-pointer select-none"
      onClick={handleInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none", height: CANVAS_H }}
    >
      {/* Score */}
      <div className="absolute top-2 right-4 flex items-center gap-4 text-xs font-mono z-10 pointer-events-none">
        {(highScore > 0 || displayScore > 0) && (
          <>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>
              HI <span style={{ color: C_ORANGE }} className="font-bold">{String(highScore).padStart(5, "0")}</span>
            </span>
            <span style={{ color: C_BLUE }} className="font-bold text-sm">
              {String(displayScore).padStart(5, "0")}
            </span>
          </>
        )}
      </div>

      <canvas
        ref={canvasRef}
        height={CANVAS_H}
        style={{ display: "block", width: "100%", height: `${CANVAS_H}px` }}
      />

      {uiState === "gameover" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <p className="text-white font-mono text-sm tracking-wide bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
            💥 Tap to restart
          </p>
        </div>
      )}
    </div>
  );
};

export default DinoGame;
