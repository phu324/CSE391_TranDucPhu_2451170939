PHẦN A :
Câu A1:
Kích thước	|  < 768px	|  768px - 991px  | 	≥ 992px
Số cột  |	1 cột trên mỗi hàng      |  	2 cột trên mỗi hàng       | 4 cột trên mỗi hàng
Box layout|  Mỗi Box chiếm trọn 12/12 phần màn hình (col-12). 4 box xếp chồng dọc nhau thành 4 hàng.    |  Mỗi Box chiếm 6/12 phần màn hình (col-md-6). Box 1 & 2 nằm hàng đầu; Box 3 & 4 nằm hàng hai.	   |    Mỗi Box chiếm 3/12 phần màn hình (col-lg-3). Cả 4 Box nằm thẳng hàng ngang với nhau.

Câu hỏi thêm:
col-md-6 nghĩa là gì? Nghĩa là trên các thiết bị có kích thước màn hình từ mức Medium trở lên (Medium devices - màn hình ≥ 768px), phần tử này sẽ chiếm độ rộng bằng 6/12 (tức là 50%) chiều rộng của hàng chứa nó (.row).

Tại sao không cần viết col-sm-12? Vì Bootstrap tuân theo nguyên lý thiết kế Mobile-First. Khi bạn đã khai báo thuộc tính cơ sở là col-12 (áp dụng từ kích thước nhỏ nhất < 576px), thuộc tính này sẽ tự động kế thừa lên mức sm (576px - 767px). Do đó, việc viết thêm col-sm-12 là dư thừa mã nguồn.

Câu A2 :
1. class d-none d-md-block:

Cơ chế hoạt động: Gồm 2 trạng thái kế thừa theo nguyên lý Mobile-First. d-none ẩn phần tử này trên mọi kích thước màn hình từ nhỏ nhất. Tuy nhiên, khi màn hình đạt từ mức Medium trở lên (≥ 768px), thuộc tính d-md-block sẽ kích hoạt lại cấu trúc khối (block), ghi đè thuộc tính ẩn trước đó.

Hiển thị/Ẩn: Phần tử sẽ Ẩn hoàn toàn trên màn hình Mobile (kích thước < 768px) và Hiển thị bình thường trên màn hình Tablet và Desktop (kích thước ≥ 768px).

2. 5 spacing utilities (margin/padding):

mt-3: Thiết lập Margin-Top (khoảng cách lề phía trên) ở mức 3 (mặc định bằng $spacer * 1 = 1rem hay 16px).

px-4: Thiết lập Padding-Left và Padding-Right (khoảng trống đệm bên trái và bên phải) ở mức 4 (mặc định bằng $spacer * 1.5 = 1.5rem hay 24px).

mb-auto: Thiết lập Margin-Bottom ở trạng thái tự động (margin-bottom: auto), thường phối hợp trong Flexbox để đẩy các phần tử khác lên trên.

ms-2: Thiết lập Margin-Start (tương đương Margin-Left trong ngôn ngữ đọc từ trái sang phải) ở mức 2 (mặc định bằng $spacer * 0.5 = 0.5rem hay 8px).

py-5: Thiết lập Padding-Top và Padding-Bottom (khoảng trống đệm trục dọc) ở mức 5 (mức lớn nhất mặc định, bằng $spacer * 3 = 3rem hay 48px).

3. Sự khác nhau giữa .container, .container-fluid, .container-md:

.container: Là khung bao bọc có độ rộng cố định (Responsive Fixed Width). Độ rộng cực đại (max-width) của nó sẽ thay đổi bước nhảy cố định tương ứng khi qua mỗi điểm gãy breakpoint (540px, 720px, 960px, 1140px, 1320px).

.container-fluid: Là khung bao bọc co giãn hoàn toàn (Full Width). Nó luôn chiếm độ rộng width: 100% trên mọi kích thước màn hình bất kể thiết bị nào.

.container-md: Là khung bao bọc lai (Fluid on mobile, fixed on desktop). Ở các màn hình nhỏ < 768px, nó hoạt động giống như container-fluid (rộng 100%). Nhưng từ breakpoint md trở lên (≥ 768px), nó tự động chuyển đổi thành một container cố định độ rộng.

PHẦN C :
Câu C1 :
1.  Quy trình đổi màu $primary mặc định sang #E63946:

Công cụ cần thiết: Bạn cần cài đặt môi trường xử lý Node.js, trình quản lý gói NPM, và thư viện trình biên dịch mã Sass (sass hoặc dart-sass).

Cách thức thực hiện và file cần sửa:

Bạn không được can thiệp sửa trực tiếp vào file CSS đã biên dịch của Bootstrap. Thay vào đó, bạn tạo ra một file SCSS tùy biến riêng, ví dụ đặt tên là custom.scss.

Trong file custom.scss, tiến hành gán lại giá trị cho biến trước khi nạp mã nguồn Bootstrap vào:
// 1. Khai báo đè màu sắc mới lên tên biến cốt lõi của Bootstrap
$primary: #E63946;

// 2. Nạp file cấu trúc SCSS gốc của thư viện Bootstrap vào ngay phía sau
@import "node_modules/bootstrap/scss/bootstrap";
Dùng câu lệnh biên dịch chạy trên Terminal để đóng gói sang file CSS mới: sass custom.scss custom.css. Nhúng file custom.css này vào trang HTML để áp dụng màu đỏ mới trên toàn hệ thống.

2.   KHÔNG nên override trực tiếp dạng .btn-primary { background: red; } vì:

Lý do: Bootstrap xây dựng dựa trên kiến trúc hệ thống các biến liên kết tuần hoàn chặt chẽ với nhau (Variables-driven component architecture). Màu $primary không chỉ áp dụng đơn lẻ trên một class .btn-primary.

Nếu bạn chỉ đè mỗi thuộc tính nền (background: red), bạn sẽ phải tự tay viết thêm hàng chục dòng CSS thủ công khác để ghi đè trạng thái :hover, :focus, :active, .btn-outline-primary, các lớp màu nền .bg-primary, màu chữ .text-primary, viền .border-primary, v.v.

Việc sửa biến SASS variables giúp hệ thống tự động tính toán lại, tự động tạo ra toàn bộ các biến thể đi kèm đồng bộ một cách an toàn nhất, giữ nguyên tính nhất quán của thiết kế gốc, không tạo ra mã CSS rác dư thừa.

Câu C2:
Tiêu chí    |Sử dụng CSS thuần |Sử dụng Bootstrap 5 Version
Số dòng code cần viết| Rất nhiều (Khoảng 80 - 150 dòng CSS)   |0 dòng CSS
Thời gian phát triển  |  Lâu  |Cực kỳ nhanh
Khả năng tùy biến |  Rất cao và linh hoạt  |   Trung bình - Khó


NÊN dùng Bootstrap khi:
-Xây dựng các dự án cần tiến độ nhanh (MVP), các trang quản trị hệ thống nội bộ (Admin Dashboard), trang thương mại điện tử phổ thông, hoặc các dự án có ngân sách và thời gian thiết kế ngắn hạn.

-Khi đội ngũ phát triển không mạnh về thiết kế UI/UX nhưng cần một sản phẩm hiển thị gọn gàng, chuẩn responsive trên mọi thiết bị di động.

KHÔNG NÊN dùng Bootstrap khi:
-Dự án đòi hỏi tính sáng tạo, độc bản thẩm mỹ cao và nhận diện thương hiệu đặc thù (Creative Agency, trang Portfolio nghệ thuật, Landing page sự kiện cao cấp).

-Cần tối ưu hóa dung lượng tải trang xuống mức siêu nhẹ, bởi Bootstrap đi kèm một tệp CSS/JS có sẵn tương đối lớn chứa nhiều thành phần có thể bạn không bao giờ dùng tới trong trang.

Phần D:
video code:[xem video](https://drive.google.com/file/d/1zoZQIndl7SP7qjs-UMgIWPcdezOGtREP/view?usp=sharing)