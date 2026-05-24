// ==========================================
// 1. pipe() — Nối chuỗi các hàm (Hàm này nhận hàm khác làm tham số)
// ==========================================
function pipe(...fns) {
    // Trả về một hàm mới nhận vào giá trị ban đầu (với ví dụ là số 5)
    return function(initialValue) {
        let currentResult = initialValue;
        
        // Dùng vòng lặp duyệt qua từng hàm trong chuỗi để tính toán nối tiếp
        for (let i = 0; i < fns.length; i++) {
            currentResult = fns[i](currentResult);
        }
        
        return currentResult;
    };
}

// Chạy thử kiểm tra pipe
const processValue = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(processValue(5)); // → "Kết quả: 20"


// ==========================================
// 2. memoize() — Lưu trữ (Cache) kết quả để không phải tính lại
// ==========================================
function memoize(fn) {
    // Tạo một object rỗng đóng vai trò là "nhà kho" lưu kết quả cũ (Closure)
    let cache = {};
    
    return function(n) {
        // Kiểm tra xem giá trị n này đã từng được tính toán và lưu kho chưa
        if (n in cache) {
            return cache[n]; // Nếu có rồi thì bốc trong kho ra trả về luôn
        }
        
        // Nếu chưa có, tiến hành chạy hàm gốc để tính toán
        let result = fn(n);
        cache[n] = result; // Cất kết quả vào kho để lần sau dùng lại
        return result;
    };
}

// Chạy thử kiểm tra memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log("\n=== TEST MEMOIZE ===");
console.log(expensiveCalc(1000000)); // Lần 1: → Sẽ in "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // Lần 2: → (Không in "Đang tính...", lấy thẳng từ cache!)


// ==========================================
// 3. debounce() — Chờ user ngừng gõ phím sau một thời gian mới thực hiện
// ==========================================
function debounce(fn, delay) {
    let timeoutId = null;
    
    return function(query) {
      
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        
        // Thiết lập một cái hẹn giờ mới
        timeoutId = setTimeout(() => {
            fn(query); 
        }, delay);
    };
}

// Chạy thử kiểm tra debounce
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== TEST DEBOUNCE ===");
search("iPh");
search("iPho");
search("iPhone 16"); // Chỉ lần gọi cuối cùng này được chạy


// ==========================================
// 4. retry() — Thử lại hành động nếu gặp lỗi (Hàm bất đồng bộ async/await)
// ==========================================
async function retry(fn, maxAttempts = 3) {
    let lastError = null;
    
    // Dùng vòng lặp for chạy từ lần 1 đến số lần tối đa
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Chờ hàm thực thi (nếu thành công thì return kết quả lập tức)
            return await fn();
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại... Thử lại.`);
            lastError = error; // Lưu lại lỗi mới nhất nếu có
        }
    }
    
    // Nếu chạy hết số lần lặp mà vẫn lỗi thì ném ra lỗi cuối cùng
    throw lastError;
}

// Chạy thử kiểm tra retry 
let failureCount = 0;
const unstableRequest = async () => {
    if (failureCount < 2) {
        failureCount++;
        throw new Error("Lỗi kết nối Server!");
    }
    return "Kết nối thành công! Đã lấy được dữ liệu.";
};

// Chạy hàm async
setTimeout(async () => {
    console.log("\n=== TEST RETRY ===");
    try {
        const data = await retry(unstableRequest, 3);
        console.log("Kết quả cuối cùng:", data);
    } catch (err) {
        console.log("Thất bại hoàn toàn:", err.message);
    }
}, 600); 