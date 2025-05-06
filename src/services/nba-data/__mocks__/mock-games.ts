import { NBAGame } from '../types';

/**
 * Mock NBA game data
 * This data is used for development and testing purposes
 */
export const mockGames: NBAGame[] = [
  // Christmas games
  {
    id: 'game-lal-bos-20231225',
    homeTeam: 'LAL',
    awayTeam: 'BOS',
    homeScore: 122,
    awayScore: 118,
    date: '2023-12-25T20:00:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },
  {
    id: 'game-gsw-den-20231225',
    homeTeam: 'GSW',
    awayTeam: 'DEN',
    homeScore: 120,
    awayScore: 124,
    date: '2023-12-25T22:30:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },
  {
    id: 'game-mil-phi-20231225',
    homeTeam: 'MIL',
    awayTeam: 'PHI',
    homeScore: 115,
    awayScore: 108,
    date: '2023-12-25T17:30:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },

  // New Year's Eve games
  {
    id: 'game-pho-lal-20231231',
    homeTeam: 'PHX',
    awayTeam: 'LAL',
    homeScore: 119,
    awayScore: 127,
    date: '2023-12-31T21:00:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },
  {
    id: 'game-mia-nyk-20231231',
    homeTeam: 'MIA',
    awayTeam: 'NYK',
    homeScore: 104,
    awayScore: 100,
    date: '2023-12-31T15:30:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },

  // All-Star weekend
  {
    id: 'game-allstar-2024',
    homeTeam: 'BOS', // East
    awayTeam: 'LAL', // West (location only, not actual teams)
    homeScore: 184,
    awayScore: 175,
    date: '2024-02-18T20:00:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'preseason', // All-Star game is technically not regular season
  },

  // Upcoming games
  {
    id: 'game-bos-mil-20240506',
    homeTeam: 'BOS',
    awayTeam: 'MIL',
    homeScore: 0,
    awayScore: 0,
    date: '2024-05-06T19:30:00Z',
    status: 'scheduled',
    season: 2023,
    seasonType: 'playoffs',
  },
  {
    id: 'game-den-pho-20240507',
    homeTeam: 'DEN',
    awayTeam: 'PHX',
    homeScore: 0,
    awayScore: 0,
    date: '2024-05-07T21:00:00Z',
    status: 'scheduled',
    season: 2023,
    seasonType: 'playoffs',
  },

  // Regular season games
  {
    id: 'game-lal-gsw-20240115',
    homeTeam: 'LAL',
    awayTeam: 'GSW',
    homeScore: 134,
    awayScore: 130,
    date: '2024-01-15T22:00:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },
  {
    id: 'game-phi-nyk-20240116',
    homeTeam: 'PHI',
    awayTeam: 'NYK',
    homeScore: 112,
    awayScore: 106,
    date: '2024-01-16T19:30:00Z',
    status: 'finished',
    season: 2023,
    seasonType: 'regular',
  },
];
