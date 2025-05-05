# Card Slam Fantasy Hoops

A modern, addictive fantasy basketball game with collectible player cards and real-time updates.

## Project Overview

Card Slam Fantasy Hoops is a web-based fantasy basketball game where players can:
- Collect digital basketball player cards
- Create lineups with their cards
- Earn points based on real NBA player performances
- Open packs to discover new cards
- Trade and improve their collection

## Development Setup

### Prerequisites
- Node.js (v18+ recommended)
- Yarn (v4.9+ recommended)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/card-slam-fantasy-hoops.git
   cd card-slam-fantasy-hoops
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Set up Firebase integration
   ```bash
   # Run the Firebase setup script to create your .env file
   yarn setup:firebase
   
   # After setting up your Firebase project, validate the configuration
   yarn validate:firebase
   ```
   
   See [Firebase Setup Guide](docs/FIREBASE_SETUP_GUIDE.md) for detailed instructions.

### Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production-ready application
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn preview` - Preview the production build locally
- `yarn setup:firebase` - Interactive setup for Firebase configuration
- `yarn validate:firebase` - Validate Firebase configuration
- `yarn test:firebase` - Run comprehensive tests on Firebase services

## Project Structure

```
card-slam-fantasy-hoops/
├── .github/              # GitHub workflows and templates
├── docs/                 # Documentation files
│   └── FIREBASE_SETUP_GUIDE.md  # Firebase setup instructions
├── public/               # Static assets
├── src/
│   ├── assets/           # Project assets
│   ├── components/       # Reusable components
│   │   ├── AuthStatus.tsx      # Authentication status component
│   │   └── FirebaseStatus.tsx  # Firebase connection status component
│   ├── firebase/         # Firebase configuration and services
│   │   ├── auth.ts             # Firebase authentication
│   │   ├── database.ts         # Realtime Database operations
│   │   ├── firebase.ts         # Firebase app configuration
│   │   ├── firestore.ts        # Firestore database operations
│   │   ├── AuthContext.tsx     # Authentication context provider
│   │   └── functions/          # Cloud Functions interfaces
│   ├── scripts/          # Utility scripts
│   │   ├── setupEnv.js         # Script to set up .env file
│   │   └── validateFirebaseConfig.ts  # Script to validate Firebase config
│   ├── App.tsx           # Main component
│   └── main.tsx          # Application entry point
├── .env.example          # Example environment variables
├── eslint.config.js      # ESLint configuration
├── jest.config.cjs       # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## Development Philosophy

We follow these principles:
- Test-Driven Development (TDD)
- Clean, minimal code with limited comments
- SOLID, DRY, and KISS principles
- Functional components with hooks
- Type safety with TypeScript

## Contributing

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests
   ```bash
   yarn test
   ```

4. Push your branch and create a pull request

## License

[MIT](LICENSE)