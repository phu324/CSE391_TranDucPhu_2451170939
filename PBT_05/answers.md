PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1: Viewport & Mobile-First
1. Thẻ <meta viewport> chuẩn:

HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích thuộc tính:

width=device-width: Đặt chiều rộng của trang web khớp với chiều rộng màn hình của thiết bị.

initial-scale=1.0: Thiết lập mức độ zoom ban đầu là 100% khi trang web vừa tải xong.

2. Nếu thiếu thẻ này trên iPhone:
Trình duyệt di động (như Safari trên iPhone) sẽ giả định trang web được thiết kế cho desktop (thường là 980px). Nó sẽ tự động "zoom out" (thu nhỏ) toàn bộ trang web để vừa khít màn hình điện thoại, khiến chữ nhỏ xíu, các nút bấm chồng lên nhau và người dùng phải zoom in liên tục để đọc nội dung.

3. Sự khác biệt giữa Mobile-First và Desktop-First:
Mobile-First: Viết CSS cho màn hình nhỏ nhất trước, sau đó dùng @media (min-width: ...) để thêm layer cho màn hình lớn.
Desktop-First: Viết CSS cho màn hình lớn nhất trước, sau đó dùng @media (max-width: ...) để thu nhỏ/ẩn bớt cho màn hình nhỏ.

Ví dụ (Breakpoint 768px):
Mobile-First:
CSS
.sidebar { display: none; } 
@media (min-width: 768px) { .sidebar { display: block; } } 

Desktop-First:
CSS
.sidebar { display: block; } /* Mặc định desktop hiện */
@media (max-width: 768px) { .sidebar { display: none; } } 

- Tại sao nên dùng Mobile-First? Vì nó giúp code sạch hơn, tối ưu hiệu năng (thiết bị yếu tải ít CSS hơn) và phù hợp với xu hướng "Mobile-First Indexing" của Google.

Câu A2: Breakpoints chuẩn
Kích thước (Pixel)Thiết bị đại diệnVí dụ số cột lưới sản phẩm< 576pxĐiện thoại di động (Portrait)1 cột≥ 576pxĐiện thoại lớn / Máy tính bảng nhỏ2 cột≥ 768pxMáy tính bảng (Tablet - iPad)3 cột≥ 992pxLaptop / Màn hình máy tính nhỏ4 cột≥ 1200pxMàn hình Desktop lớn4 hoặc 6 cột

Kích thước (Pixel) | Thiết bị đại diện|	Ví dụ số cột lưới sản phẩm	
< 576px|	Điện thoại di động (Portrait) |   1 cột	
≥ 576px	|Điện thoại lớn / Máy tính bảng nhỏ	| 2 cột	
≥ 768px	|Máy tính bảng (Tablet - iPad)| 3 cột	
≥ 992px|	Laptop / Màn hình máy tính nhỏ  | 4 cột	
≥ 1200px  | Màn hình Desktop lớn  |  4 hoặc 6 cột

Câu A3:
Chiều rộng màn hình	| .container width|
375px(iPhone SE) | 100%
600px | 540px
800px | 720px 
1000px | 960px
1400px | 1140px

Câu A4: 
1. Giải thích 4 tính năng chính của SCSS:

Variables ($variables): Cho phép lưu trữ các giá trị (như màu sắc, font chữ, kích thước) vào một cái tên biến để tái sử dụng nhiều nơi. Khi cần đổi màu chủ đạo, bạn chỉ cần sửa tại một nơi duy nhất.

Ví dụ: $primary-color: #7c3aed; button { background: $primary-color; }

Nesting (Lồng nhau): Cho phép viết các selector con bên trong selector cha, giúp cấu trúc code giống với phân cấp của HTML, dễ đọc và quản lý hơn.

Ví dụ: .nav { ul { list-style: none; } li { display: inline-block; } }

Mixins (@mixin, @include): Giống như một hàm trong lập trình, dùng để gom nhóm các đoạn code CSS hay dùng lại (như tạo hình tròn, đổ bóng phức tạp) và gọi ra ở bất cứ đâu.

Ví dụ: @mixin center-flex { display: flex; justify-content: center; align-items: center; } .box { @include center-flex; }

@extend / Inheritance (Kế thừa): Cho phép một selector chia sẻ/kế thừa lại toàn bộ các thuộc tính CSS của một selector khác, giúp tránh lặp lại code (Don't Repeat Yourself).

Ví dụ: .message { border: 1px solid #ccc; padding: 10px; } .success { @extend .message; border-color: green; }

-trình duyệt KHÔNG đọc được file .scss vì
Trình duyệt chỉ hiểu và thực thi được các tệp CSS tiêu chuẩn. SCSS là một "tiền xử lý" (preprocessor) với các cú pháp nâng cao (biến, hàm, lồng nhau) mà engine của trình duyệt chưa được thiết kế để phân tích cú pháp trực tiếp.

- Cần bước gì để chuyển SCSS → CSS?
Cần thực hiện bước Biên dịch (Compilation). Bạn phải sử dụng một công cụ (như Sass Compiler, extension "Live Sass Compiler" trên VS Code, hoặc các công cụ build như Webpack/Vite) để thông dịch và chuyển đổi mã nguồn từ file .scss sang file .css thuần túy.