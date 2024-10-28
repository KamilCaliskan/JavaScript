function encodeRailFenceCipher(string, numberRails) {
    if (numberRails < 2 || string.length === 0) return string;

    // Her ray için bir dizi oluştur
    const rails = Array.from({ length: numberRails }, () => []);
    let rail = 0;
    let direction = 1; // 1 aşağı, -1 yukarı

    // Rayları doldur
    for (const char of string) {
        rails[rail].push(char);
        rail += direction;

        // Üst veya alt ray'a ulaşınca yönü değiştir
        if (rail === 0 || rail === numberRails - 1) {
            direction *= -1; // Yönü tersine çevir
        }
    }

    // Tüm rayları birleştirerek şifreli dizeyi oluştur
    return rails.flat().join('');
}


function decodeRailFenceCipher(string, numberRails) {
    if (numberRails < 2 || string.length === 0) return string;

    // Her ray için bir dizi oluştur, yer tutucularla
    const rails = Array.from({ length: numberRails }, () => []);
    let rail = 0;
    let direction = 1;

    // Zigzag desenini belirleyerek her rayda kaç karakter olduğunu öğren
    for (const char of string) {
        rails[rail].push(null); // Yer tutucu koy
        rail += direction;

        // Üst veya alt ray'a ulaşınca yönü değiştir
        if (rail === 0 || rail === numberRails - 1) {
            direction *= -1; // Yönü tersine çevir
        }
    }

    // Rayları gerçek karakterlerle doldur
    let index = 0;
    for (let i = 0; i < numberRails; i++) {
        for (let j = 0; j < rails[i].length; j++) {
            if (rails[i][j] === null) {
                rails[i][j] = string[index++];
            }
        }
    }

    // Karakterleri zigzag desenine göre oku
    let result = '';
    rail = 0;
    direction = 1;
    for (let i = 0; i < string.length; i++) {
        result += rails[rail].shift(); // Mevcut raydan bir karakter al
        rail += direction;

        // Üst veya alt ray'a ulaşınca yönü değiştir
        if (rail === 0 || rail === numberRails - 1) {
            direction *= -1; // Yönü tersine çevir
        }
    }

    return result;
}
