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

Phần B:
Bài B3:
# thực thi và câu lệnh biên dịch SCSS

Dự án sử dụng mô hình tiền xử lý Sass để tối ưu cấu trúc từ mã nguồn CSS gốc của bài B1. 
Dưới đây là các phương thức và câu lệnh dùng để biên dịch tập tin `style.scss` ra `style.css`.

## 1. Biên dịch trực tiếp thông qua Terminal / Command Prompt 

Nếu đã cài đặt môi trường NodeJS và thư viện `sass` toàn cục (`npm install -g sass`), sử dụng lệnh sau:

* **Lệnh biên dịch một lần duy nhất:**
    ```bash
    sass style.scss style.css
Lệnh theo dõi tự động (Watch mode): Hệ thống sẽ tự động bắt sự kiện và cập nhật lại file CSS đích mỗi khi bạn nhấn Ctrl + S trên bất kỳ file partials nào trong thư mục scss/.

Bash
sass --watch style.scss style.css

## 2. Biên dịch thông qua tiện ích mở rộng trên Visual Studio Code

1. Cài đặt Extension mang tên **Live Sass Compiler** 
2. Nhấp chuột vào nút **Watch Sass** xuất hiện ở thanh trạng thái nằm bên dưới thanh chân màn hình của VS Code.
3. Chương trình sẽ tự động trích xuất mã nguồn CSS chuẩn ra tệp `style.css` ngay tại thư mục hiện hành.

 PHẦN C — PHÂN TÍCH 

 Câu C1:

1. Phân tích sự thay đổi giao diện ở 3 Breakpoints

a. Navigation (Thanh điều hướng) thay đổi như thế nào?
* **Desktop (1440px):** Thanh menu hiển thị đầy đủ danh sách các chuyên mục chính theo hàng ngang (Thời sự, Góc nhìn, Thế giới, Kinh doanh...). Có nút "Tất cả danh mục" dạng Dropdown lớn khi di chuột vào.
* **Tablet (768px):** Danh sách hàng ngang bị thu gọn lại, chỉ hiển thị một vài chuyên mục quan trọng nhất. Các mục khác được gom vào một nút hình kính lúp hoặc rút gọn.
* **Mobile (375px):** Toàn bộ thanh menu ngang biến mất. Thay vào đó, hệ thống sử dụng biểu tượng **Hamburger Menu (☰)** ở góc trên. Khi bấm vào mới tràn ra danh sách tất cả các chuyên mục.

 b. Lưới nội dung (Content Grid) thay đổi mấy cột?
* **Desktop (1440px):** Áp dụng lưới nhiều cột phức tạp (thường là **3 đến 4 cột**). Cột chính lớn nhất ở giữa/bên trái hiển thị tin nóng, cột bên phải hiển thị danh sách tin mới, các khối quảng cáo và box tiện ích (giá vàng, thời tiết).
* **Tablet (768px):** Lưới co lại còn **2 cột**. Cột quảng cáo phụ bên phải bị loại bỏ, chỉ giữ lại cột tin tức chính và danh sách tin phụ kế bên.
* **Mobile (375px):** Lưới chuyển hoàn toàn về cấu trúc **1 cột duy nhất (Single Column)**. Tất cả bài viết, hình ảnh xếp chồng lên nhau từ trên xuống dưới để người dùng dễ vuốt cuộn bằng một tay.

c. Các phần tử (Elements) nào bị ẩn trên mobile?
* Các banner quảng cáo lớn ở hai bên sườn trang web (Left/Right Skyscraper Ads).
* Các widget/box tiện ích phụ như: bảng dòng thời gian, biểu đồ chứng khoán chi tiết, tỷ giá ngoại tệ mở rộng.
* Preview (đoạn mô tả ngắn/sapo) của các bài viết phụ bị ẩn đi, trên mobile chỉ giữ lại Tiêu đề + Ảnh đại diện để tiết kiệm không gian hiển thị.

d. Kích thước phông chữ (Font size) có thay đổi không?
* **Có thay đổi**. Font size được cấu trúc giảm dần để phù hợp với không gian màn hình:
  * Tiêu đề bài tin lớn (Headline) trên Desktop là khoảng `32px` - `36px`.
  * Trên Tablet giảm xuống khoảng `28px`.
  * Trên Mobile thu nhỏ lại chỉ còn khoảng `22px` - `24px` để tiêu đề không chiếm hết toàn bộ diện tích màn hình hiển thị đầu tiên.


 2. Minh chứng Media Queries từ DevTools

Dựa trên kết quả kiểm tra phần tử (Inspect Element) qua tab Styles, trang web VNExpress sử dụng các bộ lọc điều kiện màn hình tiêu biểu sau:

1. **Media Query cho Desktop / Tablet lớn:**
   ```css
   @media screen and (min-width: 1024px) {
       /* Sử dụng để hiển thị các thanh sidebar, grid 3-4 cột và nạp lại layout flex ngang */
   }

Câu C2:
- Giao diện Mobile
+ Vị trí Form: Form đặt bàn cực kỳ quan trọng nên được đẩy lên ngay dưới ảnh Hero để kích thích hành động.

+ Ẩn bớt 3 ảnh món ăn phụ (chỉ giữ lại 3 ảnh nổi bật) để giảm dung lượng tải trang và tiết kiệm không gian cuộn chuột.
+------------------------------------------+
| [LOGO]                [HOTLINE: 1900xxx] |  <-- Header (Flex: space-between)
+------------------------------------------+
|                                          |
|            HERO IMAGE (Full)             |  <-- Hero Section
|                                          |
+------------------------------------------+
|                                          |
|            FORM ĐẶT BÀN (Mới)            |  <-- Form đẩy lên cao, 1 cột
|                                          |
+------------------------------------------+
|  [Ảnh món 1]                             |
|  [Ảnh món 2]                             |  <-- Grid ảnh co về 1 cột
|  [Ảnh món 3]                             |  (Ẩn bớt ảnh 4, 5, 6 trên Mobile)
+------------------------------------------+
|                                          |
|            BẢN ĐỒ GOOGLE MAPS            |  <-- Bản đồ tràn viền 100%
|                                          |
+------------------------------------------+
|            FOOTER THÔNG TIN              |
+------------------------------------------+

-Giao diện Tablet:
Grid ảnh: Chuyển thành lưới 2 cột (hiển thị đầy đủ lại 6 ảnh món ăn).

Bản đồ và Form: Xếp chồng theo chiều dọc (Full-width), Form nằm trên, Bản đồ nằm dưới khối Grid ảnh để cân đối không gian màn hình trung bình.
+-------------------------------------------------------+
| [LOGO]                               [HOTLINE: 1900x] |
+-------------------------------------------------------+
|                   HERO IMAGE (Full)                   |
+-------------------------------------------------------+
|                 FORM ĐẶT BÀN (Full Width)             |
+-------------------------------------------------------+
|         [Ảnh món 1]          |          [Ảnh món 2]   |
|         [Ảnh món 3]          |          [Ảnh món 4]   | <-- Lưới ảnh 2 cột
|         [Ảnh món 5]          |          [Ảnh món 6]   |
+-------------------------------------------------------+
|                 BẢN ĐỒ GOOGLE MAPS (Full Width)       |
+-------------------------------------------------------+
|                       FOOTER                          |
+-------------------------------------------------------+

Giao diện Desktop:
Layout chính: Chia làm 2 cột lớn (Cột nội dung chính 70% + Sidebar cố định 30%).

Sidebar: Xuất hiện Sidebar ở bên phải chứa Form Đặt bàn ghim cố định (Sticky) để khách hàng cuộn trang xem ảnh vẫn có thể điền thông tin đặt bàn bất kỳ lúc nào.
+-------------------------------------------------------------------+
| [LOGO]                                           [HOTLINE: 1900x] |
+-------------------------------------------------------------------+
|                         HERO IMAGE (Full)                         |
+-------------------------------------------------------------------+
| <--- CỘT CHÍNH (70% bên trái) ---> | <--- SIDEBAR (30% bên phải)--> |
|                                    |                              |
|  [GIỚI THIỆU & LƯỚI 6 ẢNH MÓN]      |  +------------------------+  |
|  +-------+ +-------+ +-------+     |  |      FORM ĐẶT BÀN       |  |
|  | Món 1 | | Món 2 | | Món 3 |     |  | (Ngày, giờ, số người...) |  |
|  +-------+ +-------+ +-------+     |  +------------------------+  |
|  | Món 4 | | Món 5 | | Món 6 |     |                              |
|  +-------+ +-------+ +-------+     |                              |
|                                    |                              |
|  +-------------------------------+ |                              |
|  |       BẢN ĐỒ GOOGLE MAPS      | |                              |
|  +-------------------------------+ |                              |
+-------------------------------------------------------------------+
|                              FOOTER                               |
+-------------------------------------------------------------------+

CSS Skeleton:
/* 
   1. BASE STYLES & MOBILE LAYOUT (< 768px)
    */
* { box-sizing: border-box; margin: 0; padding: 0; }

/* Cấu trúc lưới tổng thể của trang web */
.site-wrapper {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột duy nhất trên Mobile */
    gap: 20px;
}

.header { display: flex; justify-content: space-between; align-items: center; padding: 15px; }
.hero { width: 100%; height: 60vh; object-fit: cover; }

/* Khu vực bao bọc nội dung (Mobile: xếp dọc tự nhiên) */
.main-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
}

/* Lưới hình ảnh món ăn */
.food-grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột trên Mobile */
    gap: 15px;
}

/* Yêu cầu Mobile: Ẩn bớt 3 hình ảnh cuối */
.food-item:nth-child(n+4) {
    display: none;
}

.booking-form { order: -1; /* Đẩy Form đặt bàn lên trước khối ảnh trên Mobile */ }
.map-embed { width: 100%; height: 300px; }
.footer { text-align: center; padding: 20px; }


/* 
   2. TABLET BREAKPOINT (≥ 768px)
   */
@media (min-width: 768px) {
    .main-content { padding: 20px; }

    /* Yêu cầu Tablet: Hiện lại đầy đủ ảnh và chia thành lưới 2 cột */
    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .food-item:nth-child(n+4) {
        display: block; /* Hiện lại ảnh 4, 5, 6 */
    }

    /* Trả lại thứ tự sắp xếp thông thường: Form nằm dưới ảnh */
    .booking-form {
        order: 0;
    }
}


/* ==========================================================================
   3. DESKTOP BREAKPOINT (≥ 1024px)
   ========================================================================== */
@media (min-width: 1024px) {
    /* Chuyển đổi vùng nội dung thành Lưới 2 cột lớn: Nội dung (70%) & Sidebar (30%) */
    .main-content {
        display: grid;
        grid-template-columns: 7fr 3fr; 
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
    }

    /* Nhóm các phần tử bên sườn trái vào khối Content chính */
    .left-column {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    /* Yêu cầu Desktop: Lưới ảnh món ăn chuyển sang 3 cột */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    /* Biến khối Form thành Sidebar cố định vị trí khi cuộn trang */
    .booking-form {
        position: sticky;
        top: 20px;
        height: fit-content;
    }
}

Phần D: 
video code:[xem video](https://drive.google.com/file/d/1c6BFCpVmr5JTQ9Jv7kRW4zgBBsisbAVs/view?usp=sharing)