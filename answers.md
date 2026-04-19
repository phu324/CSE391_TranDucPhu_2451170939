Câu A1 
Tham chiếu: 01_introduction_html_universe.md (Mục 1.1: Cuộc hành trình 0.3 giây).

1. 5 bước xảy ra khi gõ https://shopee.vn là:
B1: DNS Lookup: Trình duyệt tìm địa chỉ IP của server Shopee 

B2: Request xuất phát: Trình duyệt gửi yêu cầu từ máy tính qua router WiFi và nhà mạng (ISP).

B3: Vận chuyển dữ liệu: Yêu cầu chạy qua hệ thống cáp quang dưới đáy biển để đến Data Center của Shopee tại server.

B4: Server xử lý & Response: Server nhận yêu cầu, phân tích (User muốn xem trang chủ) và gửi ngược lại các file HTML, CSS, JS.

B5: Browser Rendering: Chrome nhận file, đọc cấu trúc (Parse) và vẽ giao diện lên màn hình để người dùng nhìn thấy.

2. Tab Network trong DevTools:
Thông tin hiển thị: Tab này cho thấy toàn bộ các tài nguyên mà trình duyệt phải tải về (ảnh, file code, dữ liệu) để hiển thị được trang web. Nó giúp lập trình viên biết file nào bị lỗi hoặc tải quá chậm.

Câu A2:
Tham chiếu: 04_visible_part_html.md (Mục Semantic HTML5) 


Trang web bị đánh giá SEO thấp vì sử dụng quá nhiều thẻ <div> vô nghĩa (Div Soup). Google và các trình đọc màn hình không thể phân biệt được đâu là phần quan trọng, đâu là menu điều hướng hay đâu là chân trang.

4 Lỗi Semantic và cách sửa:
Lỗi 1: Dùng <div class="header"> thay vì thẻ <header>.

Lỗi 2: Dùng <div class="menu"> và các <div> con thay vì thẻ <nav> kết hợp danh sách <ul>/<li>.

Lỗi 3: Dùng <div class="main"> thay vì thẻ nội dung chính <main>.

Lỗi 4: Dùng <div class="title"> thay vì thẻ tiêu đề <h2> để nhấn mạnh tên sản phẩm.

Lỗi 5: Dùng <div class="footer"> thay vì thẻ <footer>.

Code đã sửa lại:
HTML
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure><img src="iphone.jpg" alt="iPhone 16 Pro"></figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>

Câu A3:
Tham chiếu: 04_visible_part_html.md (Mục  Block vs Inline).

Kết quả hiển thị (Text Art):

Hộp 1
Text AText B
Hộp 2
Text CText D
Hộp 3

Giải thích:
Thẻ Block (<div>): Luôn chiếm toàn bộ chiều ngang của dòng, buộc nội dung sau nó phải xuống dòng mới. Do đó "Hộp 1", "Hộp 2" và "Hộp 3" nằm trên 3 dòng riêng biệt.

Thẻ Inline (<span>, <strong>): Chỉ chiếm không gian vừa đủ chứa nội dung, cho phép các phần tử khác nằm cùng dòng. Vì vậy "Text A" nằm cạnh "Text B", và "Text C" nằm cạnh "Text D".

Câu A4:
Tham chiếu: 05_tables_hyperlinks.md (Mục  Table — Bảng dữ liệu).

1. Phân biệt các thành phần:
<thead>: Chứa các tiêu đề cột (thường dùng thẻ <th>), giúp định nghĩa nội dung cho từng cột.

<tbody>: Chứa toàn bộ dữ liệu thực tế của bảng.

<tfoot>: Dùng cho các dòng tổng kết, ghi chú cuối bảng (ví dụ: Tổng tiền, Tổng số lượng).

2. 3 lý do KHÔNG nên dùng Table để tạo layout:
SEO: Các công cụ tìm kiếm khó phân tích được thứ tự ưu tiên của nội dung nếu tất cả nằm trong các ô của bảng.

Responsive: Bảng có cấu trúc cứng nhắc, rất khó để chuyển đổi giao diện đẹp mắt trên màn hình điện thoại nhỏ.

Khả năng tiếp cận (Accessibility): Trình đọc màn hình cho người khiếm thị sẽ đọc bảng theo thứ tự ô, gây khó hiểu cho người dùng nếu đó là bố cục trang web thay vì dữ liệu thống kê.

bài B3:
Lỗi 1:Dòng 1 - Thẻ <!DOCTYPE> thiếu html — Sửa thành: <!DOCTYPE html>.

Lỗi 2:Dòng 4-  Thẻ <title> thiếu thẻ đóng — Sửa thành: <title>Trang web</title>.

Lỗi 3:Dòng 5- Thuộc tính charset="utf8" thiếu dấu gạch ngang — Sửa thành: charset="UTF-8".

Lỗi 4:Dòng 8 - Thẻ đóng <h1> viết nhầm thành thẻ mở — Sửa thành: </h1>.

Lỗi 5:Dòng 12 - Thẻ đóng <a> (chỗ Trang chủ) thiếu dấu gạch chéo / — Sửa thành: </a>.

Lỗi 6:Dòng 20- Thẻ <img> thiếu dấu ngoặc kép ở đường dẫn — Sửa thành: <img src="iphone.jpg"">.

Lỗi 7:Dòng 22 - Thẻ <p> và <b> lồng sai thứ tự (đóng p trước b) — Sửa thành: <b>25.990.000đ</b></p>.

Lỗi 8:Dòng 40 - Trang web có 2 thẻ <main> (Sai quy tắc Semantic) — Sửa thành: Thẻ <main> thứ hai đổi thành <aside> vì chứa nội dung Sidebar.

Lỗi 9:Dòng 45 - Thẻ <p> trong Footer thiếu thẻ đóng — Sửa thành: <p>Copyright 2026</p>.

Lỗi 10: Dòng 48 — Thiếu thẻ đóng </html> — Thêm </html> vào cuối bài.

