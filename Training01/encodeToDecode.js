var guess = 42; // Doğru tahmin sayısı
var lastrandom = -1;

createLuckyNumber = function() {
  var random = Math.random();
  if (lastrandom > 0) {
    Test.assertNotEquals(random, lastrandom, "Sorry. Random numbers shouldn't repeat: " + random);
  }
  lastrandom = random;
  return Math.floor(random * 100000 + 1);
};

describe("Basic checks", function() {
  for (var i = 0; i < 10; i++) {
    Test.assertEquals(createLuckyNumber(), guess, "Sorry. Unlucky this time.");
  }
});

describe("Hardcore Checks", function() {
  // Burada daha karmaşık anti-hile önlemleri olabilir.
  // Ancak burada geçmek için daha gelişmiş stratejiler gerekebilir.
});
