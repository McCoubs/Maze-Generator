# Maze-Generator

- Defines a series of classes in Javascript in order to randomly generate a maze. 

- A Maze is generated using the depth-first backtracking method, which explores a given path at random, and stores the path traveled in a stack. The script explores a path until not possible, at which time it "backtracks" by popping off the path travelled stack to continue along another path. 

- The maze is a grid, comprised of Cell objects, defined within this repo as well.

- All of the functionality within a Maze and Cells are defined within their methods and respective files 

<example src="examples/example.html />
## Command-Line Setup Instructions

1. Clone the repo locally onto your system
2. Navigate to main directory within a terminal and run `npm install`