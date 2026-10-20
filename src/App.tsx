import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { about, certifications, contact, education, highlights, roles, profile, projects, skills, softSkills, type Project, type Shot, type Stat } from "./data";

const base = import.meta.env.BASE_URL;
const v = (vars: Record<string, string | number>) => vars as CSSProperties;
const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

const allItems = skills.flatMap((g) => g.items);
const logoOf = (name: string) => allItems.find((i) => i.name.toLowerCase() === name.toLowerCase())?.logo;
const featured = projects.filter((p) => p.features.length > 0);
const more = projects.filter((p) => p.features.length === 0);

function Tile({ name, logo }: { name: string; logo?: string }) {
  return (
    <span className="tile">
      <span className="tile-img">{logo ? <img src={`${base}logos/${logo}`} alt="" width={42} height={42} loading="lazy" /> : name.replace(/[^A-Za-z#.+]/g, "").slice(0, 2)}</span>
      <span>{name}</span>
    </span>
  );
}

function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="section reveal">
      <div className="wrap">
        {kicker && <p className="sec-kicker">{kicker}</p>}
        <h2 id={`${id}-h`} aria-label={title}>{title.split(" ").map((w, i) => <span className="hw" aria-hidden="true" key={i}><span style={v({ "--i": i })}>{w}</span></span>)}</h2>{children}
      </div>
    </section>
  );
}

/** Counts up from 0 when scrolled into view. */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Stats({ items, className = "" }: { items: Stat[]; className?: string }) {
  return (
    <ul className={`stats ${className}`}>
      {items.map((s, i) => <li key={s.label} style={v({ "--k": i })}><strong><Count to={s.value} suffix={s.suffix} /></strong><span>{s.label}</span></li>)}
    </ul>
  );
}

type Tok = [string, string];
const q = (s: string) => `"${s}"`;
const code: Tok[][] = [
  [["const ", "k"], ["developer", "n"], [" = {", "p"]],
  [["  name", "t"], [": ", "p"], [q(profile.name), "s"], [",", "p"]],
  [["  role", "t"], [": ", "p"], [q("Full-Stack & Mobile Developer"), "s"], [",", "p"]],
  [["  stack", "t"], [": [", "p"], [q("Flutter"), "s"], [", ", "p"], [q("Node"), "s"], [", ", "p"], [q(".NET"), "s"], ["],", "p"]],
  [["  location", "t"], [": ", "p"], [q(profile.location), "s"], [",", "p"]],
  [["  remote", "t"], [": ", "p"], ["true", "b"], [",", "p"]],
  [["  startDate", "t"], [": ", "p"], [q("immediately"), "s"], [",", "p"]],
  [["  ironman", "t"], [": ", "p"], ["true", "b"], [",", "p"]],
  [["};", "p"]],
];

const bits = ["{ }", "</>", "=>", "( )", "[ ]", "//", "&&", "0x1F", "fn", "#!", "++", "git", "npm", "async", "null", "<div>"];
const hues = ["var(--accent)", "var(--cyan)", "var(--violet)", "var(--green)", "var(--orange)"];
function Glyphs() {
  return (
    <div className="glyphs" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={v({ "--x": `${(i * 37 + 5) % 96}%`, "--s": `${14 + ((i * 7) % 16)}px`, "--d": `${22 + ((i * 5) % 18)}s`, "--l": `-${(i * 4) % 26}s`, "--c": hues[i % hues.length] })}>{b}</span>
      ))}
    </div>
  );
}

function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(words[0]);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced()) return;
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && txt === w) { setDel(true); return; }
      if (del && txt === "") { setDel(false); setI((i + 1) % words.length); return; }
      setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1));
    }, !del && txt === w ? 1800 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return <span className="typer" aria-label={words.join(", ")}><span aria-hidden="true">{txt}</span><b className="caret" aria-hidden="true" /></span>;
}

/** Network of drifting dots in the hero that reach toward the pointer. */
function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c || reduced()) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, raf = 0; const m = { x: -999, y: -999 };
    const dpr = Math.min(2, devicePixelRatio || 1);
    const resize = () => { w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const n = Math.round(Math.min(70, (w * h) / 16000));
    const pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
    const host = c.parentElement!;
    const mv = (e: PointerEvent) => { const r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
    const lv = () => { m.x = m.y = -999; };
    host.addEventListener("pointermove", mv); host.addEventListener("pointerleave", lv); addEventListener("resize", resize);
    let vis = true; const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(c);
    const draw = () => {
      raf = requestAnimationFrame(draw); if (!vis) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - m.x, p.y - m.y);
        if (dm < 160) { p.x += (m.x - p.x) * .006; p.y += (m.y - p.y) * .006; }
      }
      for (let a = 0; a < pts.length; a++) {
        const p = pts[a];
        for (let b = a + 1; b < pts.length; b++) {
          const q = pts[b], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) { ctx.strokeStyle = `rgba(91,157,255,${(1 - d / 120) * .35})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        const dm = Math.hypot(p.x - m.x, p.y - m.y);
        if (dm < 160) { ctx.strokeStyle = `rgba(79,216,235,${(1 - dm / 160) * .6})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(m.x, m.y); ctx.stroke(); }
        ctx.fillStyle = dm < 160 ? "#4FD8EB" : "rgba(160,190,255,.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, dm < 160 ? 2.4 : 1.6, 0, 7); ctx.fill();
      }
    };
    draw();
    return () => { cancelAnimationFrame(raf); io.disconnect(); host.removeEventListener("pointermove", mv); host.removeEventListener("pointerleave", lv); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="constellation" aria-hidden="true" />;
}

function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <p className="copy-email">
      <span>{email}</span>
      <button type="button" onClick={() => { navigator.clipboard?.writeText(email).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); }).catch(() => {}); }}>{done ? "Copied ✓" : "Copy email"}</button>
    </p>
  );
}

function Hero() {
  const [photoOk, setPhotoOk] = useState(Boolean(profile.photo));
  return (
    <header className="hero-wrap" onPointerMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    }}>
      <div className="grid-bg" aria-hidden="true" /><Constellation /><div className="spot" aria-hidden="true" />
      <div className="blob b1" aria-hidden="true" /><div className="blob b2" aria-hidden="true" />
      <div className="hero wrap">
        <div className="hero-text">
          <p className="kicker rise" style={v({ "--i": 0 })}><span className="dot" />Available now · Remote or hybrid</p>
          <h1 aria-label={profile.name}>{profile.name.split(" ").map((w, i) => <span className="mask" aria-hidden="true" key={i}><span className="w" style={v({ "--i": i })}>{w}</span></span>)}</h1>
          <p className="role rise" style={v({ "--i": 4 })}><Typer words={roles} /></p>
          <p className="sub rise" style={v({ "--i": 4 })}>{profile.title}</p>
          <p className="lead rise" style={v({ "--i": 5 })}>{profile.intro}</p>
          <div className="btns rise" style={v({ "--i": 6 })}>
            <a className="btn primary shine" href="#projects" data-mag>View projects →</a>
            {profile.cv && <a className="btn cv" href={`${base}${profile.cv}`} download data-mag><span className="dl" aria-hidden="true">↓</span>Download CV</a>}
            <a className="btn" href={contact.email ? `mailto:${contact.email}` : "#contact"} data-mag>✉ Contact me</a>
          </div>
          <div className="rise" style={v({ "--i": 7 })}><Stats items={highlights} className="hero-stats" /></div>
        </div>
        {photoOk && (
          <div className="photo-wrap rise" style={v({ "--i": 3 })}>
            <div className="tilt" data-tilt>
              <span className="ring" aria-hidden="true" />
              <img className="photo" src={`${base}${profile.photo}`} alt={profile.photoAlt} width={420} height={525} onError={() => setPhotoOk(false)} fetchPriority="high" />
              <span className="photo-tag">🏊 🚴 🏃 Ironman finisher</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Band() {
  const reel = allItems.filter((i) => i.logo);
  const track = [...reel, ...reel];
  return (
    <>
      <div className="band wrap">
        <figure className="code reveal" aria-label="Summary of who I am, written as code">
          <figcaption><i /><i /><i /><span>developer.ts</span></figcaption>
          <pre>{code.map((line, i) => {
            const n = line.reduce((s, [t]) => s + t.length, 0);
            return <code className="ln" key={i} style={v({ "--n": n, "--i": i })}>{line.map(([t, c], j) => <span className={`c-${c}`} key={j}>{t}</span>)}{i === code.length - 1 && <b className="caret" />}{"\n"}</code>;
          })}</pre>
        </figure>
        <div className="status reveal">
          <p className="live"><span className="dot" />Ready to start immediately</p>
          <p>{profile.availability}</p>
          <p className="muted">{profile.availabilityExtra}</p>
          <ul className="open-to">{profile.openTo.map((o, i) => <li key={o} style={v({ "--k": i })}>{o}</li>)}</ul>
        </div>
      </div>
      {reel.length > 0 && (
        <div className="reel" aria-hidden="true"><div className="reel-track">{[0, 1].map((c) => <div className="reel-set" key={c}>{track.map((t, i) => <Tile key={`${c}-${i}`} name={t.name} logo={t.logo} />)}</div>)}</div></div>
      )}
    </>
  );
}

function Phones({ shots, onOpen }: { shots: Shot[]; onOpen: (s: Shot) => void }) {
  const mid = (shots.length - 1) / 2;
  return (
    <div className="phones" style={v({ "--count": shots.length })}>
      {shots.map((s, i) => (
        <button key={s.src} className="phone" style={v({ "--o": i - mid, "--k": i })} onClick={() => onOpen(s)} aria-label={`View ${s.caption ?? "screenshot"} larger`}>
          <img src={`${base}${s.src}`} alt={s.alt} loading="lazy" width={250} height={534} />
          {s.caption && <span>{s.caption}</span>}
        </button>
      ))}
    </div>
  );
}

function Browser({ shots, url, onOpen }: { shots: Shot[]; url?: string; onOpen: (s: Shot) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (shots.length < 2 || paused || reduced()) return;
    const t = setInterval(() => setI((x) => (x + 1) % shots.length), 3800);
    return () => clearInterval(t);
  }, [shots.length, paused]);
  return (
    <div className="browser" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="browser-bar"><i /><i /><i /><span>{url ? url.replace(/^https?:\/\//, "") : shots[i].caption ?? ""}</span></div>
      <div className="browser-view">
        {shots.map((s, n) => (
          <button key={s.src} className={`slide${n === i ? " on" : ""}`} onClick={() => onOpen(s)} tabIndex={n === i ? 0 : -1} aria-hidden={n !== i} aria-label={`View ${s.caption ?? "screenshot"} larger`}>
            <img src={`${base}${s.src}`} alt={s.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {shots.length > 1 && (
        <div className="dots" role="tablist" aria-label="Screenshots">
          {shots.map((s, n) => <button key={s.src} role="tab" aria-selected={n === i} className={n === i ? "on" : ""} onClick={() => setI(n)}>{s.caption}</button>)}
        </div>
      )}
    </div>
  );
}

function Visual({ p, onOpen }: { p: Project; onOpen: (s: Shot) => void }) {
  if (p.shots?.length && p.shotStyle === "phone") return <Phones shots={p.shots} onOpen={onOpen} />;
  if (p.shots?.length) return <Browser shots={p.shots} url={p.demo} onOpen={onOpen} />;
  if (p.terminal) return (
    <figure className="term" aria-label={`${p.name} test results`}>
      <figcaption className="tbar"><i /><i /><i /><span>{p.terminal.title}</span></figcaption>
      <ol>{p.terminal.lines.map(([kind, text, bar], i) => <li key={i} className={`t-${kind}`} style={v({ "--k": i })}>{text}{bar ? <span className="t-bar" style={v({ "--w": `${bar * 0.9}px` })} /> : null}</li>)}</ol>
    </figure>
  );
  if (p.logo) return <div className="logo-stage"><span className="orbit" aria-hidden="true" /><img src={`${base}${p.logo}`} alt={`${p.name} logo`} loading="lazy" /></div>;
  return null;
}

function ProjectView({ p, n, onOpen }: { p: Project; n: number; onOpen: (s: Shot) => void }) {
  const wide = p.shotStyle === "wide";
  return (
    <article id={p.id} className={`project reveal${wide ? " is-wide" : ""}`} style={v({ "--pa": p.accent })}>
      <div className="project-top">
        <div className="project-head">
          <p className="p-num">{String(n + 1).padStart(2, "0")} <span>{p.tag}</span></p>
          <h3>{p.logo && !p.shots?.length ? p.name : <>{p.logo && <img className="p-logo" src={`${base}${p.logo}`} alt="" />}{p.name}</>}</h3>
          <p className="tagline">{p.tagline}</p>
          <p className="p-role"><b>My role</b>{p.role}</p>
          <p>{p.summary}</p>
          {p.stack.length > 0 && <ul className="chips" aria-label="Tech stack">{p.stack.map((s, i) => <li key={s} style={v({ "--k": i })}>{logoOf(s) && <img src={`${base}logos/${logoOf(s)}`} alt="" width={16} height={16} />}{s}</li>)}</ul>}
          <div className="btns">
            {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noopener noreferrer">View live site ↗</a>}
            {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">GitHub repository</a>}
          </div>
          {p.note && <p className="note small">{p.note}</p>}
        </div>
        <div className="project-visual" data-par><Visual p={p} onOpen={onOpen} /></div>
      </div>
      {p.stats && <Stats items={p.stats} className="p-stats" />}
      <div className="project-body">
        <div className="ps"><div><h4>The problem</h4><p>{p.problem}</p></div><div><h4>What we built</h4><p>{p.solution}</p></div></div>
        <div><h4>My contribution</h4><ul className="ticks">{p.contribution.map((c, i) => <li key={c} style={v({ "--k": i })}>{c}</li>)}</ul></div>
        <div><h4>Key features</h4><ul className="feats">{p.features.map((f, i) => <li key={f} style={v({ "--k": i })}>{f}</li>)}</ul></div>
      </div>
    </article>
  );
}

function MiniProject({ p, k }: { p: Project; k: number }) {
  return (
    <article id={p.id} className="card mini" style={v({ "--pa": p.accent, "--k": k })}>
      <span className="mini-glow" aria-hidden="true" />
      <p className="p-num"><span>{p.tag}</span></p>
      <h3>{p.name}</h3>
      <p className="tagline">{p.tagline}</p>
      <p>{p.summary}</p>
      <p className="muted"><b>What it solves:</b> {p.problem}</p>
    </article>
  );
}

function Links({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {contact.email && <li><a href={`mailto:${contact.email}`}>✉ {contact.email}</a></li>}
      {contact.linkedin && <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
      {contact.github && <li><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
    </ul>
  );
}

export default function App() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  const [active, setActive] = useState("");
  const [top, setTop] = useState(false);
  const openShot = (s: Shot) => setOpen({ src: `${base}${s.src}`, alt: s.alt });
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--p", String(max > 0 ? scrollY / max : 0));
      setTop(scrollY > 700);
    };
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    const spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach((el) => spy.observe(el));
    const offs: (() => void)[] = [];
    if (!reduced()) {
      document.querySelectorAll<HTMLElement>(".project, .mini").forEach((el) => {
        const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty("--px", `${e.clientX - r.left}px`); el.style.setProperty("--py", `${e.clientY - r.top}px`); };
        el.addEventListener("pointermove", mv);
        offs.push(() => el.removeEventListener("pointermove", mv));
      });
      if (matchMedia("(hover: hover)").matches) document.querySelectorAll<HTMLElement>("[data-mag]").forEach((el) => {
        const mv = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`; };
        const lv = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", mv); el.addEventListener("pointerleave", lv);
        offs.push(() => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerleave", lv); });
      });
      const pars = [...document.querySelectorAll<HTMLElement>("[data-par]")];
      const par = () => pars.forEach((el) => { const r = el.getBoundingClientRect(); const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.transform = `translateY(${k * -36}px)`; });
      par(); addEventListener("scroll", par, { passive: true }); offs.push(() => removeEventListener("scroll", par));
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const mv = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `perspective(800px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 12}deg) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 12}deg)`;
        };
        const lv = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", mv); el.addEventListener("pointerleave", lv);
        offs.push(() => { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerleave", lv); });
      });
    }
    return () => { io.disconnect(); spy.disconnect(); removeEventListener("scroll", onScroll); offs.forEach((f) => f()); };
  }, []);
  let k = 0;
  return (
    <>
      <Glyphs />
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>
      <nav className="nav" aria-label="Primary">
        <div className="wrap nav-in">
          <a href="#top" className="brand" aria-label={`${profile.name}, back to top`}><span className="br">&lt;</span>SM<span className="br"> /&gt;</span></a>
          <ul>{["skills", "projects", "education", "about", "contact"].map((s) => <li key={s}><a href={`#${s}`} className={active === s ? "active" : ""}>{s[0].toUpperCase() + s.slice(1)}</a></li>)}</ul>
        </div>
      </nav>
      <main id="main"><span id="top" />
        <Hero />
        <Band />
        <Section id="skills" title="Technical skills" kicker="What I work with">
          <div className="skills">
            {skills.filter((g) => g.items.length).map((g) => (
              <div key={g.group} className="skill-group"><h3>{g.group}</h3>
                <div className="tiles">{g.items.filter((i) => i.logo).map((i) => <span key={i.name} style={v({ "--k": k++ })} className="tile-wrap"><Tile name={i.name} logo={i.logo} /></span>)}</div>
                {g.items.some((i) => !i.logo) && <ul className="chip-row">{g.items.filter((i) => !i.logo).map((i, n) => <li key={i.name} style={v({ "--k": n })}>{i.name}</li>)}</ul>}
              </div>
            ))}
          </div>
          <h3 className="soft-h">Professional skills</h3>
          <ul className="soft">{softSkills.map((s, i) => <li key={s} style={v({ "--k": i })}>{s}</li>)}</ul>
        </Section>
        <Section id="projects" title="Featured projects" kicker="What I've built">
          <ul className="jump" aria-label="Jump to a project">
            {projects.map((p) => <li key={p.id}><a href={`#${p.id}`} style={v({ "--pa": p.accent })}>{p.name}</a></li>)}
          </ul>
          {featured.map((p, n) => <ProjectView key={p.id} p={p} n={n} onOpen={openShot} />)}
          {more.length > 0 && <>
            <h3 className="more-h">More projects</h3>
            <div className="cards minis">{more.map((p, i) => <MiniProject key={p.id} p={p} k={i} />)}</div>
          </>}
        </Section>
        <Section id="education" title="Education and certificates" kicker="Qualifications">
          <div className="cards">
            {education.map((e) => (
              <article className={`card${e.image ? " cert" : ""}`} key={e.qualification}>
                {e.image && (
                  <button className="thumb tall" onClick={() => setOpen({ src: `${base}${e.image}`, alt: `Certificate for the ${e.qualification}` })} aria-label={`View the ${e.qualification} certificate larger`}>
                    <img src={`${base}${e.image}`} alt={`Certificate for the ${e.qualification}, ${e.institution}${e.note ? ", " + e.note.toLowerCase() : ""}`} width={400} height={566} loading="lazy" />
                    <span>View certificate</span>
                  </button>
                )}
                <span className={`badge${e.status === "In progress" ? " now" : ""}`}>{e.status}</span>
                {e.note && <span className="badge now">{e.note}</span>}
                <h3>{e.qualification}</h3>
                <p>{e.institution}{e.place ? `, ${e.place}` : ""}<br />{e.period}</p>
                {e.pdf && <a className="btn" href={`${base}${e.pdf}`} download>Download PDF</a>}
              </article>
            ))}
            {certifications.map((c) => (
              <article className="card cert" key={c.title}>
                <button className="thumb" onClick={() => setOpen({ src: `${base}${c.image}`, alt: `Certificate for ${c.title}` })} aria-label={`View the ${c.title} certificate larger`}>
                  <img src={`${base}${c.image}`} alt={`Certificate of completion for ${c.title}, issued by ${c.issuer}`} width={400} height={283} loading="lazy" />
                  <span>View certificate</span>
                </button>
                <span className="badge">{c.type}</span>
                <h3>{c.title}</h3>
                <p>{c.issuer}, completed {c.date}<br /><span className="muted">Certificate code: {c.code}</span></p>
                <a className="btn" href={`${base}${c.pdf}`} download>Download PDF</a>
              </article>
            ))}
          </div>
        </Section>
        <Section id="about" title="About me" kicker="How I work">
          <div className="about-grid">
            <article className="card about-main">
              <h3>How I solve problems</h3>
              <ol className="steps" aria-label="My problem-solving steps">
                {about.steps.map((s, n) => <li key={s} style={v({ "--k": n })}><span className="step-n">{n + 1}</span>{s}</li>)}
              </ol>
              <p>{about.approach}</p>
            </article>
            <article className="card"><h3>Leading and planning</h3><p>{about.leadership}</p></article>
            <article className="card"><h3>Working in a team</h3><p>{about.learning}</p></article>
          </div>
          <h3 className="more-h">Beyond code</h3>
          <div className="life">
            {about.life.map((l, i) => (
              <article className={`card life-card l${i}`} key={l.title} style={v({ "--k": i })}>
                <span className="life-icon" aria-hidden="true">{["🏅", "🏋️", "📚"][i]}</span>
                <h3>{l.title}</h3><p>{l.text}</p>
              </article>
            ))}
          </div>
        </Section>
        <Section id="contact" title="Let's work together" kicker="Contact">
          <div className="contact-card">
            <p className="live"><span className="dot" />{profile.availability}</p>
            <p className="lead">{profile.availabilityExtra} I'm open to {profile.openTo.map((o) => o.toLowerCase()).join(", ")}.</p>
            <div className="btns">
              {contact.email && <a className="btn primary shine" href={`mailto:${contact.email}`} data-mag>✉ Email me</a>}
              {profile.cv && <a className="btn cv" href={`${base}${profile.cv}`} download data-mag><span className="dl" aria-hidden="true">↓</span>Download CV</a>}
              {contact.whatsapp && <a className="btn wa" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" data-mag>💬 WhatsApp</a>}
              {contact.phone && <a className="btn" href={`tel:${contact.phone.replace(/\s/g, "")}`} data-mag>📞 Call</a>}
              {contact.github && <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer" data-mag>GitHub</a>}
            </div>
            {contact.email && <CopyEmail email={contact.email} />}
            <ul className="numbers">
              {contact.phone && <li><b>Call</b>{contact.phone}</li>}
              {contact.whatsapp && <li><b>WhatsApp</b>{contact.whatsapp}</li>}
            </ul>
          </div>
        </Section>
      </main>
      <a className={`totop${top ? " show" : ""}`} href="#top" aria-label="Back to top">↑</a>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setOpen(null)}>
          <button className="close" autoFocus onClick={() => setOpen(null)} aria-label="Close preview">×</button>
          <img src={open.src} alt={open.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <footer className="footer"><div className="wrap foot-in">
        <span>© {new Date().getFullYear()} {profile.name}</span><Links className="foot-links" />
      </div></footer>
    </>
  );
}
