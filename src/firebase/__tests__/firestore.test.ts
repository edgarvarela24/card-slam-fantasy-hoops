import { describe, test, expect, jest, beforeEach } from '@jest/globals'
import { 
  addDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getCollection,
  queryCollection
} from '../firestore'
import { DocumentData, DocumentReference, QuerySnapshot, DocumentSnapshot } from 'firebase/firestore'

// Mock Firestore functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  getFirestore: jest.fn()
}))

// Mock Firebase app
jest.mock('../firebase', () => ({
  getFirestore: jest.fn().mockReturnValue({})
}))

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

describe('Firestore Service', () => {
  const mockCollectionName = 'users'
  const mockDocId = 'doc123'
  const mockData = { name: 'John Doe', email: 'john@example.com' }
  const mockDocRef = { id: mockDocId } as DocumentReference<DocumentData>
  const mockDocSnapshot = { 
    exists: jest.fn().mockReturnValue(true),
    data: jest.fn().mockReturnValue(mockData),
    id: mockDocId
  } as unknown as DocumentSnapshot<DocumentData>
  
  const mockQuerySnapshot = {
    docs: [mockDocSnapshot],
    empty: false
  } as unknown as QuerySnapshot<DocumentData>
  
  beforeEach(() => {
    jest.clearAllMocks()
    ;(collection as jest.Mock).mockReturnValue('mockCollection')
    ;(doc as jest.Mock).mockReturnValue(mockDocRef)
    ;(getDoc as jest.Mock).mockResolvedValue(mockDocSnapshot)
    ;(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot)
    ;(addDoc as jest.Mock).mockResolvedValue(mockDocRef)
    ;(updateDoc as jest.Mock).mockResolvedValue(undefined)
    ;(deleteDoc as jest.Mock).mockResolvedValue(undefined)
    ;(query as jest.Mock).mockReturnValue('mockQuery')
  })
  
  test('addDocument should add a document to a collection', async () => {
    const result = await addDocument(mockCollectionName, mockData)
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(addDoc).toHaveBeenCalledWith('mockCollection', mockData)
    expect(result).toBe(mockDocRef)
  })
  
  test('getDocument should retrieve a document by ID', async () => {
    const result = await getDocument(mockCollectionName, mockDocId)
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(doc).toHaveBeenCalledWith('mockCollection', mockDocId)
    expect(getDoc).toHaveBeenCalledWith(mockDocRef)
    expect(result).toEqual({
      id: mockDocId,
      ...mockData
    })
  })
  
  test('getDocument should return null if document does not exist', async () => {
    ;(mockDocSnapshot.exists as jest.Mock).mockReturnValueOnce(false)
    
    const result = await getDocument(mockCollectionName, mockDocId)
    
    expect(result).toBeNull()
  })
  
  test('updateDocument should update a document', async () => {
    await updateDocument(mockCollectionName, mockDocId, mockData)
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(doc).toHaveBeenCalledWith('mockCollection', mockDocId)
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, mockData)
  })
  
  test('deleteDocument should delete a document', async () => {
    await deleteDocument(mockCollectionName, mockDocId)
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(doc).toHaveBeenCalledWith('mockCollection', mockDocId)
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef)
  })
  
  test('getCollection should retrieve all documents in a collection', async () => {
    const result = await getCollection(mockCollectionName)
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(getDocs).toHaveBeenCalledWith('mockCollection')
    expect(result).toEqual([{
      id: mockDocId,
      ...mockData
    }])
  })
  
  test('queryCollection should query documents with filters', async () => {
    const mockFilters = [
      { field: 'name', operator: '==', value: 'John Doe' },
      { field: 'age', operator: '>', value: 18 }
    ]
    
    const mockSort = { field: 'createdAt', direction: 'desc' }
    const mockLimit = 10
    
    const result = await queryCollection(
      mockCollectionName, 
      mockFilters, 
      mockSort, 
      mockLimit
    )
    
    expect(collection).toHaveBeenCalledWith(expect.anything(), mockCollectionName)
    expect(where).toHaveBeenNthCalledWith(1, 'name', '==', 'John Doe')
    expect(where).toHaveBeenNthCalledWith(2, 'age', '>', 18)
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc')
    expect(limit).toHaveBeenCalledWith(10)
    expect(query).toHaveBeenCalled()
    expect(getDocs).toHaveBeenCalledWith('mockQuery')
    expect(result).toEqual([{
      id: mockDocId,
      ...mockData
    }])
  })
})