// 1. Khai báo danh sách món ăn đầu vào
const cart = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

const isWednesday = true; // Giả định hôm nay là thứ 4 (Wednesday)
const hasTip = true;      // Khách có chọn tip 5%

// 2. Tính tổng tiền gốc của các món ăn
let subTotal = 0;
for (let i = 0; i < cart.length; i++) {
    subTotal += cart[i].price * cart[i].quantity;
}

// 3. Tính toán các khoản giảm giá (Quy tắc giảm giá)
let discountPercent = 0;
if (subTotal > 1000000) {
    discountPercent = 15; // Giảm 15% nếu tổng > 1 triệu
} else if (subTotal > 500000) {
    discountPercent = 10; // Giảm 10% nếu tổng > 500k
}

// Nếu là ngày thứ 3/thứ 4 (tùy theo đề bài ghi là Wednesday - Thứ 4), giảm thêm 5%
if (isWednesday) {
    discountPercent += 5;
}

let discountAmount = (subTotal * discountPercent) / 100; // Số tiền được giảm
let totalAfterDiscount = subTotal - discountAmount;

// 4. Tính Thuế VAT (8%) và Tip (5% trên tổng sau giảm nếu có)
let vatAmount = (totalAfterDiscount * 8) / 100;
let tipAmount = 0;
if (hasTip) {
    tipAmount = (totalAfterDiscount * 5) / 100;
}

// 5. Tổng số tiền cuối cùng phải thanh toán
let finalPayment = totalAfterDiscount + vatAmount + tipAmount;

// ==========================================
// IN HÓA ĐƠN CHI TIẾT (Định dạng khung)
// ==========================================
console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
console.log("╠══════════════════════════════════════╣");

// Duyệt mảng in từng món ăn
for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let itemTotal = item.price * item.quantity;
    
    // Tạo chuỗi hiển thị thông tin món: "1. Phở bò      x2    @65k"
    let itemInfo = `${i + 1}. ${item.name.padEnd(10)} x${item.quantity}   @${(item.price / 1000).toFixed(0)}k`;
    let priceStr = `${(itemTotal / 1000).toFixed(0)}k`;
    
    // Căn lề hai bên cho đẹp mắt
    console.log(`║ ${itemInfo.padEnd(26)} = ${priceStr.padStart(5)} ║`);
}

console.log("╠══════════════════════════════════════╣");
// Dùng hàm .toLocaleString('vi-VN') để tự động thêm dấu chấm phân cách hàng nghìn (ví dụ: 200.000đ)
console.log(`║ Tổng cộng:              ${subTotal.toLocaleString('vi-VN').padStart(11)}đ ║`);
console.log(`║ Giảm giá (${discountPercent}%):          ${discountAmount.toLocaleString('vi-VN').padStart(11)}đ ║`);
console.log(`║ VAT (8%):               ${vatAmount.toLocaleString('vi-VN').padStart(11)}đ ║`);
console.log(`║ Tip (5%):               ${tipAmount.toLocaleString('vi-VN').padStart(11)}đ ║`);
console.log("╠══════════════════════════════════════╣");
console.log(`║ THANH TOÁN:             ${finalPayment.toLocaleString('vi-VN').padStart(11)}đ ║`);
console.log("╚══════════════════════════════════════╝");