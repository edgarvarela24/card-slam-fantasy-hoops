# Card Slam Fantasy Hoops

## Project Overview
A modern, addictive fantasy basketball game with collectible player cards and real-time updates.

## Development Philosophy
- Test-Driven Development (TDD): Write tests first, then implement features
- Clean, minimal code with limited comments
- Follow SOLID, DRY, and KISS principles
- Prefer functional components with hooks
- Use TypeScript for type safety

## TDD Workflow
1. Write failing tests first for new functionality
2. Implement the minimal code necessary to make tests pass
3. Refactor while keeping tests green
4. Mark checklist items as complete once tests pass
5. Run the full test suite periodically to check for regressions
6. Keep commits small and focused on specific features

## Important Reminders
- ✅ Check off completed items in this file after implementation
- 🧪 Run all tests before moving to a new task to detect regressions
- 📝 Update todo list regularly to maintain accurate project status

## Common Commands

### Development Commands
```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Testing Commands
```bash
# Run all tests
yarn test

# Run specific test file
yarn test path/to/file.test.ts

# Run tests in watch mode
yarn test --watch
```

### Code Quality Commands
```bash
# Lint code
yarn lint

# Format code
yarn format
```

### Firebase Commands
```bash
# Setup Firebase configuration interactively
yarn setup:firebase

# Validate Firebase configuration
yarn validate:firebase

# Test Firebase connectivity
yarn test:firebase
```

## Firebase Services Implementation

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

### For Development

When working on Firebase features:

1. Ensure `.env` file has the correct Firebase configuration
2. Run `yarn validate:firebase` to verify config is correct
3. Use abstraction layers in `src/firebase/` instead of directly using Firebase
4. Test both online and offline scenarios when applicable

## Project Checklist

### Phase 1: Project Setup & Infrastructure
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

## Testing Strategy
- Unit tests for all utility functions and services
- Component tests for UI elements
- Integration tests for feature workflows
- E2E tests for critical user journeys
- Performance tests for real-time updates


## UI Design System

### Brand Identity & Design Philosophy
- **Aesthetic**: Urban court meets digital collectibles
- **Feel**: Premium yet accessible, exciting but clean
- **Principles**: Bold typography, dynamic animations, focused information hierarchy
- **Personality**: Contemporary, energetic, slightly irreverent

### Color Palette

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

#### Typographic Rules
- Maintain clear hierarchy with no more than 3 levels per screen
- Use weight (Bold, Medium, Regular) to create contrast rather than too many sizes
- Never use below 12px font size for readability
- Limit line length to maximum 70 characters

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

### Components Library

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

### Responsive Design Guidelines

#### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

#### Adaptation Principles
- **Mobile First**: Design core experience for mobile, then enhance
- **Card Sizing**: Relative sizing (vw-based) with min/max constraints
- **Critical Path**: Ensure core actions require minimum steps on mobile
- **Touch Targets**: Minimum 44px × 44px for all interactive elements

#### Device-Specific Enhancements
- **Mobile**: Focus on vertical scrolling, swipe interactions
- **Tablet**: Two-panel layouts, split functionality
- **Desktop**: Extended information display, keyboard shortcuts
- **Large Displays**: Immersive visuals, expanded stats and content

### Accessibility Guidelines

#### Color & Contrast
- Maintain minimum 4.5:1 contrast ratio for all text
- Don't rely solely on color to convey information
- Provide high contrast mode option

#### Interactive Elements
- Ensure keyboard navigability for all functions
- Implement proper focus states (2px Court Maple outline)
- Support screen readers with proper ARIA attributes

#### Additional Considerations
- Provide alternative text for all images and icons
- Allow user control of animation speed/disable
- Support text scaling up to 200% without breaking layouts

### Loading & Empty States

#### Loading Screens
- Branded basketball spinner (animated basketball with trailing dots)
- Progress indicators for multi-step processes
- Skeleton screens matching layout of expected content

#### Empty States
- Illustrated basketball-themed graphics
- Clear messaging explaining the empty state
- Actionable button to resolve the empty state

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