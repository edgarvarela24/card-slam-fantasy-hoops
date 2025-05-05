import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { 
  getRealtimeDb, 
  getDatabaseRef, 
  writeData, 
  readData, 
  pushData, 
  updateData, 
  removeData, 
  queryByField 
} from '../database'

// This has been moved below

// Need to mock this first before importing the module we're testing
jest.mock('../firebase', () => ({
  getFirebaseApp: jest.fn().mockReturnValue({ name: 'mock-app' }),
  getRealtimeDatabase: jest.fn().mockReturnValue({ name: 'mock-db' })
}))

// Mock the database module
jest.mock('firebase/database', () => {
  const actualModule = jest.requireActual('firebase/database');
  return {
    ...actualModule,
    getDatabase: jest.fn().mockReturnValue({ name: 'mock-db' }),
    ref: jest.fn().mockReturnValue({ key: 'mock-ref' }),
    set: jest.fn().mockResolvedValue(undefined),
    get: jest.fn(),
    push: jest.fn().mockReturnValue({ key: 'new-key' }),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    query: jest.fn().mockReturnValue({ key: 'query-ref' }),
    orderByChild: jest.fn().mockReturnValue({ type: 'orderByChild' }),
    equalTo: jest.fn().mockReturnValue({ type: 'equalTo' }),
    limitToLast: jest.fn().mockReturnValue({ type: 'limitToLast' })
  };
})

import { 
  ref, 
  set, 
  get, 
  push, 
  update, 
  remove, 
  query, 
  orderByChild, 
  equalTo, 
  limitToLast 
} from 'firebase/database'

describe('Firebase Realtime Database', () => {
  const mockPath = 'users/123'
  const mockData = { name: 'John Doe', email: 'john@example.com' }
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('getRealtimeDb should return a database instance', () => {
    // Since we now define getRealtimeDatabase in database.ts, no need to check if it was called
    const db = getRealtimeDb()
    expect(db).toEqual({ name: 'mock-db' })
  })
  
  it('getDatabaseRef should return a reference to a database location', () => {
    const dbRef = getDatabaseRef(mockPath)
    
    expect(ref).toHaveBeenCalledWith({ name: 'mock-db' }, mockPath)
    expect(dbRef).toEqual({ key: 'mock-ref' })
  })
  
  it('writeData should write data to a database location', async () => {
    await writeData(mockPath, mockData)
    
    expect(ref).toHaveBeenCalled()
    expect(set).toHaveBeenCalledWith({ key: 'mock-ref' }, mockData)
  })
  
  it('readData should read data from a database location', async () => {
    const mockSnapshot = {
      exists: jest.fn().mockReturnValue(true),
      val: jest.fn().mockReturnValue(mockData)
    }
    
    ;(get as jest.Mock).mockResolvedValueOnce(mockSnapshot)
    
    const result = await readData(mockPath)
    
    expect(ref).toHaveBeenCalled()
    expect(get).toHaveBeenCalledWith({ key: 'mock-ref' })
    expect(result).toEqual(mockData)
  })
  
  it('readData should return null if data does not exist', async () => {
    const mockSnapshot = {
      exists: jest.fn().mockReturnValue(false),
      val: jest.fn()
    }
    
    ;(get as jest.Mock).mockResolvedValueOnce(mockSnapshot)
    
    const result = await readData(mockPath)
    
    expect(result).toBeNull()
  })
  
  it('pushData should generate a new key and write data', async () => {
    await pushData(mockPath, mockData)
    
    expect(push).toHaveBeenCalled()
    expect(set).toHaveBeenCalledWith({ key: 'new-key' }, mockData)
  })
  
  it('updateData should update specific fields', async () => {
    const mockUpdates = { name: 'Jane Doe' }
    
    await updateData(mockPath, mockUpdates)
    
    expect(ref).toHaveBeenCalled()
    expect(update).toHaveBeenCalledWith({ key: 'mock-ref' }, mockUpdates)
  })
  
  it('removeData should remove data at a location', async () => {
    await removeData(mockPath)
    
    expect(ref).toHaveBeenCalled()
    expect(remove).toHaveBeenCalledWith({ key: 'mock-ref' })
  })
  
  it('queryByField should query data by a field value', async () => {
    const mockField = 'name'
    const mockValue = 'John Doe'
    const mockLimit = 10
    
    const mockSnapshot = {
      exists: jest.fn().mockReturnValue(true),
      val: jest.fn().mockReturnValue(mockData)
    }
    
    ;(get as jest.Mock).mockResolvedValueOnce(mockSnapshot)
    
    const result = await queryByField(mockPath, mockField, mockValue, mockLimit)
    
    expect(query).toHaveBeenCalledWith(
      { key: 'mock-ref' },
      { type: 'orderByChild' },
      { type: 'equalTo' },
      { type: 'limitToLast' }
    )
    expect(orderByChild).toHaveBeenCalledWith(mockField)
    expect(equalTo).toHaveBeenCalledWith(mockValue)
    expect(limitToLast).toHaveBeenCalledWith(mockLimit)
    expect(result).toEqual(mockData)
  })
  
  it('queryByField should return null if no data matches', async () => {
    const mockField = 'name'
    const mockValue = 'Jane Doe'
    
    const mockSnapshot = {
      exists: jest.fn().mockReturnValue(false),
      val: jest.fn()
    }
    
    ;(get as jest.Mock).mockResolvedValueOnce(mockSnapshot)
    
    const result = await queryByField(mockPath, mockField, mockValue)
    
    expect(result).toBeNull()
  })
})