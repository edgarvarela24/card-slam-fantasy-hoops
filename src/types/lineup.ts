import { Position } from './card';

/**
 * Card in a lineup
 */
export interface LineupCard {
  id: string;
  position: Position;
}

/**
 * Lineup with basketball player cards
 */
export interface Lineup {
  id: string;
  userId: string;
  name: string;
  description?: string;
  cards: LineupCard[];
  createdAt: number;
  updatedAt: number;
  active: boolean;
  totalFantasyPoints?: number;
  lastGameScore?: number;
}

/**
 * Result of lineup validation
 */
export interface LineupValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * The required positions for a valid lineup
 */
export const REQUIRED_POSITIONS: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];

/**
 * Maximum number of cards in a lineup
 */
export const MAX_LINEUP_SIZE = 5;

/**
 * Validates a lineup for correctness
 * @param lineup The lineup to validate
 * @returns Validation result
 */
export const validateLineup = (lineup: Lineup): LineupValidationResult => {
  const result: LineupValidationResult = {
    valid: true,
    errors: [],
  };

  // Check if lineup has too many cards
  if (lineup.cards.length > MAX_LINEUP_SIZE) {
    result.valid = false;
    result.errors.push(`Lineup exceeds maximum size of ${MAX_LINEUP_SIZE} cards`);
    return result; // Return early since other checks may not make sense
  }

  // Check for all required positions
  const positions = lineup.cards.map(card => card.position);

  // Check each required position
  for (const requiredPosition of REQUIRED_POSITIONS) {
    if (!positions.includes(requiredPosition)) {
      result.valid = false;
      result.errors.push(`Lineup is missing required position: ${requiredPosition}`);
    }
  }

  // Check for duplicate positions
  const positionCounts = positions.reduce(
    (counts, position) => {
      counts[position] = (counts[position] || 0) + 1;
      return counts;
    },
    {} as Record<Position, number>
  );

  for (const [position, count] of Object.entries(positionCounts)) {
    if (count > 1) {
      result.valid = false;
      result.errors.push(`Lineup has duplicate position: ${position}`);
    }
  }

  return result;
};
