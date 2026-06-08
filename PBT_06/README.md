# 🌐 PHIẾU BÀI TẬP 06: CSS FRAMEWORKS — Bootstrap 5
> **Môn học:** Phát triển ứng dụng Web / Thiết kế Web cơ bản  
> **Dự án thành phần:** ShopTLU E-Commerce Platform  
> **Sinh viên thực hiện:** Trần Đức Phú 
> **Mã số sinh viên (MSSV):** 2451170939 
> **Lớp:** CSE391.66 KTPM2

---

## 📊 THÔNG TIN TỔNG QUAN PBT_06

* ⏱️ **Thời gian làm bài:** 150 phút
* 🎯 **Mục tiêu:** Làm chủ kỹ năng xây dựng giao diện thần tốc bằng Framework thông qua **Track A (Bootstrap 5)**. Thấu hiểu sâu sắc hệ thống lưới cơ động (Grid System Breakpoints), các thành phần giao diện dựng sẵn (`carousel`, `card`, `modal`, `accordion`, `dropdown`), và hệ thống lớp tiện ích (`utilities`) để tạo ra cả trang Landing Page bán hàng lẫn trang Quản trị (Dashboard Layout) thích ứng mà không cần viết CSS tùy chỉnh.
* 🛠️ **Công cụ sử dụng:** Visual Studio Code, Bootstrap 5 CDN, Google Chrome DevTools (Responsive Emulator), OBS Studio.

---

## 📂 CẤU TRÚC THƯ MỤC NỘP BÀI (ROOT REPOSITORY)

Cấu trúc cây thư mục thực tế được triển khai trực tiếp trên Repo Phiếu bài tập 06 này:

```text
├── screenshots/
│   ├── B1-anh1.png              # Landing Page hiển thị trên môi trường Mobile (<768px)
│   ├── B1-anh2.png              # Landing Page hiển thị trên môi trường Tablet (768px - 991px)
│   └── B1-anh3.png              # Landing Page hiển thị trên môi trường Desktop (≥992px)
├── videos/
│   └── video.md                 # Chứa liên kết lưu trữ Video thực hành (Google Drive)
├── README.md                    # File hướng dẫn tổng quan hệ thống này (File này)
├── answer.md                    # Lời giải Phần A (Vẽ sơ đồ Grid), Phần C (Tùy biến SASS & So sánh Framework)
├── bootstrap_dashboard.html     # Trang quản trị Admin Dashboard hoàn chỉnh bằng Bootstrap 5 (Bài B2)
└── bootstrap_landing.html       # Trang chủ Landing Page TMĐT tích hợp Carousel và Modal (Bài B1)

🚀 HƯỚNG DẪN SETUP & CHẠY DỰ ÁN
1. Tiền đề chuẩn bị
Máy tính cần có kết nối mạng Internet ổn định để nạp thư viện Bootstrap 5 thông qua đường link CDN (bootstrap.min.css và bootstrap.bundle.min.js).
Sử dụng trình duyệt Google Chrome để kiểm tra chính xác các tương tác JavaScript đi kèm của Bootstrap (như đóng/mở Modal, bật Dropdown menu, chuyển ảnh Carousel).
2. Khởi chạy các bài tập thực hành
Mở thư mục gốc chứa dự án này bằng phần mềm VS Code.
Để khởi chạy xem giao diện các trang:
Nhấp chuột phải vào file .html cần chạy (bootstrap_landing.html hoặc bootstrap_dashboard.html) -> Chọn Open with Live Server.
Để kiểm tra tính tương thích Responsive: Nhấn phím F12 -> Kích hoạt chế độ giả lập thiết bị di động -> Thay đổi linh hoạt các kích thước màn hình để theo dõi sự chuyển đổi số cột từ 1 cột (Mobile) -> 2 cột (Tablet) -> 4 cột (Desktop).
🖼️ SCREENSHOTS MINH CHỨNG KẾT QUẢ
Các hình ảnh được lưu trữ đầy đủ trong thư mục screenshots/ thể hiện kết quả cấu trúc đạt chuẩn.
🛒 Bài B1 — Landing Page TMĐT thích ứng (bootstrap_landing.html)
Đảm bảo giao diện co dãn mượt mà 100% bằng lớp tiện ích Bootstrap, tích hợp đầy đủ hiệu ứng trượt ảnh quảng cáo và cửa sổ xem nhanh sản phẩm:
Bản di động (Mobile): Thanh Menu co lại thành nút nhấn ☰, lưới sản phẩm tự thu gọn về 1 cột dọc (screenshots/B1-anh1.png).
Bản máy tính bảng (Tablet): Các khối phân bổ đều thành 2 cột (screenshots/B1-anh2.png).
Bản máy tính (Desktop): Hiển thị thanh Navbar ngang sang trọng, lưới sản phẩm dàn trải đều 4 cột (screenshots/B1-anh3.png).
📊 Bài B2 — Bản quản trị hệ thống (bootstrap_dashboard.html)
Dựng thành công Layout Admin chuyên nghiệp với thanh công cụ cố định (position-fixed), hàng thống kê 4 màu rực rỡ, bảng dữ liệu đơn hàng dạng sọc (table-striped) bám sát thực tế.
🎬 VIDEO THỰC HÀNH CODE-ALONG VỚI OBS (PHẦN D)
🎥 Kênh lưu trữ: Link Drive được cấu hình trực tiếp tại tệp: videos/video.md
🌐 Xem nhanh tại đây: Bấm vào đây để xem video thực hành Bootstrap 5 trên Google Drive (Cập nhật link Drive cá nhân của bạn)
⏱️ Thời lượng video: Nằm trong khung tiêu chuẩn từ 8-12 phút theo quy định của đề bài.
🎯 Nội dung thực hiện trong video:
30s đầu: Bật Webcam hiển thị góc màn hình, giới thiệu đầy đủ thông tin: Sinh viên Trần Đức Phú, MSSV 2451170939, lớp CSE391.66 KTPM2, chọn Track A (Bootstrap).
Thực hiện gõ mã nguồn trực tiếp tạo cấu trúc 1 khối card sản phẩm kết hợp nhãn giảm giá badge bg-danger position-absolute.
Lập trình tính năng click nút "Xem nhanh" để kích hoạt cửa sổ modal hiển thị chi tiết sản phẩm.
 Giải thích cơ chế ánh xạ liên kết thông qua bộ đôi thuộc tính data-bs-toggle="modal" và data-bs-target.
 Tiến hành co giãn trình duyệt trực quan cuối video để kiểm chứng hoạt động tự động của hệ thống Grid.