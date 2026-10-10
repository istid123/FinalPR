import { describe, expect, it } from 'vitest';
import { properties } from '@/lib/properties';

describe('AVENOR collection requirements', () => {
  it('contains all five requested Nagpur localities', () => {
    expect(properties.map(property => property.locality).sort()).toEqual(['Civil Lines', 'Dharampeth', 'Trimurti Nagar', 'Wardha Road', 'Ramdaspeth'].sort());
  });
  it('displays all mock prices in Indian rupees', () => {
    expect(properties.every(property => property.price.startsWith('₹'))).toBe(true);
    expect(properties.length).toBe(5);
  });
});