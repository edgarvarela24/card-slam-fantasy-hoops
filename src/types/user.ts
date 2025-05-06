/**
 * User settings for app preferences
 */
export interface UserSettings {
  notifications: boolean;
  soundEffects: boolean;
  theme: 'light' | 'dark';
}

/**
 * User model representing a player in the game
 */
export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  basketballPoints: number;
  level: number;
  experience: number;
  settings: UserSettings;
  lastActive: number;
  createdAt?: number;
}

/**
 * Create default user settings
 */
export const createDefaultUserSettings = (): UserSettings => ({
  notifications: true,
  soundEffects: true,
  theme: 'dark',
});

/**
 * Create new user with default values
 */
export const createNewUser = (
  id: string,
  displayName: string,
  email: string,
  avatarUrl?: string
): User => ({
  id,
  displayName,
  email,
  avatarUrl,
  basketballPoints: 0,
  level: 1,
  experience: 0,
  settings: createDefaultUserSettings(),
  lastActive: Date.now(),
  createdAt: Date.now(),
});
