function solveExpression(exp) {
    // Split the expression into left and right sides
    let [leftSide, rightSide] = exp.split('=');
    let operator = '';

    // Find the operator and split the left side into two numbers
    for (let char of leftSide) {
        if (char === '+' || char === '-' || char === '*') {
            operator = char;
            break;
        }
    }

    let [num1, num2] = leftSide.split(operator);

    // The right side is the expected result
    let expectedResult = rightSide.trim();

    // Gather all digits already used in the expression
    const usedDigits = new Set();
    for (let char of exp) {
        if (char >= '0' && char <= '9') {
            usedDigits.add(char);
        }
    }

    // Function to evaluate the left side expression
    function evaluate(n1, n2, operator) {
        switch (operator) {
            case '+':
                return n1 + n2;
            case '-':
                return n1 - n2;
            case '*':
                return n1 * n2;
            default:
                return null;
        }
    }

    // Check all possible digits from 0 to 9
    for (let digit = 0; digit <= 9; digit++) {
        const digitStr = digit.toString();

        // Skip if the digit is already used
        if (usedDigits.has(digitStr)) {
            continue;
        }

        // Replace '?' with the current digit
        let testNum1 = num1.replace(/\?/g, digitStr);
        let testNum2 = num2.replace(/\?/g, digitStr);
        let testResult = expectedResult.replace(/\?/g, digitStr);

        // Check for leading zeros only for non-zero numbers
        if ((testNum1.length > 1 && testNum1[0] === '0') ||
            (testNum2.length > 1 && testNum2[0] === '0') ||
            (testResult.length > 1 && testResult[0] === '0')) {
            continue;
        }

        // Convert strings to integers
        const n1 = parseInt(testNum1);
        const n2 = parseInt(testNum2);
        const result = parseInt(testResult);

        // Evaluate the expression only if the conversion is successful
        if (!isNaN(n1) && !isNaN(n2) && !isNaN(result)) {
            if (evaluate(n1, n2, operator) === result) {
                return digit; // Return the first valid digit found
            }
        }
    }

    return -1; // If no valid digit is found
}

// Example usage
console.log(solveExpression("1+1=?"));         // Output: 0
console.log(solveExpression("123*45?=5?088")); // Output: 0
console.log(solveExpression("-5?*-1=5?"));     // Output: -1
