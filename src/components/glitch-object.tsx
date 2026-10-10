import { useEffect, useId, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const arch = 'M45 345 L45 145 C45 30 225 20 225 145 L225 300 L178 322 L178 145 C178 73 96 82 96 150 L96 345 Z';
const folded = 'M36 317 L68 125 C87 18 264 72 244 178 L224 329 L174 309 L195 168 C206 94 115 71 104 143 L81 333 Z';
const portal = 'M40 338 L40 99 C40 46 238 46 238 99 L238 338 L185 338 L185 123 C185 98 94 98 94 123 L94 338 Z';

/** One SVG silhouette is shared by the physical surface and its offset color channels. */
export function GlitchObject({ hero = false }: { hero?: boolean }) {
  const id = useId().replace(/:/g, '');
  const scene = useRef<HTMLDivElement>(null);
  const warp = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scene.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !scene.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const element = scene.current;
      const path = element.querySelector('.glitch-silhouette');
      if (!path) return;
      const context = gsap.context(() => {
        const trigger = hero ? element.closest('.hero') : element.closest('.studio');
        if (!trigger) return;
        gsap.timeline({ scrollTrigger: { trigger, start: hero ? 'top top' : 'top 85%', end: hero ? 'bottom top' : 'bottom 15%', scrub: 1.2 } })
          .to(path, { attr: { d: folded }, duration: 1, ease: 'none' }, 0)
          .to(element, { '--scroll-warm': 1, duration: 1, ease: 'none' }, 0)
          .to(path, { attr: { d: portal }, duration: 1, ease: 'none' }, 1)
          .to(element, { '--scroll-warm': 0, duration: 1, ease: 'none' }, 1);
      }, element);
      cleanup = () => context.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, [hero, reduced]);

  return <div ref={scene} className={`glitch-scene ${hero ? 'hero-object' : 'studio-object'}`} aria-hidden="true"
    onPointerMove={event => {
      if (reduced || event.pointerType === 'touch' || !warp.current) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      warp.current.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 20}deg) skew(${x * 3}deg, ${y * 2}deg)`;
    }}
    onPointerLeave={() => { if (warp.current) warp.current.style.transform = ''; }}>
    <div className="object-aura"/><div className="object-warmth"/>
    <div className="glitch-arrival"><div ref={warp} className="glitch-warp"><div className="glitch-float">
      <svg className="glitch-sculpture" viewBox="0 0 300 400">
        <defs>
          <path id={`${id}-shape`} className="glitch-silhouette" d={arch}/>
          <clipPath id={`${id}-clip`}><use href={`#${id}-shape`}/></clipPath>
          <pattern id={`${id}-scan`} width="4" height="5" patternUnits="userSpaceOnUse"><path d="M0 1H4" className="scan-stroke"/></pattern>
          <filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".035 .12" numOctaves="3" seed="8" result="grain"/><feComposite in="grain" in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
        </defs>
        <use className="channel channel-red" href={`#${id}-shape`}/>
        <use className="channel channel-cyan" href={`#${id}-shape`}/>
        <use className="sculpture-depth" href={`#${id}-shape`}/>
        <use className="sculpture-face" href={`#${id}-shape`} filter={`url(#${id}-grain)`}/>
        <g clipPath={`url(#${id}-clip)`}>
          <path className="sculpture-veins" d="M28 52 86 88 101 153 186 191 256 268M40 192 90 219 122 290 208 314M75 30 131 87 187 96 228 176M31 294 88 275 161 348"/>
          <rect width="300" height="400" fill={`url(#${id}-scan)`}/>
          <path className="glitch-cut" d="M0 161H300M0 244H300"/>
        </g>
      </svg>
    </div></div></div>
  </div>;
}