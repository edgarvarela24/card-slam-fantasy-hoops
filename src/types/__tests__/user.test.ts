import { User, UserSettings } from '../user';

describe('User Type', () => {
  it('should create a valid User object with required fields', () => {
    const user: User = {
      id: 'user123',
      displayName: 'TestUser',
      email: 'test@example.com',
      basketballPoints: 100,
      level: 1,
      experience: 0,
      lastActive: new Date().getTime(),
      settings: {
        notifications: true,
        soundEffects: true,
        theme: 'dark',
      },
    };

    expect(user.id).toBe('user123');
    expect(user.displayName).toBe('TestUser');
    expect(user.email).toBe('test@example.com');
    expect(user.basketballPoints).toBe(100);
    expect(user.level).toBe(1);
    expect(user.experience).toBe(0);
    expect(user.settings.notifications).toBe(true);
    expect(user.settings.soundEffects).toBe(true);
    expect(user.settings.theme).toBe('dark');
  });

  it('should create a valid User object with optional fields', () => {
    const user: User = {
      id: 'user123',
      displayName: 'TestUser',
      email: 'test@example.com',
      basketballPoints: 100,
      level: 1,
      experience: 0,
      lastActive: new Date().getTime(),
      settings: {
        notifications: true,
        soundEffects: true,
        theme: 'dark',
      },
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: new Date().getTime(),
    };

    expect(user.id).toBe('user123');
    expect(user.avatarUrl).toBe('https://example.com/avatar.jpg');
    expect(user.createdAt).toBeDefined();
  });

  it('should validate user settings with different theme options', () => {
    const lightSettings: UserSettings = {
      notifications: false,
      soundEffects: false,
      theme: 'light',
    };

    const darkSettings: UserSettings = {
      notifications: true,
      soundEffects: true,
      theme: 'dark',
    };

    expect(lightSettings.theme).toBe('light');
    expect(darkSettings.theme).toBe('dark');
  });
});