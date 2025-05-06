# Animation System

## Animation Principles

Card Slam Fantasy Hoops uses animation purposefully to enhance the user experience through these key principles:

1. **Inform through motion**: Use animations to communicate state changes and provide feedback
2. **Guide attention**: Direct user focus to important elements or actions
3. **Create delight**: Add personality and excitement at key moments
4. **Performance first**: Optimize for smooth 60fps animations even on mid-range devices

## Animation Hierarchy

Animations are categorized in a hierarchy of importance:

### Micro-interactions
- Small, quick feedback animations for UI interactions
- Duration: 150-300ms
- Examples: button press, toggle state change, hover effects

### State Transitions
- Medium-scale animations for component state changes
- Duration: 300-500ms
- Examples: card flips, panel expansions, menu openings

### Feature Animations
- Large, multi-stage animations for key app features
- Duration: 500-1000ms+
- Examples: pack opening, achievement unlocks, leaderboard movements

## Animation Timing Guidelines

| Interaction Type | Duration | Easing | Usage |
|------------------|----------|--------|-------|
| **Quick Updates** | 150-300ms | ease-out | Score changes, basic state transitions |
| **Medium Duration** | 300-500ms | ease-in-out | Leaderboard position changes, card interactions |
| **Long Animations** | 500-1000ms | custom | Special events, achievements, pack reveals |

## Animation Implementation

The app uses three main animation libraries depending on the complexity and requirements:

### Framer Motion
Used for component-based animations with React integration:

```typescript
// Card flip animation with Framer Motion
import { motion } from "framer-motion";

const Card = ({ card, isFlipped }) => {
  return (
    <div className="card-container">
      <motion.div
        className="card"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="card-front" style={{ backfaceVisibility: "hidden" }}>
          {/* Front content */}
        </div>
        <div 
          className="card-back" 
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          {/* Back content */}
        </div>
      </motion.div>
    </div>
  );
};
```

## React Spring
# Used for physics-based animations with natural movement:
```typescript
// Leaderboard position change with React Spring
import { useSpring, animated } from "react-spring";

const LeaderboardRow = ({ entry, index, previousIndex }) => {
  const hasRankChanged = previousIndex !== index;
  
  // Calculate the vertical distance to move
  const yDelta = (index - previousIndex) * rowHeight;
  
  const springProps = useSpring({
    from: { y: hasRankChanged ? -yDelta : 0, opacity: hasRankChanged ? 0.7 : 1, },
    to: { y: 0, opacity: 1 },
    config: {
      tension: 120,
      friction: 14,
      precision: 0.001,
    },
    delay: index * 50, // Stagger the animations
  });

  return (
    <animated.tr
      style={{
        ...springProps,
        background: hasRankChanged ? 
          springProps.opacity.to(o => 
            `rgba(${entry.rankChange > 0 ? '54, 214, 160' : '255, 58, 79'}, ${o * 0.2})`) : 
          'transparent',
      }}
    >
      <td>{entry.rank}</td>
      <td>{entry.displayName}</td>
      <td>{entry.score}</td>
      {/* Additional table cells */}
    </animated.tr>
  );
};
```
## GSAP (GreenSock)
# Used for complex, precise animations and sequences:
```typescript
// Score counter animation with GSAP
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScoreCounter = ({ value, previousValue }) => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    if (previousValue !== value && counterRef.current) {
      // Create flip counter animation
      gsap.to(counterRef.current, {
        duration: 0.4,
        innerText: value,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function() {
          // Add visual flipping effect during the count
          const progress = this.progress();
          if (progress < 0.5) {
            counterRef.current.style.transform = `perspective(500px) rotateX(${progress * 180}deg)`;
            counterRef.current.style.opacity = 1 - progress * 2;
          } else {
            counterRef.current.style.transform = `perspective(500px) rotateX(${(1 - progress) * 180}deg)`;
            counterRef.current.style.opacity = (progress - 0.5) * 2;
          }
        }
      });
    }
  }, [value, previousValue]);

  return <span className="score-counter" ref={counterRef}>{previousValue}</span>;
};
```

### Key Animated Features
## Card Interactions
# Cards have several animated states:

- Hover: Subtle elevation (8px) with 3D tilt (10° max)
- Selection: Glowing border with elevation increase
- Flip: 3D flip transition to reveal back content
- Acquisition: Entry animation when added to collection

```typescript
// Card hover and selection effects with styled-components
const CardContainer = styled.div<{
  isSelected: boolean;
  isHovered: boolean;
}>`
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  transform: ${({ isHovered, isSelected }) => {
    if (isSelected) return 'scale(1.05)';
    if (isHovered) return 'translateY(-8px) rotateY(5deg)';
    return 'translateY(0) rotateY(0)';
  }};
  box-shadow: ${({ isHovered, isSelected }) => {
    if (isSelected) return '0 12px 24px rgba(0, 0, 0, 0.2)';
    if (isHovered) return '0 8px 16px rgba(0, 0, 0, 0.1)';
    return '0 2px 4px rgba(0, 0, 0, 0.05)';
  }};
`;
```

## Pack Opening Experience
# The pack opening ceremony follows a deliberate sequence:

- Selection: Pack selection with hover effects
- Purchase Confirmation: Quick modal with bounce-in animation
- Opening Build-up: Anticipation phase with particles/effects
- Card Reveal: Sequential card flips with staggered timing
- Rarity Celebration: Special effects for high-rarity cards
- Collection Addition: Cards fly to collection with trail effects

```typescript
// Pack opening sequence with GSAP timeline
const startPackOpeningAnimation = (cards) => {
  const timeline = gsap.timeline();
  
  // Initial anticipation phase
  timeline.to(".pack-container", {
    duration: 0.5,
    scale: 1.1,
    ease: "back.out(1.7)",
  });
  
  // Pack opening effect
  timeline.to(".pack-container", {
    duration: 0.7,
    scale: 0.9,
    opacity: 0,
    ease: "power2.in",
  });
  
  // Reveal cards one by one
  cards.forEach((card, index) => {
    const delay = index * 0.7; // Stagger the card reveals
    
    timeline.fromTo(
      `.card-${index}`,
      {
        rotateY: 90,
        scale: 0.8,
        opacity: 0,
        z: -300,
      },
      {
        duration: 0.5,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        z: 0,
        ease: "back.out(1.7)",
      },
      `+=0.1` // Slight pause between cards
    );
    
    // Add special effects for rare cards
    if (card.rarity === 'Legendary' || card.rarity === 'Epic') {
      timeline.to(`.card-${index}`, {
        duration: 0.3,
        boxShadow: '0 0 30px gold',
        ease: "power2.inOut",
      }, "-=0.2");
    }
  });
  
  // Final collection addition
  timeline.to(".card", {
    duration: 0.8,
    x: 300,
    y: -200,
    scale: 0.5,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.in",
  });
  
  return timeline;
};
```

## Leaderboard Position Changes
# Leaderboard animations create excitement around position changes:

- Pre-update Fade: Current position fades slightly
- Position Movement: Rows animate to new positions
- Highlight Effect: Brief highlight at new position
- Direction Indicator: Visual cue showing movement direction

## Score Updates
# Score changes use dynamic animations based on magnitude:

- Minor Updates: Subtle count up/down with color coding
- Significant Changes: Flip counter effect with emphasis
- Major Achievements: Animated celebration effects

```typescript
// Score change animation with magnitude-based effects
const animateScoreChange = (element, newValue, oldValue) => {
  const change = newValue - oldValue;
  const magnitude = Math.abs(change);
  const isPositive = change > 0;
  
  // Set color based on direction
  const color = isPositive ? '#36CE94' : '#FF3A5E';
  
  // Choose animation based on magnitude
  if (magnitude < 5) {
    // Minor change - simple tween
    gsap.to(element, {
      innerText: newValue.toFixed(1),
      color: color,
      duration: 0.3,
      snap: { innerText: 0.1 },
      ease: "power2.out",
      onComplete: () => {
        gsap.to(element, { color: 'white', duration: 0.5 });
      }
    });
  } else if (magnitude < 20) {
    // Medium change - flip effect
    gsap.to(element, {
      duration: 0.4,
      innerText: newValue.toFixed(1),
      color: color,
      snap: { innerText: 0.1 },
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        if (progress < 0.5) {
          element.style.transform = `perspective(500px) rotateX(${progress * 180}deg)`;
          element.style.opacity = 1 - progress * 2;
        } else {
          element.style.transform = `perspective(500px) rotateX(${(1 - progress) * 180}deg)`;
          element.style.opacity = (progress - 0.5) * 2;
        }
      },
      onComplete: () => {
        gsap.to(element, { color: 'white', duration: 0.5 });
      }
    });
  } else {
    // Major change - celebration effect
    gsap.to(element, {
      duration: 0.6,
      innerText: newValue.toFixed(1),
      color: color,
      snap: { innerText: 0.1 },
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        if (progress < 0.5) {
          element.style.transform = `perspective(500px) rotateX(${progress * 180}deg) scale(${1 + progress})`;
          element.style.opacity = 1 - progress * 2;
        } else {
          element.style.transform = `perspective(500px) rotateX(${(1 - progress) * 180}deg) scale(${2 - progress})`;
          element.style.opacity = (progress - 0.5) * 2;
        }
      },
      onComplete: () => {
        // Add particles or other celebration effects
        createCelebrationEffect(element, isPositive);
        gsap.to(element, { color: 'white', duration: 0.5 });
      }
    });
  }
};
```

## Performance Optimization
# Animation Performance Techniques

Use GPU-accelerated properties for smooth animations:

- transform (translate3d, rotate, scale)
- opacity
- Avoid animating width, height, top, left


Implement will-change for complex animations:
css.animated-element {
  will-change: transform, opacity;
}

Batch DOM updates to minimize layout thrashing:
```typescript
// Bad: Causes multiple reflows
elements.forEach(el => {
  el.style.height = `${el.offsetHeight * 1.5}px`;
  el.style.width = `${el.offsetWidth * 1.5}px`;
});

// Good: Batches reads and writes
const dimensions = elements.map(el => ({
  height: el.offsetHeight * 1.5,
  width: el.offsetWidth * 1.5
}));

elements.forEach((el, i) => {
  el.style.height = `${dimensions[i].height}px`;
  el.style.width = `${dimensions[i].width}px`;
});
```

# Use RequestAnimationFrame for custom animations:
```typescript
const animate = (timestamp) => {
  // Animation logic here
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
```

# Implement throttling for high-frequency updates:
```typescript
// Throttle score updates to max 10 per second
const throttledScoreUpdate = throttle((newScore) => {
  updateScoreDisplay(newScore);
}, 100);
```

## Accessibility Considerations

- Respect user preferences for reduced motion:
css@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

# Provide alternative static states for animated content:
```typescript
const AnimatedComponent = ({ reducedMotion, ...props }) => {
  if (reducedMotion) {
    return <StaticComponent {...props} />;
  }
  
  return <AnimatedImplementation {...props} />;
};
```

# Never rely on animation alone to convey important information:
```typescript
// Always use multiple cues (color, text, icon, AND animation)
const StatusIndicator = ({ status }) => {
  return (
    <div className={`status ${status}`}>
      <div className="status-animation" />
      <div className="status-icon" />
      <span className="status-text">{getStatusText(status)}</span>
    </div>
  );
};
```