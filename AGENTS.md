<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture
- Keep AVENOR as a single scrolling editorial showcase with section anchors because its composition includes a continuous scroll-driven narrative.
- Keep mock property data in a browser-safe module and favorites in React state because the showcase has no backend or persistence.
- Initialize GSAP and ScrollTrigger through dynamic imports inside effects, with cleanup and reduced-motion guards, to preserve SSR safety.
- Define all visual styling and motion tokens in src/styles.css; use shared Button variants for controls to maintain a coherent design system.
- Share one SVG silhouette through linked surface and color-channel instances in GlitchObject, so scroll interpolation morphs every layer together without a WebGL dependency.
