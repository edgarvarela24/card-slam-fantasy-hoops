import { getFunctions, httpsCallable, Functions } from 'firebase/functions';
import { getFirebaseApp } from '../firebase';

/**
 * Gets the Firebase Cloud Functions instance
 *
 * @returns The Firebase Functions instance
 */
export const getCloudFunctions = (): Functions => getFunctions(getFirebaseApp());

/**
 * Calls a Firebase Cloud Function
 *
 * @param functionName The name of the function to call
 * @param data Optional data to pass to the function
 * @returns Promise resolving to the function result
 */
export const callFunction = async <T = unknown, D = unknown>(
  functionName: string,
  data?: D
): Promise<T> => {
  const functions = getCloudFunctions();
  const callableFunction = httpsCallable<D, T>(functions, functionName);
  const result = await callableFunction(data);
  return result.data;
};

// Function type definitions for our custom cloud functions
export interface ProcessPlayerDataParams {
  playerId: string;
  stats?: Record<string, unknown>;
}

export interface ProcessPlayerDataResult {
  success: boolean;
  processed: boolean;
  error?: string;
}

/**
 * Processes player data (example of a specific cloud function wrapper)
 *
 * @param params Parameters for the cloud function
 * @returns Promise resolving to the function result
 */
export const processPlayerData = async (
  params: ProcessPlayerDataParams
): Promise<ProcessPlayerDataResult> =>
  callFunction<ProcessPlayerDataResult>('processPlayerData', params);

// Additional cloud function wrappers would be added here as needed
