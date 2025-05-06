import React, { useState, useEffect } from 'react'
import { getFirebaseApp } from '../firebase'
import { getDatabase, ref, set, get, remove } from 'firebase/database'
import { firebaseConfig } from '../firebase/config'

interface ServiceStatus {
  name: string
  status: 'checking' | 'connected' | 'error'
  message: string
}

const FirebaseStatus: React.FC = () => {
  const [overallStatus, setOverallStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [message, setMessage] = useState('Checking Firebase connection...')
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([
    { name: 'Firebase Initialization', status: 'checking', message: 'Checking...' },
    { name: 'Realtime Database', status: 'checking', message: 'Checking...' }
  ])
  const [configInfo, setConfigInfo] = useState<string[]>([])
  const [showConfig, setShowConfig] = useState(false)

  useEffect(() => {
    // Check if all required configuration values are present
    const validateConfig = () => {
      const requiredKeys = [
        'apiKey', 'authDomain', 'projectId', 
        'storageBucket', 'messagingSenderId', 'appId'
      ]
      
      const config = { ...firebaseConfig }
      const missingKeys = requiredKeys.filter(key => !(key in config) || !config[key as keyof typeof firebaseConfig])
      
      const configValues = Object.entries(config).map(([key, value]) => 
        `${key}: ${value ? (String(value)).substring(0, 5) + '...' : 'undefined'}`
      )
      
      setConfigInfo(configValues)
      
      if (missingKeys.length > 0) {
        setServiceStatuses(prev => prev.map(service => 
          service.name === 'Firebase Initialization' 
            ? { 
                ...service, 
                status: 'error', 
                message: `Missing configuration keys: ${missingKeys.join(', ')}` 
              } 
            : service
        ))
        return false
      }
      
      setServiceStatuses(prev => prev.map(service => 
        service.name === 'Firebase Initialization' 
          ? { ...service, status: 'connected', message: 'Configuration is valid' } 
          : service
      ))
      
      return true
    }

    const checkRealtimeDatabase = async () => {
      try {
        // Test writing to Firebase
        const app = getFirebaseApp()
        const db = getDatabase(app)
        const testRef = ref(db, 'connectionTest')
        
        // Write a timestamp
        const timestamp = new Date().toISOString()
        await set(testRef, { timestamp, message: 'Connection test successful' })
        
        // Read it back
        const snapshot = await get(testRef)
        
        if (snapshot.exists()) {
          setServiceStatuses(prev => prev.map(service => 
            service.name === 'Realtime Database' 
              ? { ...service, status: 'connected', message: 'Connected successfully' } 
              : service
          ))
          
          // Clean up test data
          await remove(testRef)
          return true
        } else {
          setServiceStatuses(prev => prev.map(service => 
            service.name === 'Realtime Database' 
              ? { ...service, status: 'error', message: 'Unable to read test data' } 
              : service
          ))
          return false
        }
      } catch (error) {
        setServiceStatuses(prev => prev.map(service => 
          service.name === 'Realtime Database' 
            ? { 
                ...service, 
                status: 'error', 
                message: `Error: ${error instanceof Error ? error.message : String(error)}` 
              } 
            : service
        ))
        console.error('Firebase Realtime Database error:', error)
        return false
      }
    }

    const checkConnection = async () => {
      // First validate configuration
      const configValid = validateConfig()
      if (!configValid) {
        setOverallStatus('error')
        setMessage('Firebase configuration is invalid. Check the details below.')
        return
      }
      
      // Then check Realtime Database
      const dbConnected = await checkRealtimeDatabase()
      
      // Determine overall status
      if (configValid && dbConnected) {
        setOverallStatus('connected')
        setMessage('Firebase is properly configured and connected!')
      } else {
        setOverallStatus('error')
        setMessage('Firebase connection has issues. Check the details below.')
      }
    }

    checkConnection()
  }, [])

  const toggleShowConfig = () => {
    setShowConfig(prev => !prev)
  }

  const getInfoBox = () => {
    if (overallStatus === 'error') {
      return (
        <div className="help-box" style={{ 
          padding: '1rem', 
          marginTop: '1rem',
          backgroundColor: '#ffebee',
          borderRadius: '0.5rem',
          border: '1px solid #b71c1c' 
        }}>
          <h4 style={{ color: '#b71c1c', marginTop: 0 }}>Troubleshooting Help</h4>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
            <li>Check if you've created a Firebase project in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
            <li>Verify your environment variables in the <code>.env</code> file match your Firebase project configuration</li>
            <li>Make sure Firebase Realtime Database is enabled in your project</li>
            <li>Check that database rules allow read/write access to test data</li>
            <li>For help, see <code>docs/FIREBASE_SETUP_GUIDE.md</code></li>
          </ol>
        </div>
      )
    }
    
    return null
  }

  return (
    <div className="firebase-status">
      <h3>Firebase Connection Status</h3>
      
      {/* Overall status */}
      <div 
        className={`status-indicator ${overallStatus}`}
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: overallStatus === 'connected' ? '#e6f7ed' : overallStatus === 'error' ? '#ffebee' : '#fff9c4',
          color: overallStatus === 'connected' ? '#1b5e20' : overallStatus === 'error' ? '#b71c1c' : '#f57f17',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}
      >
        {overallStatus === 'connected' ? '✅ ' : overallStatus === 'error' ? '❌ ' : '⏳ '}
        {message}
      </div>
      
      {/* Service status details */}
      <div className="service-statuses">
        {serviceStatuses.map((service, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',
              borderBottom: '1px solid #eee',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{service.name}</div>
            <div style={{ 
              color: service.status === 'connected' ? '#1b5e20' : service.status === 'error' ? '#b71c1c' : '#f57f17'
            }}>
              {service.status === 'connected' ? '✅ ' : service.status === 'error' ? '❌ ' : '⏳ '}
              {service.message}
            </div>
          </div>
        ))}
      </div>
      
      {/* Config information (hidden by default) */}
      <button 
        onClick={toggleShowConfig}
        style={{
          marginTop: '1rem',
          backgroundColor: 'transparent',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          padding: '0.25rem 0.5rem',
          cursor: 'pointer'
        }}
      >
        {showConfig ? 'Hide' : 'Show'} Configuration Info
      </button>
      
      {showConfig && (
        <div 
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '0.25rem',
            fontSize: '0.8rem',
            fontFamily: 'monospace'
          }}
        >
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
            Firebase Configuration (partial):
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {configInfo.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Help box for troubleshooting */}
      {getInfoBox()}
    </div>
  )
}

export default FirebaseStatus