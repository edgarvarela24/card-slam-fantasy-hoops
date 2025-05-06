import { Card, Rarity, Position, PlayerStats, SpecialAbility, VisualTreatment, isValidRarity, isValidPosition, isValidVisualTreatment } from '../card';

describe('Card Type', () => {
  it('should create a valid Card object with required fields', () => {
    const stats: PlayerStats = {
      points: 25.3,
      rebounds: 7.8,
      assists: 10.2,
      steals: 1.2,
      blocks: 0.6,
      threePointersMade: 2.4,
      fieldGoalPercentage: 50.1,
      freeThrowPercentage: 85.3,
    };

    const card: Card = {
      id: 'card123',
      playerId: 'player456',
      name: 'LeBron James',
      team: 'LAL',
      position: 'SF',
      rarity: 'Legendary',
      stats,
      acquiredAt: new Date().getTime(),
    };

    expect(card.id).toBe('card123');
    expect(card.playerId).toBe('player456');
    expect(card.name).toBe('LeBron James');
    expect(card.team).toBe('LAL');
    expect(card.position).toBe('SF');
    expect(card.rarity).toBe('Legendary');
    expect(card.stats).toEqual(stats);
    expect(card.acquiredAt).toBeDefined();
  });

  it('should create a valid Card object with optional fields', () => {
    const stats: PlayerStats = {
      points: 25.3,
      rebounds: 7.8,
      assists: 10.2,
      steals: 1.2,
      blocks: 0.6,
      threePointersMade: 2.4,
      fieldGoalPercentage: 50.1,
      freeThrowPercentage: 85.3,
    };

    const specialAbility: SpecialAbility = {
      id: 'ability123',
      name: 'Three-Point Specialist',
      description: 'Increases points from 3-pointers by 50%',
      modifier: {
        stat: 'threePointersMade',
        operation: 'multiply',
        value: 1.5,
      },
    };

    const card: Card = {
      id: 'card123',
      playerId: 'player456',
      name: 'LeBron James',
      team: 'LAL',
      position: 'SF',
      rarity: 'Legendary',
      stats,
      acquiredAt: new Date().getTime(),
      specialAbility,
      variant: 'All-Star',
      imageUrl: 'https://example.com/lebron.jpg',
      visualTreatment: 'Holographic',
    };

    expect(card.specialAbility).toEqual(specialAbility);
    expect(card.variant).toBe('All-Star');
    expect(card.imageUrl).toBe('https://example.com/lebron.jpg');
    expect(card.visualTreatment).toBe('Holographic');
  });

  it('should validate special ability with conditional modifier', () => {
    const specialAbility: SpecialAbility = {
      id: 'ability123',
      name: 'Clutch Performer',
      description: 'Increases points when team is trailing',
      modifier: {
        stat: 'points',
        operation: 'conditional',
        value: 1.2,
        condition: {
          stat: 'points',
          operator: '>',
          value: 20,
        },
      },
    };

    expect(specialAbility.modifier.condition).toBeDefined();
    expect(specialAbility.modifier.condition?.stat).toBe('points');
    expect(specialAbility.modifier.condition?.operator).toBe('>');
    expect(specialAbility.modifier.condition?.value).toBe(20);
  });

  it('should validate position types using helper function', () => {
    expect(isValidPosition('PG')).toBe(true);
    expect(isValidPosition('SG')).toBe(true);
    expect(isValidPosition('SF')).toBe(true);
    expect(isValidPosition('PF')).toBe(true);
    expect(isValidPosition('C')).toBe(true);
    expect(isValidPosition('XX')).toBe(false);
  });

  it('should validate rarity types using helper function', () => {
    expect(isValidRarity('Common')).toBe(true);
    expect(isValidRarity('Uncommon')).toBe(true);
    expect(isValidRarity('Rare')).toBe(true);
    expect(isValidRarity('Epic')).toBe(true);
    expect(isValidRarity('Legendary')).toBe(true);
    expect(isValidRarity('UltraRare')).toBe(false);
  });

  it('should validate visual treatment types using helper function', () => {
    expect(isValidVisualTreatment('Standard')).toBe(true);
    expect(isValidVisualTreatment('Metallic')).toBe(true);
    expect(isValidVisualTreatment('Holographic')).toBe(true);
    expect(isValidVisualTreatment('Shimmer')).toBe(true);
    expect(isValidVisualTreatment('Glitter')).toBe(false);
  });
});