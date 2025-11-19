# Mini Games Box 🎮

A collection of classic mini-games built with React Native and Expo.

## Games Included

1. **🧩 1010 Block Puzzle** - Easy but addictive puzzle game
2. **🐍 Snake** - Classic arcade fun
3. **🔢 Sudoku** - Improve your focus
4. **📦 Sokoban** - Push-box logic challenge
5. **🍉 Merge Fruits** - Satisfying merges
6. **🎮 Tetris** - Classic falling blocks

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **Expo Router** - File-based routing
- **TypeScript** - Type-safe development
- **Vercel** - Hosting and deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
# Start the development server
npm start

# Run on web
npm run web

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Building for Web

```bash
npm run export
```

This will create a production build in the `dist` directory.

## Deployment

The project is configured to automatically deploy to Vercel when changes are pushed to the `main` branch.

### Setting up Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Your Vercel authentication token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

4. Push to main branch and GitHub Actions will handle the deployment automatically!

## Project Structure

```
mini-games-box/
├── app/
│   ├── _layout.tsx       # Root layout with navigation
│   ├── index.tsx         # Game selection home page
│   └── games/            # Individual game screens
│       ├── block-puzzle.tsx
│       ├── snake.tsx
│       ├── sudoku.tsx
│       ├── sokoban.tsx
│       ├── merge-fruits.tsx
│       └── tetris.tsx
├── assets/               # Images and static assets
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## Features

- 🎨 Beautiful, responsive UI
- 📱 Cross-platform (iOS, Android, Web)
- 🎮 6 classic games in one app
- 🚀 Fast navigation with Expo Router
- 🔄 Automatic deployment to Vercel
- 💅 Styled with React Native StyleSheet

## Development Roadmap

- [ ] Implement full game logic for all 6 games
- [ ] Add sound effects and music
- [ ] Implement high score tracking
- [ ] Add difficulty levels
- [ ] Create leaderboards
- [ ] Add game tutorials
- [ ] Implement achievements system
- [ ] Add dark mode support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
