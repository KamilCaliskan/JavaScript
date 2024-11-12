class Primes {
  static *stream() {
    // Yield the first few known primes to start
    yield 2;
    yield 3;
    yield 5;
    yield 7;

    const primes = [2, 3, 5, 7]; // Start with a few small known primes
    let num = 9;                 // Start testing from the next odd number

    while (true) {
      let isPrime = true;

      // Only check divisibility up to the square root of `num`
      const limit = Math.sqrt(num);
      for (let p of primes) {
        if (p > limit) break;
        if (num % p === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        primes.push(num);
        yield num;
      }

      num += 2; // Skip even numbers
    }
  }
}

// Example usage: Fetching the first 10 primes
const primeStream = Primes.stream();
console.log([...Array(10)].map(() => primeStream.next().value));
