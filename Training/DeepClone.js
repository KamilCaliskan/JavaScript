function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy;
  }

  const objCopy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = deepClone(obj[key]);
    }
  }
  return objCopy;
}

// Example usage:
const originalArray = [1, { a: 2, b: [3, 4] }, 5];
const clonedArray = deepClone(originalArray);

console.log(clonedArray); // [1, { a: 2, b: [3, 4] }, 5]
console.log(clonedArray === originalArray); // false
console.log(clonedArray[1] === originalArray[1]); // false


/*

- `deepClone` fonksiyonu, `obj` adlı bir parametre alır.
- İlk if ifadesi, `obj`'nin `null` olup olmadığını veya `obj`'nin türünün `'object'` olmadığını kontrol eder.
- Eğer `obj` `null` veya bir `object` değilse (yani basit bir değer veya `null` ise), 
fonksiyon doğrudan `obj`'yi döndürür.

- `obj` bir dizi değilse, bir nesne olduğu varsayılır
- `objCopy` adında boş bir nesne oluşturur
- `for...in` döngüsü ile `obj` nesnesinin tüm kendi özelliklerini (yani prototip zincirinde olmayan) kontrol eder
- `hasOwnProperty` metodu ile, sadece `obj`'nin kendi özelliklerini kontrol eder
- Her özelliği için `deepClone` fonksiyonunu çağırır ve sonucu `objCopy`'ye atar
- Son olarak, `objCopy` nesnesini döndürür.


console.log(clonedArray); // [1, { a: 2, b: [3, 4] }, 5]
console.log(clonedArray === originalArray); // false
console.log(clonedArray[1] === originalArray[1]); // false

- `originalArray` adında bir dizi oluşturur.
- `deepClone` fonksiyonunu kullanarak `originalArray` dizisinin kopyasını oluşturur ve `clonedArray` adında bir değişkene atar.
- `console.log` ile `clonedArray`'yi yazdırır. Bu, `[1, { a: 2, b: [3, 4] }, 5]` olacaktır
- `clonedArray` ve `originalArray` aynı nesne değildir (`false` döner)
- `clonedArray[1]` ve `originalArray[1]` aynı nesne değildir (`false` döner)

*/
