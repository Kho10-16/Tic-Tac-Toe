# Tic Tac Toe

A browser-based Tic Tac Toe game built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) JavaScript course.

## Live Demo

[Play it here](https://kho10-16.github.io/Tic-Tac-Toe/)

## Features

- Two players take turns on the same device
- Players can enter custom names
- Detects wins across all rows, columns and diagonals, as well as ties
- Prevents moves on squares that are already taken
- Start / Restart button to play again
- Result is displayed on the page when the game ends

## Built With

- HTML
- CSS (Flexbox and Grid)
- JavaScript (vanilla, no libraries)

## Project Structure

```
├── index.html   # Page layout
├── style.css    # Board and layout styling
└── script.js    # Game logic and display
```

The JavaScript is split into four parts, each with one responsibility:

| Part | Pattern | Responsibility |
|---|---|---|
| `Gameboard` | Module (IIFE) | Stores the 9 squares and places marks |
| `createPlayer` | Factory function | Creates a player with a name and mark |
| `GameController` | Module (IIFE) | Controls turns, checks for wins and ties |
| `displayController` | Module (IIFE) | Renders the board and handles clicks |

## What I Learned

- Using the module pattern (IIFE) for objects that need only one instance
- Using factory functions for objects that need multiple instances
- Keeping state private with closures and exposing only what is needed
- Keeping global code to a minimum
- Separating game logic from the DOM, and building a working console version first
- Using event delegation so clicks still work after the board is re-rendered

## How to Run Locally

1. Clone this repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```
2. Open `index.html` in your browser

## Acknowledgements

Project brief from [The Odin Project](https://www.theodinproject.com/).