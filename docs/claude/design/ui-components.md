# UI Components

## Component Library Overview

The Card Slam Fantasy Hoops UI component library is organized to support the application's core features while maintaining design consistency. Each component follows the "Dynamic Minimalism" design philosophy with appropriate animations and visual treatments.

## Card Components

### Base Card

The foundational card component that displays player information with team colors and rarity indicators.

```typescript
// src/components/Card/Card.tsx
import React from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types/card';
import { getRarityColor, getTeamColors } from '../../utils/cardUtils';

interface CardProps {
  card: CardType;
  onClick?: (card: CardType) => void;
  isSelected?: boolean;
}
```

// Component implementation (see card-system.md)
### Card Collection
## Grid display of multiple cards with filtering and sorting capabilities.
```typescript
// src/components/Card/CardCollection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { Card as CardType } from '../../types/card';
import { FilterBar } from '../FilterBar';

interface CardCollectionProps {
  cards: CardType[];
  onCardSelect?: (card: CardType) => void;
  selectedCardId?: string;
}

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #8C93A8;
`;

export const CardCollection: React.FC<CardCollectionProps> = ({
  cards,
  onCardSelect,
  selectedCardId
}) => {
  const [filters, setFilters] = useState({
    position: '',
    rarity: '',
    team: ''
  });
  
  const [sortBy, setSortBy] = useState('name');
  
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
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity':
        return a.rarity.localeCompare(b.rarity);
      case 'points':
        return b.stats.points - a.stats.points;
      default:
        return 0;
    }
  });
  
  return (
    <div>
      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
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
          <h3>No cards match your filters</h3>
          <p>Try adjusting your filters to see more cards</p>
        </EmptyState>
      )}
    </div>
  );
};
```
### Card Detail
## Expanded view of a single card with complete information and actions.
```typescript
// src/components/Card/CardDetail.tsx
import React from 'react';
import styled from 'styled-components';
import { Card as CardType } from '../../types/card';
import { Button } from '../Button';
import { StatBar } from '../StatBar';
import { getRarityColor, getTeamColors } from '../../utils/cardUtils';

interface CardDetailProps {
  card: CardType;
  onAddToLineup?: (card: CardType) => void;
  onConvert?: (card: CardType) => void;
}
```

// Implementation with detailed stats and actions
### Lineup Components
## Lineup Builder
# Interface for creating and managing player lineups with position validation.
```typescript
// src/components/Lineup/LineupBuilder.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { PositionSlot } from './PositionSlot';
import { Lineup } from '../../types/lineup';
import { Card as CardType } from '../../types/card';
import { useCards } from '../../hooks/useCards';

interface LineupBuilderProps {
  lineup: Lineup;
  onLineupChange: (lineup: Lineup) => void;
}
```

// Implementation with drag-and-drop position assignment
### Position Slot
## Component representing a lineup position that can accept a player card.
```typescript
// src/components/Lineup/PositionSlot.tsx
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from '../Card/Card';
import { Position } from '../../types/card';

interface PositionSlotProps {
  position: Position;
  cardId?: string;
  isActive: boolean;
}
```

// Implementation for position slot with drop zone
### Button Components
## Primary Button
# Main call-to-action button with prominent styling.
```typescript
// src/components/Button/Button.tsx
import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonBase = css<{
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  isFullWidth: boolean;
  isDisabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  /* Size variants */
  padding: ${({ size }) => 
    size === 'small' ? '8px 16px' : 
    size === 'medium' ? '12px 24px' : 
    '16px 32px'};
  font-size: ${({ size }) => 
    size === 'small' ? '14px' : 
    size === 'medium' ? '16px' : 
    '18px'};
  
  /* Full width */
  width: ${({ isFullWidth }) => isFullWidth ? '100%' : 'auto'};
  
  /* Disabled state */
  opacity: ${({ isDisabled }) => isDisabled ? 0.5 : 1};
  pointer-events: ${({ isDisabled }) => isDisabled ? 'none' : 'auto'};
  
  /* Variants */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: #FF5D23;
          color: white;
          
          &:hover {
            background: #E64A10;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(255, 93, 35, 0.3);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(255, 93, 35, 0.3);
          }
        `;
      case 'secondary':
        return css`
          background: transparent;
          color: #0F1923;
          border: 2px solid #0F1923;
          
          &:hover {
            background: rgba(15, 25, 35, 0.05);
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'tertiary':
        return css`
          background: transparent;
          color: #0F1923;
          padding-left: 0;
          padding-right: 0;
          
          &:hover {
            color: #FF5D23;
            text-decoration: underline;
          }
        `;
      default:
        return '';
    }
  }}
`;

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'medium' | 'large';
  isFullWidth: boolean;
  isDisabled: boolean;
}>`
  ${ButtonBase}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  isFullWidth = false,
  isDisabled = false,
  type = 'button'
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};
```

## Icon Button
# Circular button with icon for utility actions.
```typescript
// src/components/Button/IconButton.tsx
import React from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
  isDisabled?: boolean;
}
```

// Implementation with icon support
### Form Components
## Text Field
# Input field for text entry with validation states.
```typescript
// src/components/Form/TextField.tsx
import React from 'react';
import styled from 'styled-components';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
```

// Implementation with validation states
## Select
# Dropdown selection component for choosing from options.
```typescript
// src/components/Form/Select.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}
```

// Implementation with dropdown menu
### Pack Components
## Pack Display
# Visual representation of card packs available for purchase.
```typescript
// src/components/Pack/PackDisplay.tsx
import React from 'react';
import styled from 'styled-components';
import { Pack } from '../../types/pack';
import { Button } from '../Button';

interface PackDisplayProps {
  pack: Pack;
  onPurchase?: (pack: Pack) => void;
}
```

// Implementation with visual treatments
## Pack Opening Animation
# Interactive animation sequence for revealing cards from opened packs.
```typescript
// src/components/Pack/PackOpeningAnimation.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../Card/Card';
import { Card as CardType } from '../../types/card';
import { Button } from '../Button';

interface PackOpeningAnimationProps {
  cards: CardType[];
  onComplete: () => void;
}
```

// Implementation with staged reveal animations
### Feedback Components
## Toast Notification
# Temporary notification for user feedback.
```typescript
// src/components/Feedback/Toast.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}
```

// Implementation with auto-dismiss
## Loading Spinner
# Visual indicator for loading states.
```typescript
// src/components/Feedback/LoadingSpinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}
```

// Implementation with basketball-themed animation
### Data Visualization Components
## Stat Bar
# Horizontal bar chart for displaying player statistics.
```typescript
// src/components/DataViz/StatBar.tsx
import React from 'react';
import styled from 'styled-components';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  showValue?: boolean;
}
```

// Implementation with animated fill
## Score Counter
# Animated number display for score changes.
```typescript
// src/components/DataViz/ScoreCounter.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface ScoreCounterProps {
  value: number;
  previousValue: number;
  size?: 'small' | 'medium' | 'large';
  isPositive?: boolean;
}
```

// Implementation with flip animation (see scoring-system.md)
### Layout Components
## Page Layout
# Base page structure with navigation and content areas.
```typescript
// src/components/Layout/PageLayout.tsx
import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}
```

// Implementation with responsive behavior
## Modal
# Overlay dialog for focused interactions.
```typescript
// src/components/Layout/Modal.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '../Button/IconButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: 'small' | 'medium' | 'large' | 'full';
}
```
// Implementation with focus trap and animation