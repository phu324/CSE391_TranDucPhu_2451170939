const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => p.category === category && p.price >= minPrice && p.price <= maxPrice);
}

// 3. Sắp xếp theo giá (tăng/giảm) - Sử dụng spread [...] để tránh thay đổi mảng gốc
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
}

// 4. Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) {
    return products.reduce((result, p) => {
        // Nếu danh mục này chưa có trong kết quả, hoặc tìm thấy sản phẩm có giá rẻ hơn sản phẩm cũ
        if (!result[p.category] || p.price < result[p.category].price) {
            result[p.category] = p; // Gán/Cập nhật sản phẩm rẻ nhất
        }
        return result;
    }, {}); // Khởi tạo accumulator là một object rỗng {}
}

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString("vi-VN") + "đ" // Định dạng dấu chấm hàng nghìn
    }));
}

// 7. Tính rating trung bình toàn bộ
function averageRating(products) {
    if (products.length === 0) return 0;
    let totalRating = products.reduce((sum, p) => sum + p.rating, 0);
    let avg = totalRating / products.length;
    return Math.round(avg * 10) / 10; // Làm tròn về 1 chữ số thập phân
}

// 8. Tìm sản phẩm theo keyword (tìm trong name, không phân biệt chữ hoa thường)
function searchProducts(products, keyword) {
    let lowerKeyword = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowerKeyword));
}

// ==========================================
// --- CHẠY KIỂM THỬ (TEST CASES) ---
// ==========================================
console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

// Chạy test thêm các hàm còn lại để bạn chụp ảnh đầy đủ
console.log("\n=== FORMATTED PRODUCT LIST ===");
console.log(formatProductList(products).slice(0, 3)); // Lấy thử 3 phần tử đầu xem định dạng

console.log("\n=== AVERAGE RATING ===");
console.log(averageRating(products));

console.log("\n=== SEARCH PRODUCTS (Keyword: 'pro') ===");
console.log(searchProducts(products, "pro"));