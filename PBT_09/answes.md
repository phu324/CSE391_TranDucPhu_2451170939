PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
Câu A1 
1. Sơ đồ cây (DOM Tree)
document
└── div#app
    ├── header
    │   ├── h1
    │   │   └── "Todo App"
    │   └── nav
    │       ├── a.active 
    │       │   └── "All"
    │       ├── a
    │       │   └── "Active"
    │       └── a
    │           └── "Completed"
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button
        │       └── "Add"
        └── ul#todoList
            ├── li.todo-item
            │   └── "Learn HTML"
            └── li.todo-item.completed
                └── "Learn CSS"
2. Các câu lệnh querySelector tương ứng:
Chọn thẻ <h1>:JavaScriptdocument.querySelector("h1");
Chọn input trong form:JavaScriptdocument.querySelector("#todoForm input"); // hoặc document.querySelector("#todoInput")
Chọn tất cả .todo-item:JavaScriptdocument.querySelectorAll(".todo-item");
Chọn link đang active:JavaScriptdocument.querySelector("nav a.active");
Chọn <li> đầu tiên trong #todoList:JavaScriptdocument.querySelector("#todoList li"); // querySelector luôn lấy phần tử đầu tiên thỏa mãn
Chọn tất cả <a> bên trong <nav> :JavaScriptdocument.querySelectorAll("nav a");

Câu A2 :
 Sự khác biệt và trường hợp sử dụng: 
 -textContent: Chỉ đọc hoặc ghi văn bản thuần túy (text), trình duyệt sẽ không biên dịch các thẻ HTML.
 Khi nào dùng: Dùng khi hiển thị dữ liệu dạng text, đặc biệt là dữ liệu do người dùng nhập vào (để đảm bảo an toàn).
 
 -innerHTML: Đọc hoặc ghi nội dung có chứa cả văn bản và các thẻ HTML, trình duyệt sẽ biên dịch chuỗi ký tự thành các phần tử DOM thật.
 Khi nào dùng: Dùng khi bạn cần chủ động chèn một đoạn cấu trúc HTML phức tạp từ nguồn dữ liệu đáng tin cậy (trusted source).
 
 2. Giải thích lỗ hổng XSS:innerHTML gây ra lỗ hổng XSS (Cross-Site Scripting) vì nó chấp nhận và thực thi các thẻ script hoặc mã độc lồng trong các thuộc tính sự kiện (như onerror, onload) do hacker cố tình chèn vào. Trình duyệt sẽ hiểu nhầm đoạn mã độc đó là code hợp pháp của hệ thống và chạy nó.
 
 3. Cách sửa code chống mã độc:Sử dụng textContent thay cho innerHTML để trình duyệt tự động biến các ký tự đặc biệt (<, >) thành chuỗi text thuần túy mà không thực thi.JavaScript// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// CÁCH SỬA:
document.querySelector("#result").textContent = userInput; // Hiện literal text, không chạy hack!

Câu A3 
Dựa trên cơ chế Event Bubbling (Sự kiện nổi bọt từ phần tử con sâu nhất lên các phần tử cha bên ngoài):
1. Khi click vào button (Mặc định):
Sự kiện bắt đầu tại #btn $\rightarrow$ nổi bọt lên #inner $\rightarrow$ nổi bọt lên #outer.
Output trong Console:
Plaintext

BUTTON
INNER
OUTER

2. Nếu bỏ comment (Uncomment) e.stopPropagation();:
Hàm e.stopPropagation() sẽ ngăn chặn sự kiện tiếp tục nổi bọt lên các phần tử cha phía trên. Sự kiện bị chặn ngay tại phần tử click.
Output trong Console:
Plaintext

BUTTON

PHẦN C 
Câu C1 

Lỗi 1 (Sai tên sự kiện): .addEventListener("onclick", ...) ở nút decrement. Trong addEventListener, tên sự kiện không có chữ on.

Sửa lại: Đổi "onclick" thành "click".

Lỗi 2 (Ghi đè biến hằng): Lệnh countDisplay = count; ở nút reset. Biến countDisplay được khai báo bằng const (hằng số), không thể gán lại trực tiếp bằng một số.

Sửa lại: Đổi thành countDisplay.textContent = count;.

Lỗi 3 (Sai thuộc tính thực thi lệnh): Lệnh item.remove; ở chức năng xóa lịch sử. remove() là một hàm (method), thiếu cặp dấu ngoặc tròn () nên lệnh không chạy.

Sửa lại: Đổi thành item.remove();.

Lỗi 4 (Sai kiểu dữ liệu khi lấy từ Storage): Ở sự kiện load, localStorage.getItem("count") trả về một chuỗi (String) hoặc null. Nếu trực tiếp dùng nó để count++ hoặc count-- ở các bước sau, JS sẽ tính toán sai (ví dụ: "0" + 1 = "01").

Sửa lại: Ép kiểu về số bằng Number(localStorage.getItem("count")) || 0;.

Lỗi 5 (Lỗi Logic khi hiển thị mặc định): Ở sự kiện load, nếu ứng dụng chạy lần đầu tiên (chưa có gì trong localStorage), count sẽ nhận giá trị null, làm giao diện hiển thị chữ null.

Sửa lại: Thêm giá trị mặc định || 0.

Lỗi 6 (Chưa khôi phục dữ liệu Lịch sử): Sự kiện beforeunload có lưu historyList.innerHTML, nhưng khi trang load lại, code hoàn toàn bỏ quên việc khôi phục danh sách này lên giao diện.

Sửa lại: Thêm historyList.innerHTML = localStorage.getItem("history") || ""; vào trong sự kiện load.

Lỗi 7 (Mất sự kiện của các thẻ li cũ sau khi tải lại trang): Khi khôi phục historyList.innerHTML từ localStorage, các thẻ li cũ chỉ là các chuỗi HTML tĩnh nên chúng sẽ bị mất hoàn toàn sự kiện xóa deleteHistory khi click.

Sửa lại: Cách tốt nhất là dùng Event Delegation, bỏ hàm gán sự kiện trực tiếp trên thẻ li lúc tạo ra, thay vào đó gán 1 lần duy nhất cho thẻ cha historyList.

🛠️ Đoạn code sau khi đã được Refactor (Sửa hoàn chỉnh):
JavaScript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// SỬA LỖI 7: Dùng Event Delegation cho historyList (Gán 1 lần cho cha xử lý tất cả con)
historyList.addEventListener("click", function(e) {
    const liItem = e.target.closest("li");
    if (liItem) {
        liItem.remove(); // Sửa lỗi cách xóa cũ (removeChild rườm rà)
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Dùng textContent an toàn hơn innerHTML
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Không cần gán addEventListener ở đây nữa vì cha đã quản lý (Sửa lỗi 7)
    historyList.append(li);
});

// SỬA LỖI 1: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; // SỬA LỖI 2: Đổi thành .textContent
    historyList.innerHTML = ""; // Đổi thành chuỗi rỗng thay vì null
});

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); // SỬA LỖI 3: Thêm dấu ngoặc () để chạy hàm
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // SỬA LỖI 4 & 5: Chuyển dữ liệu về dạng Số và tránh lỗi null
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // SỬA LỖI 6: Khôi phục lại danh sách lịch sử hiển thị lên giao diện
    historyList.innerHTML = localStorage.getItem("history") || "";
});

Câu C2 (7đ) — Performance
1.  bind event lên 1000 elements là BAD PRACTICE vì:
Tốn bộ nhớ (Memory): Tạo ra 1000 hàm lắng nghe sự kiện chạy ngầm sẽ ngốn rất nhiều tài nguyên RAM của trình duyệt, làm app bị chậm hoặc giật lag.

Dễ mất sự kiện khi cập nhật UI: Nếu bạn xóa danh sách đó đi và render lại bằng innerHTML, toàn bộ 1000 sự kiện cũ sẽ bị phá hủy và biến mất, bạn lại phải mất công viết code gán lại từ đầu.

Cách Event Delegation giải quyết:
Thay vì thuê 1000 người đứng canh 1000 phần tử, ta chỉ cần gán 1 sự kiện duy nhất lên thẻ CHA bao quanh chúng. Dựa vào cơ chế "nổi bọt" (Event Bubbling), khi bất kỳ phần tử con nào được click, thẻ cha đều bắt được tín hiệu. Ta chỉ cần kiểm tra e.target để biết chính xác phần tử con nào vừa được click.

2. Đoạn code sau khi Refactor dùng DocumentFragment:
JavaScript
// Tạo một "DOM ảo/DOM phụ" nằm ngoài giao diện chính
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Đẩy tạm vào fragment (Lúc này chưa tác động gì đến giao diện thật)
    fragment.appendChild(div);   
}

// Thả toàn bộ 1000 thẻ div vào Body cùng 1 lúc duy nhất
document.body.appendChild(fragment); // ← Chỉ gây đúng 1 lần Reflow!
Giải thích tại sao nhanh hơn:

Code cũ: Mỗi lần chạy vòng lặp, lệnh document.body.appendChild ép trình duyệt phải tính toán lại kích thước và vẽ lại giao diện (Reflow/Repaint) ngay lập tức. Chạy 1000 lần nghĩa là trình duyệt phải "vẽ đi vẽ lại" 1000 lần, cực kỳ tốn hiệu năng.

Code dùng DocumentFragment: DocumentFragment giống như một chiếc giỏ tạm thời nằm trong bộ nhớ đệm (không hiển thị trên màn hình). Chúng ta gom hết 1000 thẻ div bỏ vào chiếc giỏ đó, rồi đổ cả giỏ vào body trong đúng 1 lần duy nhất. Trình duyệt chỉ cần tính toán và vẽ lại giao diện đúng 1 lần, giúp tốc độ xử lý nhanh hơn gấp nhiều lần.

