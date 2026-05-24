PHẦN A 
Câu A1 
1. Viết hàm tinhThueBaoHiem(luong) theo 3 cách:
JavaScript
// Cách 1: Function Declaration (Khai báo hàm truyền thống)
function tinhThueBaoHiemCách1(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
}

// Cách 2: Function Expression (Biểu thức hàm - gán vào biến)
const tinhThueBaoHiemCách2 = function(luong) {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};

// Cách 3: Arrow Function (Hàm mũi tên ngắn gọn)
const tinhThueBaoHiemCách3 = (luong) => {
    let thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
2. So sánh về Hoisting giữa 3 cách:
3 cách này khác nhau hoàn toàn về cơ chế Hoisting:

Cách 1 (Function Declaration): Có Hoisting. Nghĩa là bạn có thể gọi hàm tinhThueBaoHiem ở dòng code phía trên trước khi viết định nghĩa hàm mà chương trình vẫn chạy bình thường.

Cách 2 và Cách 3 (Expression & Arrow): Không có Hoisting. Vì hàm được gán vào một biến const. Nếu bạn gọi hàm trước khi khai báo biến đó, chương trình sẽ lập tức báo lỗi ReferenceError
Câu A2 (5đ) — Scope & Closure
 Dự đoán Output (Không chạy code):
JavaScript
// --- Đoạn 1 ---
console.log(c.increment());  // → 1
console.log(c.increment());  // → 2
console.log(c.increment());  // → 3
console.log(c.decrement());  // → 2
console.log(c.getCount());   // → 2

// --- Đoạn 2 ---
// của vòng lặp var:
var: 3
var: 3
var: 3

//  của vòng lặp let:
let: 0
let: 1
let: 2

 -Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau?
Sự khác biệt này đến từ phạm vi hoạt động (Scope) của hai từ khóa:

Với vòng lặp dùng var: * var hoạt động theo Function scope (hoặc Global scope), nó không bị giới hạn bởi khối nhọn {} của vòng lặp. Do đó, cả 3 vòng lặp đều dùng chung duy nhất một biến i ở bên ngoài.

Hàm setTimeout là bất đồng bộ, nó sẽ đợi 100ms sau mới chạy. Trong lúc nó đợi, vòng lặp for đã chạy xong vèo một cái và tăng biến i lên bằng 3.
 
 Với vòng lặp dùng let:
let hoạt động theo Block scope (phạm vi khối nhọn). Cứ mỗi một lượt lặp, JavaScript lại tạo ra một biến j hoàn toàn mới và độc lập cho lượt lặp đó.
Kết quả là màn hình in ra chuẩn chỉnh từng số: let: 0, let: 1, let: 2.
Câu A3 
Với mảng dữ liệu ban đầu: const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

JavaScript
// 1. Lấy các số chẵn
const cau1 = nums.filter(x => x % 2 === 0);

// 2. Nhân mỗi số với 3
const cau2 = nums.map(x => x * 3);

// 3. Tính tổng tất cả
const cau3 = nums.reduce((sum, x) => sum + x, 0);

// 4. Tìm số đầu tiên > 7
const cau4 = nums.find(x => x > 7);

// 5. Kiểm tra CÓ số > 10 không
const cau5 = nums.some(x => x > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const cau6 = nums.every(x => x > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const cau7 = nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc - dùng toán tử spread để copy trước khi reverse)
const cau8 = [...nums].reverse();

Câu A4 
Dự đoán kết quả Output (Khi chạy console.log):
JavaScript
console.log(name, price, ram, color);  // → iPhone 16 25990000 8 Titan
console.log(specs);                     // → ReferenceError: specs is not defined

console.log(updated.price);            // → 23990000
console.log(updated.sale);             // → true
console.log(product.price);            // → 25990000

console.log(product.specs.ram);        // → 16

Phần C:
Câu C1 
1. code sau khi Refactor ngắn gọn:
JavaScript
function processOrders(orders) {
    return orders
        // 1. Lọc đơn hàng đã hoàn thành (completed) VÀ tổng tiền (total) > 100.000
        .filter(({ status, total }) => status === "completed" && total > 100000)
        // 2. Chuyển đổi cấu trúc, tính toán discount (10%) và finalTotal cho mỗi đơn hàng
        .map(({ id, customer, total }) => ({ id, customer, total, discount: total * 0.1, finalTotal: total * 0.9 }))
        // 3. Sắp xếp danh sách theo finalTotal giảm dần (descending)
        .sort((a, b) => b.finalTotal - a.price);  
}

Câu C2 
1.
JavaScript
const miniArray = {
    // 1. Hàm map: Biến đổi từng phần tử thành phần tử mới
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Gọi hàm fn truyền vào: phần tử hiện tại, chỉ số i, mảng gốc
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // 2. Hàm filter: Lọc các phần tử thỏa mãn điều kiện (fn trả về true)
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu hàm điều kiện fn trả về true/truthy thì mới nhận phần tử đó
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // 3. Hàm reduce: Tích lũy/Gom các phần tử lại thành một giá trị duy nhất
    reduce(arr, fn, initialValue) {
        // Kiểm tra xem người dùng có truyền vào giá trị khởi tạo (initialValue) hay không
        const hasInitialValue = initialValue !== undefined;
        
        // Nếu có truyền initialValue thì biến tích lũy (accumulator) lấy giá trị đó và vòng lặp chạy từ vị trí số 0.
        // Nếu KHÔNG truyền, accumulator lấy luôn phần tử đầu tiên arr[0] và vòng lặp chạy từ vị trí số 1.
        let accumulator = hasInitialValue ? initialValue : arr[0];
        let startIndex = hasInitialValue ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            // Cập nhật lại biến tích lũy sau mỗi lượt chạy hàm fn
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// ==========================================
// ---  (TEST CASES) ---
// ==========================================
console.log(miniArray.map([1, 2, 3], x => x * 2));          // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10