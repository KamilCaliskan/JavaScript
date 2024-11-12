class Primes {
  static *stream() {
    const limit = 10000000;  // Define the limit to generate primes up to 10 million
    const sieve = new Array(limit).fill(true);  // Create a boolean array for the sieve
    sieve[0] = sieve[1] = false;  // 0 and 1 are not primes

    // Sieve of Eratosthenes algorithm
    for (let i = 2; i <= Math.sqrt(limit); i++) {
      if (sieve[i]) {
        for (let j = i * i; j < limit; j += i) {
          sieve[j] = false;  // Mark multiples of i as non-prime
        }
      }
    }

    // Yield all primes up to the limit
    for (let i = 2; i < limit; i++) {
      if (sieve[i]) yield i;
    }
  }
}

// Usage example to get the first 10 primes
const primeStream = Primes.stream();
console.log([...Array(10)].map(() => primeStream.next().value));
