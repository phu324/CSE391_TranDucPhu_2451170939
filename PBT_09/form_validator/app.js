// ==================== KHAI BÁO CÁC PHẦN TỬ DOM ====================
const form = document.querySelector("#registerForm");
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const phone = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");

// Elements bổ trợ hiển thị mật khẩu & Modal
const strengthBar = document.querySelector("#strengthBar");
const strengthText = document.querySelector("#strengthText");
const successModal = document.querySelector("#successModal");
const summaryData = document.querySelector("#summaryData");
const closeModalBtn = document.querySelector("#closeModalBtn");

// Trạng thái hợp lệ của từng trường dữ liệu
const formStatus = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// ==================== CÁC HÀM VALIDATE CHUYÊN BIỆT ====================

// 1. Quản lý class hiển thị Valid/Invalid lên HTML
function setStatus(element, isValid) {
    const formGroup = element.closest(".form-group");
    if (isValid) {
        formGroup.classList.remove("invalid");
        formGroup.classList.add("valid");
    } else {
        formGroup.classList.remove("valid");
        formGroup.classList.add("invalid");
    }
}

// 2. Validate Tên (2-50 ký tự)
function validateName() {
    const value = fullName.value.trim();
    const isValid = value.length >= 2 && value.length <= 50;
    setStatus(fullName, isValid);
    formStatus.fullName = isValid;
    checkFormValidity();
}

// 3. Validate Email (Sử dụng Regex cơ bản)
function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setStatus(email, isValid);
    formStatus.email = isValid;
    checkFormValidity();
}

// 4. Đo lường sức mạnh Mật khẩu & Đổi màu Progress Bar
function checkPasswordStrength() {
    const value = password.value;
    let strength = 0; // Thang đo từ 0 -> 3
    let statusText = "Chưa nhập";
    let color = "#cbd5e1"; // Xám mặc định
    let percent = "0%";

    if (value.length > 0) {
        if (value.length < 8) {
            // Yếu (Màu đỏ)
            strength = 1;
            statusText = "Yếu (Cần ít nhất 8 ký tự) ❌";
            color = "#ef4444";
            percent = "33%";
        } else {
            // Kiểm tra các điều kiện ký tự
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasSpecial = /[^A-Za-z0-9]/.test(value);

            if (hasLetter && hasNumber && hasUpper && hasLower && hasSpecial) {
                // Mạnh (Màu xanh)
                strength = 3;
                statusText = "Mạnh (Rất bảo mật) 🔥";
                color = "#22c55e";
                percent = "100%";
            } else if (hasLetter && hasNumber) {
                // Trung bình (Màu vàng)
                strength = 2;
                statusText = "Trung bình (Nên thêm ký tự viết hoa/đặc biệt) ⚠️";
                color = "#eab308";
                percent = "66%";
            } else {
                // Vẫn tính là yếu nếu dài nhưng chỉ có toàn chữ hoặc toàn số
                strength = 1;
                statusText = "Yếu (Mật khẩu quá đơn giản) ❌";
                color = "#ef4444";
                percent = "33%";
            }
        }
    }

    // Cập nhật giao diện thanh tiến trình (Bar UI)
    strengthBar.style.width = percent;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Độ bảo mật: ${statusText}`;
    strengthText.style.color = color;

    // Trả về true nếu đạt từ mức Trung bình (2) trở lên
    const isValid = strength >= 2;
    setStatus(password, isValid);
    formStatus.password = isValid;

    // Khi đổi mật khẩu chính, phải kiểm tra lại ô Xác nhận mật khẩu ngay lập tức
    validateConfirmPassword();
}

// 5. Kiểm tra Xác nhận mật khẩu trùng khớp
function validateConfirmPassword() {
    const isValid = confirmPassword.value === password.value && confirmPassword.value.length > 0;
    setStatus(confirmPassword, isValid);
    formStatus.confirmPassword = isValid;
    checkFormValidity();
}

// 6. Định dạng Số điện thoại tự động dạng: 0901-234-567
function formatAndValidatePhone(e) {
    let input = phone.value.replace(/\D/g, ""); // Xóa toàn bộ các ký tự không phải số
    let formatted = "";

    // Thực hiện thuật toán chèn dấu gạch ngang theo độ dài chuỗi ký tự số
    if (input.length > 0) {
        formatted = input.substring(0, 4);
        if (input.length > 4) {
            formatted += "-" + input.substring(4, 7);
        }
        if (input.length > 7) {
            formatted += "-" + input.substring(7, 10);
        }
    }
    
    // Gán lại chuỗi đã định dạng đẹp mắt vào ô input
    phone.value = formatted;

    // Số điện thoại hợp lệ khi có đủ 10 chữ số (tương đương 12 ký tự bao gồm 2 dấu gạch)
    const isValid = input.length === 10;
    setStatus(phone, isValid);
    formStatus.phone = isValid;
    checkFormValidity();
}

// 7. Bật / Tắt trạng thái hoạt động của nút Đăng Ký
function checkFormValidity() {
    const allValid = Object.values(formStatus).every(status => status === true);
    submitBtn.disabled = !allValid;
}

// ==================== GẮN SỰ KIỆN LIÊN KẾT (LISTENERS) ====================

// Lắng nghe sự kiện gõ bằng 'input' để kiểm tra realtime
fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", checkPasswordStrength);
confirmPassword.addEventListener("input", validateConfirmPassword);
phone.addEventListener("input", formatAndValidatePhone);

// Ngăn chặn submit tải lại trang, hiển thị tóm tắt thông tin lên Modal Popup
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn hành vi mặc định
    
    // Đổ dữ liệu tóm tắt vào trong Modal
    summaryData.innerHTML = `
        <strong>👤 Họ tên:</strong> ${fullName.value.trim()}<br>
        <strong>📧 Email:</strong> ${email.value.trim()}<br>
        <strong>📞 Điện thoại:</strong> ${phone.value}
    `;

    // Hiển thị modal thành công bằng CSS style
    successModal.style.display = "flex";
});

// Sự kiện đóng modal, xóa sạch dữ liệu form cũ sau khi đăng ký thành công
closeModalBtn.addEventListener("click", () => {
    successModal.style.display = "none";
    form.reset();
    
    // Reset toàn bộ giao diện trạng thái về ban đầu
    document.querySelectorAll(".form-group").forEach(group => {
        group.classList.remove("valid", "invalid");
    });
    strengthBar.style.width = "0%";
    strengthText.textContent = "Độ bảo mật: Chưa nhập";
    strengthText.style.color = "var(--text-main)";
    submitBtn.disabled = true;
    
    // Reset Object trạng thái dữ liệu
    for (let key in formStatus) {
        formStatus[key] = false;
    }
});