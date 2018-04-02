let Cell = require("../../src/Cell");

describe("Cell Tests", function() {

    let cell;

    beforeEach(function() {
        cell = new Cell();
    });

    it("should create default Cell on instantiation", function() {

        // check al default properties are set
        expect(cell.up).toBe(0);
        expect(cell.down).toBe(0);
        expect(cell.right).toBe(0);
        expect(cell.left).toBe(0);
        expect(cell.visited).toBeFalsy();
    });

    it("should test Cell.setValue() method", function () {

        // check each setter sets the internal value correctly
        cell.setValue("up", 1);
        expect(cell.up).toBe(1);

        cell.setValue("down", 2);
        expect(cell.down).toBe(2);

        cell.setValue("right", 3);
        expect(cell.right).toBe(3);

        cell.setValue("left", 4);
        expect(cell.left).toBe(4);

        cell.setValue("visited", true);
        expect(cell.visited).toBeTruthy();

        // check that setValue() creates property if it didn't exist before
        expect(cell.testProperty).toBeUndefined();
        cell.setValue("testProperty", true);
        expect(cell.testProperty).toBeTruthy();
    });

    it("should test Cell.getValue() method", function () {

        // test that properties that exist by default return proper internal var
        expect(cell.getValue("up")).toBe(cell.up);
        expect(cell.getValue("down")).toBe(cell.down);
        expect(cell.getValue("right")).toBe(cell.right);
        expect(cell.getValue("left")).toBe(cell.left);
        expect(cell.getValue("visited")).toBe(cell.visited);

        // properties that do not exist should return undefined
        expect(cell.getValue("testProperty")).toBeUndefined();
    });

    it("should test Cell.reset() method", function () {

        // initially set properties for testing
        cell.setValue("up", 1);
        cell.setValue("down", 2);
        cell.setValue("right", 3);
        cell.setValue("left", 4);
        cell.setValue("visited", true);

        // call reset() and check properties are back to default
        cell.reset();

        expect(cell.getValue("up")).toBe(0);
        expect(cell.getValue("down")).toBe(0);
        expect(cell.getValue("right")).toBe(0);
        expect(cell.getValue("left")).toBe(0);
        expect(cell.getValue("visited")).toBeFalsy();
    });

    it("should test Cell.toString() method", function () {

        // set test strings
        let noDoors = "+----------+\n|          |\n" + "|          |\n" + "|          |\n" + "|          |\n+----------+\n";
        let upDoor = "+--      --+\n|          |\n" + "|          |\n" + "|          |\n" + "|          |\n+----------+\n";
        let downDoor = "+----------+\n|          |\n" + "|          |\n" + "|          |\n" + "|          |\n+--      --+\n";
        let leftDoor = "+----------+\n|          |\n" + "           |\n" + "           |\n" + "|          |\n+----------+\n";
        let rightDoor = "+----------+\n|          |\n" + "|           \n" + "|           \n" + "|          |\n+----------+\n";
        let sideDoors = "+----------+\n|          |\n" + "            \n" + "            \n" + "|          |\n+----------+\n";

        // test all directional properties when 0
        expect(cell.toString()).toBe(noDoors);

        // test up direction when 1
        cell.reset();
        cell.setValue("up", 1);
        expect(cell.toString()).toBe(upDoor);

        // test down direction when 1
        cell.reset();
        cell.setValue("down", 1);
        expect(cell.toString()).toBe(downDoor);

        // test left direction when 1
        cell.reset();
        cell.setValue("left", 1);
        expect(cell.toString()).toBe(leftDoor);

        // test right direction when 1
        cell.reset();
        cell.setValue("right", 1);
        expect(cell.toString()).toBe(rightDoor);

        // test both side directions when 1
        cell.reset();
        cell.setValue("left", 1);
        cell.setValue("right", 1);
        expect(cell.toString()).toBe(sideDoors);
    });
});