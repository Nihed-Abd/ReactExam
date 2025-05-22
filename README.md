# Tunisian Football Federation - React Application

This project is a preparation for the "Application Côté Client 2" exam scheduled for May 22, 2025. It implements a web application for managing the Tunisian national football team players using React.

## Project Requirements

### Technical Stack
- **React JS 18** - Frontend framework
- **Vite** - Build tool
- **JSON Server** - For Part A (simulating API endpoints)
- **Redux Toolkit** - For Part B (managing player groups)
- **React Router** - For navigation between components
- **React Bootstrap** (optional) - For UI components

### Required Dependencies
```bash
npm install react-router-dom json-server axios react-hook-form @hookform/resolvers zod zustand
```

## Project Structure

The application follows this component structure:
```
App
├── Players
│   └── Player
├── AddPlayer
├── PlayerDetails
└── NavigationBar
```

## Features Implementation

### Part A (JSON Server - 15 points)

1. **Players Component** (3.5 pts)
   - Fetch and display list of players from API
   - Implement Player subcomponent to display individual player cards

2. **AddPlayer Component** (4 pts)
   - Form to add new players
   - Update db.json when form is submitted
   - Fields: FirstName, LastName, Position, Weight, Yellow Cards, Image

3. **Delete Functionality** (1 pt)
   - Add Delete button for each player
   - Remove player from list when button is clicked

4. **PlayerDetails Component** (2 pts)
   - Display detailed info about a player
   - Access via clicking on player name
   - Show "Not Found" message if player ID doesn't exist

5. **NavigationBar Component** (1 pt)
   - Create navigation bar with links to Players and Add Player pages

6. **Search Functionality** (3.5 pts)
   - Add search form to filter players by number of yellow cards
   - Real-time filtering as user types

### Part B (Redux Toolkit - 5 points)

1. **Group Management** (1.5 pts)
   - Add "Add to Group 1/2/3" buttons in player details
   - Buttons should be disabled if player has 3+ yellow cards

2. **Group Assignment Functionality** (3.5 pts)
   - Add player to selected group when button is clicked
   - Update Redux store
   - Update API
   - Display alert message showing which group the player was added to

## Getting Started

1. **Start JSON Server**
```bash
npx json-server --watch src/data/db.json --port 5173
```

2. **Start Development Server**
```bash
npm run dev
```

## Data Structure

The `db.json` file contains player information with the following structure:
```json
{
  "players": [
    {
      "id": 1,
      "firstName": "Bechir",
      "lastName": "Ben Saïd",
      "position": "gardien",
      "weight": 73,
      "yellowCards": 2,
      "image": "path/to/image.jpg",
      "group": "groupe3"
    }
  ]
}
```

## Exam Preparation Checklist

- [ ] Project folder named correctly: `nom_prenom`
- [ ] Components structure follows the specified hierarchy
- [ ] JSON Server setup and functioning
- [ ] Redux Toolkit implemented for group management
- [ ] All UI elements match the provided screenshots
- [ ] Form validation for adding new players
- [ ] Search functionality working properly
- [ ] Group assignment logic implemented correctly

## Notes

- A player can only be assigned to a group if they have fewer than 3 yellow cards
- All components must be functional components
- The application must adhere to the component hierarchy shown in Figure 1
