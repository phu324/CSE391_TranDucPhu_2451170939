Phần A:
Câu A1:

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                       | Cuộn theo trang? | Use case                                    
| static   |  Có                      | Theo flow bình thường của document      |  Có             | Layout mặc định                             |
| relative |  Có                      | So với vị trí gốc của chính nó          |  Có             | Dịch nhẹ element, làm anchor cho absolute |
| absolute|  Không                   | Cha gần nhất có position ≠ static  |  Có             | Badge, tooltip, dropdown, overlay           |
| fixed    |  Không                   | Viewport (màn hình)                     | Không          | Chat button, fixed header, cookie banner    |
| sticky  |  Ban đầu có              | Viewport khi chạm ngưỡng top/left/... | ban đầu có             | Sticky header, sticky sidebar      |

absolute tham chiếu body khi KHÔNG tìm thấy ancestor nào có:
position: relative;
position: absolute;
position: fixed;
position: sticky;
"Nearest Positioned Ancestor" là: Ancestor gần nhất có position khác static

Câu A2:
Th1: | 1 | 2 | 3 | 4 |
Th2: | 1 | 2 |
     | 3 | 4 |
     | 5 | 6 |
Th3: 
|1          2          3|
Th4:
| 200px | flexible | 200px |
|   1   |     2    |   3   |
Th5:
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |   |   |

Phần C:
Câu C1:
1. Navigation bar ngang (logo + menu + buttons)
Lựa chọn: Flexbox.

Giải thích: Thanh điều hướng về bản chất là bố cục 1 chiều (1D). Các phần tử thường có kích thước khác nhau (logo to, menu vừa, nút nhỏ). Flexbox cực mạnh trong việc phân bổ khoảng trống (justify-content: space-between) và căn chỉnh các mục không cùng kích thước vào giữa theo chiều dọc một cách hoàn hảo.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không giới hạn)
Lựa chọn: Grid.

Giải thích: Đây là bố cục 2 chiều (2D) đặc trưng. Với Grid, bạn chỉ cần định nghĩa một lần grid-template-columns: repeat(3, 1fr) và mọi ảnh đổ vào sẽ tự động xếp đúng hàng, đúng cột với khoảng cách (gap) chính xác mà không cần tính toán margin phức tạp như Flexbox.

3. Layout blog: main content + sidebar
Lựa chọn: Grid.

Giải thích: Khi xây dựng "khung xương" (wireframe) cho toàn bộ trang web, Grid là lựa chọn tối ưu. Nó giúp bạn quản lý các vùng diện tích lớn một cách chặt chẽ. Bạn có thể dễ dàng kiểm soát tỷ lệ (ví dụ: Sidebar 300px, Main content chiếm phần còn lại) và thay đổi thứ tự của chúng trên Mobile mà không làm hỏng cấu trúc HTML.

4. Footer với 4 cột thông tin
Lựa chọn: Kết hợp cả hai.

Giải thích:

Dùng Grid cho container tổng của Footer để chia 4 cột đều nhau (hoặc không đều tùy ý).

Dùng Flexbox bên trong mỗi cột để xếp chồng các liên kết theo chiều dọc (flex-direction: column) và xử lý các icon mạng xã hội nằm ngang ở dưới cùng. Cách này giúp bạn quản lý cả cấu trúc lớn lẫn nội dung chi tiết bên trong linh hoạt nhất.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới dính đáy)
Lựa chọn: Flexbox.

Giải thích: Đây là bài toán về căn chỉnh theo chiều dọc trong một không gian hẹp. Khi thiết lập card là display: flex với flex-direction: column, bạn chỉ cần thêm margin-top: auto cho nút "Mua". Thuộc tính này sẽ đẩy nút xuống sát đáy card bất kể đoạn text ở giữa dài hay ngắn, điều mà Grid làm sẽ vất vả hơn nhiều.

Câu C2:
Lỗi 1: Cards không đều chiều cao — Nút "Mua" bị nhảy lên/xuống
Nguyên nhân:
Mặc dù các .card có chiều cao bằng nhau (nhờ thuộc tính mặc định align-items: stretch của container), nhưng nội dung bên trong card lại không biết cách tận dụng không gian đó. Nút bấm chỉ đơn giản là đi theo sau đoạn văn bản. Nếu văn bản ngắn, nút sẽ bị kéo lên cao.

Cách sửa:
Biến chính .card thành một flex container theo chiều dọc (column) và sử dụng margin-top: auto cho nút bấm.

CSS
/* Code đã sửa */
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}

.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex;          /* Bổ sung: Biến card thành flex container */
    flex-direction: column; /* Bổ sung: Xếp nội dung theo chiều dọc */
    background: #fff;       /* Để dễ quan sát */
}

.card .btn { 
    margin-top: auto;       /* Quan trọng: Đẩy nút xuống đáy card */
    padding: 10px; 
}

Lỗi 2: Items dính góc trái trên dù muốn vào giữa (100vh)
Nguyên nhân:
display: flex mới chỉ là "điều kiện cần". Theo mặc định, các item sẽ được xếp ở đầu trục chính và đầu trục phụ (flex-start). Bạn thiếu các thuộc tính để điều hướng nội dung vào tâm.

Cách sửa:
Thêm bộ đôi justify-content (căn ngang) và align-items (căn dọc).

CSS
/* Code đã sửa */
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; /* Căn giữa theo trục ngang */
    align-items: center;     /* Căn giữa theo trục dọc */
}

.hero-content {
    text-align: center;
}

Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân:
Trong Flexbox, các phần tử mặc định có thuộc tính flex-shrink: 1. Khi vùng .content có quá nhiều chữ hoặc dữ liệu, Flexbox sẽ cố gắng "bóp" các phần tử khác lại để ưu tiên không gian cho phần tử đang phình to, khiến Sidebar bị mất kích thước 250px ban đầu.

Cách sửa:
Sử dụng flex-shrink: 0 để ra lệnh cho Sidebar: "Tuyệt đối không được co lại dù bất cứ chuyện gì xảy ra". Hoặc dùng cú pháp viết tắt flex.

CSS
/* Code đã sửa */
.layout { 
    display: flex; 
}

.sidebar { 
    width: 250px; 
    flex-shrink: 0; /* Cách 1: Ngăn không cho co lại */
    /* Hoặc dùng Cách 2: flex: 0 0 250px; */
}

.content { 
    flex: 1; /* Chiếm toàn bộ phần còn lại */
}

Phần D: 
video code:[xem video](https://drive.google.com/file/d/13nDP77GxJaS9RlZmXu6dJ9OclULI4huO/view?usp=sharing)