// Simple mock version of AuthStatus for testing
import React from 'react'

// Mock implementation that doesn't depend on anything
const AuthStatus: React.FC = () => (
  <div data-testid="auth-status">
    <div>Mock Auth Status Component</div>
  </div>
)

export default AuthStatus