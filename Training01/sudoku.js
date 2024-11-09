function sudoku(puzzle) {
    // Helper function to check if placing num at (row, col) is valid
    function isValid(puzzle, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (puzzle[row][x] === num) return false;
        }
        // Check column
        for (let y = 0; y < 9; y++) {
            if (puzzle[y][col] === num) return false;
        }
        // Check 3x3 subgrid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (puzzle[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    // Recursive function to solve the puzzle
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (puzzle[row][col] === 0) {
                    // Try numbers 1 to 9
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(puzzle, row, col, num)) {
                            puzzle[row][col] = num; // Place number
                            if (solve()) return true; // Recurse
                            puzzle[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // If no number is valid, backtrack
                }
            }
        }
        return true; // Puzzle is solved if no empty cells
    }

    solve();
    return puzzle;
}
