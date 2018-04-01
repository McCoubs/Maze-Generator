let Cell = require('./Cell');

/**
 * Class representation of a Maze, comprised of rows/columns of Cells.
 */
class Maze {

    /**
     * Constructor for a maze, creates basic maze.
     * @param width desired width of the maze
     * @param height desried height of the maze
     */
    constructor(width, height) {

        // set inputs
        this.width = width;
        this.height = height;
        this.totalCells = width*height;
        this.grid = [];

        // loop initially to create rows
        for (let i = 0; i < this.width; i++) {
            this.grid[i] = [];
            // loop for y to create columns, making a new cell at each index
            for (let j = 0; j < this.height; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }

    getGrid() {
        return this.grid;
    }

    /**
     * Method gets cell at specified coordinates.
     * @param x coordinate of grid
     * @param y coordinate of grid
     */
    getCell(x, y) {
        return this.grid[x][y];
    }

    /**
     * Method resets the Maze back to basic instantiation.
     */
    reset() {

        // loop through all created Cells and reset each one
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.getCell(i, j).reset();
            }
        }
    }

    /**
     * Method runs through the basic maze and creates the layout.
     * @desc uses the backtracking method to create the maze.
     * @returns Maze obj
     */
    generate() {

        // Set starting position
        let currentCell = [0, 0];
        // set our path in order to backtrack
        let path = [currentCell];
        // set visited of current cell to true
        this.getCell(currentCell[0], currentCell[1]).setValue("visited", true);

        // Loop through all available cell positions
        for (let visited = 1; visited < this.totalCells; visited++) {

            // get all neighbouring cells
            let potential = [[currentCell[0]-1, currentCell[1], "up", "down"],
                [currentCell[0], currentCell[1]+1, "right", "left"],
                [currentCell[0]+1, currentCell[1], "down", "up"],
                [currentCell[0], currentCell[1]-1, "left", "right"]];
            let neighbors = [];

            // Determine if each neighboring cell is within grid, and whether it has already been visited
            for (let k = 0; k < 4; k++) {
                if (potential[k][0] > -1 && potential[k][0] < this.width && potential[k][1] > -1 && potential[k][1] < this.height && !this.getCell([potential[k][0]], [potential[k][1]]).getValue("visited")) {
                    neighbors.push(potential[k]);
                }
            }

            // If at least one active neighboring cell has been found
            if (neighbors.length) {

                // Choose one of the neighbors at random
                let nextCell = neighbors[Math.floor(Math.random()*neighbors.length)];

                // Remove the wall between the current cell and the chosen neighboring cell
                this.getCell(currentCell[0], currentCell[1]).setValue(nextCell[2], 1);
                this.getCell(nextCell[0], nextCell[1]).setValue(nextCell[3], 1);

                // Mark the neighbor as visited, and set it as the current cell
                this.getCell(nextCell[0], nextCell[1]).setValue("visited", true);
                currentCell = [nextCell[0], nextCell[1]];

                // push the newly visited to the cellpath
                path.push(currentCell);

            // Otherwise backtrack to last cell to find new path
            } else {
                currentCell = path.pop();
            }
        }
        // set final room and return context
        this.finalRoom = currentCell;
        return this;
    }

    /**
     * Method checks if supplied coordinates match Mazes final room
     * @param x coordinate to check
     * @param y coordinate to check
     * @return {boolean} true if coordinates match the final room
     */
    checkStatus(x, y) {
        return (x === this.finalRoom[0] && y === this.finalRoom[1]);
    }
}

module.exports = Maze;