import { describe, test, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardDetail } from '../CardDetail';
import { Card as CardType } from '../../../types/card';

// Sample card data for tests
const mockCard: CardType = {
  id: 'card-123',
  playerId: 'player-123',
  name: 'Michael Jordan',
  team: 'Chicago Bulls',
  position: 'SG',
  rarity: 'Legendary',
  stats: {
    points: 30.1,
    rebounds: 6.2,
    assists: 5.3,
    steals: 2.3,
    blocks: 0.8,
    threePointersMade: 1.7,
    fieldGoalPercentage: 0.497,
    freeThrowPercentage: 0.835,
  },
  acquiredAt: Date.now(),
  specialAbility: {
    id: 'clutch-performer',
    name: 'Clutch Performer',
    description: 'Increases all stats in the fourth quarter',
    modifier: {
      stat: 'all',
      operation: 'multiply',
      value: 1.2,
    },
  },
};

describe('CardDetail Component', () => {
  test('renders the card with player name and position', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.getByText('Michael Jordan')).toBeInTheDocument();
    expect(screen.getByText('SG')).toBeInTheDocument();
  });

  test('displays all player statistics correctly', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.getByText('30.1')).toBeInTheDocument(); // Points
    expect(screen.getByText('6.2')).toBeInTheDocument(); // Rebounds
    expect(screen.getByText('5.3')).toBeInTheDocument(); // Assists
    expect(screen.getByText('2.3')).toBeInTheDocument(); // Steals
    expect(screen.getByText('0.8')).toBeInTheDocument(); // Blocks
    expect(screen.getByText('1.7')).toBeInTheDocument(); // 3PM
    expect(screen.getByText('49.7%')).toBeInTheDocument(); // FG%
    expect(screen.getByText('83.5%')).toBeInTheDocument(); // FT%
  });

  test('displays the team name on the card', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.getByText('Chicago Bulls')).toBeInTheDocument();
  });

  test('displays special ability when present', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.getByText('Clutch Performer')).toBeInTheDocument();
    expect(screen.getByText('Increases all stats in the fourth quarter')).toBeInTheDocument();
  });

  test('does not display special ability section when ability is not present', () => {
    const cardWithoutAbility = { ...mockCard, specialAbility: undefined };
    render(<CardDetail card={cardWithoutAbility} />);

    expect(screen.queryByTestId('special-ability-container')).toBeNull();
  });

  test('displays player initials when no image is provided', () => {
    render(<CardDetail card={mockCard} />);

    // Michael Jordan → MJ
    expect(screen.getByText('MJ')).toBeInTheDocument();
  });

  test('displays image when imageUrl is provided', () => {
    const cardWithImage = {
      ...mockCard,
      imageUrl: 'https://example.com/image.jpg',
    };

    render(<CardDetail card={cardWithImage} />);

    const imgElement = screen.getByAltText('Michael Jordan');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders the Add to Lineup button when callback is provided', () => {
    const handleAddToLineup = jest.fn();
    render(<CardDetail card={mockCard} onAddToLineup={handleAddToLineup} />);

    const addButton = screen.getByTestId('add-to-lineup-button');
    expect(addButton).toBeInTheDocument();
  });

  test('renders the Convert to BP button when callback is provided', () => {
    const handleConvert = jest.fn();
    render(<CardDetail card={mockCard} onConvert={handleConvert} />);

    const convertButton = screen.getByTestId('convert-to-bp-button');
    expect(convertButton).toBeInTheDocument();
  });

  test('renders the close button when callback is provided', () => {
    const handleClose = jest.fn();
    render(<CardDetail card={mockCard} onClose={handleClose} />);

    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
  });

  test('does not render action buttons when callbacks are not provided', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.queryByTestId('add-to-lineup-button')).toBeNull();
    expect(screen.queryByTestId('convert-to-bp-button')).toBeNull();
  });

  test('displays the correct rarity badge', () => {
    render(<CardDetail card={mockCard} />);

    expect(screen.getByText('Legendary')).toBeInTheDocument();
  });
});
