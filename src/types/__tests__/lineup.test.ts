import { Lineup, validateLineup } from '../lineup';

describe('Lineup Type', () => {
  // Setup some mock card IDs for testing
  const pgCardId = 'card-pg-123';
  const sgCardId = 'card-sg-456';
  const sfCardId = 'card-sf-789';
  const pfCardId = 'card-pf-012';
  const centerCardId = 'card-c-345';

  it('should create a valid Lineup object with required fields', () => {
    const lineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'My Dream Team',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: sgCardId, position: 'SG' },
        { id: sfCardId, position: 'SF' },
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
    };

    expect(lineup.id).toBe('lineup123');
    expect(lineup.userId).toBe('user456');
    expect(lineup.name).toBe('My Dream Team');
    expect(lineup.cards.length).toBe(5);
    expect(lineup.createdAt).toBeDefined();
    expect(lineup.updatedAt).toBeDefined();
    expect(lineup.active).toBe(true);
  });

  it('should create a valid Lineup object with optional fields', () => {
    const lineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'My Dream Team',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: sgCardId, position: 'SG' },
        { id: sfCardId, position: 'SF' },
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
      description: 'Best team ever assembled',
      totalFantasyPoints: 150.5,
      lastGameScore: 125.8,
    };

    expect(lineup.description).toBe('Best team ever assembled');
    expect(lineup.totalFantasyPoints).toBe(150.5);
    expect(lineup.lastGameScore).toBe(125.8);
  });

  it('should validate a complete lineup with all required positions', () => {
    const validLineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'Valid Lineup',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: sgCardId, position: 'SG' },
        { id: sfCardId, position: 'SF' },
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
    };

    const result = validateLineup(validLineup);

    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should invalidate a lineup missing required positions', () => {
    const invalidLineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'Invalid Lineup',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: sgCardId, position: 'SG' },
        // Missing SF
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
    };

    const result = validateLineup(invalidLineup);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toContain('SF');
  });

  it('should invalidate a lineup with duplicate positions', () => {
    const invalidLineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'Invalid Lineup',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: 'card-pg-dupe', position: 'PG' }, // Duplicate PG
        { id: sfCardId, position: 'SF' },
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
    };

    const result = validateLineup(invalidLineup);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    const hasDuplicateError = result.errors.some(error => error.includes('duplicate'));
    expect(hasDuplicateError).toBe(true);
  });

  it('should invalidate a lineup with too many cards', () => {
    const invalidLineup: Lineup = {
      id: 'lineup123',
      userId: 'user456',
      name: 'Invalid Lineup',
      cards: [
        { id: pgCardId, position: 'PG' },
        { id: sgCardId, position: 'SG' },
        { id: sfCardId, position: 'SF' },
        { id: pfCardId, position: 'PF' },
        { id: centerCardId, position: 'C' },
        { id: 'card-extra', position: 'PG' }, // Extra card
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      active: true,
    };

    const result = validateLineup(invalidLineup);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('maximum');
  });
});
