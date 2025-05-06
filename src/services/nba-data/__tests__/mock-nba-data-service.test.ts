import { MockNBADataService } from '../mock-nba-data-service';

describe('MockNBADataService', () => {
  let mockDataService: MockNBADataService;

  beforeEach(() => {
    mockDataService = new MockNBADataService();
  });

  describe('getPlayerById', () => {
    test('should return a player when given a valid ID', async () => {
      const player = await mockDataService.getPlayerById('lebron-james');
      expect(player).toBeTruthy();
      expect(player?.id).toBe('lebron-james');
      expect(player?.fullName).toBe('LeBron James');
    });

    test('should return null when given an invalid ID', async () => {
      const player = await mockDataService.getPlayerById('invalid-id');
      expect(player).toBeNull();
    });
  });

  describe('getPlayersByIds', () => {
    test('should return multiple players when given valid IDs', async () => {
      const players = await mockDataService.getPlayersByIds(['lebron-james', 'kevin-durant']);
      expect(players).toHaveLength(2);
      expect(players[0].id).toBe('lebron-james');
      expect(players[1].id).toBe('kevin-durant');
    });

    test('should return only found players when some IDs are invalid', async () => {
      const players = await mockDataService.getPlayersByIds(['lebron-james', 'invalid-id']);
      expect(players).toHaveLength(1);
      expect(players[0].id).toBe('lebron-james');
    });

    test('should return empty array when all IDs are invalid', async () => {
      const players = await mockDataService.getPlayersByIds(['invalid-id-1', 'invalid-id-2']);
      expect(players).toHaveLength(0);
    });
  });

  describe('searchPlayers', () => {
    test('should filter players by team', async () => {
      const players = await mockDataService.searchPlayers({ team: 'LAL' });
      expect(players).toHaveLength(3);
      expect(players.every(p => p.team === 'LAL')).toBe(true);
    });

    test('should filter players by position', async () => {
      const players = await mockDataService.searchPlayers({ position: 'PG' });
      expect(players).toHaveLength(5); // Curry, Murray, Lillard, Maxey, Brunson
      expect(players.some(p => p.id === 'stephen-curry')).toBe(true);
    });

    test('should filter players by multiple positions', async () => {
      const players = await mockDataService.searchPlayers({ position: 'SF' });
      expect(players).toHaveLength(5); // Players with SF position
      // Should include LeBron and Durant who both play SF
      expect(players.some(p => p.id === 'lebron-james')).toBe(true);
      expect(players.some(p => p.id === 'kevin-durant')).toBe(true);
    });

    test('should filter players by active status', async () => {
      // All players are active by default in our mock data
      const activePlayers = await mockDataService.searchPlayers({ active: true });
      expect(activePlayers.length).toBeGreaterThan(0);
      expect(activePlayers.every(p => p.active === true)).toBe(true);

      // We would need to modify the mock data to test inactive players
      // This is handled in the implementation code but we'll skip modifying data here
    });

    test('should search players by name query', async () => {
      const players = await mockDataService.searchPlayers({ searchQuery: 'LeBron' });
      expect(players).toHaveLength(1);
      expect(players[0].id).toBe('lebron-james');
    });

    test('should support pagination with limit and offset', async () => {
      const firstPage = await mockDataService.searchPlayers({ limit: 2, offset: 0 });
      expect(firstPage).toHaveLength(2);

      const secondPage = await mockDataService.searchPlayers({ limit: 2, offset: 2 });
      expect(secondPage).toHaveLength(2);

      // Make sure first and second page have different players
      expect(firstPage[0].id).not.toBe(secondPage[0].id);
      expect(firstPage[1].id).not.toBe(secondPage[1].id);
    });

    test('should combine multiple search parameters', async () => {
      const players = await mockDataService.searchPlayers({
        team: 'LAL',
        position: 'PF',
      });

      expect(players.length).toBeGreaterThan(0);
      expect(players.every(p => p.team === 'LAL')).toBe(true);
      expect(
        players.every(p => {
          if (Array.isArray(p.position)) {
            return p.position.includes('PF');
          }
          return p.position === 'PF';
        })
      ).toBe(true);
    });
  });

  describe('getPlayersByTeam', () => {
    test('should return all players for a given team', async () => {
      const lakerPlayers = await mockDataService.getPlayersByTeam('LAL');
      expect(lakerPlayers).toHaveLength(3);
      expect(lakerPlayers.every(p => p.team === 'LAL')).toBe(true);
    });

    test('should return empty array for a team with no players', async () => {
      // Need to use a team that doesn't exist in our mock data
      const players = await mockDataService.getPlayersByTeam('CLE');
      expect(players).toHaveLength(0);
    });
  });

  describe('getGameById', () => {
    test('should return a game when given a valid ID', async () => {
      const game = await mockDataService.getGameById('game-lal-bos-20231225');
      expect(game).toBeTruthy();
      expect(game?.id).toBe('game-lal-bos-20231225');
      expect(game?.homeTeam).toBe('LAL');
    });

    test('should return null when given an invalid ID', async () => {
      const game = await mockDataService.getGameById('invalid-id');
      expect(game).toBeNull();
    });
  });

  describe('getGamesByDateRange', () => {
    test('should return games within the specified date range', async () => {
      const games = await mockDataService.getGamesByDateRange(
        '2023-12-25T00:00:00Z',
        '2023-12-25T23:59:59Z'
      );

      expect(games).toHaveLength(3); // 3 Christmas games
      expect(games[0].date.startsWith('2023-12-25')).toBe(true);
    });

    test('should return empty array when no games in date range', async () => {
      const games = await mockDataService.getGamesByDateRange(
        '2022-01-01T00:00:00Z',
        '2022-01-07T23:59:59Z'
      );

      expect(games).toHaveLength(0);
    });
  });

  describe('getPlayerGamePerformance', () => {
    test('should return a performance when given valid game ID and player ID', async () => {
      const performance = await mockDataService.getPlayerGamePerformance(
        'game-lal-bos-20231225',
        'lebron-james'
      );
      expect(performance).toBeTruthy();
      expect(performance?.gameId).toBe('game-lal-bos-20231225');
      expect(performance?.playerId).toBe('lebron-james');
      expect(performance?.points).toBeGreaterThan(0);
    });

    test('should return null when given invalid IDs', async () => {
      const performance = await mockDataService.getPlayerGamePerformance(
        'game-lal-bos-20231225',
        'invalid-id'
      );
      expect(performance).toBeNull();
    });
  });

  describe('getAllPlayerPerformancesForGame', () => {
    test('should return all performances for a given game', async () => {
      const performances =
        await mockDataService.getAllPlayerPerformancesForGame('game-lal-bos-20231225');
      expect(performances.length).toBeGreaterThan(0);
      expect(performances.every(p => p.gameId === 'game-lal-bos-20231225')).toBe(true);
    });

    test('should return empty array for a game with no performances', async () => {
      const performances = await mockDataService.getAllPlayerPerformancesForGame('invalid-id');
      expect(performances).toHaveLength(0);
    });
  });

  describe('getSeasons', () => {
    test('should return all available seasons', async () => {
      const seasons = await mockDataService.getSeasons();
      expect(seasons.length).toBeGreaterThan(0);

      // Check for different season types
      const regularSeasons = seasons.filter(s => s.type === 'regular');
      const playoffs = seasons.filter(s => s.type === 'playoffs');
      const preseasons = seasons.filter(s => s.type === 'preseason');

      expect(regularSeasons.length).toBeGreaterThan(0);
      expect(playoffs.length).toBeGreaterThan(0);
      expect(preseasons.length).toBeGreaterThan(0);
    });
  });

  describe('getPlayerSeasonAverages', () => {
    test('should return season averages for a valid player, season, and season type', async () => {
      const averages = await mockDataService.getPlayerSeasonAverages(
        'lebron-james',
        2023,
        'regular'
      );
      expect(averages).toBeTruthy();
      expect(averages?.playerId).toBe('lebron-james');
      expect(averages?.season).toBe(2023);
      expect(averages?.seasonType).toBe('regular');
      expect(averages?.stats.points).toBeGreaterThan(0);
    });

    test('should return null for invalid player ID', async () => {
      const averages = await mockDataService.getPlayerSeasonAverages(
        'invalid-player',
        2023,
        'regular'
      );
      expect(averages).toBeNull();
    });

    test('should return null for valid player but invalid season/type combination', async () => {
      const averages = await mockDataService.getPlayerSeasonAverages(
        'lebron-james',
        2020,
        'regular'
      );
      expect(averages).toBeNull();
    });
  });
});
