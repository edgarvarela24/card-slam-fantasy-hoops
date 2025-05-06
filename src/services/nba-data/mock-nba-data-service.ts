import {
  NBADataSearchParams,
  NBAGame,
  NBAGamePerformance,
  NBAPlayer,
  NBASeasonAverages,
  NBATeam,
  Season,
  SeasonType,
} from './types';
import { NBADataService } from './nba-data-service';
import {
  mockPlayers,
  mockGames,
  mockPerformances,
  mockSeasons,
  mockSeasonAverages,
} from './__mocks__';

/**
 * Mock implementation of the NBA data service
 * Uses hard-coded data for testing and development purposes
 */
export class MockNBADataService implements NBADataService {
  // Local storage for mock data
  private players: NBAPlayer[] = [];
  private games: NBAGame[] = [];
  private gamePerformances: NBAGamePerformance[] = [];
  private seasons: Season[] = [];
  private seasonAverages: NBASeasonAverages[] = [];
  private initialized: boolean = false;

  constructor() {
    // Data will be initialized when needed (lazy loading)
  }

  /**
   * Initialize mock data
   * This method loads mock data from the mock data files
   */
  private async initializeMockData(): Promise<void> {
    // Check if data is already loaded
    if (this.initialized) {
      return;
    }

    // Load mock data from imported mock files
    this.players = [...mockPlayers];
    this.games = [...mockGames];
    this.gamePerformances = [...mockPerformances];
    this.seasons = [...mockSeasons];
    this.seasonAverages = [...mockSeasonAverages];

    this.initialized = true;
  }

  async getPlayerById(playerId: string): Promise<NBAPlayer | null> {
    await this.initializeMockData();
    return this.players.find(player => player.id === playerId) || null;
  }

  async getPlayersByIds(playerIds: string[]): Promise<NBAPlayer[]> {
    await this.initializeMockData();
    return this.players.filter(player => playerIds.includes(player.id));
  }

  async searchPlayers(params: NBADataSearchParams): Promise<NBAPlayer[]> {
    await this.initializeMockData();

    let filteredPlayers = [...this.players];

    // Apply filters based on search parameters
    if (params.team) {
      filteredPlayers = filteredPlayers.filter(player => player.team === params.team);
    }

    if (params.position) {
      filteredPlayers = filteredPlayers.filter(player => {
        if (Array.isArray(player.position)) {
          return player.position.includes(params.position!);
        }
        return player.position === params.position;
      });
    }

    if (params.active !== undefined) {
      filteredPlayers = filteredPlayers.filter(player => player.active === params.active);
    }

    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      filteredPlayers = filteredPlayers.filter(
        player =>
          player.fullName.toLowerCase().includes(query) ||
          player.firstName.toLowerCase().includes(query) ||
          player.lastName.toLowerCase().includes(query)
      );
    }

    // Apply pagination
    if (params.limit !== undefined) {
      const offset = params.offset || 0;
      filteredPlayers = filteredPlayers.slice(offset, offset + params.limit);
    }

    return filteredPlayers;
  }

  async getSeasons(): Promise<Season[]> {
    await this.initializeMockData();
    return this.seasons;
  }

  async getPlayersByTeam(team: NBATeam): Promise<NBAPlayer[]> {
    await this.initializeMockData();
    return this.players.filter(player => player.team === team);
  }

  async getPlayerSeasonAverages(
    playerId: string,
    season: number,
    seasonType: SeasonType
  ): Promise<NBASeasonAverages | null> {
    await this.initializeMockData();

    return (
      this.seasonAverages.find(
        avg => avg.playerId === playerId && avg.season === season && avg.seasonType === seasonType
      ) || null
    );
  }

  async getGameById(gameId: string): Promise<NBAGame | null> {
    await this.initializeMockData();
    return this.games.find(game => game.id === gameId) || null;
  }

  async getGamesByDateRange(startDate: string, endDate: string): Promise<NBAGame[]> {
    await this.initializeMockData();

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return this.games.filter(game => {
      const gameDate = new Date(game.date).getTime();
      return gameDate >= start && gameDate <= end;
    });
  }

  async getPlayerGamePerformance(
    gameId: string,
    playerId: string
  ): Promise<NBAGamePerformance | null> {
    await this.initializeMockData();

    return (
      this.gamePerformances.find(perf => perf.gameId === gameId && perf.playerId === playerId) ||
      null
    );
  }

  async getAllPlayerPerformancesForGame(gameId: string): Promise<NBAGamePerformance[]> {
    await this.initializeMockData();
    return this.gamePerformances.filter(perf => perf.gameId === gameId);
  }
}
