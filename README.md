## <i>[CEN 4010] GROUP 4'S TIC-TAC-TOE</i>

# DEPLOYMENT URL
We have decided to deploy to Vercel. This deployment is based off a clone of the base repo so code is not directly synced but must be updated manually to the other repo.
[Visit our Deployment here](https://soft-eng-project-egre.vercel.app/)


# INSTALLATION
- Install Node.js on your system (current vers)
- Clone repository from GitHub
   - ```git clone https://github.com/UNF-CEN4010/G4```
- Install dependencies
   - ```npm install```
   - or yarn or pnpm
- Run development server
    - ```npm run dev```
- Build
    - ```npm run build```



# GAME INFORMATION
- PLAYER MAX: 2
- BOARD SIZE: 3x3 (fixed)

The current version of our Tic-Tac-Toe web application is fairly simple to learn. It requires two players, both playing from the same browser, though one can play by themself for a solo experience.

The goal of the game is for one of the players to mark 3 squares with their respective marking in either a horizontal, vertical, or diagonal row. If neither player is able to get 3-in-a-row, the game will result in a tie. Both players have a maximum of 30 seconds to play through their game (we believe a shorter game length would encourage more fun). After time runs out, the game will end.

The player who takes the first turn is assigned the "O" marking and is designated Player 0. The player that follows is assigned the "X" marking and is designated Player 1.

The header bar displays (from left-to-right) Player 0's score, the timer, and Player 1's score. The box surrounding a player's name will highlight red to indicate that it is their turn.

Players are able to replay the game as often as they'd like to see who can get the highest score.

# UNIT TESTING

This project is built on the vite/react framework, utilizing Vitest as our unit testing framework.
These test files (lib (*.spec.ts) and /tests (.js)) can be found. These unit tests are written to test utility functions as well as testing the game logic functions.
