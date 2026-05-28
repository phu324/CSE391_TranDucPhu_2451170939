// ==================== 1. DỮ LIỆU KHỞI TẠO (12+ SẢN PHẨM, 4 CATEGORIES) ====================
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/300x200/0ea5e9/fff?text=iPhone+16", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/300x200/3b82f6/fff?text=Galaxy+S24", rating: 4.8, inStock: true },
    { id: 3, name: "Oppo Find X7", price: 18490000, category: "phone", image: "https://placehold.co/300x200/10b981/fff?text=Oppo+Find", rating: 4.3, inStock: false },
    
    { id: 4, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/300x200/6366f1/fff?text=MacBook+M3", rating: 4.7, inStock: true },
    { id: 5, name: "ASUS ROG Strix G16", price: 35490000, category: "laptop", image: "https://placehold.co/300x200/ec4899/fff?text=ASUS+ROG", rating: 4.6, inStock: true },
    { id: 6, name: "Dell XPS 13", price: 42990000, category: "laptop", image: "https://placehold.co/300x200/14b8a6/fff?text=Dell+XPS", rating: 4.5, inStock: true },
    
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/300x200/f59e0b/fff?text=iPad+Pro", rating: 4.9, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/300x200/a855f7/fff?text=Galaxy+Tab", rating: 4.4, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8490000, category: "tablet", image: "https://placehold.co/300x200/64748b/fff?text=Xiaomi+Pad", rating: 4.2, inStock: false },
    
    { id: 10, name: "Apple Watch Ultra 2", price: 21990000, category: "watch", image: "https://placehold.co/300x200/ef4444/fff?text=Apple+Watch", rating: 4.8, inStock: true },
    { id: 11, name: "Garmin Fenix 7 Pro", price: 17490000, category: "watch", image: "https://placehold.co/300x200/22c55e/fff?text=Garmin+Fenix", rating: 4.7, inStock: true },
    { id: 12, name: "Galaxy Watch 6", price: 6990000, category: "watch", image: "https://placehold.co/300x200/e11d48/fff?text=Galaxy+Watch", rating: 4.1, inStock: true }
];

// ==================== 2. TRẠNG THÁI ỨNG DỤNG (STATE) ====================
let cartCount = 0;
let selectedCategory = "all";
let searchQuery = "";
let currentSort = "default";

// Các biến lưu Node DOM động
let productsGrid, cartBadge, searchInput, sortSelect;

// ==================== 3. KHỞI TẠO GIAO DIỆN (BUILD DOM LAYOUT) ====================
function initLayout() {
    const root = document.getElementById("root");
    
    const container = document.createElement("div");
    container.className = "container";

    // 3.1 Thiết lập Header
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "🚀 Công Nghệ Store";
    
    const headerRight = document.createElement("div");
    headerRight.className = "header-right";

    // Nút đổi giao diện tối/sáng (Dark Mode)
    const toggleModeBtn = document.createElement("button");
    toggleModeBtn.className = "btn btn-toggle";
    toggleModeBtn.textContent = "🌙";
    toggleModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Icon Giỏ hàng
    const cartIcon = document.createElement("div");
    cartIcon.className = "cart-icon";
    cartIcon.textContent = "🛒";
    cartBadge = document.createElement("span");
    cartBadge.className = "cart-badge";
    cartBadge.textContent = cartCount;
    cartIcon.appendChild(cartBadge);

    headerRight.append(toggleModeBtn, cartIcon);
    header.append(title, headerRight);

    // 3.2 Khung điều khiển (Tìm kiếm, Sắp xếp, Bộ lọc danh mục)
    const controlsPanel = document.createElement("div");
    controlsPanel.className = "controls-panel";

    const searchSortRow = document.createElement("div");
    searchSortRow.className = "search-sort-row";

    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Nhập tên sản phẩm cần tìm kiếm...";
    searchInput.className = "search-input";
    // 🔍 SỰ KIỆN: LIVE SEARCH REALTIME (Sử dụng 'input')
    searchInput.addEventListener("input", searchProducts);

    sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";
    
    const sortOptions = [
        { val: "default", txt: "Sắp xếp mặc định" },
        { val: "priceAsc", txt: "Giá tăng dần 📈" },
        { val: "priceDesc", txt: "Giá giảm dần 📉" },
        { val: "nameAZ", txt: "Tên A -> Z" },
        { val: "ratingDesc", txt: "Đánh giá cao nhất ⭐" }
    ];
    sortOptions.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.val;
        o.textContent = opt.txt;
        sortSelect.appendChild(o);
    });
    // 📑 SỰ KIỆN: THAY ĐỔI CÁCH SẮP XẾP
    sortSelect.addEventListener("change", sortProducts);

    searchSortRow.append(searchInput, sortSelect);

    // Hàng nút Filter Danh mục sản phẩm
    const categoryButtonsContainer = document.createElement("div");
    categoryButtonsContainer.className = "category-buttons";

    const categories = [
        { id: "all", label: "Tất cả sản phẩm" },
        { id: "phone", label: "Điện thoại" },
        { id: "laptop", label: "Laptop" },
        { id: "tablet", label: "Máy tính bảng" },
        { id: "watch", label: "Đồng hồ" }
    ];

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `btn ${cat.id === "all" ? "active" : ""}`;
        btn.textContent = cat.label;
        btn.dataset.cat = cat.id;
        
        // 🎯 SỰ KIỆN: LỌC THEO CATEGORY
        btn.addEventListener("click", (e) => {
            document.querySelector(".category-buttons .btn.active").classList.remove("active");
            btn.classList.add("active");
            filterByCategory(cat.id);
        });

        categoryButtonsContainer.appendChild(btn);
    });

    controlsPanel.append(searchSortRow, categoryButtonsContainer);

    // 3.3 Lưới hiển thị danh sách sản phẩm
    productsGrid = document.createElement("div");
    productsGrid.className = "products-grid";

    // Đẩy tất cả khối vào container chính
    container.append(header, controlsPanel, productsGrid);
    root.appendChild(container);
}

// ==================== 4. CÁC HÀM XỬ LÝ LOGIC CHỨC NĂNG (CORE LOGIC) ====================

// 🛒 Chức năng: Render giao diện Danh sách sản phẩm dựa trên mảng đầu vào
function renderProducts(productsList) {
    productsGrid.innerHTML = ""; // Xóa dữ liệu cũ

    if (productsList.length === 0) {
        const noData = document.createElement("div");
        noData.className = "no-products";
        noData.textContent = "Không tìm thấy sản phẩm nào tương thích với bộ lọc! 🔍";
        productsGrid.appendChild(noData);
        return;
    }

    productsList.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Thẻ hết hàng báo trước
        if (!prod.inStock) {
            const badge = document.createElement("div");
            badge.className = "out-of-stock-badge";
            badge.textContent = "HẾT HÀNG";
            card.appendChild(badge);
        }

        const img = document.createElement("img");
        img.src = prod.image;
        img.className = "product-image";
        img.alt = prod.name;

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = prod.name;

        const rating = document.createElement("p");
        rating.className = "product-info";
        rating.textContent = `Đánh giá: ${prod.rating} ⭐`;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = prod.price.toLocaleString("vi-VN") + " đ";

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn-add-cart";
        btnAdd.textContent = prod.inStock ? "Thêm vào giỏ" : "Tạm hết hàng";
        if (!prod.inStock) btnAdd.disabled = true;

        // 🛍️ SỰ KIỆN: CLICK THÊM GIỎ HÀNG
        btnAdd.addEventListener("click", (e) => {
            e.stopPropagation(); // ⚠️ Ngăn chặn nổi bọt kích hoạt mở Modal xem chi tiết
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        // 📱 SỰ KIỆN: CLICK CARD XEM CHI TIẾT SẢN PHẨM (MODAL POPUP)
        card.addEventListener("click", () => {
            openProductModal(prod);
        });

        card.append(img, name, rating, price, btnAdd);
        productsGrid.appendChild(card);
    });
}

// 🔍 Chức năng: Search Realtime
function searchProducts(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilterAndSort();
}

// 🎯 Chức năng: Lọc theo Category
function filterByCategory(category) {
    selectedCategory = category;
    applyFilterAndSort();
}

// 📑 Chức năng: Sắp xếp theo Dropdown
function sortProducts(e) {
    currentSort = e.target.value;
    applyFilterAndSort();
}

// ⚙️ Hàm tổng bộ: Gom bộ lọc và sắp xếp để render chính xác dữ liệu
function applyFilterAndSort() {
    // Bước 1: Tiến hành lọc (Filter)
    let result = products.filter(prod => {
        const matchCategory = selectedCategory === "all" || prod.category === selectedCategory;
        const matchSearch = prod.name.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });

    // Bước 2: Tiến hành sắp xếp (Sort)
    if (currentSort === "priceAsc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "priceDesc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "nameAZ") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "ratingDesc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    // Bước 3: Đẩy lại dữ liệu cuối lên giao diện
    renderProducts(result);
}

// ==================== 5. CHỨC NĂNG POPUP MODAL (TẠO 100% BẰNG JS) ====================
function openProductModal(prod) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "btn-close-modal";
    closeBtn.textContent = "×";
    
    // Đóng nhanh bằng click dấu x hoặc click ra ngoài vùng xám
    const closeModal = () => overlay.remove();
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = prod.name;
    modalTitle.style.marginBottom = "15px";

    const modalImg = document.createElement("img");
    modalImg.src = prod.image;
    modalImg.style.width = "100%";
    modalImg.style.borderRadius = "8px";
    modalImg.style.marginBottom = "15px";

    const detailText = document.createElement("p");
    detailText.className = "product-info";
    detailText.innerHTML = `
        <strong>Danh mục:</strong> ${prod.category.toUpperCase()}<br>
        <strong>Đánh giá:</strong> ${prod.rating} / 5 ⭐<br>
        <strong>Trạng thái:</strong> ${prod.inStock ? "Còn hàng sẵn tại shop" : "Tạm hết hàng"}<br>
        <strong>Mô tả chi tiết:</strong> Đây là sản phẩm cao cấp chính hãng mới nhất, được phân phối trực tiếp kèm chế độ bảo hành 12 tháng hoàn chỉnh đầy đủ.
    `;
    detailText.style.lineHeight = "1.6";

    content.append(closeBtn, modalTitle, modalImg, detailText);
    content.addEventListener("click", (e) => e.stopPropagation()); // Ngăn click bên trong modal làm đóng popup

    content.appendChild(closeBtn);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}

// ==================== KHỞI CHẠY KHỞI ĐỘNG ====================
document.addEventListener("DOMContentLoaded", () => {
    initLayout();
    renderProducts(products); // Render mặc định ban đầu toàn bộ sản phẩm
});