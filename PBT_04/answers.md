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
Th3: |1          2          3|
Th4: | 200px | flexible | 200px |
     |   1   |     2    |   3   |
Th5:
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |   |   |