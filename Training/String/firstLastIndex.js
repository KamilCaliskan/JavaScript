function firstToLast(str, c) {
  // Find the first occurrence of c in str
  let firstIndex = str.indexOf(c);
  // Find the last occurrence of c in str
  let lastIndex = str.lastIndexOf(c);

  // If c is not found in str
  if (firstIndex === -1) {
    return -1;
  }

  // Return the gap between the first and last position
  return lastIndex - firstIndex;
}

// Test examples
console.log(firstToLast("ababc", "a"));  // should return 2 (2-0)
console.log(firstToLast("ababc", "c"));  // should return 0 (4-4)
console.log(firstToLast("ababc", "d"));  // should return -1



/*
var str="Hello World!";
console.log(str.indexOf("o"))
console.log(str.lastIndexOf("o"))
console.log(str.search("o"))
//output:
4
7
4
****
var str="Hello World!";
console.log(str.indexOf("o",5))
console.log(str.lastIndexOf("o",5))
console.log(str.search("o"))
//output:
7
4
4
We can see, indexOf() returned 7, 
because it start retrieves from index 5 to the right; 
lastIndexOf() returned 4 because it start retrieves from index 5 to the left;
search() always returned the first "o". Look at the following example:

when the search string is not found, they always return -1
*/
