PHẦN A 
Câu A1 
1. Thứ tự Output chính xác:
1 - Start -> 4 - End -> 3 - Promise -> 6 - Promise 2 -> 2 - Timeout 0ms -> 7 - Nested timeout -> 5 - Timeout 100ms

2. Giải thích cơ chế Event Loop bằng hình ảnh trực quan:
Call Stack (Đồng bộ - Sync): Chạy ngay lập tức từ trên xuống dưới.

In ra 1 - Start và 4 - End. các hàm setTimeout và Promise được đẩy sang các hàng đợi tương ứng.

Microtask Queue (Ưu tiên cao): Chứa các callback của Promise. Sau khi Call Stack trống, Event Loop sẽ lùa hết sạch các tác vụ ở đây trước.

Chạy 3 - Promise và 6 - Promise 2. Khi chạy 6, một setTimeout mới (7) lại được đẩy vào Macrotask Queue.

Macrotask Queue (Ưu tiên thấp): Chứa các callback của setTimeout, setInterval. Chỉ được chạy từng cái một sau khi Microtask Queue đã trống.

Chạy 2 - Timeout 0ms -> 7 - Nested timeout (do delay đều là 0ms) -> Cuối cùng là 5 - Timeout 100ms (do phải chờ đủ thời gian delay).

 Câu A2 
Giải thích bản chất từng dòng code:

await fetch(...): Hàm fetch() trả về một Promise (đang ở trạng thái Pending). Cần từ khóa await để tạm dừng hàm, "chờ" mạng gửi phản hồi về và "mở gói" trả ra một Response object.

response.ok: Thuộc tính này sẽ trả về false khi server trả về các lỗi HTTP (đầu 4xx hoặc 5xx). 3 status codes ví dụ:

404 (Not Found - Không tìm thấy trang)

500 (Internal Server Error - Lỗi server)

401 (Unauthorized - Chưa đăng nhập/không có quyền).

response.json(): Bản thân hàm này cũng trả về một Promise mới. Vì việc đọc và parse luồng dữ liệu (stream) từ mạng thành một JavaScript Object cần thời gian, nên bắt buộc phải có await lần hai để đợi parse xong.

try...catch: Block catch này cực kỳ đa năng, nó sẽ bắt TẤT CẢ các lỗi sau:

Network error: Đứt cáp, mất mạng (fetch bị reject).

Lỗi HTTP (404, 500): Do trong try ta chủ động throw new Error khi !response.ok.

JSON parse error: Server lỗi trả về file HTML thay vì JSON làm hàm .json() bị gãy.

 Câu A3 
1. Sơ đồ 3 trạng thái của Promise:
          [  PENDING ] (Đang xử lý / Gọi API)
                 │
         ┌───────┴───────┐
         ▼               ▼
  [  FULFILLED ]  [  REJECTED ]
   (Thành công)      (Thất bại/Lỗi)
2. Callback Hell là gì?
Là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều lớp, khiến code bị thụt lề sâu vào trong (tạo thành hình "kim tự tháp" hay "cây thông Noel"), cực kỳ khó đọc, khó debug và bảo trì.

3. Ví dụ & Refactor:
 Ví dụ 4 cấp Callback Hell :

JavaScript
getStudent(id, (student) => {
    getClasses(student.classId, (classes) => {
        getScores(classes.id, (scores) => {
            renderUI(scores, () => {
                console.log("Hoàn thành chuỗi!");
            });
        });
    });
});
 Refactor mượt mà với Async/Await :

JavaScript
async function handleStudentData(id) {
    try {
        const student = await getStudent(id);
        const classes = await getClasses(student.classId);
        const scores = await getScores(classes.id);
        await renderUI(scores);
        console.log("Hoàn thành chuỗi!");
    } catch (error) {
        console.error("Gặp lỗi tại một trong các bước:", error);
    }
}

PHẦN C 
 Câu C1 
Trong một ứng dụng E-Commerce, nếu không xử lý lỗi tốt, một API lỗi nhỏ (như lấy danh sách thương hiệu) có thể làm sập toàn bộ trang thanh toán. Dưới đây là chiến lược xử lý cho từng loại lỗi:

1. Network errors (Mất mạng giữa chừng)
Chiến lược: Sử dụng sự kiện window.addEventListener('offline') để hiển thị một thanh thông báo (Banner) toàn màn hình: "Bạn đang ngoại tuyến. Vui lòng kiểm tra kết nối mạng.". Đồng thời chặn người dùng bấm nút "Thanh toán" để tránh mất dữ liệu. Khi có mạng lại (online), tự động nạp lại dữ liệu (Auto-refresh).

2. API errors (Server trả về các mã lỗi HTTP)
Lỗi 404 (Not Found): Thường xảy ra khi vào chi tiết một sản phẩm không tồn tại (hoặc vừa bị xóa). Cách xử lý: Redirect (chuyển hướng) người dùng về trang lỗi 404 Not Found custom, hoặc hiển thị giao diện "Sản phẩm này không còn tồn tại" kèm nút "Quay lại trang chủ".

Lỗi 500 (Internal Server Error): Server lỗi logic hoặc database sập. Cách xử lý: Hiện Toast thông báo lỗi tổng quát: "Hệ thống đang bận, vui lòng thử lại sau". Đồng thời, ghi lại lỗi (Log) vào hệ thống giám sát (như Sentry) để đội Backend vào sửa.

Lỗi 429 (Too Many Requests): Người dùng (hoặc bot) gọi API quá nhiều lần trong thời gian ngắn. Cách xử lý: Đọc header Retry-After từ server trả về để biết cần đợi bao nhiêu giây, khóa nút bấm của người dùng và hiển thị thông báo đếm ngược: "Bạn đang thao tác quá nhanh. Vui lòng thử lại sau X giây".

3. Timeout (Xử lý khi API phản hồi chậm quá 10 giây)
Mặc định fetch không có timeout. Chúng ta tự viết hàm fetchWithTimeout bằng cách kết hợp fetch và AbortController (bộ hủy tín hiệu request).

JavaScript
async function fetchWithTimeout(url, options = {}, ms = 10000) {
    // Tạo bộ điều khiển để hủy request
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms); // Hết ms giây thì kích hoạt hủy

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal // Gắn tín hiệu hủy vào fetch
        });
        clearTimeout(id); // Nếu fetch xong trước 10s, xóa bộ đếm thời gian
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error(`Yêu cầu bị hủy do quá thời gian phản hồi (${ms}ms)`);
        }
        throw error;
    }
}
4. Retry Logic (Tự động thử lại 3 lần nếu lỗi Network)
Khi mạng chập chờn, tự động gọi lại API sẽ giúp nâng cao trải nghiệm người dùng mà họ không cần bấm F5.

JavaScript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response; // Thành công thì trả về luôn
            
            // Nếu lỗi 4xx/5xx, không cần thử lại vì có thử lại server vẫn lỗi
            throw new Error(`HTTP Error ${response.status}`);
        } catch (error) {
            const isLastAttempt = i === maxRetries - 1;
            if (isLastAttempt) throw error; // Nếu đã thử đến lần cuối vẫn lỗi thì chấp nhận thất bại
            
            // Đợi một khoảng thời gian tăng dần trước khi thử lại (Kỹ thuật Exponential Backoff)
            const delay = (i + 1) * 1000; 
            console.warn(`Lần thử ${i + 1} thất bại. Thử lại sau ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

Câu C2 
1. Bảng so sánh bản chất và Use Case thực tế
Method  | Khi nào resolve?  |   Khi nào reject? |   Use case thực tế trong E-Commerce   |
Promise.all() | Khi TẤT CẢ các promise đều thành công.  |   Chỉ cần 1 cái duy nhất bị reject là tạch ngay lập tức.  |   Trang thanh toán: Cần nạp thông tin Giỏ hàng + Thông tin User + Cổng thanh toán. Thiếu 1 trong 3 cái này thì không cho thanh toán.
Promise.allSettled()    |   Khi TẤT CẢ các promise đều chạy xong (bất kể thành công hay thất bại).  |   Không bao giờ bị reject.    |   Trang Dashboard Admin / Trang chủ: Hiển thị nhiều widget độc lập (Báo cáo doanh thu, sản phẩm kho, tin tức). Cái nào lỗi thì ẩn đi, cái nào chạy được thì hiện.
Promise.race()  |   Khi có 1 cái đầu tiên chạy xong (bất kể thành công hay thất bại).   |   Khi có 1 cái đầu tiên chạy xong và cái đó bị thất bại.  |   Chống nghẽn mạng (Request Timeout): Cho API chạy đua với một hàm setTimeout tạo lỗi. Nếu API chậm hơn setTimeout, ứng dụng sẽ báo lỗi ngay lập tức.
Promise.any()   |   Khi có 1 cái đầu tiên THÀNH CÔNG.   |   Khi TẤT CẢ các promise đều thất bại.    |   Hệ thống CDN / Backup Server: Gọi API lấy ảnh sản phẩm từ 3 server dự phòng khác nhau cùng lúc. Server nào phản hồi thành công nhanh nhất thì lấy, bỏ qua các server chậm hoặc lỗi.2. Ví dụ Code cho từng Scenario thực tế
 Scenario 1: Promise.all (Xử lý trang Chi tiết đơn hàng)Yêu cầu: Phải load đủ thông tin đơn hàng và thông tin vận chuyển mới hiển thị được trang.JavaScriptasync function loadOrderDetail(orderId) {
    try {
        const [order, shipping] = await Promise.all([
            fetch(`/api/orders/${orderId}`).then(res => res.json()),
            fetch(`/api/shipping/${orderId}`).then(res => res.json())
        ]);
        console.log("Hiển thị trang chi tiết:", order, shipping);
    } catch (error) {
        console.error("Không thể tải trang: Thiếu dữ liệu đơn hàng hoặc vận chuyển!");
    }
}
 Scenario 2: Promise.allSettled (Tải dữ liệu Trang chủ gồm Banner, Khuyến mãi, Gợi ý)Yêu cầu: Khuyến mãi lỗi thì banner vẫn phải hiện.JavaScriptasync function loadHomePage() {
    const [bannerRes, promoRes, recommendRes] = await Promise.allSettled([
        fetch("/api/banners").then(r => r.json()),
        fetch("/api/promotions").then(r => r.json()), // Giả sử API này bị sập (500)
        fetch("/api/recommendations").then(r => r.json())
    ]);

    if (bannerRes.status === "fulfilled") renderBanners(bannerRes.value);
    if (promoRes.status === "fulfilled") {
        renderPromotions(promoRes.value);
    } else {
        console.warn("Lỗi nạp khuyến mãi:", promoRes.reason); // Ẩn widget khuyến mãi đi
    }
    if (recommendRes.status === "fulfilled") renderRecommends(recommendRes.value);
}
 Scenario 3: Promise.race (Tự chế hàm Timeout giới hạn thời gian gọi API)Yêu cầu: Ép API tải cổng thanh toán không được quá 5 giây.JavaScriptfunction timeout(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Mạng quá chậm!")), ms));
}

async function getPaymentGateways() {
    try {
        // Cho API chạy đua với hàm timeout 5000ms
        const data = await Promise.race([
            fetch("/api/payments").then(r => r.json()),
            timeout(5000)
        ]);
        console.log("Danh sách cổng thanh toán:", data);
    } catch (error) {
        console.error("Xử lý lỗi kết nối thanh toán:", error.message);
    }
}
 Scenario 4: Promise.any (Lấy danh sách sản phẩm từ các máy chủ dự phòng - CDN)Yêu cầu: Lấy từ cụm máy chủ nào nhanh nhất để người dùng không phải chờ.JavaScriptasync function fetchProductsFromFastestServer() {
    try {
        const fastestData = await Promise.any([
            fetch("https://asia-api.myecommerce.com/products").then(r => r.json()),
            fetch("https://global-api.myecommerce.com/products").then(r => r.json()),
            fetch("https://backup-api.myecommerce.com/products").then(r => r.json())
        ]);
        console.log("Dữ liệu lấy từ server nhanh nhất là:", fastestData);
    } catch (aggregateError) {
        console.error("Tất cả các máy chủ CDN dự phòng đều sập!", aggregateError.errors);
    }
}