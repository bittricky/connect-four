# Connect Four

A web application of the classic Connect Four. It features a responsive design, smooth animations, and an AI opponent to play against.

## Features

- Two game modes:
  - Player vs Player
  - Player vs CPU (with three difficulty levels)
- Smart AI opponent using minimax algorithm
- 30-second turn timer
- Clean, responsive UI with subtle animations
- Mobile-friendly design
- Score tracking
- Game rules and instructions
- Accessible and keyboard-friendly

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)
- Vite (for development and building)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/connect-four.git
cd connect-four
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Rules

1. Players take turns dropping colored discs into the grid
2. Each player has 30 seconds to make their move
3. The first player to connect four discs in a row (horizontally, vertically, or diagonally) wins
4. If the timer runs out, the turn passes to the other player
5. The game ends when a player wins or the board is full (draw)

## AI Difficulty Levels

- **Easy**: AI looks 2 moves ahead
- **Medium**: AI looks 4 moves ahead
- **Hard**: AI looks 6 moves ahead

## Project Structure

```
src/
├── components/         # React components
│   ├── Board.tsx       # Game board component
│   ├── Cell.tsx        # Individual cell component
│   ├── Menu.tsx        # Game menu with rules
│   ├── Home.tsx        # Welcome screen
│   ├── ScoreCard.tsx   # Player score display
│   └── Timer.tsx       # Turn timer component
├── hooks/
│   └── useGameLogic.ts # Game logic and state management
├── types/
│   └── game.ts         # TypeScript types and interfaces
├── utils/
│   └── ai.ts           # AI opponent implementation
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Features Explained

### AI Implementation

The AI opponent uses the minimax algorithm with alpha-beta pruning for efficient decision-making. The algorithm evaluates potential moves by:

1. Looking ahead a certain number of moves (based on difficulty)
2. Evaluating board positions using a scoring system
3. Choosing the move that leads to the best possible outcome

### Game State Management

The game state is managed using React hooks and includes:

- Current board state
- Player turns
- Score tracking
- Timer management
- Game mode and difficulty settings

### Animations

The game features smooth animations for:

- Disc drops
- Hover effects
- Menu transitions
- Victory celebrations

### Credits

scaffolded with [Vite](https://vite.dev/guide/)
