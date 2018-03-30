import Maze from './Maze';

let keypress = require('keypress');
let console = require('better-console');

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// grab inputs and set to vars
let dimensions = process.argv.slice(2);
let height = dimensions[1] || 10;
let width = dimensions[0] || 10;
let easy  = dimensions[2] || false;

// stet initial movement vars
let currentPosition = [0, 0];
let viewingMap = false;
let visited = initVisited(width, height);
let maze = new Maze(width, height).generate().getMaze();
logString(maze[0][0].toString());


function initVisited (width, height) {
    let visited = [];

    for (let x = 0; x < width; x++) {
        visited[x] = [];
        for (let y = 0; y < height; y++) {
            visited[x][y] = 0;
        }
    }

    visited[0][0] = 1;

    return visited;
}

function drawMap() {
    let lines = [];
    let line;
    let line_bottom;
    let cell;

    for (let y = 0; y < height; y++) {
        // prepend top
        if (y === 0) {
            line = '+';
            for (let x = 0; x < width; x++) {
                line += '---+';
            }
            lines.push(line);
        }

        line = '|';
        line_bottom = '+';

        for (let x = 0; x < width; x++) {
            cell = maze[y][x];
            if (currentPosition[1] === x && currentPosition[0] === y) {
                line += ' @ ';
            }
            else {
                line += '   ';
            }
            if (cell[1] && ((visited[x][y] || visited[x+1][y]) || easy)) {
                line += ' ';
            }
            else {
                line += '|';
            }

            if (cell[2] && ((visited[x][y] || visited[x][y+1]) || easy)) {
                line_bottom += '   +';
            }
            else {
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
    checkStatus();
}

function checkStatus() {
    if (currentPosition[0] === (height - 1) && currentPosition[1] === (width - 1)) {
        console.warn('You win!');
        process.exit();
    }
}

function logString(string) {
    console.clear();
    console.log(string);
}

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'm':
            if (!viewingMap) {
                drawMap();
            }
            else {
                logString(maze[currentPosition[0]][currentPosition[1]].toString());
            }
            viewingMap = !viewingMap;
            break;
        case 'e':
            easy = !easy;
            if (viewingMap) {
                drawMap();
            }
            break;
        case 'n':
            maze = new Maze(width, height).generate().getMaze();
            currentPosition = [0,0];
            visited = initVisited(width, height);
            if (viewingMap) {
                drawMap();
            }
            else {
                logString(maze[currentPosition[0]][currentPosition[1]].toString());
                checkStatus();
            }
            break;
        case 'up':
            if (maze[currentPosition[0]][currentPosition[1]].top === 1) {
                currentPosition[0]--;
                visited[currentPosition[1]][currentPosition[0]] = 1;
                if (viewingMap) {
                    drawMap();
                }
                else {
                    logString(maze[currentPosition[0]][currentPosition[1]].toString());
                    checkStatus();
                }
            }
            break;
        case 'down':
            if (maze[currentPosition[0]][currentPosition[1]].bottom === 1) {
                currentPosition[0]++;
                visited[currentPosition[1]][currentPosition[0]] = 1;
                if (viewingMap) {
                    drawMap();
                }
                else {
                    logString(maze[currentPosition[0]][currentPosition[1]].toString());
                    checkStatus();
                }
            }
            break;
        case 'left':
            if (maze[currentPosition[0]][currentPosition[1]].left === 1) {
                currentPosition[1]--;
                visited[currentPosition[1]][currentPosition[0]] = 1;
                if (viewingMap) {
                    drawMap();
                }
                else {
                    logString(maze[currentPosition[0]][currentPosition[1]].toString());
                    checkStatus();
                }
            }
            break;
        case 'right':
            if (maze[currentPosition[0]][currentPosition[1]].right === 1) {
                currentPosition[1]++;
                visited[currentPosition[1]][currentPosition[0]] = 1;
                if (viewingMap) {
                    drawMap();
                }
                else {
                    logString(maze[currentPosition[0]][currentPosition[1]].toString());
                    checkStatus();
                }
            }
            break;
    }
    if (key && key.ctrl && key.name === 'c') {
        process.exit();
    }
});