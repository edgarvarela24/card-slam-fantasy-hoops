import { Pack, RarityDistribution, PackType, isValidPackType } from '../pack';

describe('Pack Type', () => {
  it('should create a valid Pack object with required fields', () => {
    const rarityDistribution: RarityDistribution = {
      Common: 70,
      Uncommon: 20,
      Rare: 7,
      Epic: 2,
      Legendary: 1,
    };

    const pack: Pack = {
      id: 'pack123',
      name: 'Standard Pack',
      description: 'A standard pack of player cards',
      price: 100,
      cardCount: 5,
      rarityDistribution,
      imageUrl: 'https://example.com/pack.jpg',
      available: true,
      type: 'standard',
    };

    expect(pack.id).toBe('pack123');
    expect(pack.name).toBe('Standard Pack');
    expect(pack.description).toBe('A standard pack of player cards');
    expect(pack.price).toBe(100);
    expect(pack.cardCount).toBe(5);
    expect(pack.rarityDistribution).toEqual(rarityDistribution);
    expect(pack.imageUrl).toBe('https://example.com/pack.jpg');
    expect(pack.available).toBe(true);
    expect(pack.type).toBe('standard');
  });

  it('should create a valid Pack object with optional fields', () => {
    const rarityDistribution: RarityDistribution = {
      Common: 70,
      Uncommon: 20,
      Rare: 7,
      Epic: 2,
      Legendary: 1,
    };

    const now = new Date().getTime();
    const futureDate = now + 86400000; // 24 hours in the future

    const pack: Pack = {
      id: 'pack123',
      name: 'Premium Pack',
      description: 'A premium pack with better odds',
      price: 250,
      cardCount: 5,
      rarityDistribution,
      imageUrl: 'https://example.com/premium-pack.jpg',
      available: true,
      type: 'premium',
      releaseDate: now,
      expirationDate: futureDate,
      purchaseLimit: 5,
      guaranteedRarities: ['Rare'],
    };

    expect(pack.releaseDate).toBe(now);
    expect(pack.expirationDate).toBe(futureDate);
    expect(pack.purchaseLimit).toBe(5);
    expect(pack.guaranteedRarities).toEqual(['Rare']);
  });

  it('should validate pack types with helper function', () => {
    expect(isValidPackType('standard')).toBe(true);
    expect(isValidPackType('premium')).toBe(true);
    expect(isValidPackType('legendary')).toBe(true);
    expect(isValidPackType('special')).toBe(true);
    expect(isValidPackType('starter')).toBe(true);
    expect(isValidPackType('invalid')).toBe(false);
  });

  it('should validate that rarity distribution percentages add up to 100', () => {
    const validDistribution: RarityDistribution = {
      Common: 70,
      Uncommon: 20,
      Rare: 7,
      Epic: 2,
      Legendary: 1,
    };

    const totalPercentage = Object.values(validDistribution).reduce((sum, value) => sum + value, 0);
    expect(totalPercentage).toBe(100);
  });
});