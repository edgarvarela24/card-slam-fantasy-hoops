import { Season, NBASeasonAverages } from '../types';

/**
 * Mock NBA season data
 * This data is used for development and testing purposes
 */
export const mockSeasons: Season[] = [
  {
    year: 2023,
    type: 'regular',
    startDate: '2023-10-24T00:00:00Z',
    endDate: '2024-04-14T23:59:59Z',
  },
  {
    year: 2023,
    type: 'playoffs',
    startDate: '2024-04-20T00:00:00Z',
    endDate: '2024-06-20T23:59:59Z',
  },
  {
    year: 2023,
    type: 'preseason',
    startDate: '2023-10-06T00:00:00Z',
    endDate: '2023-10-20T23:59:59Z',
  },
  {
    year: 2022,
    type: 'regular',
    startDate: '2022-10-18T00:00:00Z',
    endDate: '2023-04-09T23:59:59Z',
  },
  {
    year: 2022,
    type: 'playoffs',
    startDate: '2023-04-11T00:00:00Z',
    endDate: '2023-06-12T23:59:59Z',
  },
  {
    year: 2022,
    type: 'preseason',
    startDate: '2022-09-30T00:00:00Z',
    endDate: '2022-10-14T23:59:59Z',
  },
];

/**
 * Mock NBA season averages data
 * This data is used for development and testing purposes
 */
export const mockSeasonAverages: NBASeasonAverages[] = [
  // LeBron James regular season averages
  {
    playerId: 'lebron-james',
    season: 2023,
    seasonType: 'regular',
    stats: {
      points: 25.7,
      rebounds: 7.3,
      assists: 8.3,
      steals: 1.3,
      blocks: 0.5,
      threePointersMade: 2.1,
      fieldGoalPercentage: 0.54,
      freeThrowPercentage: 0.75,
      gamesPlayed: 71,
      minutesPerGame: 35.5,
      turnovers: 3.1,
      personalFouls: 1.6,
    },
  },
  // Stephen Curry regular season averages
  {
    playerId: 'stephen-curry',
    season: 2023,
    seasonType: 'regular',
    stats: {
      points: 26.4,
      rebounds: 4.5,
      assists: 6.7,
      steals: 0.9,
      blocks: 0.4,
      threePointersMade: 4.9,
      fieldGoalPercentage: 0.45,
      freeThrowPercentage: 0.92,
      gamesPlayed: 74,
      minutesPerGame: 33.5,
      turnovers: 3.1,
      personalFouls: 1.8,
    },
  },
  // Nikola Jokić regular season averages
  {
    playerId: 'nikola-jokic',
    season: 2023,
    seasonType: 'regular',
    stats: {
      points: 26.3,
      rebounds: 12.2,
      assists: 9.0,
      steals: 1.3,
      blocks: 0.7,
      threePointersMade: 1.1,
      fieldGoalPercentage: 0.58,
      freeThrowPercentage: 0.82,
      gamesPlayed: 79,
      minutesPerGame: 34.5,
      turnovers: 3.4,
      personalFouls: 2.5,
    },
  },
  // Joel Embiid regular season averages
  {
    playerId: 'joel-embiid',
    season: 2023,
    seasonType: 'regular',
    stats: {
      points: 34.7,
      rebounds: 11.0,
      assists: 4.1,
      steals: 1.0,
      blocks: 1.7,
      threePointersMade: 1.0,
      fieldGoalPercentage: 0.53,
      freeThrowPercentage: 0.86,
      gamesPlayed: 66,
      minutesPerGame: 34.6,
      turnovers: 3.4,
      personalFouls: 2.9,
    },
  },
  // Giannis Antetokounmpo regular season averages
  {
    playerId: 'giannis-antetokounmpo',
    season: 2023,
    seasonType: 'regular',
    stats: {
      points: 30.4,
      rebounds: 11.5,
      assists: 5.7,
      steals: 0.9,
      blocks: 1.2,
      threePointersMade: 0.7,
      fieldGoalPercentage: 0.56,
      freeThrowPercentage: 0.65,
      gamesPlayed: 73,
      minutesPerGame: 35.2,
      turnovers: 3.9,
      personalFouls: 3.1,
    },
  },
  // Playoff stats for some key players
  {
    playerId: 'lebron-james',
    season: 2023,
    seasonType: 'playoffs',
    stats: {
      points: 28.5,
      rebounds: 8.2,
      assists: 9.1,
      steals: 1.5,
      blocks: 0.7,
      threePointersMade: 2.3,
      fieldGoalPercentage: 0.55,
      freeThrowPercentage: 0.76,
      gamesPlayed: 16,
      minutesPerGame: 38.2,
      turnovers: 3.3,
      personalFouls: 1.7,
    },
  },
  {
    playerId: 'nikola-jokic',
    season: 2023,
    seasonType: 'playoffs',
    stats: {
      points: 29.7,
      rebounds: 13.5,
      assists: 10.2,
      steals: 1.4,
      blocks: 0.9,
      threePointersMade: 1.3,
      fieldGoalPercentage: 0.59,
      freeThrowPercentage: 0.83,
      gamesPlayed: 18,
      minutesPerGame: 37.6,
      turnovers: 3.6,
      personalFouls: 2.7,
    },
  },
  {
    playerId: 'jayson-tatum',
    season: 2023,
    seasonType: 'playoffs',
    stats: {
      points: 28.9,
      rebounds: 9.3,
      assists: 5.2,
      steals: 1.2,
      blocks: 0.9,
      threePointersMade: 3.2,
      fieldGoalPercentage: 0.47,
      freeThrowPercentage: 0.86,
      gamesPlayed: 19,
      minutesPerGame: 39.2,
      turnovers: 3.1,
      personalFouls: 2.3,
    },
  },
];
