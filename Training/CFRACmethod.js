/*
const chai =require("chai");
const assert = chai.assert;


description("Solution", function(){
	it("Static test: n=1999*9001", function(){
		let n=1990n * 9001n;
		let soolutionGenerator=generalModularRoots(n);
		let curr = null;
		let s= new Set();

		for (let i=0; i<100; i++){
			curr = soolutionGenerator.next();
			assert.ok((curr.value ** 2n) %n < 2n*4241n, 'Must satisfy ${curr.value}^2 % {n} < ${2n * 4241n}');
			assert.ok((4241n < curr.value)&&(curr.value < n - 4241n),'Must satisfy ${4241n} <${curr.value}<${n - 4241n}');
			s.add(curr);
		}
		assert.strictEqual(s.size, 100, 'Must yield unique values');
	});
});

*/
/*
const chai = require("chai");
const assert = chai.assert;

describe("Solution", function() {
  it("Static test: n = 1999 * 9001", function() {
    let n = 1999n * 9001n;
    let solutionGenerator = generateModularRoots(n);
    let curr = null;
    let s = new Set();
    
    for (let i=0; i<100; i++){
      curr = solutionGenerator.next();
      assert.ok((curr.value ** 2n) % n < 2n * 4241n, `Must satisfy ${curr.value}^2 % ${n} < ${2n * 4241n}`);
      assert.ok((4241n < curr.value) && (curr.value < n - 4241n), `Must satisfy ${4241n} < ${curr.value} < ${n - 4241n}`);
      s.add(curr);
    }
    
    assert.strictEqual(s.size, 100, `Must yield unique values`);
  });
});

*/

function integerSqrt(n) {
  if (n < 0n) throw new Error('Square root of negative numbers is not supported');
  if (n < 2n) return n;
  
  let small = 0n;
  let big = n;
  
  while (small < big) {
    const mid = (small + big) / 2n;
    const square = mid * mid;
    
    if (square === n) return mid;
    if (square < n) {
      small = mid + 1n;
    } else {
      big = mid;
    }
  }
  
  return small - 1n;
}

const generateContinuedFraction = function* (n) {
  const sqrtN = integerSqrt(n);
  let a0 = sqrtN;
  let m = 0n;
  let d = 1n;
  let a = a0;
  
  let coefficients = [a0];
  
  while (true) {
    m = d * a - m;
    d = (n - m * m) / d;
    a = (a0 + m) / d;
    coefficients.push(a);
    
    yield [...coefficients];  // yield a copy of coefficients array
  }
};

const generateConvergents = function* (coefficients) {
  let h1 = 1n, h2 = 0n;
  let k1 = 0n, k2 = 1n;

  for (let i = 0; i < coefficients.length; i++) {
    let a = coefficients[i];
    
    let h = a * h1 + h2;
    let k = a * k1 + k2;
    
    yield [h, k];
    
    h2 = h1;
    h1 = h;
    k2 = k1;
    k1 = k;
  }
};

const generateModularRoots = function* (n) {
  const sqrtN = integerSqrt(n);
  const continuedFractionGenerator = generateContinuedFraction(n);
  let coefficients = [];
  
  while (coefficients.length < 2 || coefficients[coefficients.length - 1] !== 2n * coefficients[0]) {
    const result = continuedFractionGenerator.next().value;
    if (!result) break;
    coefficients = result;
  }
  
  const convergentsGenerator = generateConvergents(coefficients);

  while (true) {
    const convergent = convergentsGenerator.next().value;
    if (!convergent) break;
    
    const [p, q] = convergent;
    
    const x = p;
    const A = (x * x) % n;
    const sqrtNBigInt = sqrtN;

    if (A < 2n * sqrtNBigInt && sqrtNBigInt < x && x < n - sqrtNBigInt) {
      yield x;
    }
  }
};

// Example usage:
const n = 1999n * 9001n;
const generator = generateModularRoots(n);
console.log(generator.next().value);
console.log(generator.next().value);
