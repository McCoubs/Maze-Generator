import Cell from './Cell';

export function generateMaze(x, y) {

    // get total num cells
    let totalCells = x*y;
    let grid = [];

    // loop initially to create rows
    for (let i = 0; i < x; i++) {
        grid[i] = [];
        // loop for y to create columns, making a new cell at each index
        for (let j = 0; j < y; j++) {
            grid[i][j] = new Cell().init();
        }
    }

    // Set a random position to start from
    let currentCell = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    // set our path in order to backtrack
    let path = [currentCell];
    // set visited of current cell to true
    grid[currentCell[0]][currentCell[1]].visited = true;

    // Loop through all available cell positions
    for (let visited =1; visited < totalCells; visited++) {

        // get all neighbouring cells
        let rawCells = [[currentCell[0]-1, currentCell[1], "top", "bottom"],
            [currentCell[0], currentCell[1]+1, "right", "left"],
            [currentCell[0]+1, currentCell[1], "bottom", "top"],
            [currentCell[0], currentCell[1]-1, "left", "right"]];
        let neighbors = [];

        // Determine if each neighboring cell is within grid, and whether it has already been visited
        for (let k = 0; k < 4; k++) {
            let currVisited = grid[rawCells[k][0]][rawCells[k][1]].visited;
            if (rawCells[k][0] > -1 && rawCells[k][0] < x && rawCells[k][1] > -1 && rawCells[k][1] < y && !currVisited) {
                neighbors.push(rawCells[k]);
            }
        }

        // If at least one active neighboring cell has been found
        if (neighbors.length) {

            // Choose one of the neighbors at random
            let nextCell = neighbors[Math.floor(Math.random()*neighbors.length)];

            // Remove the wall between the current cell and the chosen neighboring cell
            grid[currentCell[0]][currentCell[1]][nextCell[2]] = 1;
            grid[nextCell[0]][nextCell[1]][nextCell[3]] = 1;

            // Mark the neighbor as visited, and set it as the current cell
            grid[nextCell[0]][nextCell[1]].visited = true;
            currentCell = [nextCell[0], nextCell[1]];

            // push the newly visited to the cellpath
            path.push(currentCell);
        }
        // Otherwise backtrack to last cell to find new path
        else {
            currentCell = path.pop();
        }
    }
    return grid;
}