import {
  NBADataSearchParams,
  NBAGame,
  NBAGamePerformance,
  NBAPlayer,
  NBASeasonAverages,
  NBATeam,
  Season,
} from './types';

/**
 * Interface for NBA data service
 * This service provides methods to fetch NBA player data, game data, and statistics
 */
export interface NBADataService {
  /**
   * Fetch a player by ID
   * @param playerId The player ID
   * @returns Promise resolving to the player data
   */
  getPlayerById(playerId: string): Promise<NBAPlayer | null>;

  /**
   * Fetch multiple players by their IDs
   * @param playerIds Array of player IDs
   * @returns Promise resolving to an array of player data
   */
  getPlayersByIds(playerIds: string[]): Promise<NBAPlayer[]>;

  /**
   * Search for players based on various criteria
   * @param params Search parameters
   * @returns Promise resolving to an array of players matching the criteria
   */
  searchPlayers(params: NBADataSearchParams): Promise<NBAPlayer[]>;

  /**
   * Get a list of all available seasons
   * @returns Promise resolving to an array of available seasons
   */
  getSeasons(): Promise<Season[]>;

  /**
   * Get all players for a specific team
   * @param team The team abbreviation
   * @returns Promise resolving to an array of players on the team
   */
  getPlayersByTeam(team: NBATeam): Promise<NBAPlayer[]>;

  /**
   * Get season averages for a player
   * @param playerId The player ID
   * @param season The season year (e.g., 2023)
   * @param seasonType The type of season (regular, playoffs, preseason)
   * @returns Promise resolving to the player's season averages
   */
  getPlayerSeasonAverages(
    playerId: string,
    season: number,
    seasonType: 'regular' | 'playoffs' | 'preseason'
  ): Promise<NBASeasonAverages | null>;

  /**
   * Get a game by ID
   * @param gameId The game ID
   * @returns Promise resolving to the game data
   */
  getGameById(gameId: string): Promise<NBAGame | null>;

  /**
   * Get games for a specific date range
   * @param startDate Start date in ISO format
   * @param endDate End date in ISO format
   * @returns Promise resolving to an array of games in the date range
   */
  getGamesByDateRange(startDate: string, endDate: string): Promise<NBAGame[]>;

  /**
   * Get a player's performance in a specific game
   * @param gameId The game ID
   * @param playerId The player ID
   * @returns Promise resolving to the player's performance data
   */
  getPlayerGamePerformance(gameId: string, playerId: string): Promise<NBAGamePerformance | null>;

  /**
   * Get all player performances for a specific game
   * @param gameId The game ID
   * @returns Promise resolving to an array of player performances
   */
  getAllPlayerPerformancesForGame(gameId: string): Promise<NBAGamePerformance[]>;
}
