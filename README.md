# Maze-Generator

- Defines a series of classes in Javascript in order to randomly generate a maze. 

- A Maze is generated using the depth-first backtracking method, which explores a given path at random, and stores the path traveled in a stack. The script explores a path until not possible, at which time it "backtracks" by popping off the path travelled stack to continue along another path. 

- The maze is a grid, comprised of Cell objects, defined within this repo as well.

- All of the functionality within a Maze and Cells are defined within their methods and respective files 

## Command-Line Setup Instructions

- Clone the repo locally onto your system
- Navigate to main directory within a terminal and run `npm install`
- run ```node ~pathToSrcFolder\main {width} {height} {easy}``` from your terminal
- {width} and {height} correspond to the desired width and height of the Maze generated
- {easy} corresponds to a boolean, true or false(by default), sets easy mode for user

## Command-Line Running Instructions

### Navigation/Terminal Outputs

### `Winning`
Upon arriving at the final room, the user will be congratulated, and the terminal process will end

#### User Information

- `X` represents the destination room
- `@` is the current position of the user within the maze

#### Map Displays
The terminal will output 3 different formats of the maze based on the user inputs 
```
+----------+ 
|          |    +---+---+    +---+---+
|          |    | @ |   |    | @     |
             OR +---+---+ OR +---+   +
|          |    | X |   |    | X     |
|          |    +---+---+    +---+---+
+----------+
```

### `Arrow Keys`
Navigate the Maze using the arrow keys, where there is a door in a room, you will be allowed to move through

### `M Key`
The `M` key allows the user to switch between the room by room display or the overall maze view

### `N Key`
The `N` key allows the user to reset the maze and generate a new one at random, keeping all other presets

### `E Key`
The `E` key allows the user to toggle the easy mode preset. On the large map view, this shows where open doors are