let Maze = require('./Maze');
let keypress = require('keypress');
let console = require('better-console');

// set keypress/standard input settings
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// grab inputs and set to vars
let dimensions = process.argv.slice(2);
let height = dimensions[1] || 10;
let width = dimensions[0] || 10;
let easy  = dimensions[2] || false;

// set initial movement vars
let currentPosition = [0, 0];
let viewingMap = false;

// instantiate new maze
let maze = new Maze(width, height).generate();
logString(maze.getCell(0, 0).toString());

/**
 * Main logic operator, handles keypresses.
 */
process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        // m key toggles showing the large version of map versus individual rooms
        case 'm':
            if (!viewingMap) {
                drawLargeMaze();
            } else {
                logString(maze.getCell(currentPosition[0], currentPosition[1]).toString());
            }
            viewingMap = !viewingMap;
            break;
        // n key re-instantiates a new maze/game
        case 'n':
            maze = new Maze(width, height).generate();
            currentPosition = [0, 0];
            if (viewingMap) {
                drawLargeMaze();
            } else {
                logString(maze.getCell(currentPosition[0], currentPosition[1]).toString());
            }
            break;
        // e key toggles easy mode
        case 'e':
            easy = !easy;
            if (viewingMap) {
                drawLargeMaze();
            }
            break;

        // cases for movement options
        case 'up':
            movement("up");
            break;
        case 'down':
            movement("down");
            break;
        case 'left':
            movement("left");
            break;
        case 'right':
            movement("right");
            break;
    }

    // exit on ctrl + c command
    if (key && key.ctrl && key.name === 'c') {
        process.exit();
    }
});

/**
 * Clears console and then logs input string to console.
 * @param string to log
 */
function logString(string) {
    console.clear();
    console.log(string);
}

/**
 * Method handles keypress directional logic.
 * @param direction {string: up, down, right, left} is direction of keypress input.
 */
function movement(direction) {

    // get current cell, and check if current intended direction is open
    if (maze.getCell(currentPosition[0], currentPosition[1]).getValue(direction) === 1) {

        // get intended axis
        let axis = (direction === "up" || direction === "down") ? 0 : 1;
        // get bool to determine if increasing or decreasing val based on direction
        let increase = (direction === "down" || direction === "right");

        // either increase or decrease based on
        if (increase) {
            currentPosition[axis]++;
        } else {
            currentPosition[axis]--;
        }

        // draw correct version of map
        if (viewingMap) {
            drawLargeMaze();
        } else {
            logString(maze.getCell(currentPosition[0], currentPosition[1]).toString());
        }

        // check if on final square, exit process if true
        if (maze.checkStatus(currentPosition[0], currentPosition[1])) {
            console.warn('You win!');
            process.exit();
        }
    }
}

/**
 * Prints out large version of a Maze.
 */
function drawLargeMaze() {
    let lines = [];
    let line;
    let line_bottom;
    let cell;

    for (let x = 0; x < width; x++) {
        // prepend up
        if (x === 0) {
            line = '+';
            for (let y = 0; y < height; y++) {
                line += '---+';
            }
            lines.push(line);
        }

        line = '|';
        line_bottom = '+';

        for (let y = 0; y < height; y++) {
            cell = maze.getCell(x, y);

            if (currentPosition[0] === x && currentPosition[1] === y) {
                line += ' @ ';
            } else if (x === maze.finalRoom[0] && y === maze.finalRoom[1]) {
                line += ' X ';
            } else {
                line += '   ';
            }

            if (cell.getValue("right") && easy) {
                line += ' ';
            } else {
                line += '|';
            }

            if (cell.getValue("down") && easy) {
                line_bottom += '   +';
            } else {
                line_bottom += '---+';
            }
        }
        lines.push(line);
        lines.push(line_bottom);
    }

    console.clear();
    lines.forEach(function (l) {
        console.log(l);
    });
    if (maze.checkStatus(currentPosition[0], currentPosition[1])) {
        console.warn('You win!');
        process.exit();
    }
}