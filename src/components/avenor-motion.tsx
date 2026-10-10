import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { propertyImages } from '@/lib/properties';

type RevealDirection = 'up' | 'left' | 'right' | 'fade';

export function Reveal({ children, className = '', direction = 'up', delay = 0 }: { children: ReactNode; className?: string; direction?: RevealDirection; delay?: number }) {
  const reduced = useReducedMotion();
  const offset = direction === 'left' ? { x: -26, y: 0 } : direction === 'right' ? { x: 26, y: 0 } : direction === 'fade' ? { x: 0, y: 0 } : { x: 0, y: 22 };
  return <motion.div className={className} initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : offset.x, y: reduced ? 0 : offset.y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : delay }}>{children}</motion.div>;
}

/** A thin gold line, pinned to the very top, that fills with scroll progress. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: .001 });
  if (reduced) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** A slow, continuous marquee of editorial keywords — a textural interlude between sections. */
export function Marquee({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];
  return <div className="marquee" aria-hidden="true">
    <div className={`marquee-track${reduced ? ' marquee-static' : ''}`}>
      {row.map((item, index) => <span key={index} className="marquee-item">{item}<span className="marquee-dot">·</span></span>)}
    </div>
  </div>;
}
export function GoldCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const move = (event: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      ref.current.style.opacity = '1';
      ref.current.classList.toggle('hovering', event.target instanceof Element && Boolean(event.target.closest('a, button, input')));
    };
    const leave = () => { if (ref.current) ref.current.style.opacity = '0'; };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); };
  }, []);
  return <div ref={ref} className="gold-cursor" aria-hidden="true" />;
}
export function MarbleArch() {
  return <div className="arch-scene" aria-hidden="true">
    <span className="arch-coordinate first">OBJECT NO. 001 / A STUDY IN FORM</span>
    <svg className="arch-object" viewBox="0 0 300 400">
      <defs><clipPath id="arch-clip"><path d="M45 345V145C45 30 225 20 225 145V300L178 322V145C178 73 96 82 96 150V345Z" /></clipPath><filter id="marble-texture"><feTurbulence type="fractalNoise" baseFrequency=".055" numOctaves="3" seed="8" result="noise"/><feComposite in="noise" in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs>
      <path className="arch-side" d="M225 145 260 127V286L225 300ZM45 345 79 326 129 328 96 345ZM178 322 209 304V129C209 72 150 55 129 93 151 72 178 102 178 145Z" />
      <path className="arch-top" d="M45 145C45 30 225 20 225 145L260 127C260 9 81 12 79 128Z" />
      <path className="arch-face" filter="url(#marble-texture)" d="M45 345V145C45 30 225 20 225 145V300L178 322V145C178 73 96 82 96 150V345Z" />
      <g clipPath="url(#arch-clip)" className="arch-vein"><path d="m12 60 48 38 38 1 26 32 66 20 36 77 60 17M25 210l48-7 36 30 15 46 68 19 20 42M30 124l44 47 17 78-12 48 25 59M83 30l21 46 69 7 14 49 58 20M9 281l75 21 21-9 91 64"/><path d="m12 64 48 38 38 1 26 32 66 20 36 77 60 17M85 28l23 45 65 8 16 49 58 22"/></g>
    </svg><div className="arch-line"/><span className="arch-coordinate last">FORM / MATERIAL / POSSIBILITY</span>
  </div>;
}
const chapters = [
  { image: propertyImages.residence, title: 'A quieter kind of extraordinary.', label: '01 — THE ARRIVAL', copy: 'Architecture that makes an impression. A place that feels entirely your own.', spec: '6,200 SQ. FT. · CIVIL LINES' },
  { image: propertyImages.interior, title: 'Space to simply be.', label: '02 — THE INTERIOR', copy: 'Light-filled volumes. Considered materials. Every detail, in quiet harmony.', spec: '5 BEDROOMS · 6 BATHROOMS' },
  { image: propertyImages.courtyard, title: 'Your own world, within.', label: '03 — THE SANCTUARY', copy: 'A private retreat where the rhythm of the city gives way to stillness.', spec: 'PRIVATE POOL · LANDSCAPED GARDENS' },
];
export function ScrollFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (disposed || !ref.current) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        ScrollTrigger.create({ trigger: ref.current, start: 'top top', end: '+=150%', pin: true, scrub: 1.5, onUpdate: self => setChapter(Math.min(2, Math.floor(self.progress * 3))) });
      }, ref);
      cleanup = () => context.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, [reduced]);
  const current = chapters[chapter];
  if (!current) return null;
  return <section className="feature-scroll" aria-label="The Aurelia Residence, an architectural journey">
    <div ref={ref} className="feature-stage">
      {chapters.map((item, index) => <motion.img key={item.label} src={item.image} alt={index === 0 ? 'The Aurelia Residence exterior at dusk' : index === 1 ? 'Double-height living room overlooking the garden' : 'Private garden courtyard and pool'} width={1920} height={1088} loading="lazy" animate={{ opacity: chapter === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : 1.2 }} />)}
      <div className="feature-label eyebrow">THE SIGNATURE COLLECTION</div><div className="feature-counter eyebrow"><b className="gold">0{chapter + 1}</b><span/>03</div>
      <motion.div key={chapter} className="feature-copy" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}><span className="eyebrow gold">{current.label}</span><h2>{current.title}</h2><p>{current.copy}</p><Button variant="avenor" asChild><a href="#residence">EXPLORE THE RESIDENCE <ArrowUpRight /></a></Button></motion.div>
      <div className="feature-side"><span className="eyebrow">THE AURELIA RESIDENCE</span><p>₹8.50 Cr</p><span>{current.spec}</span></div>
    </div>
    <div className="feature-caption"><span className="eyebrow muted">AN EXCEPTIONAL HOME. AN ENTIRELY DIFFERENT PERSPECTIVE.</span><span className="eyebrow gold">NAGPUR, INDIA ↗</span></div>
  </section>;
}