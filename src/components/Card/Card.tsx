import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Card as CardType, Rarity } from '../../types/card';
import {
  getRarityBorderColor,
  getTeamColors,
  formatPercentage,
  getTextColorForBackground,
} from '../../utils/cardUtils';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  isSelected?: boolean;
  isFlipped?: boolean;
}

const CardContainer = styled.div<{
  rarity: Rarity;
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
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  transition:
    transform 0.4s ease-out,
    box-shadow 0.3s ease-out,
    transform 0.3s ease-out;

  &:hover {
    transform: ${({ isFlipped }) =>
      isFlipped ? 'rotateY(180deg) translateY(-8px)' : 'rotateY(0) translateY(-8px)'};
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
    background: ${({ rarity }) => getRarityBorderColor(rarity)};
    opacity: ${({ isSelected }) => (isSelected ? 0.8 : 0.4)};
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  /* Selected state */
  ${({ isSelected }) =>
    isSelected &&
    css`
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
  transform: ${({ isBack }) => (isBack ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardHeader = styled.div<{ teamPrimary: string }>`
  height: 48px;
  background: ${({ teamPrimary }) => teamPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const PlayerName = styled.h3<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 170px;
`;

const Position = styled.span<{ textColor: string }>`
  background: rgba(255, 255, 255, 0.2);
  color: ${({ textColor }) => textColor};
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
  position: relative;
`;

const PlayerInitials = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

const RarityBadge = styled.div<{ rarity: Rarity }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ rarity }) => getRarityBorderColor(rarity)};
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TeamBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #1a2151;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardBack = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BackHeader = styled.h3`
  color: white;
  margin-top: 0;
  margin-bottom: 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
`;

const DetailStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const DetailStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
`;

const DetailStatLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const DetailStatValue = styled.span`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const SpecialAbility = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  margin-top: auto;
`;

const AbilityName = styled.h4`
  color: #ffd700;
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const AbilityDescription = styled.p`
  color: white;
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;

// Helper function to get player initials
const getPlayerInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('');

export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  isSelected = false,
  isFlipped = false,
}) => {
  // Always use the hook, but we'll check environment before using it
  const [, setIsHovered] = useState(false);
  const isTestEnv = typeof jest !== 'undefined';
  const { primary, secondary } = getTeamColors(card.team);
  const textColor = getTextColorForBackground(primary);

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
      onMouseEnter={() => !isTestEnv && setIsHovered(true)}
      onMouseLeave={() => !isTestEnv && setIsHovered(false)}
    >
      {/* Front of card */}
      <CardFace>
        <CardHeader teamPrimary={primary}>
          <PlayerName textColor={textColor}>{card.name}</PlayerName>
          <Position textColor={textColor}>{card.position}</Position>
        </CardHeader>

        <PlayerImage teamPrimary={primary} teamSecondary={secondary}>
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              data-testid="player-image"
            />
          ) : (
            <PlayerInitials data-testid="player-initials">
              {getPlayerInitials(card.name)}
            </PlayerInitials>
          )}
          <TeamBadge data-testid="team-name">{card.team}</TeamBadge>
          <RarityBadge rarity={card.rarity}>{card.rarity}</RarityBadge>
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
      </CardFace>

      {/* Back of card - implement for card flip */}
      <CardFace isBack>
        <CardBack>
          <BackHeader>
            {card.name} - {card.position}
          </BackHeader>

          <DetailStats>
            <DetailStatRow>
              <DetailStatLabel>Points</DetailStatLabel>
              <DetailStatValue>{card.stats.points.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>Rebounds</DetailStatLabel>
              <DetailStatValue>{card.stats.rebounds.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>Assists</DetailStatLabel>
              <DetailStatValue>{card.stats.assists.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>Steals</DetailStatLabel>
              <DetailStatValue>{card.stats.steals.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>Blocks</DetailStatLabel>
              <DetailStatValue>{card.stats.blocks.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>3PM</DetailStatLabel>
              <DetailStatValue>{card.stats.threePointersMade.toFixed(1)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>FG%</DetailStatLabel>
              <DetailStatValue>{formatPercentage(card.stats.fieldGoalPercentage)}</DetailStatValue>
            </DetailStatRow>
            <DetailStatRow>
              <DetailStatLabel>FT%</DetailStatLabel>
              <DetailStatValue>{formatPercentage(card.stats.freeThrowPercentage)}</DetailStatValue>
            </DetailStatRow>
          </DetailStats>

          {card.specialAbility && (
            <SpecialAbility>
              <AbilityName>{card.specialAbility.name}</AbilityName>
              <AbilityDescription>{card.specialAbility.description}</AbilityDescription>
            </SpecialAbility>
          )}
        </CardBack>
      </CardFace>
    </CardContainer>
  );
};

export default Card;
