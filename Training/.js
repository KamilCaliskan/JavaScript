//Bu fonksiyon, HTML5 Canvas API'sini kullanarak resim işleme ve piksel verisi analizi yapar
//Sonuç olarak, trafik lambasının durumuna göre arabaya ne zaman ilerleme izni verileceğini hesaplar
//  ve "MM:SS" formatında döndürür

function check(trafficLight, currentTime) {
  // Canvas oluşturulur ve 2D context alınır
  var canvas = document.createElement('canvas');
  canvas.width = 140;
  canvas.height = 100;
  var ctx = canvas.getContext('2d');

  // Trafik lambası resmi canvas üzerine çizilir
  var imageObject = new Image();
  imageObject.src = trafficLight;
  ctx.drawImage(imageObject, 0, 0);

  // Canvas üzerinden piksel verileri alınır
  var imageData = ctx.getImageData(0, 0, 140, 100).data;

  // Rakam tanıma fonksiyonu, verilen koordinatlardaki rakamı tanır
  function recognizeDigit(x, y) {
    for (let digit = 0; digit <= 9; digit++) {
      let match = true;
      for (let dx = 0; dx < 7; dx++) {
        for (let dy = 0; dy < 5; dy++) {
          if (NUMS[digit][dy][dx] !== (imageData[((y + dy) * 140 + (x + dx)) * 4] === 255 ? 1 : 0)) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }
      if (match) return digit;
    }
    return -1;
  }

  // Sayma işlemi için görseldeki rakamları tanıma
  let tensDigit = recognizeDigit(78, 20);
  let unitsDigit = recognizeDigit(85, 20);

  // Trafik lambası durumlarını belirleme
  let redOn = imageData[15 * 140 * 4] === 255; // Kırmızı lamba için üst sol köşe
  let yellowOn = imageData[45 * 140 * 4] === 255; // Sarı lamba için üst sol köşe
  let greenOn = imageData[75 * 140 * 4] === 255; // Yeşil lamba için üst sol köşe

  // Mevcut zamanı "MM:SS" formatında ayırma
  let [mm, ss] = currentTime.split(':').map(num => parseInt(num, 10));

  // Arabanın ilerleyebileceği sonraki zamanı hesaplama
  if (greenOn) {
    ss += 1;
  } else if (yellowOn && tensDigit === 0 && unitsDigit === 0) {
    ss = 60;
    mm += 1;
  } else if (redOn && tensDigit === 0 && unitsDigit === 3) {
    ss = 60 - ss;
    mm += 1;
  }

  // Sonucu "MM:SS" formatında döndürme
  return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
}
