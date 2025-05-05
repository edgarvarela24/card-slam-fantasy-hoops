# Card Slam Fantasy Hoops

<!-- START CLAUDE REFERENCE -->
<!-- This section contains important information for Claude to reference when helping with this project -->

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Firebase Implementation](#firebase-implementation)
5. [Project Roadmap](#project-roadmap)
6. [Architecture](#architecture)
7. [Testing Strategy](#testing-strategy)
8. [UI Design System](#ui-design-system)
9. [Contribution Guidelines](#contribution-guidelines)
10. [Troubleshooting](#troubleshooting)

## Project Overview
Card Slam Fantasy Hoops is a modern, addictive fantasy basketball game with collectible player cards and real-time updates.

### Key Features
- Collectible NBA player cards with different rarities
- Real-time stats updates during live games
- Pack opening experience
- Card crafting and trading system
- Custom lineup creation
- Leaderboards and player rankings

## Getting Started

### Prerequisites
- Node.js (v16+)
- Yarn package manager
- Firebase account

### Installation
1. Clone the repository
2. Run `yarn install` to install dependencies
3. Set up your Firebase configuration (see [Firebase Setup Guide](docs/FIREBASE_SETUP_GUIDE.md))
4. Run `yarn dev` to start development server

### Environment Configuration
The project requires the following environment variables in a `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

## Development Workflow

### Development Philosophy
- **Test-Driven Development (TDD)**: Write tests first, then implement features
- **Clean Code**: Minimal, readable code with limited comments
- **SOLID, DRY, KISS**: Follow established software principles
- **Functional React**: Prefer functional components with hooks
- **Type Safety**: Use TypeScript throughout the codebase

### TDD Workflow
1. Write failing tests first for new functionality
2. Implement the minimal code necessary to make tests pass
3. Refactor while keeping tests green
4. Mark checklist items as complete once tests pass
5. Run the full test suite periodically to check for regressions
6. Keep commits small and focused on specific features

### Code Review Guidelines
- All code must have corresponding tests
- Maintain TypeScript type safety (no `any` types)
- Follow established patterns in the codebase
- Address all ESLint warnings and errors
- Ensure accessibility standards are met

### Important Reminders
- ✅ Check off completed items in this file after implementation
- 🧪 Run all tests before moving to a new task to detect regressions
- 📝 Update todo list regularly to maintain accurate project status

### Common Commands

#### Development Commands
```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

#### Testing Commands
```bash
# Run all tests
yarn test

# Run specific test file
yarn test path/to/file.test.ts

# Run tests in watch mode
yarn test --watch
```

#### Code Quality Commands
```bash
# Lint code
yarn lint

# Format code
yarn format
```

## Firebase Implementation
<!-- SECTION: FIREBASE -->

### Firebase Core Services

The app uses the following Firebase services:

1. **Authentication** - For user account management and sign-in
2. **Firestore** - For structured data storage (player cards, lineups, etc.)
3. **Realtime Database** - For real-time updates and live data
4. **Cloud Functions** - For server-side operations and background tasks

### Firebase File Structure

```
src/firebase/
├── auth.ts             # Authentication methods (signIn, signUp, etc.)
├── database.ts         # Realtime Database operations
├── firebase.ts         # Firebase initialization
├── firestore.ts        # Firestore database operations
├── config.ts           # Firebase configuration (loads from .env)
├── index.ts            # Exports all Firebase modules
├── AuthContext.tsx     # React context for auth state
└── functions/          # Cloud Functions client interfaces
    ├── functions.ts    # Client-side function calling utilities
    └── index.ts        # Example function implementations
```

### Testing Firebase Services

All Firebase services are tested through:

1. **Firebase Status Component** - Visual indication of Firebase connection
2. **Validate Firebase Script** - Command-line validation of Firebase configuration
3. **Test Firebase Script** - End-to-end testing of all Firebase services
4. **Unit Tests** - Tests for each Firebase service implementation

### Firebase Commands
```bash
# Setup Firebase configuration interactively
yarn setup:firebase

# Validate Firebase configuration
yarn validate:firebase

# Test Firebase connectivity
yarn test:firebase
```

### Firebase Development Guidelines

When working on Firebase features:

1. Ensure `.env` file has the correct Firebase configuration
2. Run `yarn validate:firebase` to verify config is correct
3. Use abstraction layers in `src/firebase/` instead of directly using Firebase
4. Test both online and offline scenarios when applicable
5. Follow security best practices for Firestore rules
6. Minimize database reads/writes for optimal performance

## Project Roadmap
<!-- SECTION: ROADMAP -->

### Phase 1: Project Setup & Infrastructure ✅
- [x] Initialize React project with TypeScript
- [x] Set up Jest/React Testing Library
- [x] Configure ESLint and Prettier
- [x] Set up Firebase project
- [x] Configure Firebase authentication
- [x] Set up Firestore/Realtime Database
- [x] Create Firebase Cloud Functions scaffold
- [x] Configure continuous integration

### Phase 2: Core Data Models & API Integration
- [ ] Define card data models and interfaces
- [ ] Create NBA API integration service
- [ ] Write tests for data fetching and transformation
- [ ] Implement player stats service
- [ ] Create card generation algorithms
- [ ] Develop pack generation logic
- [ ] Build database schema for user collections

### Phase 3: User Authentication & Profile
- [ ] Implement user authentication tests
- [ ] Create authentication components
- [ ] Build user profile data model
- [ ] Implement user settings
- [ ] Create collection management service
- [ ] Add tests for collection operations

### Phase 4: Card System Implementation
- [ ] Design card visual components
- [ ] Implement base card component
- [ ] Create card variant system
- [ ] Develop special abilities framework
- [ ] Build card rarity distribution system
- [ ] Implement "dust/crafting" system
- [ ] Add comprehensive tests for card mechanics

### Phase 5: Pack Opening Experience
- [ ] Design pack opening animation
- [ ] Implement pack purchase system
- [ ] Create pack opening ceremony
- [ ] Add sound effects and visual feedback
- [ ] Test pack opening mechanics
- [ ] Implement card collection updates

### Phase 6: Lineup & Scoring System
- [ ] Define lineup data models
- [ ] Implement lineup creation interface
- [ ] Create position validation logic
- [ ] Build scoring calculation engine
- [ ] Implement real-time score updates
- [ ] Add tests for scoring accuracy
- [ ] Create leaderboard system

### Phase 7: UI/UX Refinement
- [ ] Implement responsive design
- [ ] Add micro-animations for interactions
- [ ] Create dark/light themes
- [ ] Optimize for mobile experience
- [ ] Implement accessibility features
- [ ] Add comprehensive UI tests

### Phase 8: Deployment & Optimization
- [ ] Set up Firebase hosting
- [ ] Configure proper security rules
- [ ] Implement analytics
- [ ] Optimize bundle size
- [ ] Configure CDN and caching
- [ ] Create deployment pipeline

## Architecture
<!-- SECTION: ARCHITECTURE -->

### Frontend Architecture

The project follows a modular architecture with clear separation of concerns:

1. **Components Layer**: Reusable UI components
   - Presentational components (cards, buttons, forms)
   - Container components (manage state and data flow)

2. **Services Layer**: Business logic and API interactions
   - Firebase service adapters
   - Third-party API integrations
   - Data transformation utilities

3. **Context Layer**: Global state management
   - Authentication context
   - User data context
   - Collection/Game state context

4. **Types Layer**: TypeScript interfaces and type definitions
   - Shared data models
   - API response types
   - Component prop types

### Data Flow

The application follows a unidirectional data flow:
1. User actions trigger events
2. Events are handled by context or local state
3. Services perform necessary data operations
4. State updates trigger re-renders
5. UI reflects the new state

## Testing Strategy
<!-- SECTION: TESTING -->

We employ a comprehensive testing approach:

- **Unit Tests**: For individual functions, hooks, and utilities
  - Focus on pure functions and business logic
  - High test coverage for core functionality

- **Component Tests**: For UI elements using React Testing Library
  - Test rendering, user interactions, and state changes
  - Verify accessibility compliance

- **Integration Tests**: For feature workflows
  - Test how components work together
  - Verify data flow through the application

- **E2E Tests**: For critical user journeys
  - Test complete user flows from end to end
  - Verify application works as a whole

- **Performance Tests**: For real-time updates
  - Test responsiveness under load
  - Verify real-time data synchronization

### Test Coverage Targets
- Core utilities: 95%+
- Components: 85%+
- Integration: 70%+
- Overall coverage: 80%+

## UI Design System
<!-- SECTION: UI_DESIGN -->

### Brand Identity & Design Philosophy
- **Aesthetic**: Urban court meets digital collectibles
- **Feel**: Premium yet accessible, exciting but clean
- **Principles**: Bold typography, dynamic animations, focused information hierarchy
- **Personality**: Contemporary, energetic, slightly irreverent

### Color System

#### Primary Colors
- **Court Maple** `#FF5B2B` - Primary brand color, used for CTAs and key highlights
- **Midnight Court** `#1A2151` - Primary background for dark areas and headers
- **Baseline White** `#F8F9FC` - Primary text on dark backgrounds and light mode background

#### Secondary Colors
- **Buzzer Gold** `#FFC845` - Used for premium/legendary elements and special highlights
- **Victory Green** `#36CE94` - Success states, positive trends, and selected elements
- **Hardwood Tan** `#E6D2B7` - Subtle background texture and secondary surfaces

#### Accent Colors
- **Buzzer Red** `#FF3A5E` - Error states and hot streaks
- **Stats Blue** `#4A9DFF` - Data visualization and secondary CTAs
- **Bench Gray** `#8C93A8` - Inactive states and tertiary information

#### Card Rarity Colors
- **Common** `#C0C6DD` - Gray/silver border with subtle gradient
- **Uncommon** `#52D49A` - Green border with light glow
- **Rare** `#4A9DFF` - Blue border with pulsing glow
- **Epic** `#BA6CFF` - Purple border with animated shimmer
- **Legendary** `#FFC845` - Gold border with dynamic particle effects

### Typography

#### Font Families
- **Primary Font**: "Inter" - Clean, modern sans-serif for all UI elements
- **Display Font**: "Chakra Petch" - Bold, technical-looking font for headers and card names
- **Accent Font**: "Bebas Neue" - For score numbers and stats

#### Type Scale
- **Display 1**: 48px/56px - Pack opening results, main headers
- **Display 2**: 36px/44px - Section headers, player names on cards
- **Heading 1**: 28px/36px - Card details, primary information
- **Heading 2**: 22px/30px - Section subheaders
- **Body 1**: 18px/28px - Primary content, stats, descriptions
- **Body 2**: 16px/24px - Secondary content, UI elements
- **Caption**: 14px/20px - Tertiary information, footnotes
- **Small**: 12px/16px - Legal, very minor information

### Component Library

#### Card Components
- **BaseCard**: Foundation for all card types
  - Props: player, rarity, special abilities
  - Variants: standard, premium, animated
- **CardGrid**: Display multiple cards in collection view
- **CardDetail**: Expanded view of individual card
- **PackDisplay**: Visualize unopened card packs

#### UI Components
- **Button**: Primary, Secondary, Tertiary variants
- **Form Elements**: Text fields, dropdowns, toggles
- **Containers**: Panels, cards, modals
- **Navigation**: Tabs, sidebar, bottom navigation
- **Data Display**: Tables, charts, stat displays

#### Animation System
- **Micro-interactions**: Hover, press, focus states
- **Transitions**: Page transitions, content loading
- **Special Effects**: Pack opening, card flip, rarity indicators

### Responsive Design System
- **Breakpoints**: Mobile, tablet, desktop, large desktop
- **Layout Adaptations**: Stack on mobile, side-by-side on larger screens
- **Touch Targets**: Minimum 44px × 44px for all interactive elements
- **Device Optimizations**: Special considerations for different devices

### Accessibility Standards
- **Color Contrast**: WCAG AA compliance (4.5:1 minimum)
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Options for users with motion sensitivity

## Contribution Guidelines
<!-- SECTION: CONTRIBUTION -->

### Commit Message Format
- Use present tense ("Add feature" not "Added feature")
- First line is a summary (max 50 chars)
- Optionally provide a more detailed explanation
- Reference issues and pull requests

### Branch Naming Convention
- Feature branches: `feature/short-description`
- Bug fixes: `fix/issue-description`
- Refactoring: `refactor/component-name`

### Pull Request Process
1. Update documentation reflecting changes
2. Add tests for new functionality
3. Ensure all tests pass
4. Request review from at least one team member
5. Squash commits before merging

## Troubleshooting
<!-- SECTION: TROUBLESHOOTING -->

### Common Issues

#### Firebase Configuration Issues
- Verify environment variables are correctly set
- Run `yarn validate:firebase` to check configuration
- Check Firebase console for service availability

#### Test Failures
- Run tests with `--verbose` flag for more details
- Check for outdated snapshots with `--updateSnapshot`
- Verify mocks are correctly configured

#### Build Problems
- Clear node_modules and reinstall dependencies
- Check for TypeScript errors with `tsc --noEmit`
- Verify import paths are correct

### Getting Help
- Check existing documentation first
- Search for similar issues in the repository
- Ask specific questions with reproducible examples

<!-- END CLAUDE REFERENCE -->

<!-- The remainder of this document contains the detailed design system specifications -->

## Detailed Design System

### Card Design System

#### Card Dimensions
- **Standard Aspect Ratio**: 2.5:3.5 (traditional card dimensions)
- **Digital Display Size**: 250px × 350px (base size, scales responsively)

#### Card Anatomy
- **Frame**: Color-coded by rarity, 8px width
- **Header Bar**: Contains player name and position, 44px height
- **Player Visualization**: Abstract geometric representation using team colors
- **Stats Container**: Bottom 30% of card with key attributes
- **Special Ability**: Displayed as icon + text in a badge at bottom right
- **Team Indicator**: Team logo and colors integrated into design

#### Card States
- **Base**: Clean presentation in collection view
- **Hover**: Subtle raise (8px shadow) and 3D tilt effect (10° max)
- **Selected**: Glowing border (rarity color) with 16px elevation
- **Active**: Pulsing animation on rarity elements
- **Locked/Unavailable**: Grayscale with overlay pattern

### Layout System

#### Grid System
- 12-column grid for desktop
- 6-column grid for tablet
- 4-column grid for mobile
- 24px baseline grid for vertical rhythm
- 20px standard gutter

#### Key Spaces
- **Container Padding**: 24px standard, 16px on mobile
- **Card Grid Gap**: 20px standard, 12px on mobile
- **Section Spacing**: 48px between major sections
- **Component Spacing**: 16px between related elements

#### Layout Patterns
- **Card Collection**: Masonry grid with filter sidebar
- **Lineup Builder**: Horizontal scrolling positions with drag-drop
- **Pack Opening**: Centered card reveal with full-screen effects
- **Leaderboard**: Split screen with rankings and user stats
- **Store**: Card grid with featured items carousel

### Animation Guidelines

#### Principles
- Animations should feel snappy (300ms is standard duration)
- Use easing: entrance = ease-out, exit = ease-in
- Motion should guide attention, not distract

#### Pack Opening Ceremony
- 3-stage reveal with escalating excitement
- Rarity-based particle effects and sound design
- Card flip animation with 3D perspective
- Duration scale: Common (fast) to Legendary (extended)

#### Micro-Interactions
- Button press: 50ms scale down to 95%, 100ms return
- Card hover: 150ms elevation rise, 200ms rotation effect
- Stat change: 400ms transition with number counter
- Leaderboard position change: 800ms animated reordering

#### Loading States
- Branded basketball-themed loading spinner
- Card skeleton screens with pulsing gradient
- Progress indicators for pack purchases and openings

### Detailed Components

#### Buttons
- **Primary**: Pill shape, Court Maple background, 16px padding, 8px radius
- **Secondary**: Outlined style, 2px border, same dimensions
- **Tertiary**: Text only with subtle hover effect
- **Icon Buttons**: 44px × 44px (minimum touch target)

#### Forms
- **Text Fields**: 8px radius, 16px padding, subtle inner shadow
- **Dropdowns**: Custom styled with team-colored options
- **Toggles**: Basketball-themed sliding toggle (ball moves on track)
- **Checkboxes**: Custom square with checkmark in brand colors

#### Cards & Containers
- **Content Cards**: 16px radius, subtle shadow, white background
- **Info Panels**: 8px radius, 24px padding, themed background
- **Modal Windows**: Central dialog with dark overlay, 24px radius
- **Tooltips**: 4px radius, 8px padding, arrow pointer

#### Data Visualization
- **Stat Bars**: Horizontal bars with team color gradients
- **Performance Charts**: Line graphs with stroke highlight
- **Comparison Radars**: Hexagonal stat comparison charts
- **Leaderboard Tables**: Alternating row backgrounds, highlight on hover

### Iconography System

#### Style Guide
- Line weight: 2px standard
- Corner radius: 2px rounded corners
- Size: Base 24px × 24px (scales to 16px, 32px, 48px)
- Style: Outlined with occasional solid elements for emphasis

#### Custom Basketball Icons
- **Positions**: PG, SG, SF, PF, C icons with player silhouettes
- **Stats**: Custom icons for points, rebounds, assists, etc.
- **Abilities**: Visual representation of special abilities
- **Pack Types**: Distinctive icons for different pack qualities

### Implementation Notes
- Use CSS custom properties for all colors and spacing
- Implement themes using CSS variables with dark/light mode
- Build components using React with styled-components or Tailwind
- Create a storybook to document all UI components