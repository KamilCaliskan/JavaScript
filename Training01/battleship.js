function validateBattlefield(field) {
    const shipSizes = { 1: 0, 2: 0, 3: 0, 4: 0 }; // Counts for ships of each size
    
    // Utility function to mark cells as visited
    function markShipVisited(x, y, shipCells) {
        for (let [i, j] of shipCells) {
            field[i][j] = 0; // Mark cell as visited by setting it to 0
        }
    }

    // Utility function to check if a cell is in bounds
    function inBounds(x, y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    // Find a full ship starting from (x, y)
    function findShip(x, y) {
        const shipCells = [[x, y]];
        let direction = null;
        
        // Determine the direction (horizontal or vertical)
        if (inBounds(x + 1, y) && field[x + 1][y] === 1) direction = 'vertical';
        else if (inBounds(x, y + 1) && field[x][y + 1] === 1) direction = 'horizontal';

        // Traverse the ship cells in the determined direction
        if (direction === 'vertical') {
            let i = x + 1;
            while (inBounds(i, y) && field[i][y] === 1) {
                shipCells.push([i, y]);
                i++;
            }
        } else if (direction === 'horizontal') {
            let j = y + 1;
            while (inBounds(x, j) && field[x][j] === 1) {
                shipCells.push([x, j]);
                j++;
            }
        }

        return shipCells;
    }

    // Check for ships and their counts
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (field[i][j] === 1) {  // Found part of a ship
                const shipCells = findShip(i, j);
                const shipSize = shipCells.length;
                
                // Increment the count of ships of this size
                if (shipSize > 4 || !shipSizes.hasOwnProperty(shipSize)) return false;
                shipSizes[shipSize]++;
                
                // Ensure no ships touch by checking surroundings
                for (let [x, y] of shipCells) {
                    const neighbors = [
                        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
                        [x, y - 1],               [x, y + 1],
                        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
                    ];
                    for (let [nx, ny] of neighbors) {
                        if (inBounds(nx, ny) && field[nx][ny] === 1 && !shipCells.some(([sx, sy]) => sx === nx && sy === ny)) {
                            return false;
                        }
                    }
                }

                // Mark the ship cells as visited
                markShipVisited(i, j, shipCells);
            }
        }
    }

    // Check that the counts match the required configuration
    return shipSizes[4] === 1 && shipSizes[3] === 2 && shipSizes[2] === 3 && shipSizes[1] === 4;
}
