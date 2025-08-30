"use client"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon, ExternalLink, ChevronDown } from "lucide-react";

export default function PortfolioExperimental() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'dark';
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    });
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState('home');
    const [showScrollHint, setShowScrollHint] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const [usingKeyboard, setUsingKeyboard] = useState(false);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Detect input type (keyboard vs mouse)
    useEffect(() => {
        const handleKey = () => setUsingKeyboard(true);
        const handleMouse = () => setUsingKeyboard(false);
        window.addEventListener('keydown', handleKey);
        window.addEventListener('mousedown', handleMouse);
        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('mousedown', handleMouse);
        };
    }, []);

    // Scroll progress
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
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const sections = [
        { id: 'home', label: 'Home', watermark: 'HOME' },
        { id: 'about', label: 'About', watermark: 'ABOUT' },
        { id: 'work', label: 'Work', watermark: 'WORK' },
        { id: 'contact', label: 'Contact', watermark: 'CONTACT' },
    ];

    // Active section highlight (only nav links)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible && sections.some(s => s.id === visible.target.id)) {
                    setCurrent(visible.target.id);
                }
            },
            { threshold: [0.5] }
        );
        sections.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const gradientDark = 'linear-gradient(to bottom, #000000 0%, #000814 20%, #001d3d 40%, #370617 70%, #6a040f 100%)';
    const gradientLight = 'linear-gradient(to bottom, #ffffff 0%, #e0f7fa 25%, #b3e5fc 50%, #ffcdd2 75%, #f8bbd0 100%)';

    return (
        <div className={`relative min-h-screen overflow-hidden transition-colors duration-200 ease-linear ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} ${usingKeyboard ? 'using-keyboard' : ''}`} draggable={false}>
            <div className="absolute top-0 left-0 w-full h-full -z-20 transition-colors duration-200 ease-linear" style={{ background: theme === 'dark' ? gradientDark : gradientLight }} draggable={false} />

            <svg className="pointer-events-none absolute top-0 left-0 -z-10 w-full h-full opacity-[0.08] dark:opacity-[0.12] transition-colors duration-200 ease-linear" aria-hidden /*draggable={false}*/>
                <defs>
                    <pattern id="crosshairGrid" width="128" height="128" patternUnits="userSpaceOnUse">
                        <line x1="64" y1="54" x2="64" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <line x1="54" y1="64" x2="74" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#crosshairGrid)" />
            </svg>

            <div className="fixed top-0 left-0 right-0 z-[60] h-[4px] bg-transparent" draggable={false}>
                <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            <AnimatePresence>
                {showScrollHint && !atBottom && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 z-50"
                        draggable={false}
                    >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ChevronDown className="w-6 h-6" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 backdrop-blur border-b transition-colors duration-200 ease-linear ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`} draggable={false}>
                <a href="#home" className="font-bold tracking-tight text-lg bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-transparent select-none" draggable={false}>Kacper</a>
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-1 text-sm select-none" draggable={false}>
                    {sections.map(s => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className={`px-3 py-1 rounded-full transition-colors duration-150 ease-linear border ${current === s.id
                                ? theme === 'dark'
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-black/10 border-black/20'
                                : 'border-transparent ' + (theme === 'dark'
                                ? 'hover:bg-white/10'
                                : 'hover:bg-black/5')}`}
                            draggable={false}
                        >
                            {s.label}
                        </a>
                    ))}
                </nav>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors duration-150 ease-linear hover:opacity-80 focus:outline-none ${usingKeyboard ? 'focus:ring-2 focus:ring-fuchsia-400' : ''} ${theme === 'dark' ? 'border-white/30' : 'border-black/30 bg-black/10'}`}
                    draggable={false}
                >
                    {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
                </button>
            </header>

            <Section id="home" watermark="HOME">
                <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-6xl md:text-8xl font-extrabold text-center select-none" draggable={false}>
                    Beyond Ordinary.
                </motion.h1>
                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.2}} className="mt-6 text-lg md:text-2xl text-center max-w-2xl opacity-80 select-none" draggable={false}>
                    A portfolio as an experience.
                </motion.p>
                <div className="mt-10 flex items-center gap-3" draggable={false}>
                    <CTA href="#work" label="View Work" theme={theme} />
                    <CTAGhost href="#contact" label="Contact" theme={theme} />
                </div>
            </Section>

            <Section id="about" watermark="ABOUT">
                <div className="max-w-4xl text-center select-none" draggable={false}>
                    <h2 className="text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-lg opacity-80">Developer, designer (sort of), explorer of the digital frontier. This section could feature a vertical timeline or rotating fact panels.</p>
                </div>
            </Section>

            <Section id="work" watermark="WORK">
                <h2 className="text-4xl font-bold mb-10 select-none" draggable={false}>Selected Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 w-full max-w-6xl" draggable={false}>
                    {[1,2,3,4,5,6].map(i => (
                        <ProjectCard key={i} title={`Project ${i}`} tags={["Next.js","TypeScript"]} theme={theme} />
                    ))}
                </div>
            </Section>

            <Section id="contact" watermark="CONTACT">
                <div className={`${theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-white/50 border-black/10'} rounded-3xl p-10 border backdrop-blur shadow-xl flex flex-col items-center gap-6 w-[min(90%,680px)] transition-colors duration-200 ease-linear select-none`} draggable={false}>
                    <h2 className="text-3xl font-bold">Let`&apos`s Connect</h2>
                    <p className="opacity-80 text-center">Open to freelance & collaborations.</p>
                    <div className="flex gap-4">
                        <a href="https://github.com" className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded-full" draggable={false}><Github className="w-6 h-6"/></a>
                        <a href="https://www.linkedin.com" className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full" draggable={false}><Linkedin className="w-6 h-6"/></a>
                        <a href="mailto:you@example.com" className="hover:scale-110 transition-transform duration-150 ease-linear focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full" draggable={false}><Mail className="w-6 h-6"/></a>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function Section({ id, watermark, children }: { id: string; watermark: string; children: React.ReactNode }) {
    return (
        <section id={id} className="relative h-screen flex flex-col items-center justify-center transition-colors duration-200 ease-linear select-none" draggable={false}>
            <motion.div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
                <div className="text-[14vw] font-black tracking-tighter opacity-[0.05] dark:opacity-[0.04] leading-none transition-colors duration-200 ease-linear">
                    <span style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}>{watermark}</span>
                </div>
            </motion.div>
            <div className="relative z-10 px-6 w-full flex flex-col items-center" draggable={false}>{children}</div>
        </section>
    );
}

function CTA({ href, label, theme }: { href: string; label: string; theme: 'light' | 'dark' }) {
    return (
        <a href={href} className={`group inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold border backdrop-blur hover:bg-white/20 transition-colors duration-150 ease-linear ${theme === 'dark'
            ? 'border-white/20 bg-white/10'
            : 'border-black/30 bg-black/10 hover:bg-black/20'} focus:outline-none focus:ring-2 focus:ring-fuchsia-400`} draggable={false}>
            {label}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150 ease-linear" />
        </a>
    );
}

function CTAGhost({ href, label, theme }: { href: string; label: string; theme: 'light' | 'dark' }) {
    return (
        <a href={href} className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold border transition-colors duration-150 ease-linear ${theme === 'dark'
            ? 'border-white/10 hover:bg-white/10'
            : 'border-black/30 bg-black/5 hover:bg-black/10'} focus:outline-none focus:ring-2 focus:ring-blue-400`} draggable={false}>
            {label}
        </a>
    );
}

function ProjectCard({ title, tags, theme }: { title: string; tags: string[]; theme: 'light' | 'dark' }) {
    const borderDark = "bg-[conic-gradient(from_180deg_at_50%_50%,#67e8f9_0%,#60a5fa_25%,#a78bfa_50%,#f472b6_75%,#67e8f9_100%)]";
    const borderLight = "bg-[conic-gradient(from_180deg_at_50%_50%,#ffe0b2_0%,#f8bbd0_25%,#b3e5fc_50%,#c8e6c9_75%,#ffe0b2_100%)]";

    return (
        <div
            className="group relative rounded-2xl p-[1px] transition-colors duration-200 ease-linear select-none"
        >
            <div className={`absolute inset-0 rounded-2xl ${theme === 'dark' ? borderDark : borderLight} opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-150 ease-linear`} />
            <div className={`relative rounded-2xl border p-5 group-hover:translate-y-[-2px] transition-all duration-150 ease-linear ${theme === 'dark'
                ? 'border-white/10 bg-black/60 backdrop-blur hover:bg-black/70'
                : 'border-black/10 bg-white/70 backdrop-blur hover:bg-black/5'}`}>
                <h3 className="font-semibold mb-2 select-none">{title}</h3>
                <p className="text-sm opacity-70 mb-4 select-none">Short description of this cool thing.</p>
                <div className="flex flex-wrap gap-2 select-none">
                    {tags.map(t => (
                        <span key={t} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'border border-white/15 bg-white/5' : 'border border-black/10 bg-black/5'}`}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
