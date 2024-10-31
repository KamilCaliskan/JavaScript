function permutations(string) {
    let results = new Set();  // Benzersiz permütasyonları saklamak için Set
    
    function permute(str, prefix = "") {
        if (str.length === 0) {
            results.add(prefix);  // Tamamlanan permütasyonu sete ekle
        } else {
            for (let i = 0; i < str.length; i++) {
                let remaining = str.slice(0, i) + str.slice(i + 1);
                permute(remaining, prefix + str[i]);
            }
        }
    }

    permute(string);  // Ana fonksiyonda permütasyonları başlat
    
    // Set'i diziye çevirip döndür
    return Array.from(results);
}
