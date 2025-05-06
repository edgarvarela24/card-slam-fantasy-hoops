import { Rarity } from './card';

/**
 * Pack types available in the game
 */
export type PackType = 'standard' | 'premium' | 'legendary' | 'special' | 'starter';

/**
 * Distribution of card rarities in a pack
 */
export type RarityDistribution = {
  [key in Rarity]: number;
};

/**
 * Pack of player cards
 */
export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  cardCount: number;
  rarityDistribution: RarityDistribution;
  imageUrl: string;
  available: boolean;
  type: PackType;
  releaseDate?: number;
  expirationDate?: number;
  purchaseLimit?: number;
  guaranteedRarities?: Rarity[];
}

/**
 * Validates if a pack type is valid
 * @param type Pack type to validate
 * @returns True if valid, false otherwise
 */
export const isValidPackType = (type: string): type is PackType =>
  ['standard', 'premium', 'legendary', 'special', 'starter'].includes(type as PackType);

/**
 * Creates a default standard pack
 */
export const createStandardPack = (id: string): Pack => ({
  id,
  name: 'Standard Pack',
  description: 'A standard pack containing 5 player cards',
  price: 100,
  cardCount: 5,
  rarityDistribution: {
    Common: 70,
    Uncommon: 20,
    Rare: 7,
    Epic: 2,
    Legendary: 1,
  },
  imageUrl: '/images/packs/standard.jpg',
  available: true,
  type: 'standard',
});

/**
 * Creates a premium pack with better odds
 */
export const createPremiumPack = (id: string): Pack => ({
  id,
  name: 'Premium Pack',
  description: 'A premium pack with better odds for rare cards',
  price: 250,
  cardCount: 5,
  rarityDistribution: {
    Common: 40,
    Uncommon: 35,
    Rare: 15,
    Epic: 7,
    Legendary: 3,
  },
  imageUrl: '/images/packs/premium.jpg',
  available: true,
  type: 'premium',
  guaranteedRarities: ['Rare'],
});
