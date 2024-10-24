class PaginationHelper {
    constructor(collection, itemsPerPage) {
        this.collection = collection; // Koleksiyon (dizi)
        this.itemsPerPage = itemsPerPage; // Sayfa başına öğe sayısı
    }

    // Koleksiyondaki toplam öğe sayısını döndürür
    itemCount() {
        return this.collection.length;
    }

    // Toplam sayfa sayısını döndürür
    pageCount() {
        return Math.ceil(this.collection.length / this.itemsPerPage);
    }

    // Verilen sayfa indeksindeki öğe sayısını döndürür
    pageItemCount(pageIndex) {
        const totalPages = this.pageCount(); // Toplam sayfa sayısı
        if (pageIndex < 0 || pageIndex >= totalPages) {
            return -1; // Geçersiz sayfa indeksi
        }
        
        // Son sayfa kontrolü
        if (pageIndex === totalPages - 1) {
            return this.collection.length % this.itemsPerPage || this.itemsPerPage;
        }
        
        // Diğer sayfalar tam doludur
        return this.itemsPerPage;
    }

    // Verilen öğe indeksinin hangi sayfada olduğunu döndürür
    pageIndex(itemIndex) {
        if (itemIndex < 0 || itemIndex >= this.collection.length) {
            return -1; // Geçersiz öğe indeksi
        }
        
        return Math.floor(itemIndex / this.itemsPerPage);
    }
}
