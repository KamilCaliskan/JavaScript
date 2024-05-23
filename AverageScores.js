function getAverage(scores) {
    // Check if scores array is empty to avoid division by zero
    if (scores.length === 0) return 0;

    // Initialize a variable to hold the sum of scores
    let sum = 0;

    // Use a loop to iterate over the scores array and add each score to the sum
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

    // Calculate the average by dividing the sum by the number of scores
    const average = sum / scores.length;

    // Return the calculated average
    return average;
}

// Test the function with provided test cases
console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89])); // Expected output: 71.7
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95])); // Expected output: 85.4
