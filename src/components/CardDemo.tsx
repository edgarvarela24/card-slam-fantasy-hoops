import React, { useState } from 'react';
import { Card, CardCollection, CardDetail } from './Card';
import { Card as CardType } from '../types/card';

// Sample cards data for demo
const mockCards: CardType[] = [
  {
    id: 'card-1',
    playerId: 'player-1',
    name: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'SF',
    rarity: 'Legendary',
    stats: {
      points: 27.4,
      rebounds: 8.5,
      assists: 8.3,
      steals: 1.6,
      blocks: 0.9,
      threePointersMade: 2.2,
      fieldGoalPercentage: 0.515,
      freeThrowPercentage: 0.73,
    },
    acquiredAt: Date.now() - 86400000, // 1 day ago
  },
  {
    id: 'card-2',
    playerId: 'player-2',
    name: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'PG',
    rarity: 'Epic',
    stats: {
      points: 29.6,
      rebounds: 5.6,
      assists: 6.3,
      steals: 1.3,
      blocks: 0.3,
      threePointersMade: 5.2,
      fieldGoalPercentage: 0.473,
      freeThrowPercentage: 0.916,
    },
    acquiredAt: Date.now(),
  },
  {
    id: 'card-3',
    playerId: 'player-3',
    name: 'Joel Embiid',
    team: 'Philadelphia 76ers',
    position: 'C',
    rarity: 'Epic',
    stats: {
      points: 30.6,
      rebounds: 11.7,
      assists: 4.2,
      steals: 1.1,
      blocks: 1.7,
      threePointersMade: 1.0,
      fieldGoalPercentage: 0.529,
      freeThrowPercentage: 0.857,
    },
    acquiredAt: Date.now() - 172800000, // 2 days ago
  },
  {
    id: 'card-4',
    playerId: 'player-4',
    name: 'Nikola Jokić',
    team: 'Denver Nuggets',
    position: 'C',
    rarity: 'Legendary',
    stats: {
      points: 26.2,
      rebounds: 12.4,
      assists: 9.0,
      steals: 1.4,
      blocks: 0.7,
      threePointersMade: 1.1,
      fieldGoalPercentage: 0.583,
      freeThrowPercentage: 0.822,
    },
    acquiredAt: Date.now() - 50000000, // ~14 hours ago
  },
  {
    id: 'card-5',
    playerId: 'player-5',
    name: 'Luka Dončić',
    team: 'Dallas Mavericks',
    position: 'PG',
    rarity: 'Legendary',
    stats: {
      points: 32.4,
      rebounds: 8.6,
      assists: 9.1,
      steals: 1.4,
      blocks: 0.5,
      threePointersMade: 3.5,
      fieldGoalPercentage: 0.498,
      freeThrowPercentage: 0.765,
    },
    acquiredAt: Date.now() - 259200000, // 3 days ago
  },
  {
    id: 'card-6',
    playerId: 'player-6',
    name: 'Kevin Durant',
    team: 'Phoenix Suns',
    position: 'SF',
    rarity: 'Rare',
    stats: {
      points: 29.1,
      rebounds: 6.6,
      assists: 5.0,
      steals: 0.7,
      blocks: 1.2,
      threePointersMade: 2.2,
      fieldGoalPercentage: 0.525,
      freeThrowPercentage: 0.907,
    },
    acquiredAt: Date.now() - 345600000, // 4 days ago
  },
];

enum DemoView {
  COLLECTION = 'collection',
  SINGLE_CARD = 'single_card',
  CARD_DETAIL = 'card_detail',
}

const CardDemo: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<DemoView>(DemoView.COLLECTION);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCardSelect = (card: CardType) => {
    setSelectedCardId(card.id);
    setCurrentView(DemoView.CARD_DETAIL);
  };

  const handleCloseDetail = () => {
    setCurrentView(DemoView.COLLECTION);
  };

  const selectedCard = mockCards.find(card => card.id === selectedCardId);

  return (
    <div style={{ width: '100%' }}>
      <h2
        style={{
          fontSize: '28px',
          textAlign: 'center',
          margin: '0 0 24px 0',
          color: '#007bff',
        }}
      >
        Card Collection Showcase
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          gap: '12px',
        }}
      >
        <button
          onClick={() => setCurrentView(DemoView.COLLECTION)}
          style={{
            background: currentView === DemoView.COLLECTION ? '#007bff' : '#f1f1f1',
            color: currentView === DemoView.COLLECTION ? 'white' : '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow:
              currentView === DemoView.COLLECTION ? '0 4px 8px rgba(0, 123, 255, 0.3)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Card Collection
        </button>
        <button
          onClick={() => setCurrentView(DemoView.SINGLE_CARD)}
          style={{
            background: currentView === DemoView.SINGLE_CARD ? '#007bff' : '#f1f1f1',
            color: currentView === DemoView.SINGLE_CARD ? 'white' : '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow:
              currentView === DemoView.SINGLE_CARD ? '0 4px 8px rgba(0, 123, 255, 0.3)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Single Card View
        </button>
      </div>

      {currentView === DemoView.COLLECTION && (
        <div>
          <p
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto 20px auto',
            }}
          >
            Browse your collection of basketball cards. Filter by position, rarity, or team. Click
            on any card to view detailed stats and information.
          </p>
          <CardCollection
            cards={mockCards}
            onCardSelect={handleCardSelect}
            selectedCardId={selectedCardId || undefined}
          />
        </div>
      )}

      {currentView === DemoView.SINGLE_CARD && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Card
            card={mockCards[0]}
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            isSelected={selectedCardId === mockCards[0].id}
            isFlipped={isCardFlipped}
          />
          <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
            Click on the card to flip it!
          </p>
        </div>
      )}

      {currentView === DemoView.CARD_DETAIL && selectedCard && (
        <div style={{ marginTop: '20px' }}>
          <CardDetail
            card={selectedCard}
            onClose={handleCloseDetail}
            onAddToLineup={() => {
              /* Add to lineup functionality will be implemented later */
            }}
            onConvert={() => {
              /* Convert to BP functionality will be implemented later */
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardDemo;
