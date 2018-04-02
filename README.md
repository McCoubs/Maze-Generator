# Maze-Generator

- Defines a series of classes in Javascript in order to randomly generate a maze 
- A Maze is generated using the depth-first backtracking method, which explores a given path at random, and stores the path traveled in a stack. The script explores a path until not possible, at which time it "backtracks" by popping off the path travelled stack to continue along another path
- All of the functionality within a Maze and Cells are defined here as well as within their respective methods and files 

## General Usage

- To use the Maze or Cell classes, import them as your project needs

### Maze Class

- A Maze simplified is an array, representing rows, comprised of arrays, representing columns, comprised of Cells as each node within the array
- All getters and setters are not defined below, as they are simple enough as to not require explanation here

#### `constructor(width, height)`

- the constructor of the Maze class allows for 2 inputs, width and height
- the constructor creates a basic maze, un-traversed with default Cells

#### `generate()`

- to create a maze with a path, call the generate() method on the Maze object, methods returns the Maze object's context
- this sets the path within the grid, and alters the Cells
- also sets the finalRoom property

#### `getCell(x, y)`

- method returns a Cell within the Maze at the specified x and y coordinates supplied ot the method

#### `reset()`

- method resets all the internal Cells back to default state
- method also resets final room back to undefined default

#### `checkStatus(x, y)`

- method returns a boolean representing if the supplied coordinates match those of the final room as set by the generate method

### Cell Class

- A Cell is a multipurpose object holding pertinent and necessary information only about itself
- A Cell has no knowledge of its sibling or its placement
- A Cell can be extended/overwritten in order to fit the implementers needs

#### `constructor()`

- Cell constructor takes no arguments
- constructor sets a Cell to its default state, all sides walled, and unvisited

#### `reset()`

- method resets all of a Cell's properties back to default: all sides walled and unvisited

#### `toString()`

- method returns the string representation of a large version of the cell

## Command-Line Setup Instructions

- Clone the repo locally onto your system
- Navigate to main directory within a terminal and run `npm install`
- run ```node ~pathToParentDirectory/src/main {width} {height} {easy}``` from your terminal
  - {width} and {height} correspond to the desired width and height of the Maze generated
  - {easy} corresponds to a boolean, true or false(by default), sets easy mode for user

## Command-Line Running Instructions

### Terminal Outputs

#### Winning
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

### Navigation 

#### Arrow Keys
Navigate the Maze using the arrow keys, where there is a door in a room, you will be allowed to move through

#### M Key
The `M` key allows the user to switch between the room by room display or the overall maze view

#### N Key
The `N` key allows the user to reset the maze and generate a new one at random, keeping all other presets

#### E Key
The `E` key allows the user to toggle the easy mode preset. On the large map view, this shows where open doors are

## Running Tests

- to run tests, first run `npm install` in parent directory in order to install the jasmine testing suite
- next, run `node ~pathToParentDirectory/test-lib/test-runner`, output of the tests will be printed out to the terminal
- to add to tests, file names must be suffixed with `-test` and placed within the `tests` subfolder of the `test-lib` directory