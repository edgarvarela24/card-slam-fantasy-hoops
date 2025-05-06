
# Scoring System Implementation

## Scoring Rules

The Card Slam Fantasy Hoops scoring system is based on real NBA player performance with the following point values:

- **Points**: 1 point per actual point scored
- **Rebounds**: 1.2 points per rebound
- **Assists**: 1.5 points per assist
- **Steals**: 2 points per steal
- **Blocks**: 2 points per block
- **3-pointers**: 0.5 bonus points per made three
- **Double-doubles**: 2 bonus points
- **Triple-doubles**: 5 bonus points

Special abilities on cards can modify these base values, providing score multipliers or conditional bonuses.

## Data Models

```typescript
// src/types/scoring.ts
export interface PlayerGameStats {
  playerId: string;
  gameId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  threePointersMade: number;
  minutes: number;
  fieldGoalsAttempted: number;
  fieldGoalsMade: number;
  freeThrowsAttempted: number;
  freeThrowsMade: number;
  turnovers: number;
  personalFouls: number;
  plusMinus: number;
  timestamp: number;
}

export interface GameScore {
  gameId: string;
  lineupId: string;
  userId: string;
  totalScore: number;
  playerScores: Record<string, {
    playerId: string;
    cardId: string;
    baseScore: number;
    bonusScore: number;
    totalScore: number;
    stats: PlayerGameStats;
  }>;
  updatedAt: number;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  score: number;
  lineup: Lineup;
  rank: number;
  previousRank: number;
  rankChange: number;
  animationState?: {
    isMoving: boolean;
    destinationRank: number;
    startTime: number;
  };
}
```

## Scoring Service Implementation
```typescript
// src/services/scoringService.ts
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { app } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { PlayerGameStats, GameScore } from '../types/scoring';
import { Card, SpecialAbility } from '../types/card';
import { Lineup } from '../types/lineup';

const db = getDatabase(app);
const auth = getAuth(app);

// Calculate score for a player based on game stats
export const calculatePlayerScore = (
  stats: PlayerGameStats,
  card?: Card
): { baseScore: number; bonusScore: number; totalScore: number } => {
  // Base score calculation
  let baseScore = 
    stats.points * 1 +
    stats.rebounds * 1.2 +
    stats.assists * 1.5 +
    stats.steals * 2 +
    stats.blocks * 2 +
    stats.threePointersMade * 0.5;
  
  // Round to 1 decimal place
  baseScore = Math.round(baseScore * 10) / 10;
  
  // Bonus for double-doubles and triple-doubles
  let bonusScore = 0;
  let doubleCategoryCount = 0;
  
  if (stats.points >= 10) doubleCategoryCount++;
  if (stats.rebounds >= 10) doubleCategoryCount++;
  if (stats.assists >= 10) doubleCategoryCount++;
  if (stats.steals >= 10) doubleCategoryCount++;
  if (stats.blocks >= 10) doubleCategoryCount++;
  
  if (doubleCategoryCount >= 3) {
    // Triple-double bonus
    bonusScore += 5;
  } else if (doubleCategoryCount >= 2) {
    // Double-double bonus
    bonusScore += 2;
  }
  
  // Apply special ability modifiers if card is provided
  if (card?.specialAbility) {
    bonusScore += applySpecialAbility(stats, card.specialAbility);
  }
  
  // Calculate total score
  const totalScore = baseScore + bonusScore;
  
  return {
    baseScore,
    bonusScore,
    totalScore
  };
};

// Apply special ability modifiers to score
const applySpecialAbility = (
  stats: PlayerGameStats,
  ability: SpecialAbility
): number => {
  const { modifier } = ability;
  let bonusScore = 0;
  
  // Check if condition is met (if applicable)
  if (modifier.condition) {
    const { stat, operator, value } = modifier.condition;
    const statValue = stats[stat as keyof PlayerGameStats] as number;
    
    let conditionMet = false;
    switch (operator) {
      case '>':
        conditionMet = statValue > value;
        break;
      case '<':
        conditionMet = statValue < value;
        break;
      case '>=':
        conditionMet = statValue >= value;
        break;
      case '<=':
        conditionMet = statValue <= value;
        break;
      case '==':
        conditionMet = statValue === value;
        break;
    }
    
    if (!conditionMet) {
      return 0; // Condition not met, no bonus
    }
  }
  
  // Apply modifier based on operation
  if (modifier.stat === 'all') {
    // Apply to total score (will be handled at a higher level)
    // Implementation depends on how we want to modify the total score
    if (modifier.operation === 'multiply') {
      // This would be applied to the final score at a higher level
      // Placeholder calculation
      const baseScore = 
        stats.points * 1 +
        stats.rebounds * 1.2 +
        stats.assists * 1.5 +
        stats.steals * 2 +
        stats.blocks * 2 +
        stats.threePointersMade * 0.5;
      
      bonusScore = baseScore * (modifier.value - 1); // Only the bonus portion
    } else if (modifier.operation === 'add') {
      bonusScore = modifier.value;
    }
  } else {
    // Apply to specific stat
    const statValue = stats[modifier.stat as keyof PlayerGameStats] as number;
    const statScore = calculateStatScore(modifier.stat as keyof PlayerGameStats, statValue);
    
    if (modifier.operation === 'multiply') {
      bonusScore = statScore * (modifier.value - 1); // Only the bonus portion
    } else if (modifier.operation === 'add') {
      bonusScore = modifier.value * statValue;
    }
  }
  
  return bonusScore;
};

// Calculate score contribution from a specific stat
const calculateStatScore = (
  stat: keyof PlayerGameStats,
  value: number
): number => {
  switch (stat) {
    case 'points':
      return value * 1;
    case 'rebounds':
      return value * 1.2;
    case 'assists':
      return value * 1.5;
    case 'steals':
      return value * 2;
    case 'blocks':
      return value * 2;
    case 'threePointersMade':
      return value * 0.5;
    default:
      return 0;
  }
};

// Get real-time score updates for a lineup
export const getLineupScoreUpdates = (
  lineupId: string,
  onUpdate: (score: GameScore) => void
): (() => void) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const scoreRef = ref(db, `scores/${user.uid}/${lineupId}`);
  
  onValue(scoreRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      onUpdate(data);
    }
  });
  
  // Return a function to unsubscribe
  return () => off(scoreRef);
};

// Get real-time leaderboard updates
export const getLeaderboardUpdates = (
  leaderboardId: string,
  onUpdate: (entries: LeaderboardEntry[]) => void
): (() => void) => {
  const leaderboardRef = ref(db, `leaderboards/${leaderboardId}/entries`);
  
  onValue(leaderboardRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convert object to array and sort by score
      const entries: LeaderboardEntry[] = Object.values(data);
      entries.sort((a, b) => b.score - a.score);
      
      // Update ranks
      entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });
      
      onUpdate(entries);
    }
  });
  
  // Return a function to unsubscribe
  return () => off(leaderboardRef);
};

// Calculate lineup score for specific game
export const calculateLineupScore = async (
  lineup: Lineup,
  gameId: string
): Promise<GameScore> => {
  try {
    // In a real implementation, this would call a Cloud Function
    // to ensure consistent scoring across clients
    const result = await callFunction
      { lineupId: string; gameId: string },
      GameScore
    >('calculateLineupScore', { lineupId: lineup.id, gameId });
    
    return result;
  } catch (error) {
    console.error('Error calculating lineup score:', error);
    throw error;
  }
};
```

## Real-time Score Updates Component
```typescript
// src/components/scoring/LiveScoreTracker.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLineupScoreUpdates } from '../../services/scoringService';
import { GameScore } from '../../types/scoring';
import { ScoreCounter } from './ScoreCounter';
import { PlayerScoreCard } from './PlayerScoreCard';

interface LiveScoreTrackerProps {
  lineupId: string;
}

const ScoreTrackerContainer = styled.div`
  background: #1a2151;
  border-radius: 16px;
  padding: 24px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  color: white;
`;

const TotalScore = styled.div`
  display: flex;
  align-items: center;
`;

const ScoreLabel = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const PlayerScoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const LiveScoreTracker: React.FC<LiveScoreTrackerProps> = ({ lineupId }) => {
  const [scoreData, setScoreData] = useState<GameScore | null>(null);
  const [prevScore, setPrevScore] = useState<number>(0);
  
  useEffect(() => {
    // Subscribe to real-time score updates
    const unsubscribe = getLineupScoreUpdates(lineupId, (data) => {
      if (scoreData) {
        setPrevScore(scoreData.totalScore);
      }
      setScoreData(data);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [lineupId]);
  
  if (!scoreData) {
    return (
      <ScoreTrackerContainer>
        <Header>
          <Title>Live Score Tracker</Title>
        </Header>
        <div>Loading score data...</div>
      </ScoreTrackerContainer>
    );
  }
  
  return (
    <ScoreTrackerContainer>
      <Header>
        <Title>Live Score Tracker</Title>
        <TotalScore>
          <ScoreLabel>Total Score:</ScoreLabel>
          <ScoreCounter 
            value={scoreData.totalScore} 
            previousValue={prevScore} 
          />
        </TotalScore>
      </Header>
      
      <PlayerScoresContainer>
        {Object.values(scoreData.playerScores).map((playerScore) => (
          <PlayerScoreCard 
            key={playerScore.cardId}
            playerScore={playerScore}
          />
        ))}
      </PlayerScoresContainer>
    </ScoreTrackerContainer>
  );
};
```
## Score Counter Animation Component
```typescript
// src/components/scoring/ScoreCounter.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface ScoreCounterProps {
  value: number;
  previousValue: number;
  size?: 'small' | 'medium' | 'large';
  isPositive?: boolean;
}

const CounterContainer = styled.div<{ size: string; isPositive?: boolean }>`
  display: inline-block;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  color: ${({ isPositive }) => 
    isPositive === true ? '#36CE94' : 
    isPositive === false ? '#FF3A5E' : 
    'white'};
  font-size: ${({ size }) => 
    size === 'small' ? '16px' : 
    size === 'medium' ? '24px' : 
    '36px'};
  position: relative;
  perspective: 500px;
`;

export const ScoreCounter: React.FC<ScoreCounterProps> = ({ 
  value, 
  previousValue, 
  size = 'medium',
  isPositive
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (previousValue !== value && counterRef.current) {
      // Create flip counter animation
      gsap.to(counterRef.current, {
        duration: 0.4,
        innerText: value.toFixed(1),
        snap: { innerText: 0.1 },
        ease: 'power2.out',
        onUpdate: function() {
          // Add visual flipping effect during the count
          const progress = this.progress();
          if (progress < 0.5) {
            if (counterRef.current) {
              counterRef.current.style.transform = `perspective(500px) rotateX(${progress * 180}deg)`;
              counterRef.current.style.opacity = `${1 - progress * 2}`;
            }
          } else {
            if (counterRef.current) {
              counterRef.current.style.transform = `perspective(500px) rotateX(${(1 - progress) * 180}deg)`;
              counterRef.current.style.opacity = `${(progress - 0.5) * 2}`;
            }
          }
        }
      });
    }
  }, [value, previousValue]);

  return (
    <CounterContainer 
      size={size} 
      isPositive={isPositive === undefined ? (value > previousValue) : isPositive}
    >
      <span ref={counterRef}>{previousValue.toFixed(1)}</span>
    </CounterContainer>
  );
};
```
## Leaderboard Implementation
```typescript
// src/components/leaderboard/Leaderboard.tsx
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getLeaderboardUpdates } from '../../services/scoringService';
import { LeaderboardEntry } from '../../types/scoring';
import { useSpring, animated } from 'react-spring';

interface LeaderboardProps {
  leaderboardId: string;
  title: string;
}

const LeaderboardContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 28px;
  color: #1A2151;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #F8F9FC;
  
  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #8C93A8;
    border-bottom: 2px solid #E6D2B7;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #F8F9FC;
  }
`;

const AnimatedRow = animated.tr;

const RankCell = styled.td<{ isTop3: boolean }>`
  padding: 16px;
  font-weight: bold;
  color: ${({ isTop3 }) => isTop3 ? '#FFC845' : '#1A2151'};
`;

const UserCell = styled.td`
  padding: 16px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div<{ url?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  background: ${({ url }) => url ? `url(${url})` : '#E6D2B7'};
  background-size: cover;
  background-position: center;
`;

const Username = styled.span`
  font-weight: 500;
`;

const ScoreCell = styled.td`
  padding: 16px;
  font-weight: bold;
  text-align: right;
`;

const RankChange = styled.span<{ change: number }>`
  display: inline-block;
  margin-left: 8px;
  color: ${({ change }) => change > 0 ? '#36CE94' : change < 0 ? '#FF3A5E' : 'transparent'};
  font-size: 14px;
`;

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardId, title }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const prevEntries = useRef<Record<string, LeaderboardEntry>>({});
  const rowHeight = 64; // Height of each leaderboard row in pixels
  
  useEffect(() => {
    // Subscribe to real-time leaderboard updates
    const unsubscribe = getLeaderboardUpdates(leaderboardId, (data) => {
      // Create a map of previous entries for position comparison
      const prevEntriesMap: Record<string, LeaderboardEntry> = {};
      entries.forEach(entry => {
        prevEntriesMap[entry.userId] = entry;
      });
      
      // Store previous entries for animation
      prevEntries.current = prevEntriesMap;
      
      // Update entries state
      setEntries(data);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [leaderboardId]);
  
  return (
    <LeaderboardContainer>
      <Title>{title}</Title>
      
      <Table>
        <TableHeader>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th style={{ textAlign: 'right' }}>Score</th>
          </tr>
        </TableHeader>
        
        <TableBody>
          {entries.map((entry, index) => {
            const prevEntry = prevEntries.current[entry.userId];
            const prevIndex = prevEntry ? entries.findIndex(e => e.userId === prevEntry.userId) : index;
            const hasRankChanged = prevEntry && prevEntry.rank !== entry.rank;
            
            // Calculate the vertical distance to move
            const yDelta = hasRankChanged ? (index - prevIndex) * rowHeight : 0;
            
            const springProps = useSpring({
              from: { y: hasRankChanged ? -yDelta : 0, opacity: hasRankChanged ? 0.7 : 1 },
              to: { y: 0, opacity: 1 },
              config: {
                tension: 120,
                friction: 14,
                precision: 0.001,
              },
              delay: index * 50, // Stagger the animations
            });
            
            const rankChange = prevEntry ? prevEntry.rank - entry.rank : 0;
            
            return (
              <AnimatedRow
                key={entry.userId}
                style={{
                  ...springProps,
                  background: hasRankChanged ? 
                    springProps.opacity.to(o => 
                      `rgba(${rankChange > 0 ? '54, 214, 160' : '255, 58, 79'}, ${o * 0.2})`) : 
                    undefined,
                }}
              >
                <RankCell isTop3={index < 3}>
                  {entry.rank}
                  <RankChange change={rankChange}>
                    {rankChange > 0 ? `▲${rankChange}` : rankChange < 0 ? `▼${Math.abs(rankChange)}` : '-'}
                  </RankChange>
                </RankCell>
                <UserCell>
                  <Avatar url={entry.avatarUrl} />
                  <Username>{entry.displayName}</Username>
                </UserCell>
                <ScoreCell>{entry.score.toFixed(1)}</ScoreCell>
              </AnimatedRow>
            );
          })}
        </TableBody>
      </Table>
    </LeaderboardContainer>
  );
};
```