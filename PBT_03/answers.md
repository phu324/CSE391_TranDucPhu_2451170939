Phần A:
Câu A1:
Theo chương 08,3 cách nhúng CSS vào HTML: Inline CSS,Internal CSS,External CSS
1. Inline CSS
Ví dụ code
<h1 style="color: blue; font-size: 32px;">
    Xin chào
</h1>
-Ưu điểm:
Viết nhanh
Áp dụng trực tiếp cho 1 element
Phù hợp để test nhanh hoặc override tạm thời
-Nhược điểm:
Không tái sử dụng được
Code khó bảo trì
HTML bị rối vì trộn cả nội dung và giao diện
Không tận dụng được cache của browser
-Khi nào nên dùng:
Chỉnh nhanh 1 element
Test thử giao diện
Override tạm thời trong trường hợp đặc biệt
2. Internal CSS
Ví dụ code
<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: blue;
            font-size: 32px;
        }
    </style>
</head>
<body>

<h1>Xin chào</h1>

</body>
</html>
-Ưu điểm:
Không cần file CSS riêng
Dễ quản lý hơn inline
Phù hợp cho trang đơn giản
-Nhược điểm:
Không tái sử dụng giữa nhiều trang
File HTML sẽ dài hơn
Không tối ưu cho project lớn
-Khi nào nên dùng:
Prototype
Demo nhanh
Website chỉ có 1 trang nhỏ
3. External CSS
Ví dụ code
File HTML
<head>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Xin chào</h1>
</body>
File CSS (style.css)
h1 {
    color: blue;
    font-size: 32px;
}
-Ưu điểm:
Tái sử dụng cho nhiều trang
Dễ bảo trì
Tách riêng HTML và CSS
Browser có thể cache file CSS → tải nhanh hơn
Chuẩn dùng trong production
-Nhược điểm:
Phải quản lý thêm file CSS
Cần link đúng đường dẫn
-Khi nào nên dùng:
Website thật
Project nhiều trang
Làm việc nhóm
Mọi dự án production

Câu A2:
Kết quả dự đoán:
1. h1
Chọn: "ShopTLU"

2. .price
Chọn: "25.990.000đ" và "45.990.000đ"

3. #app header
Chọn: Toàn bộ nội dung bên trong header (bao gồm "ShopTLU", "Home", "Products", "About")

4. nav a:first-child
Chọn: "Home" (Vì đây là thẻ <a> đầu tiên trong thẻ <nav>)

5. .product.featured h2
Chọn: "MacBook Pro" (Chỉ chọn <h2> nằm trong thẻ có đủ cả 2 class product và featured)

6. article > p
Chọn: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..." (Chọn tất cả các thẻ <p> là con trực tiếp của <article>)

7. a[href="/"]
Chọn: "Home"

8. .top-bar.dark h1
Chọn: "ShopTLU"

Câu A3:
/* Trường hợp 1: content-box (mặc định) */
Với content-box, thuộc tính width chỉ áp dụng cho phần nội dung (content area). Padding và Border sẽ "phình" ra bên ngoài.
Chiều rộng hiển thị (Visible Width):
400px(width) + 40px(padding L+R) +10px(border L+R) = 450px

Không gian chiếm trên trang(total space):
450px(hiển thị) +20px(margin L+R) = 470px

/* Trường hợp 2: border-box */
Với border-box, thuộc tính width bao gồm cả content, padding và border. Các thành phần này sẽ "co" vào bên trong.
Chiều rộng hiển thị (Visible Width):400px (Đúng bằng giá trị width đã đặt)

Kích thước content thực tế:
400px -40px(pardding L+R)- 10px(border L+R) = 350px

Không gian chiếm trên trang (Total Space):
400px(hiển thị) + 20px(margin L+R) = 420px

/* Trường hợp 3: Margin collapse */
Khoảng cách giữa box-a và box-b: 40px

Câu A4:
1. Tính toán Specificity Score (a, b, c)
Quy tắc tính điểm chuẩn: a (ID), b (Class/Attribute), c (Element).
Rule A: (0,0,1)
Rule B: (0,1,0)
Rule C: (1,0,0)
Rule D: (0,1,1)

2. Element sẽ có màu ĐỎ (Red).

Giải thích: Trình duyệt sẽ so sánh điểm từ trái sang phải. Rule C có điểm ở cột ID (a = 1), trong khi các quy tắc khác đều bằng 0 ở cột này. Vì ID có độ ưu tiên cao nhất trong các bộ chọn CSS (Selector), nên Rule C sẽ chiến thắng bất kể các quy tắc khác có bao nhiêu class hay element đi chăng nữa.

3. Nếu thêm style="color: orange;", màu gì sẽ hiển thị?
Kết quả: Element sẽ có màu CAM (Orange).

4. Nếu Rule A thêm !important, màu gì sẽ hiển thị? Tại sao?
Kết quả: Element sẽ có màu ĐEN (Black).

Giải thích: * Từ khóa !important là "vũ khí tối thượng" trong CSS. Nó phá vỡ mọi quy tắc về độ ưu tiên thông thường (specificity).

Phần B:
Bài B1:
### Danh sách 5 loại Selectors sử dụng trong Bài B1:

1. **Element Selector**: `body`, `header`, `table`, `footer` (Chọn trực tiếp theo tên thẻ).
2. **Class Selector**: `.active` (Chọn link đang hoạt động).
3. **ID Selector**: `#wrapper`, `#about`, `#skills` (Chọn khối bao ngoài hoặc các section cụ thể).
4. **Descendant Selector (Selector hậu duệ)**: `nav a`, `nav ul li`, `thead tr` (Chọn phần tử nằm bên trong phần tử khác).
5. **Pseudo-class Selector**: `a:hover`, `tr:nth-child(even)`, `tr:hover` (Chọn dựa trên trạng thái hoặc vị trí đặc biệt).

Bài B2:
Hộp 1 (content-box): chiều rộng thực tế = 350px (đo từ DevTools).
Giải thích: Chiều rộng = 300px (width) + 40px (padding trái/phải) + 10px (border trái/phải) = 350px.
Hộp 2 (border-box): chiều rộng thực tế = 300px (đo từ DevTools).

Giải thích: Chiều rộng cố định 300px, phần padding và border tự động "co" vào bên trong.

Bài B3:
1. 10 CSS Rules + Specificity Score là:

Rule: p ; Specificity: 0,0,1
Rule: bopy p ; Specificity: 0,0,2
Rule: html body p ; Specificity: 0,0,3
Rule: .text; Specificity: 0,1,0
Rule: p.text ; Specificity: 0,1,1
Rule: .text.highlight ; Specificity: 0,2,0
Rule: #demo ; Specificity: 1,0,0
Rule: #demo.highlight ; Specificity: 1,1,0
Rule: body #demo.text.highlight ; Specificity: 1,2,1

 2. Element cuối cùng hiển thị màu **black**.
Vì rule:

```css
body #demo.text.highlight {
    color: black;
}
có specificity cao nhất là: 1,2,1
Trong CSS, rule có specificity cao hơn sẽ được ưu tiên áp dụng.

4. nếu thay đổi thứ tự các rules thì kết quả không đổi.

Ví dụ dù đưa rule:
body #demo.text.highlight {
    color: black;
}
lên đầu file CSS thì chữ vẫn hiển thị màu đen.
Lý do là rule này có specificity cao nhất: 1,2,1
CSS sẽ ưu tiên specificity trước, không ưu tiên thứ tự.

Phần C:
Câu C1:
1. chiều rộng thực tế của sidebar và content (content-box)
Sidebar

CSS:

.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
}

Trong content-box: Tổng width = width + padding left + padding right + border left + border right

Tính: 300 + 20 + 20 + 1 + 1 = 342px
=> Sidebar thực tế rộng: 342px
Content
CSS:
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
}
Tính: 660 + 30 + 30 + 1 + 1 = 722px
=> Content thực tế rộng: 722px
Tổng chiều rộng thực tế: 342 + 722 = 1064px

2. Layout bị vỡ vì tổng chiều rộng thực tế của sidebar và content lớn hơn container.
1064px > 960px
Do không đủ chỗ nên .content bị đẩy xuống dòng mới.
Nguyên nhân chính là:
width trong CSS mặc định dùng content-box
Padding và border KHÔNG nằm trong width
Tổng kích thước thực tế bị tăng thêm
3.Hai cách sửa khác nhau
Cách 1 — Dùng border-box
CSS
.sidebar,
.content {
    box-sizing: border-box;
}

Cách 2 — Không dùng border-box
Giữ nguyên content-box nhưng giảm width thực tế.
Sidebar
Muốn tổng width = 300px
Padding + border: 20 + 20 + 1 + 1 = 42px
Width mới: 300 - 42 = 258px
Content
Muốn tổng width = 660px
Padding + border: 30 + 30 + 1 + 1 = 62px

Width mới: 660 - 62 = 598px
CSS sửa
.sidebar {
    width: 258px;
}

.content {
    width: 598px;
}

Phần D: video code
[video code](https://drive.google.com/file/d/1LjU2J_x6WqF26sqD94hB6eRhlvEbWSu9/view?usp=sharing)