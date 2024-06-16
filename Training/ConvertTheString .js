function descendingOrder(n) {
  // Convert the number to a string, then split it into an array of characters
  let digits = n.toString().split('');
  
  // Sort the array of characters in descending order
  digits.sort((a, b) => b - a);
  
  // Join the sorted array back into a string and convert it to a number
  return parseInt(digits.join(''), 10);
}

// Examples:
console.log(descendingOrder(42145)); // Output: 54421
console.log(descendingOrder(145263)); // Output: 654321
console.log(descendingOrder(123456789)); // Output: 987654321
