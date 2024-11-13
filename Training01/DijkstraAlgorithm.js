function pathFinder(area) {
  const N = area.length; // Size of the NxN grid
  const grid = area.split('\n').map(row => row.split('').map(Number)); // Convert string input to 2D array of numbers

  // Direction vectors for North, East, South, West
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  // Priority queue (min-heap) to store cells with their climb rounds
  const pq = [];
  
  // 2D array to track minimal climb rounds to each cell
  const minClimbRounds = Array.from({ length: N }, () => Array(N).fill(Infinity));

  // Start with the top-left corner (0, 0)
  pq.push([0, 0, 0]); // [row, col, climbRounds]
  minClimbRounds[0][0] = 0;

  while (pq.length > 0) {
    // Extract the cell with the minimal climb rounds
    pq.sort((a, b) => a[2] - b[2]); // Sorting by climb rounds (could use a priority queue for efficiency)
    const [row, col, climbRounds] = pq.shift();

    // If we've reached the bottom-right corner, return the result
    if (row === N - 1 && col === N - 1) {
      return climbRounds;
    }

    // Explore all four directions (N, E, S, W)
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check if the new position is within bounds
      if (newRow >= 0 && newRow < N && newCol >= 0 && newCol < N) {
        const climbDiff = Math.abs(grid[newRow][newCol] - grid[row][col]);
        const newClimbRounds = climbRounds + climbDiff;

        // If we've found a better (minimal) path to this cell, update and add it to the queue
        if (newClimbRounds < minClimbRounds[newRow][newCol]) {
          minClimbRounds[newRow][newCol] = newClimbRounds;
          pq.push([newRow, newCol, newClimbRounds]);
        }
      }
    }
  }

  // If no path is found, this will be reached (though this shouldn't happen with a valid input)
  return -1;
}

const { assert } = require('chai');

function testArea(expected, area){
  let actual = pathFinder(area);
  assert.strictEqual(actual, expected, area);
}

describe("Basic tests", () => {
  it("Flat lands", () => 
     testArea(0,
`000
000
000`));

  it("Wall", () => 
    testArea(2,
`010
010
010`));

  it("Checkerboard", () =>
    testArea(4,
`010
101
010`));
  
  it("Checkerboard 2", () =>
    testArea(42,
`0707
7070
0707
7070`));

  it("Massif Central", () => 
    testArea(14,
`700000
077770
077770
077770
077770
000007`));

  it("Crest path", () =>
    testArea(0,
`777000
007000
007000
007000
007000
007777`));

  it("Minor obstacles", () =>
    testArea(4,
`000000
000000
000000
000010
000109
001010`));
});
