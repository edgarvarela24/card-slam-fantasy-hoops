import { Rarity } from '../types/card';

/**
 * Returns the color gradient for a given rarity
 * @param rarity Card rarity
 * @returns CSS gradient string for the rarity
 */
export const getRarityColor = (rarity: Rarity): string => {
  switch (rarity) {
    case 'Common':
      return 'linear-gradient(135deg, #C0C6DD, #E2E6F1)';
    case 'Uncommon':
      return 'linear-gradient(135deg, #52D49A, #36B980)';
    case 'Rare':
      return 'linear-gradient(135deg, #4A9DFF, #3D5AFE)';
    case 'Epic':
      return 'linear-gradient(135deg, #BA6CFF, #8E24AA)';
    case 'Legendary':
      return 'linear-gradient(135deg, #FFD700, #FF9D00)';
    default:
      return 'linear-gradient(135deg, #C0C6DD, #E2E6F1)';
  }
};

/**
 * Returns the border glow color for a given rarity
 * @param rarity Card rarity
 * @returns CSS color string for the rarity border glow
 */
export const getRarityBorderColor = (rarity: Rarity): string => {
  switch (rarity) {
    case 'Common':
      return '#C0C6DD';
    case 'Uncommon':
      return '#36B980';
    case 'Rare':
      return '#3D5AFE';
    case 'Epic':
      return '#8E24AA';
    case 'Legendary':
      return '#FFD700';
    default:
      return '#C0C6DD';
  }
};

/**
 * Returns team colors for a given team name
 * @param team NBA team name
 * @returns Object with primary and secondary team colors
 */
export const getTeamColors = (team: string): { primary: string; secondary: string } => {
  // This is a simplified version - in a real app, we would have a complete mapping of team names to colors
  const teamColors: Record<string, { primary: string; secondary: string }> = {
    'Atlanta Hawks': { primary: '#E03A3E', secondary: '#C1D32F' },
    'Boston Celtics': { primary: '#007A33', secondary: '#BA9653' },
    'Brooklyn Nets': { primary: '#000000', secondary: '#FFFFFF' },
    'Charlotte Hornets': { primary: '#1D1160', secondary: '#00788C' },
    'Chicago Bulls': { primary: '#CE1141', secondary: '#000000' },
    'Cleveland Cavaliers': { primary: '#860038', secondary: '#FDBB30' },
    'Dallas Mavericks': { primary: '#00538C', secondary: '#002B5E' },
    'Denver Nuggets': { primary: '#0E2240', secondary: '#FEC524' },
    'Detroit Pistons': { primary: '#C8102E', secondary: '#1D42BA' },
    'Golden State Warriors': { primary: '#1D428A', secondary: '#FFC72C' },
    'Houston Rockets': { primary: '#CE1141', secondary: '#000000' },
    'Indiana Pacers': { primary: '#002D62', secondary: '#FDBB30' },
    'Los Angeles Clippers': { primary: '#C8102E', secondary: '#1D428A' },
    'Los Angeles Lakers': { primary: '#552583', secondary: '#FDB927' },
    'Memphis Grizzlies': { primary: '#5D76A9', secondary: '#12173F' },
    'Miami Heat': { primary: '#98002E', secondary: '#F9A01B' },
    'Milwaukee Bucks': { primary: '#00471B', secondary: '#EEE1C6' },
    'Minnesota Timberwolves': { primary: '#0C2340', secondary: '#236192' },
    'New Orleans Pelicans': { primary: '#0C2340', secondary: '#C8102E' },
    'New York Knicks': { primary: '#006BB6', secondary: '#F58426' },
    'Oklahoma City Thunder': { primary: '#007AC1', secondary: '#EF3B24' },
    'Orlando Magic': { primary: '#0077C0', secondary: '#C4CED4' },
    'Philadelphia 76ers': { primary: '#006BB6', secondary: '#ED174C' },
    'Phoenix Suns': { primary: '#1D1160', secondary: '#E56020' },
    'Portland Trail Blazers': { primary: '#E03A3E', secondary: '#000000' },
    'Sacramento Kings': { primary: '#5A2D81', secondary: '#63727A' },
    'San Antonio Spurs': { primary: '#C4CED4', secondary: '#000000' },
    'Toronto Raptors': { primary: '#CE1141', secondary: '#000000' },
    'Utah Jazz': { primary: '#002B5C', secondary: '#00471B' },
    'Washington Wizards': { primary: '#002B5C', secondary: '#E31837' },
  };

  // Return colors for the team or default if not found
  return (
    teamColors[team] || {
      primary: '#0F1923',
      secondary: '#FF5D23',
    }
  );
};

/**
 * Formats a value as a percentage
 * @param value Value to format (0-1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => `${(value * 100).toFixed(1)}%`;

/**
 * Determines the text color to use based on background color
 * @param backgroundColor Background color to check
 * @returns Text color (white or black)
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  // Simplified - in a real app, we would calculate luminance
  // For now, just returns white for dark team colors
  const darkTeamColors = [
    '#000000',
    '#0E2240',
    '#00471B',
    '#0C2340',
    '#1D1160',
    '#002B5C',
    '#006BB6',
    '#5A2D81',
  ];

  if (darkTeamColors.some(color => backgroundColor.includes(color))) {
    return '#FFFFFF';
  }

  return '#0F1923'; // dark text for light backgrounds
};
