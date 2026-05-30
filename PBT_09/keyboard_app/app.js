// ==================== 1. MẢNG DỮ LIỆU ĐẦU VÀO ====================
const images = [
    { id: 1, title: "Cảnh biển bình minh", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop" },
    { id: 2, title: "Rừng thông sương mù", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop" },
    { id: 3, title: "Thành phố lên đèn", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop" },
    { id: 4, title: "Ngọn núi tuyết phủ", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop" },
    { id: 5, title: "Sa mạc cát vàng", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format&fit=crop" },
    { id: 6, title: "Hồ nước mùa thu", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop" },
    { id: 7, title: "Ruộng bậc thang", url: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?w=500&auto=format&fit=crop" },
    { id: 8, title: "Đường mòn trong rừng", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop" },
    { id: 9, title: "Thác nước hùng vĩ", url: "https://images.unsplash.com/photo-1432406186174-2b24f4860367?w=500&auto=format&fit=crop" }
];

const commands = [
    { id: "next_img", name: "Chuyển tới ảnh kế tiếp", action: () => navigateGallery(1) },
    { id: "prev_img", name: "Lùi lại ảnh phía trước", action: () => navigateGallery(-1) },
    { id: "toggle_slide", name: "Bật/Tắt tự động chạy Slideshow", action: () => toggleSlideshow() },
    { id: "open_active", name: "Xem phóng to ảnh đang lựa chọn", action: () => openImageModal() },
    { id: "theme_dark", name: "Chuyển giao diện: Tối (Dark mode)", action: () => document.body.classList.add("dark-theme") },
    { id: "theme_light", name: "Chuyển giao diện: Sáng (Light mode)", action: () => document.body.classList.remove("dark-theme") }
];

// ==================== 2. QUẢN LÝ TRẠNG THÁI (STATE) ====================
let currentIndex = 0; // Vị trí ảnh đang chọn (0-8)
let isSlideshowPlaying = false;
let slideshowInterval = null;
let activeCommandIndex = 0; // Dùng điều khiển phím lên/xuống trong Palette

// DOM Elements
const galleryGrid = document.querySelector("#galleryGrid");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playPauseBtn = document.querySelector("#playPauseBtn");

const commandPalette = document.querySelector("#commandPalette");
const paletteSearch = document.querySelector("#paletteSearch");
const commandList = document.querySelector("#commandList");

const imageModal = document.querySelector("#imageModal");
const modalImg = document.querySelector("#modalImg");
const modalCaption = document.querySelector("#modalCaption");
const closeModalBtn = document.querySelector("#closeModalBtn");

// ==================== 3. KHỞI TẠO VÀ DỰNG DOM ====================
function renderGallery() {
    galleryGrid.innerHTML = "";
    images.forEach((img, idx) => {
        const item = document.createElement("div");
        item.className = `gallery-item ${idx === currentIndex ? 'active' : ''}`;
        
        // 🦾 Thiết lập Accessibility cho thiết bị đọc màn hình (Screen Reader)
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0"); // Cho phép di chuyển phím TAB tới
        item.setAttribute("aria-label", `Ảnh số ${idx + 1}: ${img.title}. Nhấn Enter để xem phóng to.`);

        const badge = document.createElement("span");
        badge.className = "img-index-badge";
        badge.textContent = idx + 1;

        const htmlImg = document.createElement("img");
        htmlImg.src = img.url;
        htmlImg.alt = img.title;

        item.append(badge, htmlImg);

        // Sự kiện chuột hoặc phím enter vào thẻ
        item.addEventListener("click", () => {
            currentIndex = idx;
            updateGalleryUI();
            openImageModal();
        });
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                currentIndex = idx;
                updateGalleryUI();
                openImageModal();
            }
        });

        galleryGrid.appendChild(item);
    });
}

function updateGalleryUI() {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item, idx) => {
        if (idx === currentIndex) {
            item.classList.add("active");
            // Focus Management: Tự động cuộn tiêu điểm tới phần tử kích hoạt khi lướt phím tắt
            item.focus(); 
        } else {
            item.classList.remove("active");
        }
    });
}

// ==================== 4. CHỨC NĂNG ĐIỀU HƯỚNG ALBUM ====================
function navigateGallery(direction) {
    currentIndex += direction;
    // Thuật toán xoay vòng danh sách (Vượt biên quay về đầu hoặc cuối)
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateGalleryUI();
    
    // Nếu modal đang mở, đồng bộ ảnh lớn luôn
    if (imageModal.style.display === "flex") {
        modalImg.src = images[currentIndex].url;
        modalCaption.textContent = images[currentIndex].title;
    }
}

function toggleSlideshow() {
    isSlideshowPlaying = !isSlideshowPlaying;
    if (isSlideshowPlaying) {
        playPauseBtn.textContent = "Trình chiếu: ON ⏳";
        slideshowInterval = setInterval(() => {
            navigateGallery(1);
        }, 2000); // 2 giây đổi ảnh 1 lần
    } else {
        playPauseBtn.textContent = "Trình chiếu: OFF";
        clearInterval(slideshowInterval);
    }
}

// ==================== 5. POPUP LIGHTBOX XEM ẢNH LỚN ====================
function openImageModal() {
    modalImg.src = images[currentIndex].url;
    modalCaption.textContent = images[currentIndex].title;
    imageModal.style.display = "flex";
    closeModalBtn.focus(); // Đưa focus vào nút đóng để tiện Esc
}

function closeModal() {
    imageModal.style.display = "none";
    updateGalleryUI(); // Trả focus lại cho Gallery
}

// ==================== 6. COMMAND PALETTE LOGIC (Ctrl + K) ====================
function toggleCommandPalette() {
    const isVisible = commandPalette.style.display === "flex";
    if (isVisible) {
        commandPalette.style.display = "none";
    } else {
        commandPalette.style.display = "flex";
        paletteSearch.value = "";
        renderCommands(commands);
        paletteSearch.focus(); // Ép tiêu điểm vào ô input search ngay khi mở
    }
}

function renderCommands(filteredList) {
    commandList.innerHTML = "";
    activeCommandIndex = 0;

    if (filteredList.length === 0) {
        const noCmd = document.createElement("li");
        noCmd.className = "command-item";
        noCmd.textContent = "Không tìm thấy lệnh nào phù hợp... ❌";
        commandList.appendChild(noCmd);
        return;
    }

    filteredList.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === activeCommandIndex ? 'selected' : ''}`;
        li.role = "option";
        li.textContent = cmd.name;

        li.addEventListener("click", () => {
            cmd.action();
            commandPalette.style.display = "none";
        });

        commandList.appendChild(li);
    });
}

// Tìm kiếm lệnh Realtime
paletteSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    renderCommands(filtered);
});

// ==================== 7. XỬ LÝ SỰ KIỆN KEYBOARD TOÀN CỤC (GLOBAL KEYDOWN) ====================
window.addEventListener("keydown", (e) => {
    const isPaletteOpen = commandPalette.style.display === "flex";
    const isModalOpen = imageModal.style.display === "flex";

    // CHÚ Ý LỚN: Nếu đang gõ ô search của Palette, chặn không cho kích hoạt phím tắt album ảnh
    if (document.activeElement === paletteSearch) {
        const items = commandList.querySelectorAll(".command-item:not([class*='no-cmd'])");
        
        if (e.key === "Escape") {
            commandPalette.style.display = "none";
            e.preventDefault();
        } else if (e.key === "ArrowDown") { // Phím xuống chọn lệnh dưới
            if (items.length === 0) return;
            items[activeCommandIndex].classList.remove("selected");
            activeCommandIndex = (activeCommandIndex + 1) % items.length;
            items[activeCommandIndex].classList.add("selected");
            items[activeCommandIndex].scrollIntoView({ block: 'nearest' });
            e.preventDefault();
        } else if (e.key === "ArrowUp") { // Phím lên chọn lệnh trên
            if (items.length === 0) return;
            items[activeCommandIndex].classList.remove("selected");
            activeCommandIndex = (activeCommandIndex - 1 + items.length) % items.length;
            items[activeCommandIndex].classList.add("selected");
            items[activeCommandIndex].scrollIntoView({ block: 'nearest' });
            e.preventDefault();
        } else if (e.key === "Enter") { // Bấm Enter kích hoạt thực thi lệnh đang chọn
            if (items.length > 0) {
                items[activeCommandIndex].click();
                e.preventDefault();
            }
        }
        return; // Thoát ra, không chạy code phím tắt bộ sưu tập phía dưới
    }

    // 🌟 PHÍM TẮT MỞ COMMAND PALETTE TOÀN CỤC (Ctrl + K)
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Chặn hành vi mở tab tìm kiếm mặc định của trình duyệt
        toggleCommandPalette();
        return;
    }

    // 🌟 PHÍM TẮT ĐÓNG WINDOWS CHUNG (Escape)
    if (e.key === "Escape") {
        if (isModalOpen) closeModal();
        if (isPaletteOpen) commandPalette.style.display = "none";
    }

    // 🌟 CÁC PHÍM TẮT ĐIỀU KHIỂN GALLERY (Chỉ hoạt động khi không mở bảng lệnh)
    if (!isPaletteOpen) {
        // Phím mũi tên sang trái / phải để lướt ảnh
        if (e.key === "ArrowRight") navigateGallery(1);
        if (e.key === "ArrowLeft") navigateGallery(-1);

        // Phím Space (Dấu cách) bật tắt slideshow
        if (e.key === " ") {
            e.preventDefault(); // Chặn hành vi scroll cuộn trang mặc định của phím Space
            toggleSlideshow();
        }

        // Nhóm phím số từ 1 đến 9 để nhảy ảnh nhanh
        if (e.key >= "1" && e.key <= "9") {
            const indexJump = Number(e.key) - 1;
            if (indexJump < images.length) {
                currentIndex = indexJump;
                updateGalleryUI();
                if (isModalOpen) openImageModal();
            }
        }
    }
});

// Gắn sự kiện Click chuột thông thường cho các nút điều khiển thủ công
prevBtn.addEventListener("click", () => navigateGallery(-1));
nextBtn.addEventListener("click", () => navigateGallery(1));
playPauseBtn.addEventListener("click", toggleSlideshow);
closeModalBtn.addEventListener("click", closeModal);

// ==================== KHỞI CHẠY KHỞI ĐỘNG ====================
document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    // Mặc định focus vào phần tử ảnh đầu tiên khi tải xong trang
    setTimeout(() => updateGalleryUI(), 100); 
});