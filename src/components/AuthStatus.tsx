import React, { useState } from 'react';
import { useAuth } from '../firebase/auth-context';

// Styles for the component
const styles = {
  authContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: 'white',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#007BFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  authButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  authModal: {
    position: 'absolute' as const,
    top: '70px',
    right: '20px',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 10,
    maxWidth: '300px',
    color: '#333',
  },
  modalHeader: {
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  loader: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTop: '3px solid white',
    animation: 'spin 1s linear infinite',
  },
};

const AuthStatus: React.FC = () => {
  const { user, loading, signIn, signUp, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      // Clear form and hide modal after successful login
      setEmail('');
      setPassword('');
      setShowLoginForm(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError(String(err));
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(email, password);
      // Clear form and hide modal after successful signup
      setEmail('');
      setPassword('');
      setShowLoginForm(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError(String(err));
      }
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError(String(err));
      }
    }
  };

  // Helper function to get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div style={styles.authContainer} data-testid="auth-status">
        <div style={styles.loader}></div>
      </div>
    );
  }

  if (user) {
    return (
      <div style={styles.userInfo} data-testid="auth-status">
        <div style={styles.avatar}>{getUserInitials()}</div>
        <span>{user.email}</span>
        <button onClick={handleLogout}>Log Out</button>
        {error && (
          <div data-testid="auth-error" className="error">
            Error: {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.authContainer}>
      <div data-testid="auth-status" style={{ display: 'none' }}>
        Not logged in
      </div>
      <button onClick={() => setShowLoginForm(true)}>Sign In</button>

      {showLoginForm && (
        <div style={styles.authModal}>
          <div style={styles.modalHeader}>
            <h3>Sign In to Your Account</h3>
          </div>
          <form onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div data-testid="auth-error" className="error">
                Error: {error}
              </div>
            )}
            <div style={styles.modalButtons}>
              <button type="button" onClick={() => setShowLoginForm(false)}>
                Cancel
              </button>
              <div style={styles.authButtons}>
                <button type="button" onClick={handleSignUp}>
                  Sign Up
                </button>
                <button type="submit">Sign In</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;
