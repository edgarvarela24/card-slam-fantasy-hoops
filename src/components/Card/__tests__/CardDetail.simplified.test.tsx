import { describe, test, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetail } from '../CardDetail';
import { Card as CardType } from '../../../types/card';

// A simplified card for testing
const simpleCard: CardType = {
  id: 'test-id',
  playerId: 'player-123',
  name: 'Test Player',
  team: 'Test Team',
  position: 'PG',
  rarity: 'Common',
  stats: {
    points: 10,
    rebounds: 5,
    assists: 5,
    steals: 1,
    blocks: 1,
    threePointersMade: 2,
    fieldGoalPercentage: 0.5,
    freeThrowPercentage: 0.8,
  },
  acquiredAt: Date.now(),
};

describe('CardDetail Simple Tests', () => {
  test('buttons call their respective callbacks', () => {
    // Arrange
    const handleAddToLineup = jest.fn();
    const handleConvert = jest.fn();
    const handleClose = jest.fn();

    const { getByTestId } = render(
      <CardDetail
        card={simpleCard}
        onAddToLineup={handleAddToLineup}
        onConvert={handleConvert}
        onClose={handleClose}
      />
    );

    // Act
    fireEvent.click(getByTestId('add-to-lineup-button'));
    fireEvent.click(getByTestId('convert-to-bp-button'));
    fireEvent.click(getByTestId('close-button'));

    // Assert
    expect(handleAddToLineup).toHaveBeenCalled();
    expect(handleConvert).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();
  });
});
