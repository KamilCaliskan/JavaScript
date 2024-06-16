function findOdd(A) {
  return A.reduce((acc, num) => acc ^ num, 0);
}




//Initial Value: The reduce function starts with an initial value of 0.
//Iterate and XOR: For each element in the array A, it XORs it with the accumulator acc.
//Result: The final value of acc will be the number that appears an odd number of times 
