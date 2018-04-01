/**
 * Class representation of a Cell.
 * @authour Spencer McCoubrey
 */
class Cell {

    /**
     * Constructor for a Cell obj, sets default props.
     */
    constructor() {

        // set defaults
        this.reset();
    }

    /**
     * Returns property of Cell.
     * @param value string corresponding to Cell property
     * @returns {*}
     */
    getValue(value) {
        return this[value];
    }

    /**
     * Sets Cell property to value.
     * @param property string corresponding to Cell property
     * @param value is value to set to property
     * @returns {*}
     */
    setValue(property, value) {
        this[property] = value;
    }

    /**
     * Method sets all the Cells props back to default.
     */
    reset() {
        this.up = 0;
        this.down = 0;
        this.left = 0;
        this.right = 0;
        this.visited = false;
    }

    /**
     * Method returns the string visual representation of a Cell.
     * @returns {string} string representation of a Cell
     */
    toString() {

        let stringImage = "";

        // check if each side is wall or door, and append proper string per case
        
        // up permutations
        if (this.up === 0) {
            stringImage += "+----------+\n|          |\n";
        } else {
            stringImage += "+--      --+\n|          |\n";
        }
        
        // left and right permutations
        if (this.left === 0 && this.right === 0) {
            stringImage += "|          |\n";
            stringImage += "|          |\n";
        } else if (this.left === 0 && this.right === 1) {
            stringImage += "|           \n";
            stringImage += "|           \n";
        } else if (this.left === 1 && this.right === 0) {
            stringImage += "           |\n";
            stringImage += "           |\n";
        } else {
            stringImage += "            \n";
            stringImage += "            \n";
        }

        // down permutations
        if (this.down === 0) {
            stringImage += "|          |\n+----------+\n";
        } else {
            stringImage += "|          |\n+--      --+\n";
        }

        return stringImage;
    }
}

module.exports = Cell;