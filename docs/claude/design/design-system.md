# UI Design System

## Design Philosophy: Dynamic Minimalism

Our design philosophy, "Dynamic Minimalism," combines clean, focused interfaces with bold data visualization and purposeful motion. This approach provides clarity while maintaining excitement through strategic use of color, animation, and typography.

The goal is to create an interface that:
- Focuses attention on critical information and actions
- Creates moments of delight during key interactions
- Maintains readability and usability at all times
- Expresses the energy and excitement of basketball

## Color System

### Primary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Court Orange** | `#FF5D23` | Primary CTAs, highlights, important actions |
| **Stadium Black** | `#0F1923` | Deep backgrounds, cards, dark UI elements |
| **Flash White** | `#F9FAFC` | Text, highlights, light UI elements |
| **Court Brown** | `#C39C76` | Accent color, authentic basketball reference |

### Secondary Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Scoring Blue** | `#3D82FF` | Points-related stats, scoring visualizations |
| **Defense Red** | `#FF3A4F` | Defensive stats (blocks, steals), negative changes |
| **Playmaking Green** | `#36D6A0` | Assists, positive changes, success states |
| **Physical Gold** | `#FFBF36` | Rebounds, physical stats, rare items |

### Rarity System

| Rarity | Color Scheme | Effects |
|--------|--------------|---------|
| **Common** | Silver gradient (`#C0C6DD` to `#E2E6F1`) | Subtle glow |
| **Uncommon** | Emerald gradient (`#52D49A` to `#36B980`) | Light pulse |
| **Rare** | Sapphire gradient (`#4A9DFF` to `#3D5AFE`) | Particle effects |
| **Epic** | Amethyst gradient (`#BA6CFF` to `#8E24AA`) | Energy field |
| **Legendary** | Gold gradient (`#FFD700` to `#FF9D00`) | Dynamic aura |

### Premium Visual Treatments

| Treatment | Description | Usage |
|-----------|-------------|-------|
| **Metallic Gold** | Deep gold (`#B4975A`) to light gold (`#FFC72C`) with reflective finish | Legendary and special edition cards |
| **Holographic** | Rainbow spectrum gradients with light refraction effects | Epic and above rarities |
| **Shimmer** | Subtle light movement across card surface | Rare and above rarities |

### Dark/Light Mode

The application will support both dark and light modes:
- **Dark Mode**: Primary interface mode, using Stadium Black as base
- **Light Mode**: Alternative mode, using Flash White as base

## Typography

### Font Stack

| Type | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | "Knockout" | Sans-serif | Headlines, card names, main sections |
| **UI** | "Inter" | Sans-serif | Interface elements, body text |
| **Data** | "Roboto Mono" | Monospace | Statistics, numbers |

### Type Scale

| Size | Line Height | Weight | Usage |
|------|-------------|--------|-------|
| **Hero** | 56px/64px | Bold (700) | Pack opening reveals, main screens |
| **Title** | 32px/40px | Bold (700) | Section headers |
| **Subtitle** | 24px/32px | SemiBold (600) | Card names, leaderboard headers |
| **Body** | 16px/24px | Regular (400) | Main text, descriptions |
| **Caption** | 14px/20px | Regular (400) | Secondary information |
| **Small** | 12px/16px | Regular (400) | Fine print, legal |

### Typography Guidelines

- Use title case for main headers and button text
- Use sentence case for body text and descriptions
- Limit line length to 70 characters for optimal readability
- Use bold weight (700) to create emphasis rather than italics
- Numbers should use tabular figures for alignment in statistics

## Spacing System

- Base unit: 8px
- Spacing scale: 8px (1x), 16px (2x), 24px (3x), 32px (4x), 48px (6x), 64px (8x)
- Container padding: 24px (desktop), 16px (mobile)
- Grid gap: 20px (desktop), 12px (mobile)
- Component spacing: 16px between related elements

## Responsive Design

### Breakpoints

| Size | Range | Target Devices |
|------|-------|----------------|
| **Mobile** | 320px - 767px | Smartphones |
| **Tablet** | 768px - 1023px | Tablets, small laptops |
| **Desktop** | 1024px - 1439px | Laptops, desktops |
| **Large Desktop** | 1440px+ | Large monitors |

### Grid System

- 12-column grid for desktop
- 8-column grid for tablet
- 4-column grid for mobile
- 20px standard gutter

### Device-Specific Enhancements

| Device | Enhancements |
|--------|--------------|
| **Mobile** | Vertical scrolling, swipe interactions |
| **Tablet** | Two-panel layouts, split functionality |
| **Desktop** | Extended information display, keyboard shortcuts |
| **Large Displays** | Immersive visuals, expanded stats and content |

## Accessibility Guidelines

### Color & Contrast

- Maintain minimum 4.5:1 contrast ratio for all text
- Don't rely solely on color to convey information
- Provide high contrast mode option

### Interactive Elements

- All interactive elements must have focus states
- Minimum touch target size of 44px × 44px
- Support keyboard navigation throughout

### Additional Considerations

- Provide alternative text for all images and icons
- Allow user control of animation speed/disable
- Support text scaling up to 200% without breaking layouts