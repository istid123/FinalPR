import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowDown, ArrowRight, ArrowUpRight, Bath, BedDouble, Heart, MapPin, Search, SlidersHorizontal, Expand, Award, ShieldCheck, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchObject } from '@/components/glitch-object';
import { GoldCursor, MarbleArch, Marquee, Reveal, ScrollFeature, ScrollProgress } from '@/components/avenor-motion';
import { LoadingScreen } from '@/components/loading-screen';
import { AmbientBackground } from '@/components/ambient-background';
import { neighborhoods, properties, propertyImages } from '@/lib/properties';

const trustMarks = [
  { icon: Building2, value: '120+', label: 'RESIDENCES CURATED' },
  { icon: Users, value: '98%', label: 'CLIENT RETENTION' },
  { icon: Award, value: '4', label: 'DESIGN AWARDS, 2025' },
  { icon: ShieldCheck, value: '15 YRS', label: 'IN PRIVATE REAL ESTATE' },
];

const manifestoWords = ['PROPORTION', 'LIGHT', 'SILENCE', 'MATERIAL', 'RESTRAINT', 'CRAFT'];

const collectionFilters = ['ALL RESIDENCES', 'VILLAS', 'PENTHOUSES', 'PRIVATE HOMES'] as const;

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AVENOR — The art of finding your place' },
    { name: 'description', content: 'Discover AVENOR’s considered collection of exceptional villas, private residences and penthouses in Nagpur.' },
    { property: 'og:title', content: 'AVENOR — The art of finding your place' },
    { property: 'og:description', content: 'A quieter kind of extraordinary. Explore a curated collection of luxury residences in Nagpur.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Avenor,
});
function Avenor() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof collectionFilters)[number]>('ALL RESIDENCES');
  const reduced = useReducedMotion();
  const toggleFavorite = (id: string, name: string) => setFavorites(previous => {
    const saving = !previous.includes(id);
    toast(saving ? `${name} saved to your shortlist` : `${name} removed from shortlist`);
    return saving ? [...previous, id] : previous.filter(value => value !== id);
  });
  const visibleProperties = useMemo(() => properties.filter((property) => {
    const searchable = `${property.name} ${property.locality} ${property.type}`.toLowerCase();
    const matchesSearch = searchable.includes(query.trim().toLowerCase());
    const matchesFilter = activeFilter === 'ALL RESIDENCES'
      || (activeFilter === 'VILLAS' && (property.type.includes('VILLA') || property.type.includes('ESTATE')))
      || (activeFilter === 'PENTHOUSES' && (property.type.includes('PENTHOUSE') || property.type.includes('SKY')))
      || (activeFilter === 'PRIVATE HOMES' && !property.type.includes('PENTHOUSE'));
    return matchesSearch && matchesFilter;
  }), [activeFilter, query]);
  return <main>
    <LoadingScreen />
    <AmbientBackground />
    <GoldCursor />
    <ScrollProgress />
    <header className="site-header"><a href="#home" className="brand-small" aria-label="AVENOR home">AVENOR<span>EXCEPTIONAL BY NATURE</span></a><div className="nav-blob" aria-hidden="true"><div className="nav-ribs">{Array.from({ length: 6 }).map((_, index) => <i key={index}/>)}</div><div className="nav-ripple"/></div><nav className="site-nav" aria-label="Main navigation">{[['LISTINGS', '#listings'], ['STUDIO', '#studio'], ['CONTACT', '#contact']].map(([label, href]) => <Button key={label} variant="pill" asChild><a href={href}>{label}</a></Button>)}</nav></header>
    <section className="hero" id="home">
      <div className="hero-grid" aria-hidden="true"/>
      <p className="hero-index eyebrow">01 — AVENOR / NAGPUR, INDIA</p>
      <div className="hero-word-field" aria-hidden="true">AVENOR</div>
      <div className="hero-sculpture"><GlitchObject hero /></div>
      <div className="hero-intro"><motion.p className="hero-kicker eyebrow" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: reduced ? 0 : .35 }}>CURATED RESIDENCES. CONSIDERED LIVING.</motion.p>
        <h1 className="hero-wordmark" aria-label="AVENOR">{'AVENOR'.split('').map((letter, index) => <motion.span aria-hidden="true" key={index} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 38, filter: reduced ? 'none' : 'blur(7px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : .16 + index * .075 }}>{letter}</motion.span>)}</h1>
        <motion.p className="hero-tagline eyebrow" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: reduced ? 0 : .78 }}>THE ART OF FINDING YOUR PLACE.</motion.p>
        <motion.div className="hero-hairline" initial={{ scaleX: reduced ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.15, delay: reduced ? 0 : .96 }}/>
        <motion.div className="hero-stats" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: reduced ? 0 : 1.12 }}><div className="hero-stat"><span>POSITIONING</span><p>Luxury</p></div><div className="hero-stat"><span>VISION</span><p>Global</p></div></motion.div>
      </div>
      <motion.aside className="hero-object-note" initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: reduced ? 0 : 1.22 }}><span className="eyebrow gold">OBJECT / 001</span><p>Architecture,<br/>held in suspension.</p></motion.aside>
      <a href="#residence" className="hero-image-link"><span>DISCOVER THE RESIDENCE</span><span className="circle-arrow"><ArrowUpRight size={17}/></span></a>
      <div className="hero-bottom"><span><ArrowDown size={12}/> SCROLL TO DISCOVER</span><span>21.1458° N &nbsp; 79.0882° E</span><span>A NEW PERSPECTIVE ON HOME</span></div>
    </section>
    <section className="section-shell" id="listings">
      <Reveal><div className="section-top"><div><span className="eyebrow gold">01 / THE COLLECTION</span><h2 className="section-title">Places with <em>presence.</em></h2></div><p className="section-note">Not just an address. A reflection of you.<br/>A considered collection of Nagpur’s most exceptional homes.</p></div>
      <div className="collection-controls"><label className="search-shell"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by locality or residence" aria-label="Search by locality or residence" /></label><div className="filter-pills">{collectionFilters.map((filter) => <Button key={filter} variant="pill" data-active={activeFilter === filter ? 'true' : 'false'} onClick={() => setActiveFilter(filter)}>{filter}</Button>)}<Button variant="pill" aria-label="More filters"><SlidersHorizontal size={13}/></Button></div></div></Reveal>
      <div className="property-grid">{visibleProperties.map((property, index) => {
        const featured = index === 0;
        return <Reveal key={property.id} className={`property-card${featured ? ' property-card-featured' : ''}`} direction={featured ? 'fade' : index % 2 ? 'right' : 'left'} delay={featured ? 0 : .08}>
          <div className="property-image"><a href="#residence" aria-label={`Explore ${property.name}`}><img src={property.image} alt={`${property.name}, ${property.locality}`} width={1536} height={1024} loading="lazy"/></a><span className="property-badge">{property.tag}</span><Button variant="favorite" title={favorites.includes(property.id) ? 'Remove from favorites' : 'Save residence'} aria-label={`${favorites.includes(property.id) ? 'Unsave' : 'Save'} ${property.name}`} aria-pressed={favorites.includes(property.id)} onClick={() => toggleFavorite(property.id, property.name)}><Heart size={14}/></Button></div>
          <p className="property-type">{property.type}</p>
          <a href="#residence" className="property-name"><h3>{property.name}</h3><ArrowUpRight size={16} className="gold"/></a>
          <p className="property-location"><MapPin size={11}/>{property.locality}, Nagpur</p>
          {featured && property.blurb && <p className="property-blurb">{property.blurb}</p>}
          <div className="property-meta"><span><BedDouble size={12}/>{property.beds} Beds</span><span><Bath size={12}/>{property.baths} Baths</span><span><Expand size={11}/>{property.area} sq.ft.</span><span className="property-price">{property.price}</span></div>
        </Reveal>;
      })}</div>
      {visibleProperties.length === 0 && <p className="empty-results">No residences match that search. <button onClick={() => { setQuery(''); setActiveFilter('ALL RESIDENCES'); }}>Reset collection</button></p>}
      <div className="collection-footer"><span className="eyebrow muted">{visibleProperties.length.toString().padStart(2, '0')} EXCEPTIONAL RESIDENCES{favorites.length > 0 ? ` / ${favorites.length} SAVED` : ''}</span><a className="text-link" href="#residence">DISCOVER THE SIGNATURE COLLECTION <ArrowRight size={15}/></a></div>
    </section>
    <Marquee items={manifestoWords} />
    <Reveal><section className="studio" id="studio"><motion.div className="light-sweep" initial={{ left: '0%', opacity: 0 }} whileInView={{ left: '85%', opacity: .65 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 3 }}/><MarbleArch/><div className="studio-copy"><span className="eyebrow gold">02 / THE AVENOR PERSPECTIVE</span><h2>Some places are found.<br/><em>Others are felt.</em></h2><p>We believe a home is more than the sum of its spaces. It is a feeling, a point of view, a way of being. We seek the rare places where architecture and life meet beautifully.</p><a href="#signature" className="text-link">A DIFFERENT POINT OF VIEW <ArrowUpRight size={15}/></a></div></section></Reveal>
    <div id="signature"><ScrollFeature/></div>
    <section className="section-shell" id="residence"><Reveal><div className="section-top"><div><span className="eyebrow gold">03 / IN FOCUS</span><h2 className="section-title">An address. <em>A statement.</em></h2></div><span className="eyebrow muted">AVENOR SIGNATURE / NO. 001</span></div><div className="detail-layout"><div className="detail-gallery"><div className="gallery-main"><img src={propertyImages.residence} alt="Full exterior of the Aurelia Residence" loading="lazy" width={1920} height={1088}/></div><div className="gallery-small"><img src={propertyImages.interior} alt="Aurelia Residence living room" loading="lazy" width={1536} height={1024}/></div><div className="gallery-small"><img src={propertyImages.courtyard} alt="Aurelia Residence courtyard and swimming pool" loading="lazy" width={1536} height={1024}/></div></div><div className="detail-copy"><span className="eyebrow gold">EXCLUSIVE PRIVATE RESIDENCE</span><h2>The Aurelia<br/>Residence</h2><p className="detail-address"><MapPin size={13}/>12, Palm Avenue, Civil Lines, Nagpur</p><p className="detail-price">₹8.50 Cr</p><span className="eyebrow muted">A RARE OFFERING IN THE HEART OF CIVIL LINES</span><p className="detail-description">A sculptural sanctuary of natural stone, glass and light. Set within a private landscaped estate, this five-bedroom residence offers generous living spaces, a tranquil courtyard and a seamless connection to the outdoors.</p><div className="detail-specs"><div><p>05</p><span>BEDROOMS</span></div><div><p>06</p><span>BATHROOMS</span></div><div><p>6,200</p><span>SQ. FT. INTERIOR</span></div></div><Button variant="avenor" onClick={() => toast('Viewing request received', { description: 'Our team will reach out within 24 hours.' })}>REQUEST A VIEWING <ArrowUpRight/></Button></div></div></Reveal></section>
    <Reveal><section className="trust-strip" aria-label="Why Avenor">{trustMarks.map(({ icon: Icon, value, label }) => <div className="trust-item" key={label}><Icon size={18} strokeWidth={1.3}/><p>{value}</p><span>{label}</span></div>)}</section></Reveal>
    <section className="section-shell" id="neighborhoods">
      <Reveal><div className="section-top"><div><span className="eyebrow gold">04 / WHERE WE BUILD</span><h2 className="section-title">Nagpur, <em>considered.</em></h2></div><p className="section-note">Five neighborhoods. Five ways of living well.<br/>Every AVENOR address is chosen as carefully as it is built.</p></div></Reveal>
      <div className="locality-list">{neighborhoods.map((place, index) => {
        const count = properties.filter(property => property.locality === place.name).length;
        return <Reveal key={place.name} className="locality-row" delay={index * .05}>
          <span className="locality-index eyebrow gold">{place.index}</span>
          <h3 className="locality-name">{place.name}</h3>
          <p className="locality-note">{place.note}</p>
          <span className="locality-count eyebrow muted">{count.toString().padStart(2, '0')} RESIDENCE{count === 1 ? '' : 'S'}</span>
        </Reveal>;
      })}</div>
    </section>
    <Reveal><section className="closing" id="contact"><span className="eyebrow gold">YOUR NEXT CHAPTER</span><h2>Find your place.<br/><em>Make it yours.</em></h2><Button variant="avenor" onClick={() => toast('Thank you', { description: 'A member of AVENOR will be in touch shortly.' })}>BEGIN A CONVERSATION <ArrowUpRight/></Button><p className="closing-wordmark">AVENOR</p><p className="eyebrow muted">THE ART OF FINDING YOUR PLACE.</p></section></Reveal>
    <footer className="site-footer"><span>© 2026 AVENOR. ALL RIGHTS RESERVED.</span><div className="footer-links"><a href="#listings">COLLECTION</a><a href="#studio">STUDIO</a><a href="#neighborhoods">NEIGHBORHOODS</a><a href="#contact">CONTACT</a></div><span>NAGPUR, INDIA / VISION, GLOBAL.</span></footer>
  </main>;
}