"use client";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700", "900"], // add bold/heavy weights like canvas
});

const projects = [
    { title: "Portfolio Website", tags: ["Next.js", "TypeScript"], description: "My personal portfolio.", link: "https://github.com/Kacper-Januszewski/site-project" },
    { title: "Home Dashboard", tags: ["Svelte", "JavaScript"], description: "Weather and stats dashboard for home", link: "https://github.com/Kacper-Januszewski/Home-Dashboard" },
    { title: "Password Manager", tags: ["C++"], description: "A simple password manager", link: "https://github.com/Kacper-Januszewski/Password_Manager" },
    //{ title: "Weather Dashboard", tags: ["React", "API"], description: "Weather info in real time.", link: "https://github.com/Kacper-Januszewski/Subi" },
    //{ title: "Task Manager", tags: ["Next.js", "Prisma"], description: "Fullstack productivity app.", link: "https://github.com/Kacper-Januszewski/Subi" },
    //{ title: "Landing Page", tags: ["HTML", "CSS"], description: "Simple responsive marketing page.", link: "https://github.com/Kacper-Januszewski/Subi" },
];


import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon, ExternalLink, ChevronDown } from "lucide-react";

export default function PortfolioExperimental() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "dark";
        return (localStorage.getItem("theme") as "light" | "dark") || "dark";
    });
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState("home");
    const [showScrollHint, setShowScrollHint] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const [usingKeyboard, setUsingKeyboard] = useState(false);

    // height (in vh) of the whole document so the background spans the full page
    const [bgHeightVh, setBgHeightVh] = useState(400);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Detect input type (keyboard vs mouse)
    useEffect(() => {
        const handleKey = () => setUsingKeyboard(true);
        const handleMouse = () => setUsingKeyboard(false);
        window.addEventListener("keydown", handleKey);
        window.addEventListener("mousedown", handleMouse);
        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("mousedown", handleMouse);
        };
    }, []);

    // Scroll progress + hint
    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
            setProgress(Math.max(0, Math.min(1, scrolled)));
            setAtBottom(h.scrollTop + h.clientHeight >= h.scrollHeight - 2);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            setShowScrollHint(false);
            scrollTimeout.current = setTimeout(() => {
                if (!(h.scrollTop + h.clientHeight >= h.scrollHeight - 2)) setShowScrollHint(true);
            }, 5000);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const sections = [
        { id: "home", label: "Home", watermark: "HOME" },
        { id: "about", label: "About", watermark: "ABOUT" },
        { id: "work", label: "Work", watermark: "WORK" },
        { id: "contact", label: "Contact", watermark: "CONTACT" },
    ];

    // Active section highlight (only nav links)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible && sections.some((s) => s.id === visible.target.id)) {
                    setCurrent(visible.target.id);
                }
            },
            { threshold: [0.5] }
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // === Band background ===

    // Colors (same vibe as before)
    const darkBands = ["#000000", "#000814", "#001d3d", "#370617", "#6a040f"];
    const lightBands = ["#ffffff", "#e0f7fa", "#b3e5fc", "#ffcdd2", "#f8bbd0"];
    const bands = theme === "dark" ? darkBands : lightBands;

    // Controls:
    // edgeVh = how much the very top & very bottom colors persist (shorter → only a hint at edges)
    // blendVh = how wide the crossfade is between adjacent colors (bigger → smoother)
    const edgeVh = 9;   // shorten top & bottom presence
    const blendVh = 80;  // very smooth transitions

    // compute/track total document height in vh so the gradient lines up with the page
    useEffect(() => {
        const calc = () => {
            const vh = (document.documentElement.scrollHeight / window.innerHeight) * 100;
            setBgHeightVh(Math.max(100, Math.ceil(vh)));
        };
        // calc on load + small delay for fonts/images + on resize
        calc();
        const t = setTimeout(calc, 50);
        const t2 = setTimeout(calc, 300);
        window.addEventListener("resize", calc);
        return () => {
            clearTimeout(t);
            clearTimeout(t2);
            window.removeEventListener("resize", calc);
        };
    }, []);

    // build a super-smooth banded gradient
    const backgroundImage = buildBandedGradient(bands, bgHeightVh, { edgeVh, blendVh });

    return (
        <div
            className={`relative min-h-screen overflow-hidden transition-colors duration-200 ease-linear ${inter.className} ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
            } ${usingKeyboard ? "using-keyboard" : ""}`}
            draggable={false}
        >

            {/* Banded background */}
            <div
                className="pointer-events-none absolute left-0 top-0 w-full -z-20"
                style={{
                    height: `${bgHeightVh}vh`,
                    backgroundImage,
                    backgroundAttachment: "scroll",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                }}
                aria-hidden
                draggable={false}
            />

            {/* Subtle grid overlay, scaled to full document height so it rides the bands */}
            <svg
                className="pointer-events-none absolute top-0 left-0 -z-10 w-full opacity-[0.08] dark:opacity-[0.12] transition-colors duration-200 ease-linear"
                style={{ height: `${bgHeightVh}vh` }}
                aria-hidden
            >
                <defs>
                    <pattern id="crosshairGrid" width="128" height="128" patternUnits="userSpaceOnUse">
                        <line x1="64" y1="54" x2="64" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <line x1="54" y1="64" x2="74" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#crosshairGrid)" />
            </svg>

            {/* Progress bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-[4px] bg-transparent" draggable={false}>
                <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {/* Scroll hint */}
            <AnimatePresence>
                {showScrollHint && !atBottom && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 z-50"
                        draggable={false}
                    >
                        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                            <ChevronDown className="w-6 h-6" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header
                className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 backdrop-blur border-b transition-colors duration-200 ease-linear ${
                    theme === "dark" ? "bg-black/40 border-white/10" : "bg-white/40 border-black/10"
                }`}
                draggable={false}
            >
                <a
                    href="#home"
                    className="font-bold tracking-tight text-lg bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-transparent select-none"
                    draggable={false}
                >
                    JDev
                </a>
                <nav
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-1 text-sm select-none"
                    draggable={false}
                >
                    {sections.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className={`px-3 py-1 rounded-full transition-colors duration-150 ease-linear border ${
                                current === s.id
                                    ? theme === "dark"
                                        ? "bg-white/10 border-white/20"
                                        : "bg-black/10 border-black/20"
                                    : "border-transparent " + (theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/5")
                            }`}
                            draggable={false}
                        >
                            {s.label}
                        </a>
                    ))}
                </nav>
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors duration-150 ease-linear hover:opacity-80 focus:outline-none ${
                        usingKeyboard ? "focus:ring-2 focus:ring-fuchsia-400" : ""
                    } ${theme === "dark" ? "border-white/30" : "border-black/30 bg-black/10"}`}
                    draggable={false}
                >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </header>

            {/* Sections */}
            <Section id="home" watermark="HOME">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] text-center select-none"
                    draggable={false}
                >
                    Beyond Ordinary.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-lg md:text-2xl text-center max-w-2xl opacity-80 select-none"
                    draggable={false}
                >
                    Driven by design. Powered by code.
                </motion.p>
                <div className="mt-10 flex items-center gap-3" draggable={false}>
                    <CTA href="#work" label="View Work" theme={theme} />
                    <CTAGhost href="#contact" label="Contact" theme={theme} />
                </div>
            </Section>

            <Section id="about" watermark="ABOUT">
                <div className="max-w-4xl text-center select-none" draggable={false}>
                    <h2 className="text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-lg opacity-80">
                        Developer, designer (sort of), explorer of the digital frontier. I break, experiment, and sometimes even get it right. Progress, for me, is built one small discovery at a time.
                    </p>
                </div>
            </Section>

            <Section id="work" watermark="WORK">
                <h2 className="text-4xl font-bold mb-10 select-none" draggable={false}>
                    Selected Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 w-full max-w-6xl" draggable={false}>
                    {projects.map((p, i) => (
                        <ProjectCard
                            key={i}
                            title={p.title}
                            tags={p.tags}
                            description={p.description}
                            link={p.link}
                            theme={theme}
                        />
                    ))}

                </div>
            </Section>

            <Section id="contact" watermark="CONTACT">
                <div
                    className={`${
                        theme === "dark" ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"
                    } rounded-3xl p-10 border backdrop-blur shadow-xl flex flex-col items-center gap-6 w-[min(90%,680px)] transition-colors duration-200 ease-linear select-none`}
                    draggable={false}
                >
                    <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
                    <p className="opacity-80 text-center">Open to freelance & collaborations.</p>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/Kacper-Januszewski"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded-full"
                            draggable={false}
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/kacper-januszewski/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                            draggable={false}
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="mailto:januszewskidev@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
                            draggable={false}
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
}

/* ---------------- helpers ---------------- */

function buildBandedGradient(
    colors: string[],
    totalVh: number,
    opts: { edgeVh: number; blendVh: number }
) {
    const { edgeVh, blendVh } = opts;
    const n = colors.length;
    if (n <= 1) return colors[0] ?? "transparent";

    const usable = Math.max(0, totalVh - 2 * edgeVh);
    const gaps = n - 1;
    const seg = usable / gaps;

    // keep blend comfortably below segment size to avoid "flat" takeover
    const blend = Math.min(blendVh, Math.max(6, seg * 0.9));

    const stops: string[] = [];

    // Top: short presence of first color
    const firstFlatEnd = Math.max(0, edgeVh - blend / 2);
    stops.push(`${colors[0]} 0vh`, `${colors[0]} ${firstFlatEnd}vh`);

    // Middle transitions
    for (let i = 0; i < gaps; i++) {
        const a = colors[i];
        const b = colors[i + 1];
        const center = edgeVh + i * seg;

        const aEnd = clampVh(center - blend / 2, 0, totalVh);
        const bStart = clampVh(center + blend / 2, 0, totalVh);

        // keep the previous color until aEnd
        stops.push(`${a} ${aEnd}vh`);
        // then fade into the next color by bStart
        stops.push(`${b} ${bStart}vh`);
    }

    // Bottom: short presence of last color
    const lastStart = clampVh(totalVh - (edgeVh - blend / 2), 0, totalVh);
    stops.push(`${colors[n - 1]} ${lastStart}vh`, `${colors[n - 1]} ${totalVh}vh`);

    return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

function clampVh(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

/* -------------- presentational bits -------------- */

function Section({ id, watermark, children }: { id: string; watermark: string; children: React.ReactNode }) {
    return (
        <section
            id={id}
            className="relative h-screen flex flex-col items-center justify-center transition-colors duration-200 ease-linear select-none"
            draggable={false}
        >
            <motion.div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
                <div className="text-[14vw] font-black tracking-tighter opacity-[0.05] dark:opacity-[0.04] leading-none transition-colors duration-200 ease-linear">
                    <span style={{ WebkitTextStroke: "1px currentColor", color: "transparent" }}>{watermark}</span>
                </div>
            </motion.div>
            <div className="relative z-10 px-6 w-full flex flex-col items-center" draggable={false}>
                {children}
            </div>
        </section>
    );
}

function CTA({ href, label, theme }: { href: string; label: string; theme: "light" | "dark" }) {
    return (
        <a
            href={href}
            className={`group inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold border backdrop-blur hover:bg-white/20 transition-colors duration-150 ease-linear ${
                theme === "dark" ? "border-white/20 bg-white/10" : "border-black/30 bg-black/10 hover:bg-black/20"
            } focus:outline-none focus:ring-2 focus:ring-fuchsia-400`}
            draggable={false}
        >
            {label}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150 ease-linear" />
        </a>
    );
}

function CTAGhost({ href, label, theme }: { href: string; label: string; theme: "light" | "dark" }) {
    return (
        <a
            href={href}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold border transition-colors duration-150 ease-linear ${
                theme === "dark" ? "border-white/10 hover:bg-white/10" : "border-black/30 bg-black/5 hover:bg-black/10"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            draggable={false}
        >
            {label}
        </a>
    );
}

function ProjectCard({
                         title,
                         tags,
                         description,
                         theme,
                         link,
                     }: {
    title: string;
    tags: string[];
    description: string;
    theme: "light" | "dark";
    link: string;
}) {
    const borderDark =
        "bg-[conic-gradient(from_180deg_at_50%_50%,#67e8f9_0%,#60a5fa_25%,#a78bfa_50%,#f472b6_75%,#67e8f9_100%)]";
    const borderLight =
        "bg-[conic-gradient(from_180deg_at_50%_50%,#ffe0b2_0%,#f8bbd0_25%,#b3e5fc_50%,#c8e6c9_75%,#ffe0b2_100%)]";

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl p-[1px] block select-none"
        >
            {/* gradient border */}
            <div
                className={`absolute inset-0 rounded-2xl opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-150 ease-linear
          ${theme === "dark" ? borderDark : borderLight}`}
            />

            {/* card body */}
            <div
                className={`
          relative rounded-2xl border p-5 group-hover:translate-y-[-2px] transition-all duration-150 ease-linear
          backdrop-blur
          ${theme === "dark"
                    ? "border-white/10 bg-black/60 hover:bg-black/70"
                    : "border-black/10 bg-white/70 hover:bg-black/5"}
        `}
            >
                <h3 className="font-semibold mb-2 select-none">{title}</h3>
                <p className="text-sm opacity-70 mb-4 select-none">{description}</p>
                <div className="flex flex-wrap gap-2 select-none">
                    {tags.map((t) => (
                        <span
                            key={t}
                            className={`
    text-xs px-2 py-1 rounded-full border transition-colors duration-300 ease-linear
    ${theme === "dark"
                                ? "border-white/15 bg-white/5"
                                : "border-black/10 bg-black/5"}
  `}
                        >
  {t}
</span>

                    ))}
                </div>
            </div>
        </a>
    );
}
