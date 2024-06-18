function hamming(n) {
  // Min-heap to store the Hamming numbers and their exponents
  const heap = new MinHeap();
  // Set to track the seen Hamming numbers to avoid duplicates
  const seen = new Set();

  // Initialize with the first Hamming number (1 = 2^0 * 3^0 * 5^0)
  heap.push({ value: 1, i: 0, j: 0, k: 0 });
  seen.add(1);

  let current;

  // Generate Hamming numbers until we reach the nth one
  for (let count = 0; count < n; count++) {
    current = heap.pop();

    // Generate the next possible Hamming numbers by multiplying by 2, 3, and 5
    const nextValues = [
      { value: current.value * 2, i: current.i + 1, j: current.j, k: current.k },
      { value: current.value * 3, i: current.i, j: current.j + 1, k: current.k },
      { value: current.value * 5, i: current.i, j: current.j, k: current.k + 1 }
    ];

    // Add the new Hamming numbers to the heap if they haven't been seen before
    for (const next of nextValues) {
      if (!seen.has(next.value)) {
        heap.push(next);
        seen.add(next.value);
      }
    }
  }

  // Return the exponents of the nth Hamming number
  return [current.i, current.j, current.k];
}

// Simple implementation of a min-heap (priority queue)
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(element) {
    this.heap.push(element);
    this._bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].value >= this.heap[parentIndex].value) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let smallest = index;

      if (leftIndex < length && this.heap[leftIndex].value < this.heap[smallest].value) {
        smallest = leftIndex;
      }
      if (rightIndex < length && this.heap[rightIndex].value < this.heap[smallest].value) {
        smallest = rightIndex;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}



/*
const {assert, config} = require('chai');
config.truncateThreshold = 0;

describe('Hamming numbers', () => {
  describe('example tests', () => {
    makeTest(1, [0, 0, 0], 100);
    makeTest(5, [0, 0, 1], 100);
    makeTest(10, [2, 1, 0], 100);
    makeTest(20, [2, 2, 0], 100);
    makeTest(0x1111, [9, 10, 8], 100);
    makeTest(0x111111, [105, 9, 73], 500);
  });

  function makeTest(n, [i, j, k], time) {
    const hex = n.toString(16).toUpperCase();
    it(`n = ${n} (0x${hex.padStart(2 << Math.log2(hex.length - 1), '0')})`, function () {
      if(time) this.timeout(time);
      const actual = hamming(n);
      assert(Array.isArray(actual), 'result is not an array');
      assert.strictEqual(actual.length, 3, 'result\'s length is not 3');
      // deepEqual works weird with -0 and +0
      assert(actual[0] === i && actual[1] === j && actual[2] === k, `expected [${actual.join(', ')}] to be equal to [${i}, ${j}, ${k}]`);
    });
  }
});

*/
