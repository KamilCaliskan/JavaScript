function chooseBestSum(t, k, ls) {
    // Helper function to generate combinations
    function combinations(array, k) {
        if (k === 0) return [[]]; // Base case
        if (array.length === 0) return []; // No combinations possible

        const result = [];
        const [first, ...rest] = array;

        // Include the first element
        for (const combo of combinations(rest, k - 1)) {
            result.push([first, ...combo]);
        }

        // Exclude the first element
        result.push(...combinations(rest, k));
        return result;
    }

    const allCombos = combinations(ls, k);
    let maxDistance = 0;

    // Check all combinations
    for (const combo of allCombos) {
        const sum = combo.reduce((acc, dist) => acc + dist, 0);
        if (sum <= t && sum > maxDistance) {
            maxDistance = sum;
        }
    }

    return maxDistance > 0 ? maxDistance : null;
}

// Example usage
const ls = [50, 55, 57, 58, 60];
const t = 174;
const k = 3;

console.log(chooseBestSum(t, k, ls)); // Output: 173
