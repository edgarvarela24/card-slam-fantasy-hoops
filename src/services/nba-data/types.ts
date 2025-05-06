/**
 * Types for NBA player data
 */

/**
 * NBA team abbreviation
 */
export type NBATeam =
  | 'ATL'
  | 'BOS'
  | 'BKN'
  | 'CHA'
  | 'CHI'
  | 'CLE'
  | 'DAL'
  | 'DEN'
  | 'DET'
  | 'GSW'
  | 'HOU'
  | 'IND'
  | 'LAC'
  | 'LAL'
  | 'MEM'
  | 'MIA'
  | 'MIL'
  | 'MIN'
  | 'NOP'
  | 'NYK'
  | 'OKC'
  | 'ORL'
  | 'PHI'
  | 'PHX'
  | 'POR'
  | 'SAC'
  | 'SAS'
  | 'TOR'
  | 'UTA'
  | 'WAS';

/**
 * NBA player position
 */
export type NBAPosition = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

/**
 * NBA player base statistics
 */
export interface NBAPlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  threePointersMade: number;
  fieldGoalPercentage: number;
  freeThrowPercentage: number;
  gamesPlayed: number;
  minutesPerGame: number;
  turnovers: number;
  personalFouls: number;
}

/**
 * NBA player information
 */
export interface NBAPlayer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  team: NBATeam;
  position: NBAPosition | NBAPosition[]; // Some players play multiple positions
  height: string; // Format: "6-6" (feet-inches)
  weight: number; // In pounds
  jerseyNumber: string;
  active: boolean;
  rookieYear?: number;
  lastSeasonPlayed?: number;
  stats: NBAPlayerStats;
}

/**
 * Season types
 */
export type SeasonType = 'regular' | 'playoffs' | 'preseason';

/**
 * Season information
 */
export interface Season {
  year: number;
  type: SeasonType;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

/**
 * Game status
 */
export type GameStatus = 'scheduled' | 'in-progress' | 'finished' | 'cancelled';

/**
 * Game information
 */
export interface NBAGame {
  id: string;
  homeTeam: NBATeam;
  awayTeam: NBATeam;
  homeScore: number;
  awayScore: number;
  date: string; // ISO date string
  status: GameStatus;
  season: number;
  seasonType: SeasonType;
}

/**
 * Player performance in a specific game
 */
export interface NBAGamePerformance {
  gameId: string;
  playerId: string;
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  personalFouls: number;
}

/**
 * Search parameters for NBA data
 */
export interface NBADataSearchParams {
  team?: NBATeam;
  position?: NBAPosition;
  season?: number;
  seasonType?: SeasonType;
  active?: boolean;
  searchQuery?: string; // For name searches
  limit?: number;
  offset?: number;
}

/**
 * Season averages for a player
 */
export interface NBASeasonAverages {
  playerId: string;
  season: number;
  seasonType: SeasonType;
  stats: NBAPlayerStats;
}
