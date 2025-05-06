import React from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types/card';
import { getRarityBorderColor, getTeamColors, formatPercentage } from '../../utils/cardUtils';

interface CardDetailProps {
  card: CardType;
  onAddToLineup?: (card: CardType) => void;
  onClose?: () => void;
  onConvert?: (card: CardType) => void;
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  background: #f9fafc;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const DetailHeader = styled.div<{ teamPrimary: string }>`
  background: ${({ teamPrimary }) => teamPrimary};
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayerName = styled.h2`
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Position = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const DetailContent = styled.div`
  display: flex;
  padding: 20px;
  gap: 30px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CardPreview = styled.div<{ teamPrimary: string; teamSecondary: string; rarity: string }>`
  width: 280px;
  height: 400px;
  background: linear-gradient(
    45deg,
    ${({ teamPrimary }) => teamPrimary},
    ${({ teamSecondary }) => teamSecondary}
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px;
    box-shadow: 0 0 20px ${({ rarity }) => getRarityBorderColor(rarity)};
    opacity: 0.6;
    z-index: -1;
  }

  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;

const StatisticsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatsTitle = styled.h3`
  margin: 0;
  color: #0f1923;
  font-size: 20px;
  border-bottom: 2px solid #ff5d23;
  padding-bottom: 8px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #8c93a8;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0f1923;
`;

const StatBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e6f1;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
`;

const StatBarFill = styled.div<{ width: string; color: string }>`
  height: 100%;
  width: ${({ width }) => width};
  background: ${({ color }) => color};
  border-radius: 4px;
`;

// Divider component might be used in the future
// const Divider = styled.div`
//   height: 1px;
//   background: #E2E6F1;
//   margin: 10px 0;
// `;

const RarityBadge = styled.div<{ rarity: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ rarity }) => getRarityBorderColor(rarity)};
  color: white;
  font-size: 12px;
  padding: 6px 12px;
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
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SpecialAbilityContainer = styled.div`
  background: #0f1923;
  color: white;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
`;

const AbilityName = styled.h4`
  margin: 0 0 8px 0;
  color: #ffd700;
  font-size: 18px;
`;

const AbilityDescription = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{
  variant: 'primary' | 'secondary' | 'danger';
  'data-testid'?: string;
}>`
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${({ variant }) =>
    variant === 'primary'
      ? `
      background: #FF5D23;
      color: white;
      
      &:hover {
        background: #E64A10;
      }
    `
      : variant === 'secondary'
        ? `
      background: transparent;
      border: 2px solid #0F1923;
      color: #0F1923;
      
      &:hover {
        background: rgba(15, 25, 35, 0.05);
      }
    `
        : `
      background: #FF3A4F;
      color: white;
      
      &:hover {
        background: #E52A3F;
      }
    `}
`;

const PlayerAvatar = styled.div`
  font-size: 120px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
  user-select: none;
`;

// Helper function to get player initials
const getPlayerInitials = (name: string): string => name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('');

// Helper to get stat color
const getStatColor = (stat: number, maxValue: number): string => {
  const percentage = stat / maxValue;
  if (percentage >= 0.8) return '#3D82FF'; // High
  if (percentage >= 0.5) return '#36D6A0'; // Medium
  return '#FF5D23'; // Low
};

// Max values for stat bars (these would be calibrated based on actual player data)
const maxStats = {
  points: 35,
  rebounds: 15,
  assists: 12,
  steals: 4,
  blocks: 4,
  threePointersMade: 5,
  fieldGoalPercentage: 1,
  freeThrowPercentage: 1,
};

export const CardDetail: React.FC<CardDetailProps> = ({
  card,
  onAddToLineup,
  onClose,
  onConvert,
}) => {
  const { primary, secondary } = getTeamColors(card.team);

  return (
    <DetailContainer>
      <DetailHeader teamPrimary={primary}>
        <PlayerName>
          {card.name} <Position>{card.position}</Position>
        </PlayerName>
        {onClose && (
          <CloseButton
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
            data-testid="close-button"
          >
            ×
          </CloseButton>
        )}
      </DetailHeader>

      <DetailContent>
        <CardPreview teamPrimary={primary} teamSecondary={secondary} rarity={card.rarity}>
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              style={{ maxWidth: '80%', maxHeight: '80%' }}
            />
          ) : (
            <PlayerAvatar>{getPlayerInitials(card.name)}</PlayerAvatar>
          )}
          <RarityBadge rarity={card.rarity}>{card.rarity}</RarityBadge>
          <TeamBadge>{card.team}</TeamBadge>
        </CardPreview>

        <StatisticsContainer>
          <div>
            <StatsTitle>Player Statistics</StatsTitle>
            <StatsGrid>
              <StatItem>
                <StatLabel>Points</StatLabel>
                <StatValue>{card.stats.points.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.points / maxStats.points) * 100)}%`}
                    color={getStatColor(card.stats.points, maxStats.points)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Rebounds</StatLabel>
                <StatValue>{card.stats.rebounds.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.rebounds / maxStats.rebounds) * 100)}%`}
                    color={getStatColor(card.stats.rebounds, maxStats.rebounds)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Assists</StatLabel>
                <StatValue>{card.stats.assists.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.assists / maxStats.assists) * 100)}%`}
                    color={getStatColor(card.stats.assists, maxStats.assists)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Steals</StatLabel>
                <StatValue>{card.stats.steals.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.steals / maxStats.steals) * 100)}%`}
                    color={getStatColor(card.stats.steals, maxStats.steals)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Blocks</StatLabel>
                <StatValue>{card.stats.blocks.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.blocks / maxStats.blocks) * 100)}%`}
                    color={getStatColor(card.stats.blocks, maxStats.blocks)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>3-Pointers Made</StatLabel>
                <StatValue>{card.stats.threePointersMade.toFixed(1)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, (card.stats.threePointersMade / maxStats.threePointersMade) * 100)}%`}
                    color={getStatColor(card.stats.threePointersMade, maxStats.threePointersMade)}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Field Goal %</StatLabel>
                <StatValue>{formatPercentage(card.stats.fieldGoalPercentage)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, card.stats.fieldGoalPercentage * 100)}%`}
                    color={getStatColor(
                      card.stats.fieldGoalPercentage,
                      maxStats.fieldGoalPercentage
                    )}
                  />
                </StatBar>
              </StatItem>

              <StatItem>
                <StatLabel>Free Throw %</StatLabel>
                <StatValue>{formatPercentage(card.stats.freeThrowPercentage)}</StatValue>
                <StatBar>
                  <StatBarFill
                    width={`${Math.min(100, card.stats.freeThrowPercentage * 100)}%`}
                    color={getStatColor(
                      card.stats.freeThrowPercentage,
                      maxStats.freeThrowPercentage
                    )}
                  />
                </StatBar>
              </StatItem>
            </StatsGrid>
          </div>

          {card.specialAbility && (
            <SpecialAbilityContainer data-testid="special-ability-container">
              <AbilityName>{card.specialAbility.name}</AbilityName>
              <AbilityDescription>{card.specialAbility.description}</AbilityDescription>
            </SpecialAbilityContainer>
          )}

          <ActionsContainer>
            {onAddToLineup && (
              <Button
                variant="primary"
                onClick={e => {
                  e.preventDefault();
                  onAddToLineup(card);
                }}
                data-testid="add-to-lineup-button"
              >
                Add to Lineup
              </Button>
            )}

            {onConvert && (
              <Button
                variant="danger"
                onClick={e => {
                  e.preventDefault();
                  onConvert(card);
                }}
                data-testid="convert-to-bp-button"
              >
                Convert to BP
              </Button>
            )}
          </ActionsContainer>
        </StatisticsContainer>
      </DetailContent>
    </DetailContainer>
  );
};

export default CardDetail;
