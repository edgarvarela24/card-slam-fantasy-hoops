import React, { useState } from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types/card';
import { Card } from './Card';

interface CardCollectionProps {
  cards: CardType[];
  onCardSelect?: (card: CardType) => void;
  selectedCardId?: string;
}

interface FilterState {
  position: string;
  rarity: string;
  team: string;
}

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: #f8f9fc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e2e6f1;
  background: white;
  color: #0f1923;
  font-size: 14px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #ff5d23;
    box-shadow: 0 0 0 2px rgba(255, 93, 35, 0.2);
  }
`;

const SortSelect = styled(FilterSelect)``;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #8c93a8;
  background: #f8f9fc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const EmptyStateTitle = styled.h3`
  margin-top: 0;
  color: #0f1923;
`;

const EmptyStateMessage = styled.p`
  margin-bottom: 0;
`;

const FilterLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabelText = styled.span`
  font-size: 12px;
  color: #8c93a8;
`;

export const CardCollection: React.FC<CardCollectionProps> = ({
  cards,
  onCardSelect,
  selectedCardId,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    position: '',
    rarity: '',
    team: '',
  });

  const [sortBy, setSortBy] = useState('name');

  // Get unique teams for filter
  const uniqueTeams = Array.from(new Set(cards.map(card => card.team))).sort();

  // Apply filters
  const filteredCards = cards.filter(card => {
    if (filters.position && card.position !== filters.position) return false;
    if (filters.rarity && card.rarity !== filters.rarity) return false;
    if (filters.team && card.team !== filters.team) return false;
    return true;
  });

  // Apply sorting
  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case 'name': {
        return a.name.localeCompare(b.name);
      }
      case 'rarity': {
        const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      }
      case 'rarity-desc': {
        const rarityOrderDesc = ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
        return rarityOrderDesc.indexOf(a.rarity) - rarityOrderDesc.indexOf(b.rarity);
      }
      case 'points':
        return b.stats.points - a.stats.points;
      case 'rebounds':
        return b.stats.rebounds - a.stats.rebounds;
      case 'assists':
        return b.stats.assists - a.stats.assists;
      case 'recent':
        return b.acquiredAt - a.acquiredAt;
      default:
        return 0;
    }
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <CollectionContainer>
      <FiltersContainer>
        <FilterLabel>
          <FilterLabelText>Position</FilterLabelText>
          <FilterSelect
            value={filters.position}
            onChange={e => handleFilterChange('position', e.target.value)}
            aria-label="position"
            name="position"
          >
            <option value="">All Positions</option>
            <option value="PG">Point Guard (PG)</option>
            <option value="SG">Shooting Guard (SG)</option>
            <option value="SF">Small Forward (SF)</option>
            <option value="PF">Power Forward (PF)</option>
            <option value="C">Center (C)</option>
          </FilterSelect>
        </FilterLabel>

        <FilterLabel>
          <FilterLabelText>Rarity</FilterLabelText>
          <FilterSelect
            value={filters.rarity}
            onChange={e => handleFilterChange('rarity', e.target.value)}
            aria-label="rarity"
            name="rarity"
          >
            <option value="">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
          </FilterSelect>
        </FilterLabel>

        <FilterLabel>
          <FilterLabelText>Team</FilterLabelText>
          <FilterSelect
            value={filters.team}
            onChange={e => handleFilterChange('team', e.target.value)}
            aria-label="team"
            name="team"
          >
            <option value="">All Teams</option>
            {uniqueTeams.map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </FilterSelect>
        </FilterLabel>

        <FilterLabel>
          <FilterLabelText>Sort By</FilterLabelText>
          <SortSelect
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="sort by"
            name="sortBy"
          >
            <option value="name">Name (A-Z)</option>
            <option value="rarity">Rarity (Lowest-Highest)</option>
            <option value="rarity-desc">Rarity (Highest-Lowest)</option>
            <option value="points">Points</option>
            <option value="rebounds">Rebounds</option>
            <option value="assists">Assists</option>
            <option value="recent">Recently Acquired</option>
          </SortSelect>
        </FilterLabel>
      </FiltersContainer>

      {sortedCards.length > 0 ? (
        <CollectionGrid>
          {sortedCards.map(card => (
            <Card
              key={card.id}
              card={card}
              onClick={onCardSelect}
              isSelected={card.id === selectedCardId}
            />
          ))}
        </CollectionGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No cards match your filters</EmptyStateTitle>
          <EmptyStateMessage>Try adjusting your filters to see more cards</EmptyStateMessage>
        </EmptyState>
      )}
    </CollectionContainer>
  );
};

export default CardCollection;
