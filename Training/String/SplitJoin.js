function splitAndMerge(string, separator) {
  // Girdiyi boşluklara göre kelimelere ayır
  let words = string.split(' ');

  // Her kelimeyi karakterlere ayır ve belirtilen ayırıcı ile birleştir
  let modifiedWords = words.map(word => word.split('').join(separator));

  // İşlenmiş kelimeleri tekrar boşluklarla birleştir
  return modifiedWords.join(' ');
}


console.log(splitAndMerge("Benim adım Ahmet", " ")); // "B e n i m a d ı m A h m e t"
console.log(splitAndMerge("Merhaba dünya", ","));    // "M,e,r,h,a,b,a d,ü,n,y,a"
console.log(splitAndMerge("Bu çok eğlenceli", "-")); // "B-u ç-o-k e-ğ-l-e-n-c-e-l-i"
