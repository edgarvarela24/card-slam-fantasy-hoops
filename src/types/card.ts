/**
 * Player positions
 */
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

/**
 * Card rarity levels
 */
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

/**
 * Visual treatments for cards
 */
export type VisualTreatment = 'Standard' | 'Metallic' | 'Holographic' | 'Shimmer';

/**
 * Player statistics tracked for each card
 */
export interface PlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  threePointersMade: number;
  fieldGoalPercentage: number;
  freeThrowPercentage: number;
}

/**
 * Special ability condition
 */
export interface AbilityCondition {
  stat: keyof PlayerStats;
  operator: '>' | '<' | '==' | '>=' | '<=';
  value: number;
}

/**
 * Special ability modifier
 */
export interface AbilityModifier {
  stat: keyof PlayerStats | 'all';
  operation: 'multiply' | 'add' | 'conditional';
  value: number;
  condition?: AbilityCondition;
}

/**
 * Special ability that can be attached to a card
 */
export interface SpecialAbility {
  id: string;
  name: string;
  description: string;
  modifier: AbilityModifier;
}

/**
 * Card representing a basketball player
 */
export interface Card {
  id: string;
  playerId: string;
  name: string;
  team: string;
  position: Position;
  rarity: Rarity;
  stats: PlayerStats;
  specialAbility?: SpecialAbility;
  variant?: string;
  imageUrl?: string;
  acquiredAt: number;
  visualTreatment?: VisualTreatment;
}

/**
 * Validates if a position is valid
 * @param position Position to validate
 * @returns True if valid, false otherwise
 */
export const isValidPosition = (position: string): position is Position =>
  ['PG', 'SG', 'SF', 'PF', 'C'].includes(position as Position);

/**
 * Validates if a rarity is valid
 * @param rarity Rarity to validate
 * @returns True if valid, false otherwise
 */
export const isValidRarity = (rarity: string): rarity is Rarity =>
  ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].includes(rarity as Rarity);

/**
 * Validates if a visual treatment is valid
 * @param treatment Visual treatment to validate
 * @returns True if valid, false otherwise
 */
export const isValidVisualTreatment = (treatment: string): treatment is VisualTreatment =>
  ['Standard', 'Metallic', 'Holographic', 'Shimmer'].includes(treatment as VisualTreatment);
