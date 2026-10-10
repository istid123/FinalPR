import residence from '@/assets/avenor-residence.jpg';
import interior from '@/assets/avenor-interior.jpg';
import courtyard from '@/assets/avenor-courtyard.jpg';

export const propertyImages = { residence, interior, courtyard };
export const properties = [
  { id: '01', name: 'The Aurelia Residence', locality: 'Civil Lines', price: '₹8.50 Cr', beds: 5, baths: 6, area: '6,200', image: residence, type: 'SIGNATURE VILLA', tag: 'EXCLUSIVE', blurb: 'A sculptural sanctuary of stone, glass and light — the collection’s defining address.' },
  { id: '02', name: 'The Courtyard House', locality: 'Dharampeth', price: '₹5.75 Cr', beds: 4, baths: 5, area: '4,800', image: courtyard, type: 'PRIVATE RESIDENCE', tag: 'NEW TO COLLECTION' },
  { id: '03', name: 'The Glass Pavilion', locality: 'Wardha Road', price: '₹4.20 Cr', beds: 4, baths: 4, area: '4,200', image: interior, type: 'CONTEMPORARY VILLA', tag: 'CURATED' },
  { id: '04', name: 'The Verde Estate', locality: 'Trimurti Nagar', price: '₹3.80 Cr', beds: 4, baths: 4, area: '3,850', image: courtyard, type: 'GARDEN RESIDENCE', tag: 'PRIVATE COLLECTION' },
  { id: '05', name: 'The Ivory Penthouse', locality: 'Ramdaspeth', price: '₹6.25 Cr', beds: 4, baths: 5, area: '5,100', image: interior, type: 'SKY RESIDENCE', tag: 'EXCLUSIVE' },
];

export const neighborhoods = [
  { index: '01', name: 'Civil Lines', note: 'Colonial-era avenues and the city’s most private addresses.' },
  { index: '02', name: 'Dharampeth', note: 'Leafy, established, within reach of the city’s cultural core.' },
  { index: '03', name: 'Wardha Road', note: 'Nagpur’s new skyline — contemporary architecture, open air.' },
  { index: '04', name: 'Trimurti Nagar', note: 'Garden plots and quieter, low-rise living.' },
  { index: '05', name: 'Ramdaspeth', note: 'Elevated sky residences above the city’s commercial heart.' },
] as const;