# Card System Implementation

## Card Data Models

```typescript
// src/types/card.ts
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export type VisualTreatment = 'Standard' | 'Metallic' | 'Holographic' | 'Shimmer';

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

export interface SpecialAbility {
  id: string;
  name: string;
  description: string;
  modifier: {
    stat: keyof PlayerStats | 'all';
    operation: 'multiply' | 'add' | 'conditional';
    value: number;
    condition?: {
      stat: keyof PlayerStats;
      operator: '>' | '<' | '==' | '>=' | '<=';
      value: number;
    };
  };
}

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
```

## Card Generation System
```typescript
// src/services/cardGenerator.ts
import { v4 as uuidv4 } from 'uuid';
import { Card, Rarity, SpecialAbility, VisualTreatment } from '../types/card';
import { getPlayerById } from './playerService';

// Rarity distribution (percentages)
const RARITY_WEIGHTS = {
  Common: 60,
  Uncommon: 25,
  Rare: 10,
  Epic: 4,
  Legendary: 1
};

// Visual treatment distribution by rarity
const VISUAL_TREATMENT_BY_RARITY: Record<Rarity, VisualTreatment[]> = {
  Common: ['Standard'],
  Uncommon: ['Standard'],
  Rare: ['Standard', 'Shimmer'],
  Epic: ['Standard', 'Shimmer', 'Metallic'],
  Legendary: ['Standard', 'Shimmer', 'Metallic', 'Holographic']
};

// Special abilities by rarity
const SPECIAL_ABILITIES_BY_RARITY: Record<Rarity, SpecialAbility[]> = {
  // Define special abilities for each rarity...
  Common: [],
  Uncommon: [
    {
      id: 'three-point-specialist',
      name: 'Three-Point Specialist',
      description: 'Increases points from 3-pointers by 50%',
      modifier: {
        stat: 'threePointersMade',
        operation: 'multiply',
        value: 1.5
      }
    }
  ],
  // Add more for other rarities...
};

// Generate a random rarity based on weights
export const generateRarity = (): Rarity => {
  const total = Object.values(RARITY_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
  const random = Math.random() * total;
  
  let accumulatedWeight = 0;
  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    accumulatedWeight += weight;
    if (random <= accumulatedWeight) {
      return rarity as Rarity;
    }
  }
  
  return 'Common'; // Fallback
};

// Generate a random visual treatment based on rarity
export const generateVisualTreatment = (rarity: Rarity): VisualTreatment => {
  const treatments = VISUAL_TREATMENT_BY_RARITY[rarity];
  return treatments[Math.floor(Math.random() * treatments.length)];
};

// Generate a random special ability based on rarity
export const generateSpecialAbility = (rarity: Rarity): SpecialAbility | undefined => {
  const abilities = SPECIAL_ABILITIES_BY_RARITY[rarity];
  if (abilities.length === 0 || (rarity === 'Common' && Math.random() > 0.2)) {
    return undefined;
  }
  
  return abilities[Math.floor(Math.random() * abilities.length)];
};

// Generate a card for a specific player
export const generateCard = async (playerId: string): Promise<Card> => {
  // Get player data
  const player = await getPlayerById(playerId);
  
  if (!player) {
    throw new Error(`Player not found: ${playerId}`);
  }
  
  // Generate card properties
  const rarity = generateRarity();
  const specialAbility = generateSpecialAbility(rarity);
  const visualTreatment = generateVisualTreatment(rarity);
  
  // Create card
  const card: Card = {
    id: uuidv4(),
    playerId,
    name: player.name,
    team: player.team,
    position: player.position,
    rarity,
    stats: player.stats,
    specialAbility,
    visualTreatment,
    acquiredAt: Date.now()
  };
  
  return card;
};

// Generate multiple cards (for pack opening)
export const generateCards = async (count: number): Promise<Card[]> => {
  // Implementation depends on how players are selected for packs
  // This is a simplified version that would need to be expanded
  
  // Get list of available player IDs
  const playerIds = await getAvailablePlayerIds();
  
  // Generate specified number of cards
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    const randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
    const card = await generateCard(randomPlayerId);
    cards.push(card);
  }
  
  return cards;
};

// Function to get available player IDs (implementation depends on data source)
const getAvailablePlayerIds = async (): Promise<string[]> => {
  // Implementation would fetch from API or database
  // Placeholder implementation
  return ['player1', 'player2', 'player3', /* ... */];
};
```
## Pack System Implementation
```typescript
// src/services/packService.ts
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { callFunction } from '../firebase/functions/functions';
import { Pack } from '../types/pack';
import { Card } from '../types/card';
import { app } from '../firebase/firebase';

const db = getFirestore(app);

// Get available packs
export const getAvailablePacks = async (): Promise<Pack[]> => {
  try {
    // Implementation would fetch packs from Firestore
    // Placeholder implementation
    const packsCollection = collection(db, 'packs');
    const querySnapshot = await getDocs(packsCollection);
    
    const packs: Pack[] = [];
    querySnapshot.forEach(doc => {
      const pack = { id: doc.id, ...doc.data() } as Pack;
      if (pack.available) {
        packs.push(pack);
      }
    });
    
    return packs;
  } catch (error) {
    console.error('Error getting packs:', error);
    throw error;
  }
};

// Get pack details
export const getPackById = async (packId: string): Promise<Pack | null> => {
  try {
    const docRef = doc(db, 'packs', packId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Pack;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting pack:', error);
    throw error;
  }
};

// Open a pack
export const openPack = async (packId: string): Promise<Card[]> => {
  try {
    // Call Cloud Function to open pack
    const result = await callFunction<{ packId: string }, { cards: Card[] }>(
      'openPack',
      { packId }
    );
    
    return result.cards;
  } catch (error) {
    console.error('Error opening pack:', error);
    throw error;
  }
};

// Purchase a pack
export const purchasePack = async (packId: string): Promise<{ success: boolean; message?: string }> => {
  try {
    // Call Cloud Function to handle purchase
    const result = await callFunction<{ packId: string }, { success: boolean; message?: string }>(
      'purchasePack',
      { packId }
    );
    
    return result;
  } catch (error) {
    console.error('Error purchasing pack:', error);
    throw error;
  }
};
```
## Card Collection Service
```typescript
// src/services/cardCollectionService.ts
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Card } from '../types/card';
import { app } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

// Get user's card collection
export const getUserCards = async (
  filters: Partial<{
    position: string;
    rarity: string;
    team: string;
  }> = {}
): Promise<Card[]> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Create base query
    const userCardsCollection = collection(db, `cards/${user.uid}`);
    
    // Add filters if provided
    let cardsQuery = query(userCardsCollection);
    
    if (filters.position) {
      cardsQuery = query(cardsQuery, where('position', '==', filters.position));
    }
    
    if (filters.rarity) {
      cardsQuery = query(cardsQuery, where('rarity', '==', filters.rarity));
    }
    
    if (filters.team) {
      cardsQuery = query(cardsQuery, where('team', '==', filters.team));
    }
    
    // Execute query
    const querySnapshot = await getDocs(cardsQuery);
    
    // Format results
    const cards: Card[] = [];
    querySnapshot.forEach(doc => {
      cards.push({ id: doc.id, ...doc.data() } as Card);
    });
    
    return cards;
  } catch (error) {
    console.error('Error getting user cards:', error);
    throw error;
  }
};

// Add cards to user's collection
export const addCardToCollection = async (card: Card): Promise<string> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const userCardsCollection = collection(db, `cards/${user.uid}`);
    const docRef = await addDoc(userCardsCollection, card);
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding card to collection:', error);
    throw error;
  }
};

// Remove card from collection
export const removeCardFromCollection = async (cardId: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const cardDocRef = doc(db, `cards/${user.uid}/${cardId}`);
    await deleteDoc(cardDocRef);
  } catch (error) {
    console.error('Error removing card from collection:', error);
    throw error;
  }
};

// Convert card to Basketball Points (BP)
export const convertCardToBP = async (cardId: string): Promise<number> => {
  try {
    // Call Cloud Function to handle conversion
    const result = await callFunction<{ cardId: string }, { bp: number }>(
      'convertCardToBP',
      { cardId }
    );
    
    return result.bp;
  } catch (error) {
    console.error('Error converting card to BP:', error);
    throw error;
  }
};
```
## Card Component Implementation
```typescript
// src/components/Card/Card.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types/card';
import { getRarityColor, getTeamColors } from '../../utils/cardUtils';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  isSelected?: boolean;
  isFlipped?: boolean;
}

const CardContainer = styled.div<{
  rarity: string;
  isSelected?: boolean;
  isFlipped?: boolean;
  teamPrimary: string;
  teamSecondary: string;
}>`
  position: relative;
  width: 250px;
  height: 350px;
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => 
    isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  transition: transform 0.4s ease-out;
  
  &:hover {
    transform: ${({ isFlipped }) => 
      isFlipped 
        ? 'rotateY(180deg) translateY(-8px)' 
        : 'rotateY(0) translateY(-8px)'};
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  /* Add rarity-based border glow */
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px;
    background: ${({ rarity }) => getRarityColor(rarity)};
    opacity: ${({ isSelected }) => isSelected ? 0.8 : 0.4};
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  /* Selected state */
  ${({ isSelected }) => isSelected && `
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    
    &::after {
      opacity: 0.8;
    }
  `}
`;

const CardFace = styled.div<{ isBack?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #1a2151;
  display: flex;
  flex-direction: column;
  transform: ${({ isBack }) => 
    isBack ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardHeader = styled.div<{ teamPrimary: string }>`
  height: 48px;
  background: ${({ teamPrimary }) => teamPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const PlayerName = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const Position = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
`;

const PlayerImage = styled.div<{ teamPrimary: string; teamSecondary: string }>`
  height: 180px;
  background: linear-gradient(
    45deg,
    ${({ teamPrimary }) => teamPrimary},
    ${({ teamSecondary }) => teamSecondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatsContainer = styled.div`
  flex: 1;
  padding: 16px;
  background: #f8f9fc;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatLabel = styled.span`
  color: #8c93a8;
  font-size: 12px;
`;

const StatValue = styled.span`
  color: #1a2151;
  font-weight: bold;
  font-size: 16px;
`;

const RarityBadge = styled.div<{ rarity: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ rarity }) => getRarityColor(rarity)};
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
`;

export const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  isSelected = false, 
  isFlipped = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { primary, secondary } = getTeamColors(card.team);
  
  const handleClick = () => {
    if (onClick) {
      onClick(card);
    }
  };
  
  return (
    <CardContainer 
      data-testid={`card-${card.id}`}
      rarity={card.rarity}
      isSelected={isSelected}
      isFlipped={isFlipped}
      teamPrimary={primary}
      teamSecondary={secondary}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Front of card */}
      <CardFace>
        <CardHeader teamPrimary={primary}>
          <PlayerName>{card.name}</PlayerName>
          <Position>{card.position}</Position>
        </CardHeader>
        
        <PlayerImage 
          teamPrimary={primary} 
          teamSecondary={secondary}
        >
          {/* Placeholder for player visualization */}
          <div>Player Visualization</div>
        </PlayerImage>
        
        <StatsContainer>
          <StatItem>
            <StatLabel>PTS</StatLabel>
            <StatValue>{card.stats.points.toFixed(1)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>REB</StatLabel>
            <StatValue>{card.stats.rebounds.toFixed(1)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>AST</StatLabel>
            <StatValue>{card.stats.assists.toFixed(1)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>3PM</StatLabel>
            <StatValue>{card.stats.threePointersMade.toFixed(1)}</StatValue>
          </StatItem>
        </StatsContainer>
        
        <RarityBadge rarity={card.rarity}>{card.rarity}</RarityBadge>
      </CardFace>
      
      {/* Back of card - implement for card flip */}
      <CardFace isBack>
        {/* Back content - could show full stats, special abilities, etc. */}
      </CardFace>
    </CardContainer>
  );
};
```