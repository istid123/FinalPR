import { useReducedMotion } from 'framer-motion';

/**
 * Fixed, pointer-events-none ambient layer: three soft gradient orbs that
 * drift slowly behind all content. Pure CSS animation, original authorship —
 * gives dark sections a sense of life without competing with the type.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <div className="ambient-field" aria-hidden="true">
    <span className="ambient-orb ambient-orb-a" />
    <span className="ambient-orb ambient-orb-b" />
    <span className="ambient-orb ambient-orb-c" />
  </div>;
}
