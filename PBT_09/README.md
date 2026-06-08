# 🟨 PHIẾU BÀI TẬP 09: DOM MANIPULATION & EVENTS
> **Môn học:** Phát triển ứng dụng Web / Thiết kế Web cơ bản  
> **Dự án thành phần:** ShopTLU E-Commerce Platform  
> **Sinh viên thực hiện:** Trần Đức Phú  
> **Mã số sinh viên (MSSV):** 2451170939  
> **Lớp:** CSE391.66 KTPM2

---

## 📊 THÔNG TIN TỔNG QUAN PBT_09

* ⏱️ **Thời gian làm bài:** 180 phút
* 🎯 **Mục tiêu:** Thực hành chuyên sâu về JavaScript trên môi trường Trình duyệt (Browser environment). Làm chủ mô hình cây đối tượng tài liệu (`DOM Tree`), cơ chế bắt và xử lý sự kiện tương tác người dùng (`DOM Events`), phân biệt bản chất `innerHTML` vs `textContent` để phòng chống lỗ hổng bảo mật `XSS`. Đồng thời ứng dụng kỹ thuật ủy quyền sự kiện (`Event Delegation`) và `DocumentFragment` để tối ưu hóa hiệu năng render giao diện, tránh hiện tượng thắt nút cổ chai `Reflow/Repaint` khi xử lý dữ liệu lớn.
* 🛠️ **Công cụ sử dụng:** Visual Studio Code, Google Chrome DevTools (Elements, Console & Sources tabs), OBS Studio.

---

## 📂 CẤU TRÚC THƯ MỤC NỘP BÀI (ROOT REPOSITORY)

Cấu trúc cây thư mục thực tế được triển khai trực tiếp trên Repo Phiếu bài tập 09 này:

```text
├── form_validator/          # Bài B3: Hệ thống validate form đăng ký Real-time & Password strength meter
│   ├── index.html
│   ├── style.css
│   └── app.js
├── keyboard_app/            # Bài B4: Ứng dụng điều hướng Gallery ảnh & Command Palette bằng phím tắt
│   ├── index.html
│   ├── style.css
│   └── app.js
├── product_catalog/         # Bài B2: Trang danh sách sản phẩm tương tác, render 100% động từ mảng JS
│   ├── index.html
│   ├── style.css
│   └── app.js
├── todo_app/                # Bài B1: Ứng dụng Todo App hoàn chỉnh tích hợp bộ lọc và LocalStorage
│   ├── index.html
│   ├── style.css
│   └── app.js
├── screenshots/
│   ├── Bai-B1-1.png         # Minh chứng chức năng CRUD (Thêm, Sửa, Xóa) trên giao diện Todo App
│   ├── Bai-B1-2.png         # Minh chứng bộ lọc (All/Active/Completed) và lưu trữ dữ liệu LocalStorage
│   ├── Bai-B2-1.png         # Minh chứng giao diện Product Catalog kết hợp thanh Search và lọc Category
│   ├── Bai-B2-2.png         # Minh chứng Modal chi tiết sản phẩm và tính năng đếm số lượng giỏ hàng Badge
│   ├── Bai-B3-1.png         # Minh chứng Form Validator bắt lỗi Real-time và đo độ mạnh mật khẩu yếu/trung bình
│   ├── Bai-B3-2.png         # Minh chứng Form khi tất cả trường hợp đều Valid và hiển thị Modal thành công
│   ├── Bai-B4-1.png         # Minh chứng Gallery ảnh chuyển động mượt mà bằng phím điều hướng mũi tên
│   └── Bai-B4-2.png         # Minh chứng Command Palette overlay (Ctrl+K) hoạt động giống VS Code
├── videos/
│   └── video.md             # Chứa liên kết lưu trữ Video thực hành giải trình thuật toán (Google Drive)
├── README.md                # File hướng dẫn tổng quan hệ thống này (File này)
└── answers.md                # Lời giải Phần A, phân tích sửa lỗi gỡ lỗi câu C1 và tối ưu hóa Reflow câu C2

🚀 HƯỚNG DẪN SETUP & CHẠY DỰ ÁN
1. Tiền đề chuẩn bị
Dự án chạy 100% Client-side thuần túy (Vanilla JavaScript).
Bạn nên chạy dự án qua Extension Live Server trên VS Code để đảm bảo các tính năng tương tác sự kiện và tài nguyên hình ảnh hoạt động ổn định nhất.
2. Khởi chạy độc lập các Mini-App trên Trình duyệtNhấp chuột phải vào tệp index.html của từng thư mục ứng dụng tương ứng dưới đây và chọn Open with Live Server:
Todo App: todo_app/index.html $\rightarrow$ Thử nghiệm thêm mới, click đúp để chỉnh sửa, tích chọn hoàn thành và refresh trang để xem LocalStorage hoạt động.
Product Catalog: product_catalog/index.html $\rightarrow$ Trải nghiệm tìm kiếm thời gian thực, sắp xếp bộ lọc giá tăng/giảm, bật tắt chế độ Dark Mode trên cơ thể body.
Form Validator: form_validator/index.html $\rightarrow$ Thử nhập họ tên, email sai định dạng, nhập mật khẩu chứa ký tự đặc biệt để quan sát thanh đo năng lượng đổi màu.
Keyboard Shortcuts App: keyboard_app/index.html $\rightarrow$ Sử dụng phím mũi tên ← / → để lướt ảnh, nhấn Ctrl + K để mở thanh lệnh điều khiển hệ thống.


🎬 VIDEO THỰC HÀNH CODE-ALONG VỚI OBS (PHẦN D)
🎥 Kênh lưu trữ: Link Drive được cấu hình trực tiếp tại tệp: videos/video.md
🌐 Xem nhanh tại đây: Bấm vào đây để xem video thực hành DOM Manipulation trên Google Drive
⏱️ Thời lượng video: Đạt chuẩn khung thời gian từ 10-15 phút theo yêu cầu.
🎯 Nội dung giải trình chi tiết trong video:
30s đầu: Bật Webcam góc màn hình hiển thị rõ khuôn mặt sinh viên, giới thiệu: Sinh viên Trần Đức Phú, MSSV 2451170939, lớp CSE391.66 KTPM2, nội dung thực hiện Code-along Mini Todo App từ Zero bằng DOM.
Dựng khung sườn HTML skeleton, khai báo các biến hứng phần tử qua document.querySelector và giải thích tường tận ý nghĩa của từng bộ chọn.
Phân tích lý do tại sao nên sử dụng sự kiện submit của biểu mẫu thay vì sự kiện click thông thường, thực hiện demo trực quan hành vi reload trang khi chưa có e.preventDefault().
Tiến hành gõ trực tiếp logic tạo node bằng document.createElement("li") kết hợp đẩy vào cây thư mục hiển thị bằng appendChild.
Triển khai nút xóa và bắt sự kiện gọi hàm hủy li.remove(), cũng như thay đổi trạng thái css qua phương thức đảo lớp classList.toggle("completed").
Tổng kết so sánh, nhấn mạnh việc sử dụng createElement giúp lọc sạch dữ liệu đầu vào, triệt tiêu hoàn toàn nguy cơ chèn mã độc thực thi gián tiếp của tin tặc (Cross-Site Scripting - XSS) so với việc gán chuỗi vô tội vạ bằng innerHTML.