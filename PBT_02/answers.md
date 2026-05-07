Phần A- Kiểm tra đọc hiểu:
Câu A1:
type="email" → Ô nhập text, tự kiểm tra định dạng có dấu @ và tên miền → Dùng cho form đăng ký/đăng nhập.

type="password" → Ô nhập text ẩn ký tự (dấu chấm hoặc sao) → Dùng để nhập mật khẩu bảo mật.

type="tel" → Ô nhập số điện thoại, kích hoạt bàn phím số trên di động → Dùng cho thông tin giao hàng.

type="number" → Ô nhập số có nút tăng/giảm, tự chặn ký tự chữ → Dùng chọn số lượng sản phẩm.

type="date" → Hiển thị bảng chọn ngày tháng (Calendar) → Dùng chọn ngày sinh hoặc ngày giao hàng.

type="range" → Thanh trượt chọn giá trị trong khoảng → Dùng để lọc sản phẩm theo khoảng giá.

type="checkbox" → Ô tích chọn (có thể chọn nhiều) → Dùng để chọn danh mục sở thích hoặc đồng ý điều khoản.

type="radio" → Nút chọn vòng tròn (chỉ được chọn 1 trong nhóm) → Dùng chọn phương thức thanh toán.

type="color" → Bảng chọn màu sắc hệ Hex/RGB → Dùng để chọn màu sắc biến thể của sản phẩm (ví dụ: ốp lưng).

type="file" → Nút chọn file từ thiết bị → Dùng để tải lên ảnh đại diện người dùng.

Câu A2:
Trường hợp 1: <input type="text" required value="">

Dự đoán: Trình duyệt sẽ chặn lại và hiển thị thông báo lỗi yêu cầu phải nhập dữ liệu (thường là "Please fill out this field").

Tại sao: Vì thuộc tính required bắt buộc người dùng không được để trống ô này trước khi gửi form.

Trường hợp 2: <input type="email" value="abc">

Dự đoán: Hiện lỗi yêu cầu nhập đúng định dạng email (thường báo thiếu dấu "@").

Tại sao: Thẻ type="email" có cơ chế tự động kiểm tra xem nội dung nhập vào có cấu trúc của một địa chỉ email hợp lệ hay không.

Trường hợp 3: <input type="number" min="1" max="10" value="15">

Dự đoán: Hiện lỗi thông báo giá trị phải nhỏ hơn hoặc bằng 10.

Tại sao: Thuộc tính max="10" giới hạn giá trị lớn nhất được phép nhập là 10, trong khi giá trị hiện tại là 15.

Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">

Dự đoán: Hiện lỗi yêu cầu nhập đúng định dạng mong muốn (thường là "Please match the requested format").

Tại sao: Thuộc tính pattern sử dụng biểu thức chính quy (regex) yêu cầu nhập đúng 10 chữ số, nhưng abc123 lại chứa cả chữ cái.

Trường hợp 5: <input type="password" minlength="8" value="123">

Dự đoán: Hiện lỗi yêu cầu nhập thêm ký tự (thường là "Please lengthen this text to 8 characters or more").

Tại sao: Thuộc tính minlength="8" quy định độ dài tối thiểu của mật khẩu là 8 ký tự, nhưng ở đây mới chỉ có 3.

So sánh: Như dự đoán do ô này có thuộc tính required nhưng giá trị lại để trống (value=""), nên trình duyệt đã kích hoạt cơ chế Validation tự động và ngăn không cho submit form.
Câu A3:
1. Tại sao <label for="email"> quan trọng cho người dùng screen reader?

Nó giúp phần mềm đọc màn hình (screen reader) hiểu được ô nhập liệu đó dùng để làm gì để đọc to lên cho người khiếm thị khi họ chuyển đến ô đó. Nếu không có sự kết nối qua for và id, người dùng sẽ chỉ nghe thấy "edit text" mà không biết phải nhập thông tin gì. Ngoài ra, nó còn giúp người dùng bình thường dễ bấm hơn vì khi click vào chữ, con trỏ sẽ tự động nhảy vào ô nhập.

2. Khi nào dùng <fieldset> + <legend>? Cho ví dụ cụ thể.

Dùng khi cần nhóm các ô nhập liệu có liên quan lại với nhau để form có cấu trúc rõ ràng và dễ điều hướng hơn.

Ví dụ cụ thể: Khi làm form đặt hàng, ta dùng <fieldset> để nhóm các thông tin như "Địa chỉ giao hàng" (gồm số nhà, tên đường, thành phố) và dùng <legend> làm tiêu đề cho nhóm đó.

3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có <label>?

aria-label dùng khi giao diện chỉ có icon mà không có chữ hiển thị (ví dụ: nút Tìm kiếm chỉ có hình kính lúp) để giải thích cho screen reader biết chức năng của nút đó.

Không nên dùng cả hai vì điều này gây thừa thông tin; trình đọc màn hình sẽ ưu tiên đọc aria-label và có thể bỏ qua nội dung trong thẻ <label>, gây nhầm lẫn hoặc mất dữ liệu ngữ nghĩa quan trọng của HTML.

Câu A4:

1. Thuộc tính loading="lazy" trên thẻ <img>:

Đây là kỹ thuật "tải chậm", chỉ cho phép hình ảnh được tải xuống khi người dùng cuộn trang đến gần vị trí của ảnh đó thay vì tải tất cả ngay khi vừa mở trang.

Cải thiện: Giảm thời gian tải trang ban đầu, tiết kiệm băng thông cho người dùng và cải thiện hiệu năng (tốc độ) của website.

Khi nào KHÔNG nên dùng: Không dùng cho những ảnh nằm ở phần đầu trang (Above the fold) mà người dùng thấy ngay khi vừa load, vì nó sẽ làm ảnh hiện lên chậm hơn, gây ảnh hưởng xấu đến trải nghiệm.

2. Thẻ <video> và định dạng:

Tại sao dùng nhiều <source>: Vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các bộ giải mã (codec) khác nhau. Cung cấp nhiều nguồn giúp trình duyệt tự chọn định dạng mà nó hỗ trợ tốt nhất để phát video.

3 format video web phổ biến: MP4, WebM, Ogg.

3. Thuộc tính alt (Alternative Text):

Công dụng: Mô tả nội dung hình ảnh bằng văn bản. Nó hiển thị khi ảnh bị lỗi không tải được và giúp trình đọc màn hình (Screen Reader) đọc cho người khiếm thị hiểu ảnh đó là gì.

Viết alt tốt cho 3 trường hợp:

-Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 màu xanh Teal nhìn từ mặt lưng"

-Ảnh trang trí (decorative): alt="" (Để trống để trình đọc màn hình bỏ qua, không gây nhiễu thông tin).

-Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột thể hiện doanh thu Quý 1 năm 2026 tăng trưởng 15% so với cùng kỳ năm trước"

Câu A5:
1. Khi nào dùng Cách 1 (Chỉ dùng thẻ <img>):

Trường hợp dùng: Dùng khi hình ảnh chỉ đóng vai trò bổ trợ, trang trí hoặc là một phần không thể tách rời của nội dung văn bản. Những ảnh này thường không cần chú thích đi kèm và nếu bỏ ảnh đi, nội dung chính vẫn giữ nguyên ý nghĩa.

Ví dụ thực tế:

-Icon/Logo: Các biểu tượng nhỏ như icon giỏ hàng, mạng xã hội hoặc logo công ty trên thanh menu.
-Ảnh minh họa trong bài viết: Một bức ảnh nhỏ chèn giữa đoạn văn để làm đẹp giao diện mà không cần giải thích thêm.

2. Khi nào dùng Cách 2 (Dùng <figure> + <figcaption>):

Trường hợp dùng: Dùng khi hình ảnh là một thực thể nội dung độc lập (như sơ đồ, ảnh sản phẩm, tác phẩm nghệ thuật) và cần có chú thích rõ ràng. Thẻ <figure> giúp nhóm ảnh và chú thích (<figcaption>) thành một khối thống nhất về mặt ngữ nghĩa (Semantic HTML).

Ví dụ thực tế:
-Ảnh thẻ sản phẩm: Hiển thị ảnh điện thoại kèm theo tên và giá tiền ngay bên dưới (như ví dụ iPhone 16 trong đề bài).
-Biểu đồ số liệu: Một biểu đồ tăng trưởng doanh thu cần đoạn văn bản bên dưới để giải thích các cột thông số đó nói lên điều gì.

Phần B:
bài B1:
HTML không thể validate confirm password vì: HTML5 chỉ có khả năng kiểm tra giá trị của từng ô nhập liệu độc lập dựa trên các thuộc tính có sẵn (như required, pattern). HTML không có cơ chế "so sánh" (logic so sánh) giữa hai ô input khác nhau. Nó không thể tự hiểu rằng giá trị ở ô "Xác nhận" phải khớp hoàn toàn với ô "Mật khẩu".

Phần C:
Câu C1:
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="..."> và id, vi phạm tính tiếp cận (accessibility).
Sửa: <label for="fullname">Tên:</label> <input type="text" id="fullname" name="fullname" required>

Lỗi 2: Dòng 4 — Input "Email" không có nhãn (label) và thiếu thuộc tính required.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required placeholder="Email của bạn">

Lỗi 3: Dòng 6 & 7 — Các ô mật khẩu thiếu thuộc tính name và required, dẫn đến không gửi được dữ liệu và không bắt buộc nhập.
Sửa: <input type="password" id="pass" name="pass" required minlength="8" placeholder="Mật khẩu">
<input type="password" id="confirm-pass" name="confirm_pass" required placeholder="Nhập lại mật khẩu">

Lỗi 4: Dòng 9 — Input "Phone" đang dùng type="text", sai mục đích sử dụng và thiếu kiểm tra định dạng.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">

Lỗi 5: Dòng 11 — Thẻ <select> thiếu thuộc tính name và id để định danh dữ liệu khi gửi đi.
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">

Lỗi 6: Dòng 12 & 13 — Các thẻ <option> thiếu thuộc tính value, khiến server không nhận được giá trị cụ thể.
Sửa: <option value="hn">Hà Nội</option> <option value="hcm">TP.HCM</option>

Lỗi 7: Dòng 16 — Phần điều khoản chỉ có thẻ <label> mà thiếu mất ô chọn <input type="checkbox">.
Sửa: <input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method, không xác định được nơi gửi và phương thức gửi dữ liệu.
Sửa: <form action="#" method="POST">

Câu C2:
1. Viết Pattern Regex
Bạn sử dụng thuộc tính pattern để kiểm tra định dạng dữ liệu đầu vào:

CMND/CCCD (Đúng 12 chữ số):
pattern="[0-9]{12}"

Số tài khoản (Từ 10 đến 15 chữ số):
pattern="[0-9]{10,15}"

Mã PIN (6 chữ số, ẩn nội dung):
<input type="password" pattern="[0-9]{6}" maxlength="6" required>

2. HTML5 validation chưa đủ an toàn cho ngân hàng vì:

HTML5 validation thực chất chỉ diễn ra ở phía Client (Trình duyệt). Nó phục vụ mục đích chính là cải thiện trải nghiệm người dùng (UX) để họ sửa lỗi ngay lập tức. Tuy nhiên, bất kỳ ai cũng có thể vượt qua lớp bảo vệ này bằng cách:

Dùng "Inspect Element" (F12) để xóa bỏ thuộc tính required hoặc pattern.

Tắt JavaScript của trình duyệt.

Sử dụng các công cụ như Postman hoặc cURL để gửi dữ liệu trực tiếp lên máy chủ mà không thông qua trình duyệt.

3. 3 loại validation mà HTML5 KHÔNG THỂ làm được
Để thực hiện các kiểm tra này, bạn bắt buộc phải dùng JavaScript:

So sánh giữa 2 trường dữ liệu: Ví dụ kiểm tra "Xác nhận mật khẩu" có trùng khớp với "Mật khẩu" hay không.

Kiểm tra tính duy nhất (Asynchronous Validation): Ví dụ kiểm tra xem Email hoặc Số điện thoại đã tồn tại trong cơ sở dữ liệu của ngân hàng chưa (cần gọi API).

Logic điều kiện phức tạp: Ví dụ: "Nếu chọn phương thức nhận mã OTP qua SMS thì mới yêu cầu nhập Số điện thoại, nếu nhận qua Email thì không bắt buộc".

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend
Nếu bạn "bỏ quên" việc kiểm tra ở Backend (máy chủ), ngân hàng sẽ đối mặt với:

Lỗi toàn vẹn dữ liệu (Data Integrity): Kẻ xấu có thể gửi dữ liệu rác, dữ liệu sai định dạng (ví dụ Số tài khoản chứa chữ cái) vào cơ sở dữ liệu, gây hỏng hệ thống hoặc lỗi khi thực hiện các phép tính toán tài chính.

Tấn công chiếm quyền hoặc tiêm mã độc (Injection Attacks): Nếu không validate ở Backend, kẻ tấn công có thể chèn các đoạn mã độc (SQL Injection) vào form để đánh cắp thông tin khách hàng, thay đổi số dư tài khoản hoặc phá hủy dữ liệu của ngân hàng.