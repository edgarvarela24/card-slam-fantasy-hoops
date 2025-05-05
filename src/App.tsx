// App component
import './App.css'
import { AuthProvider } from './firebase/auth-context'
import AuthStatus from './components/AuthStatus'
import FirebaseStatus from './components/FirebaseStatus'

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Card Slam Fantasy Hoops</h1>
          <div className="auth-container">
            <AuthStatus />
          </div>
        </header>
        
        <main className="app-main">
          <section className="welcome-section">
            <h2>Welcome to Card Slam Fantasy Hoops!</h2>
            <p>
              Collect digital basketball cards, create lineups, and compete based on real NBA player performances.
            </p>
            <div className="features">
              <div className="feature">
                <h3>Collect Cards</h3>
                <p>Open packs to discover and collect NBA player cards of varying rarities.</p>
              </div>
              <div className="feature">
                <h3>Build Lineups</h3>
                <p>Create strategic lineups with your card collection.</p>
              </div>
              <div className="feature">
                <h3>Earn Points</h3>
                <p>Score points based on real NBA player performances.</p>
              </div>
            </div>
          </section>
          
          {/* Firebase status section */}
          <section className="firebase-status-section">
            <h2>System Status</h2>
            <FirebaseStatus />
          </section>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Card Slam Fantasy Hoops</p>
        </footer>
      </div>
    </AuthProvider>
  )
}

export default App
