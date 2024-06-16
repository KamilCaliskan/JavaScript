function findOdd(A) {
  return A.reduce((acc, num) => acc ^ num, 0);
}

console.log(findOdd([1, 2, 2, 3, 1, 3, 3])); 
// Output: 3








/*
### Key Concepts:
1. **Array Reduce Method**:
   - `reduce` is an array method that executes a reducer function (provided by you) on each element of the array, 
  resulting in a single output value.
   - Syntax: `array.reduce(reducer, initialValue)`
   - `reducer` function takes two arguments: the accumulator (`acc`) and the current value (`num`).
   - `initialValue` is the initial value of the accumulator (`acc`).

2. **XOR Bitwise Operator (`^`)**:
   - XOR (exclusive OR) is a bitwise operation that returns `1` for a bit position 
   if the bits are different, and `0` if they are the same.
   - For example:
     - `0 ^ 0 = 0`
     - `0 ^ 1 = 1`
     - `1 ^ 0 = 1`
     - `1 ^ 1 = 0`
   - XOR is both commutative and associative, meaning the order of operations does not matter, 
     and it has the property of self-cancellation (e.g., `a ^ a = 0`).

### Step-by-Step Explanation:
1. **Initial Setup**:
   - The `reduce` method is called on the array `A` with an initial accumulator value of `0`.

2. **Iteration and XOR Operations**:
   - For each element in the array, the `reduce` function applies 
   the XOR operation between the accumulator (`acc`) and the current element (`num`).

Let's go through an example step-by-step with the array `[1, 2, 2, 3, 1, 3, 3]` to illustrate how it works:

#### Initial State:
- Accumulator (`acc`): `0`

#### Iterations:
1. **First element (`1`)**:
   - \( \text{acc} = 0 \oplus 1 = 1 \)

2. **Second element (`2`)**:
   - \( \text{acc} = 1 \oplus 2 = 3 \)
     - Binary: `01 XOR 10 = 11` (3 in decimal)

3. **Third element (`2`)**:
   - \( \text{acc} = 3 \oplus 2 = 1 \)
     - Binary: `11 XOR 10 = 01` (1 in decimal)

4. **Fourth element (`3`)**:
   - \( \text{acc} = 1 \oplus 3 = 2 \)
     - Binary: `01 XOR 11 = 10` (2 in decimal)

5. **Fifth element (`1`)**:
   - \( \text{acc} = 2 \oplus 1 = 3 \)
     - Binary: `10 XOR 01 = 11` (3 in decimal)

6. **Sixth element (`3`)**:
   - \( \text{acc} = 3 \oplus 3 = 0 \)
     - Binary: `11 XOR 11 = 00` (0 in decimal)

7. **Seventh element (`3`)**:
   - \( \text{acc} = 0 \oplus 3 = 3 \)
     - Binary: `00 XOR 11 = 11` (3 in decimal)

#### Final Result:
- After all iterations, the accumulator (`acc`) holds the value `3`.

### Conclusion:
The value of the accumulator (`acc`) at the end of the `reduce` operation is the number 
  that appears an odd number of times in the array. In this example, it is `3`.

### Full Code with Example:
```javascript
function findOdd(A) {
  return A.reduce((acc, num) => acc ^ num, 0);
}

console.log(findOdd([1, 2, 2, 3, 1, 3, 3])); // Output: 3
```

This function will work for any array that meets the condition specified in the problem, 
  finding the integer that appears an odd number of times efficiently using the XOR operator
*/
