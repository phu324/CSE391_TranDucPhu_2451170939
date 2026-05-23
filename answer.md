PHẦN A 
Câu A1 — var / let / const
1. Dự đoán Output:
Đoạn 1: undefined

Đoạn 2: ReferenceError: Cannot access 'y' before initialization

Đoạn 3: TypeError: Assignment to constant variable.

Đoạn 4: [1, 2, 3, 4]

Đoạn 5:

Trong block: 2

Ngoài block: 1

2. Giải thích chi tiết kết quả:
Đoạn 1 (var x): Do cơ chế Hoisting, định nghĩa biến var x được đẩy lên đầu phạm vi (scope) nhưng chưa được gán giá trị, nên khi gọi trước lúc gán, nó trả về undefined.

Đoạn 2 (let y): let (và cả const) nằm trong Temporal Dead Zone (Vùng chết tạm thời - TDZ) từ đầu block cho tới khi dòng khai báo được thực thi. Gọi y trước khi khai báo sẽ gây lỗi crash chương trình (ReferenceError).

Đoạn 3 (const z): Biến khai báo bằng const là một hằng số mang tính Read-only (chỉ đọc). Bạn không thể tái gán (reassign) một giá trị hoàn toàn mới cho nó. Việc gán z = 20 gây ra TypeError.

Đoạn 4 (const arr): const ngăn chặn việc tái gán địa chỉ ô nhớ của biến, chứ không cấm việc thay đổi nội dung bên trong (mutate) của một Object hoặc Array (kiểu dữ liệu tham chiếu - Reference Type). Hàm .push(4) chỉ sửa đổi dữ liệu bên trong mảng nên hoàn toàn hợp lệ.

Đoạn 5 (Block Scope): let có tính chất Block scope (phạm vi trong cặp ngoặc nhọn {}). Biến let a = 2 ở trong block là một biến hoàn toàn độc lập, không ảnh hưởng gì tới biến let a = 1 ở global scope bên ngoài.

Câu A2 (5đ) — Data Types & Coercion1. Dự đoán kết quả:JavaScriptconsole.log(typeof null);              // "object"
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" (hoặc 0 tùy thuộc vào môi trường console chạy trực tiếp)
2. "5" + 3 và "5" - 3 cho kết quả khác nhau vì: Với toán tử cộng (+): Toán tử này đảm nhận 2 vai trò trong JS: Cộng số học và Nối chuỗi (String concatenation). Theo quy tắc ép kiểu ngầm định (Implicit Coercion), nếu có ít nhất một toán hạng là String, toán tử + sẽ ưu tiên chuyển toán hạng còn lại sang String rồi tiến hành nối chuỗi. Do đó: "5" + 3 -> "5" + "3" -> "53".Với toán tử trừ (-): Toán tử này chỉ có duy nhất một vai trò là tính toán số học. Nó không có nghĩa với chuỗi chữ. Vì vậy, JavaScript buộc phải ép tất cả các toán hạng sang kiểu Number để thực hiện phép tính. Do đó: "5" - 3 -> $5 - 3 = 2$.
Câu A3 (5đ) — So sánh == vs ===
1. Dự đoán kết quả (true / false):
JavaScript
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
2. Quy tắc áp dụng cho tương lai:
Từ giờ trở đi, bạn LUÔN LUÔN NÊN DÙNG toán tử so sánh nghiêm ngặt === (và !==).

Tại sao?

Toán tử so sánh bằng thông thường (==) sẽ thực hiện ép kiểu ngầm định (Type Coercion) trước khi so sánh, dẫn đến những kết quả rất phản trực giác và dễ sinh bug (như 0 == false hay "" == false đều ra true).

Toán tử nghiêm ngặt (===) so sánh cả Giá trị (Value) lẫn Kiểu dữ liệu (Data Type). Nếu khác kiểu dữ liệu, nó lập tức trả về false mà không tự ý sửa đổi code của bạn, giúp code minh bạch, an toàn và dễ kiểm soát hơn.

Trường hợp ngoại lệ duy nhất đôi khi Senior hay dùng == là để check nhanh cả null và undefined cùng một lúc (if (variable == null)), nhưng để an toàn tuyệt đối thì vẫn khuyến khích viết tường minh với ===.
Câu A4  — Truthy & Falsy
1. TẤT CẢ giá trị Falsy trong JavaScript:
Có chính xác 6 giá trị Falsy cơ bản (khi đưa vào câu điều kiện sẽ bị tính là false):
-false
-0 (số không, bao gồm cả -0 và 0n của BigInt)
-"" hoặc '' hoặc ``` (chuỗi rỗng)
-null
-undefined
-NaN (Not a Number)

2. Dự đoán kết quả in ra của các câu điều kiện:
if ("0") console.log("A");        -> Có in A (Chuỗi "0" không phải chuỗi rỗng -> Truthy)
if ("") console.log("B");            -> Không in (Chuỗi rỗng ->Falsy).
if ([]) console.log("C");   -> Có in C (Mảng rỗng [] là một Object ->Luôn luôn là Truthy!).       
if ({}) console.log("D");    -> Có in D (Object rỗng {} ->Luôn luôn là Truthy!).     
if (null) console.log("E");  -> Không in (null ->Falsy)     
if (0) console.log("F");   -> Không in (0 -> Falsy).     
if (-1) console.log("G");  ->Có in G (Mọi số khác 0, kể cả số âm, đều là Truthy)       
if (" ") console.log("H"); -> Có in H (Chuỗi có chứa 1 dấu cách không phải chuỗi rỗng->Truthy).
Câu A5  

Cách 1:
JavaScript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
Cách 2:
JavaScript
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
Cách 3:
JavaScript
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`.trim(); // .trim() dùng để xóa các khoảng trắng thừa đầu cuối nếu cần

Phần C:
Câu C1:
STT| Vị trí lỗi | Nguyên nhân | Cách sửa lỗi
1|if (giaSauGiam = 0)| Dùng toán tử gán = thay vì toán tử so sánh (== hoặc ===). Điều này khiến giaSauGiam bị biến thành 0 (Falsy) và câu lệnh if không bao giờ chạy | Đổi thành if (giaSauGiam === 0)
2|"tinhGiaGiamGia(""100000"", 20)"|"Tham số đầu vào ""100000"" là kiểu String. Mặc dù phép tính toán học phía dưới vẫn chạy nhờ ép kiểu ngầm định (Type Coercion), nhưng đây là thói quen xấu, dễ sinh bug khi cộng chuỗi."|Đổi thành số: 100000
3|Thiếu dấu chấm phẩy ;|"JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI), nhưng việc thiếu ; ở cuối các dòng return hoặc gán biến là không tường minh và dễ gây lỗi khi gộp dòng."|Thêm ; vào cuối các dòng lệnh.
4 | Lỗi logic đầu ra gia2 | "Khi phanTramGiam = 110 (không hợp lệ), hàm trả về String thông báo lỗi. Dòng log phía dưới in ra ""Giá: Phần trăm giảm không hợp lệ"", nhìn rất thiếu chuyên nghiệp." | Cần kiểm tra nếu kết quả trả về là String (lỗi) thì in thông báo riêng.
5|Lỗi biến var i trong vòng lặp|"Lỗi ẩn nghiêm trọng: Biến var không có block scope mà có hàm/global scope. Khối setTimeout là bất đồng bộ, nó sẽ đợi 1 giây sau mới chạy. Lúc đó vòng lặp for đã chạy xong và biến i đã tăng lên bằng 5. Kết quả là màn hình sẽ in ra 5 lần chữ Item 5 thay vì Item 0, Item 1,..." | Đổi var i = 0 thành let i = 0. Cú pháp let sẽ tạo ra một block scope riêng cho i ở mỗi vòng lặp.

Đoạn code sau khi sửa lỗi:
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    var giamGia = (giaBan * phanTramGiam) / 100;
    let giaSauGiam = giaBan - giamGia;
    
    // Sửa lỗi toán tử so sánh (===)
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test 1: Sửa tham số truyền vào thành kiểu số (Number)
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

// Test 2: Xử lý hiển thị thông báo lỗi tường minh
const gia2 = tinhGiaGiamGia(50000, 110);
if (typeof gia2 === "string") {
    console.log("Lỗi hệ thống: " + gia2);
} else {
    console.log("Giá: " + gia2);
}

// Test 3: Sửa lỗi ẩn bằng cách thay 'var' thành 'let'
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}