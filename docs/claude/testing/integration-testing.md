## docs/claude/testing/integration-testing.md

```markdown
# Integration Testing Guidelines

Integration tests verify that multiple units of the application work together as expected. These tests are crucial for validating component interactions, data flow, and state updates.

## Integration Test Focus Areas

- Component interactions
- API service interactions
- State updates affecting UI
- Form submissions
- Firebase integration

## Component Integration Tests

### Testing Component Interactions

```javascript
// Testing lineup builder with card collection integration
test('adds card to lineup when dragged to position slot', async () => {
  // Set up mock state and services
  const mockCardData = [
    { id: '123', name: 'LeBron James', position: 'SF' },
    { id: '456', name: 'Stephen Curry', position: 'PG' }
  ];
  
  const mockLineupService = {
    addCardToLineup: jest.fn(),
    getActiveLineup: jest.fn().mockReturnValue({ 
      id: 'lineup1', 
      cards: {} 
    })
  };
  
  // Create mock context
  const mockLineupContext = {
    activeLineup: { id: 'lineup1', cards: {} },
    updateLineup: jest.fn(),
    positions: ['PG', 'SG', 'SF', 'PF', 'C']
  };
  
  // Render components with context
  render(
    <LineupContextProvider value={mockLineupContext}>
      <CardCollection cards={mockCardData} />
      <LineupBuilder />
    </LineupContextProvider>
  );
  
  // Simulate drag and drop
  const card = screen.getByTestId('card-123');
  const positionSlot = screen.getByTestId('position-slot-SF');
  
  fireEvent.dragStart(card);
  fireEvent.drop(positionSlot);
  
  // Verify the card was added to the lineup
  expect(mockLineupContext.updateLineup).toHaveBeenCalledWith(
    expect.objectContaining({
      cards: expect.objectContaining({
        SF: '123'
      })
    })
  );
});
```

## Firebase Integration Tests
### Testing Firebase Authentication
```javascript
test('signs user in and redirects to dashboard', async () => {
  // Mock Firebase auth
  const mockFirebaseSignIn = jest.fn().mockResolvedValueOnce({ 
    user: { uid: '123', email: 'test@example.com' } 
  });
  
  // Mock navigation
  const mockNavigate = jest.fn();
  
  // Render with mocks
  render(
    <AuthProvider
      firebaseAuth={{ signInWithEmailAndPassword: mockFirebaseSignIn }}
      navigate={mockNavigate}
    >
      <LoginForm />
    </AuthProvider>
  );
  
  // Fill in form
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' }
  });
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));
  
  // Verify redirect
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
```

### Testing Firestore Data Operations
```javascript
test('loads and displays user card collection', async () => {
  // Mock Firestore response
  const mockCards = [
    { id: 'card1', name: 'LeBron James', rarity: 'Legendary' },
    { id: 'card2', name: 'Stephen Curry', rarity: 'Epic' }
  ];
  
  const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      docs: mockCards.map(card => ({
        id: card.id,
        data: () => card
      }))
    })
  };
  
  // Render component with mock
  render(
    <FirestoreProvider firestore={mockFirestore}>
      <CardCollection userId="user123" />
    </FirestoreProvider>
  );
  
  // Wait for cards to load and verify display
  expect(await screen.findByText('LeBron James')).toBeInTheDocument();
  expect(await screen.findByText('Stephen Curry')).toBeInTheDocument();
  
  // Verify correct query was made
  expect(mockFirestore.collection).toHaveBeenCalledWith('cards');
  expect(mockFirestore.where).toHaveBeenCalledWith('userId', '==', 'user123');
});
```

### Form Submission Integration Tests
```javascript
test('submits lineup creation form with selected cards', async () => {
  // Mock services and state
  const mockCreateLineup = jest.fn().mockResolvedValue({ id: 'new-lineup' });
  const mockCards = [
    { id: 'card1', name: 'Player 1', position: 'PG' },
    { id: 'card2', name: 'Player 2', position: 'SG' }
  ];
  
  // Render component with mocks
  render(
    <LineupProvider>
      <CardProvider initialCards={mockCards}>
        <LineupCreationForm createLineup={mockCreateLineup} />
      </CardProvider>
    </LineupProvider>
  );
  
  // Fill form
  fireEvent.change(screen.getByLabelText(/lineup name/i), {
    target: { value: 'My Dream Team' }
  });
  
  // Select cards for positions
  fireEvent.click(screen.getByTestId('select-PG'));
  fireEvent.click(screen.getByText('Player 1'));
  
  fireEvent.click(screen.getByTestId('select-SG'));
  fireEvent.click(screen.getByText('Player 2'));
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /create lineup/i }));
  
  // Verify form submission
  await waitFor(() => {
    expect(mockCreateLineup).toHaveBeenCalledWith({
      name: 'My Dream Team',
      cards: {
        PG: 'card1',
        SG: 'card2'
      }
    });
  });
});
```

### Real-time Updates Testing
```javascript
test('updates score in real-time when new data arrives', async () => {
  // Set up initial data
  const initialPlayerStats = {
    points: 10,
    rebounds: 5,
    assists: 3
  };
  
  const updatedPlayerStats = {
    points: 12,
    rebounds: 6,
    assists: 3
  };
  
  // Mock Firebase realtime listener
  let listener;
  const mockDatabase = {
    ref: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation((event, callback) => {
      listener = callback;
      // Immediately call with initial data
      callback({
        val: () => initialPlayerStats
      });
    })
  };
  
  // Render with mock
  render(
    <RealtimeProvider database={mockDatabase}>
      <PlayerScoreCard playerId="player123" />
    </RealtimeProvider>
  );
  
  // Verify initial render
  expect(screen.getByText('10')).toBeInTheDocument(); // Points display
  expect(screen.getByText('5')).toBeInTheDocument();  // Rebounds display
  
  // Simulate real-time update
  act(() => {
    listener({
      val: () => updatedPlayerStats
    });
  });
  
  // Verify UI updates
  expect(screen.getByText('12')).toBeInTheDocument(); // Updated points
  expect(screen.getByText('6')).toBeInTheDocument();  // Updated rebounds
});
```

### Offline Testing
```javascript
test('handles offline state gracefully', async () => {
  // Mock online status
  const mockOnlineStatus = { isOnline: true };
  
  // Render with mock
  render(
    <OnlineStatusProvider value={mockOnlineStatus}>
      <GameDashboard />
    </OnlineStatusProvider>
  );
  
  // Verify online UI
  expect(screen.getByText('Live Updates')).toBeInTheDocument();
  
  // Simulate going offline
  act(() => {
    mockOnlineStatus.isOnline = false;
    // Trigger online status event
    window.dispatchEvent(new Event('offline'));
  });
  
  // Verify offline UI appears
  expect(await screen.findByText('Offline Mode')).toBeInTheDocument();
  expect(screen.getByText('Reconnecting...')).toBeInTheDocument();
});
```