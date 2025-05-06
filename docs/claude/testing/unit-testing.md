# Unit Testing Guidelines

## Unit Test Structure

Each unit test should follow the AAA pattern:
1. **Arrange**: Set up test data and preconditions
2. **Act**: Call the method/function being tested
3. **Assert**: Verify the expected outcome

## TypeScript and Testing

While we use TypeScript in our codebase for type safety, we recognize that tests often require flexibility when mocking dependencies. When TypeScript becomes overly restrictive in test files and hinders testing clarity, use the following strategies:

1. **Use `@ts-nocheck` for test files**: When mocking complex external dependencies like Firebase, it's acceptable to use `@ts-nocheck` at the top of test files to avoid fighting with the type system.

```typescript
// @ts-nocheck
import { describe, test, expect } from '@jest/globals';
// Test code here...
```

2. **Type Assertions**: Use `as unknown as Type` when needed for mocks that TypeScript has difficulty typing.

```typescript
const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User;
```

3. **Type Flexibility**: Test files don't need to be as type-strict as production code. Focus on testing functionality rather than perfect TypeScript compliance.

## Component Tests

### Testing React Components

```javascript
// Component test example
test('renders card with correct player name', () => {
  // Arrange
  const card = {
    id: '123',
    playerId: 'abc',
    name: 'LeBron James',
    team: 'LAL',
    position: 'SF',
    rarity: 'Legendary',
  };
  
  // Act
  render(<Card card={card} />);
  
  // Assert
  expect(screen.getByText('LeBron James')).toBeInTheDocument();
  expect(screen.getByTestId('rarity-indicator')).toHaveClass('legendary');
});
```

### Testing User Interactions
```javascript
test('card flips when clicked', () => {
  // Arrange
  const card = { id: '123', name: 'Test Player' };
  render(<Card card={card} />);
  
  // Act - simulate user clicking the card
  fireEvent.click(screen.getByTestId('card-container'));
  
  // Assert - check the card flipped state
  expect(screen.getByTestId('card-container')).toHaveClass('flipped');
});
```

## Service/Utility Tests
### Testing Pure Functions
```javascript
test('calculates correct score for player performance', () => {
  // Arrange
  const playerStats = {
    points: 30,
    rebounds: 10,
    assists: 8,
    steals: 2,
    blocks: 1,
    threePointersMade: 4
  };
  
  // Act
  const score = calculatePlayerScore(playerStats);
  
  // Assert
  const expectedScore = 
    (30 * 1) +    // Points
    (10 * 1.2) +  // Rebounds
    (8 * 1.5) +   // Assists
    (2 * 2) +     // Steals
    (1 * 2) +     // Blocks
    (4 * 0.5) +   // Three-pointers
    2;            // Double-double bonus
    
  expect(score).toBe(expectedScore);
});
```

### Testing Async Code
```javascript
test('fetches player data from API', async () => {
  // Arrange
  const mockPlayerData = { id: '123', name: 'LeBron James' };
  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlayerData),
    ok: true
  });
  global.fetch = mockFetch;
  
  // Act
  const playerService = new PlayerService();
  const player = await playerService.getPlayerById('123');
  
  // Assert
  expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/players/123'));
  expect(player).toEqual(mockPlayerData);
});
```

## Mocking Strategy
### Creating Mock Services
```javascript
// Mock Firebase service factory
const createMockFirebaseService = () => ({
  getDocument: jest.fn().mockResolvedValue({ /* mock data */ }),
  updateDocument: jest.fn().mockResolvedValue(true),
  onDocumentChange: jest.fn(),
});

// Using the mock in tests
test('CardService fetches card details', async () => {
  // Arrange
  const mockFirebase = createMockFirebaseService();
  const cardService = new CardService(mockFirebase);
  
  // Act
  await cardService.getCardById('123');
  
  // Assert
  expect(mockFirebase.getDocument).toHaveBeenCalledWith('cards/123');
});
```

### Mocking React Context
```javascript
// Mock AuthContext for testing components that use auth
const mockAuthContext = {
  currentUser: { id: '123', name: 'Test User' },
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
};

test('shows user content when authenticated', () => {
  // Arrange
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <UserProfile />
    </AuthContext.Provider>
  );
  
  // Assert
  expect(screen.getByText('Test User')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
```

### Edge Case Testing
Always include tests for these scenarios:

Empty data or null values
Boundary conditions
Error states and error handling
Loading states
Permission/access control checks

Example:
```javascript
test('handles empty player stats gracefully', () => {
  // Test with empty stats object
  const score = calculatePlayerScore({});
  expect(score).toBe(0); // Should return 0, not NaN or error
});

test('shows error state when API fails', async () => {
  // Mock API failure
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
  
  // Render component that fetches data
  render(<PlayerStats playerId="123" />);
  
  // Should show error message after failed load
  expect(await screen.findByText(/error loading/i)).toBeInTheDocument();
});
```