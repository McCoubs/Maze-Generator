
export default class Cell {

    init() {
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
        this.visited = false;
    }

    /**
     * Method returns the string visual representation of a cell.
     * @returns {string} string representation of a cell
     */
    toString() {
        let stringImage = "";

        // check if each side is wall or door, and append proper string per case
        
        // top permutations
        if (this.top === 0) {
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

        // bottom permutations
        if (this.bottom === 0) {
            stringImage += "+----------+\n|          |\n";
        } else {
            stringImage += "+--      --+\n|          |\n";
        }

        return stringImage;
    }
}