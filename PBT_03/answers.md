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