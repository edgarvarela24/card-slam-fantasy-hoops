import { describe, test, expect, beforeEach } from '@jest/globals';
import { callFunction, getCloudFunctions } from '../functions';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Mock Firebase Functions
jest.mock('firebase/functions', () => ({
  getFunctions: jest.fn(),
  httpsCallable: jest.fn(),
}));

// Mock Firebase app
jest.mock('../../firebase', () => ({
  getFirebaseApp: jest.fn(),
}));

describe('Firebase Cloud Functions', () => {
  const mockFunctionName = 'processPlayerData';
  const mockData = { playerId: '123', stats: { points: 25 } };
  const mockResult = { success: true, processed: true };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFunctions as jest.Mock).mockReturnValue({ name: 'mockFunctions' });
    (httpsCallable as jest.Mock).mockReturnValue(jest.fn().mockResolvedValue({ data: mockResult }));
  });

  test('getCloudFunctions returns Firebase Functions instance', () => {
    const functions = getCloudFunctions();

    expect(getFunctions).toHaveBeenCalled();
    expect(functions).toEqual({ name: 'mockFunctions' });
  });

  test('callFunction calls a Cloud Function with data', async () => {
    const result = await callFunction(mockFunctionName, mockData);

    expect(getFunctions).toHaveBeenCalled();
    expect(httpsCallable).toHaveBeenCalledWith({ name: 'mockFunctions' }, mockFunctionName);
    expect(result).toEqual(mockResult);
  });

  test('callFunction works with no data', async () => {
    await callFunction(mockFunctionName);

    expect(httpsCallable).toHaveBeenCalledWith({ name: 'mockFunctions' }, mockFunctionName);

    // Get the mock function that was returned by httpsCallable
    const mockCallableFunction = (httpsCallable as jest.Mock).mock.results[0].value;

    // Verify it was called with undefined
    expect(mockCallableFunction).toHaveBeenCalledWith(undefined);
  });
});
