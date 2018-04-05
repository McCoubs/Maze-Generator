let Maze = require("../../src/Maze");

describe("Maze Tests", function() {

    let maze;

    beforeEach(function() {
        maze = new Maze(10, 10);
    });

    it("should create default Maze on instantiation", function() {

        maze = new Maze();
        // check all default properties are set
        expect(maze.width).toBe(0);
        expect(maze.height).toBe(0);
        expect(maze.totalCells).toBe(0);
        expect(maze.finalRoom).toEqual([-1, -1]);
        expect(maze.grid[0]).toBeUndefined();
    });

    it("should set values from constructor", function() {

        // check properties are set
        expect(maze.width).toBe(10);
        expect(maze.height).toBe(10);
        expect(maze.totalCells).toBe(100);
        expect(maze.finalRoom).toEqual([-1, -1]);
        expect(maze.grid[0][0]).not.toBeUndefined();
    });

    it("should test Maze.generate()", function() {

        // call generate
        maze.generate();

        // first room should be visited and final room should be set
        expect(maze.getGrid()[0][0].getValue("visited")).toBeTruthy();
        expect(maze.finalRoom).not.toEqual([-1, -1]);
    });

    it("should test Maze.getCell()", function() {

        // call generate to mutate Cells
        maze.generate();

        // string representation from get cell should be same as literal grab
        expect(maze.getCell(0, 0).toString()).toBe(maze.getGrid()[0][0].toString());
    });

    it("should test Maze.reset()", function() {

        // call generate to mutate Cells
        maze.generate();

        // call reset
        maze.reset();

        // first room should be no longer be visited and final room should be unset
        expect(maze.getGrid()[0][0].getValue("visited")).toBeFalsy();
        expect(maze.finalRoom).toEqual([-1, -1]);
    });

    it("should test Maze.checkStatus()", function() {

        // call generate to mutate Cells
        maze.generate();

        // call status with final room coords
        expect(maze.checkStatus(maze.finalRoom[0], maze.finalRoom[1])).toBeTruthy();
    });
});