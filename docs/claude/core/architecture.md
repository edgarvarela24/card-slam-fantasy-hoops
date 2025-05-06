# System Architecture

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **State Management**: React Context API with hooks
- **Styling**: Styled Components or Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **Animation Libraries**:
  - **Framer Motion**: Primary animation library for card interactions
  - **React Spring**: Physics-based animations for pack opening
  - **GSAP**: Complex animation sequences for special events

### Backend
- **Platform**: Firebase
- **Authentication**: Firebase Authentication
- **Database**: Firebase Realtime Database
- **Cloud Functions**: Firebase Cloud Functions (Node.js)
- **Hosting**: Firebase Hosting
- **Storage**: Firebase Storage (for asset management)

### Third-Party Integrations
- **NBA Data**: Ball Don't Lie API or RapidAPI NBA API
- **Analytics**: Firebase Analytics
- **Monitoring**: Firebase Performance Monitoring
- **WebSockets**: Socket.io for ultra-low-latency updates (if needed)

## Folder Structure
src/
├── assets/           # Static assets
├── components/       # React components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── services/         # API and third-party service integrations
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── constants.ts      # Application constants
└── index.tsx         # Application entry point
firebase/
├── functions/        # Firebase Cloud Functions
└── firestore/        # Firestore rules and indexes
tests/
├── e2e/              # End-to-end tests
└── mocks/            # Mock data for tests

## Code Style Guide

### Components
- One component per file
- Use functional components with hooks
- Props interface should start with component name (e.g., `CardProps`)
- Export components as named exports
- Keep components focused on a single responsibility

### TypeScript
- Use explicit return types for functions
- Use interfaces for object shapes
- Use type aliases for unions and complex types
- Prefer readonly for immutable properties
- Use enums for fixed sets of values

### Naming Conventions
- Components: PascalCase (e.g., `CardCollection`)
- Files: PascalCase for components, camelCase for others
- Functions: camelCase (e.g., `calculateScore`)
- Variables: camelCase (e.g., `playerScore`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_LINEUP_SIZE`)
- Interfaces: PascalCase (e.g., `PlayerStats`)
- Types: PascalCase (e.g., `PositionType`)

## Data Flow
The application follows a unidirectional data flow:
1. User actions trigger events
2. Events are handled by context or local state
3. Services perform necessary data operations
4. State updates trigger re-renders
5. UI reflects the new state

## Performance Considerations
- Implement pagination for leaderboards and card collections
- Use Firebase query limits to prevent excessive data loading
- Implement client-side caching for static data
- Optimize real-time updates to minimize database operations
- Animation Performance:
  - Use `translate3d()` for hardware acceleration
  - Avoid animating expensive CSS properties (box-shadow, filter)
  - Implement debouncing/throttling for rapid fire updates
  - Use rendering layers strategically with `will-change`
