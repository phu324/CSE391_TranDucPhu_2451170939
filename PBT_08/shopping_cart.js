function createCart() {
    // Private data (Dữ liệu bảo mật, bên ngoài không thể can thiệp trực tiếp)
    let items = [];
    let discountPercent = 0;
    let discountAmountValue = 0;

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            // Dùng find để tìm xem sản phẩm đã có trong giỏ hàng chưa
            let existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity; // Nếu có rồi thì tăng số lượng
            } else {
                // Nếu chưa có thì bốc tách dữ liệu và push vào mảng
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },
        
        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            // Dùng filter để giữ lại các sản phẩm có id KHÁC với id cần xóa
            items = items.filter(item => item.id !== productId);
        },
        
        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            let existingItem = items.find(item => item.id === productId);
            if (existingItem && newQuantity > 0) {
                existingItem.quantity = newQuantity;
            }
        },
        
        // 4. Tính tổng tiền (sau khi đã trừ đi mã giảm giá nếu có)
        getTotal() {
            // Dùng reduce tính tổng tiền gốc của các món ăn/sản phẩm
            let subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Tính số tiền được giảm
            let calculatedDiscount = (subTotal * discountPercent) / 100 + discountAmountValue;
            
            let finalTotal = subTotal - calculatedDiscount;
            return finalTotal > 0 ? finalTotal : 0; // Tránh trường hợp tiền bị âm
        },
        
        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            // Reset các giá trị giảm giá cũ trước khi áp mã mới
            discountPercent = 0;
            discountAmountValue = 0;

            if (code === "SALE10") {
                discountPercent = 10; // Giảm 10%
            } else if (code === "SALE20") {
                discountPercent = 20; // Giảm 20%
            } else if (code === "FREESHIP") {
                discountAmountValue = 30000; // Giảm thẳng 30.000đ
            } else {
                console.log(`Mã giảm giá '${code}' không hợp lệ.`);
            }
        },
        
        // 6. Lấy tổng số sản phẩm (tổng cộng dồn cột số lượng quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        // 7. Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discountPercent = 0;
            discountAmountValue = 0;
        },

        // 8. In giỏ hàng
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng         │");
            
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let itemTotal = item.price * item.quantity;
                
                let indexStr = (i + 1).toString().padEnd(1);
                let nameStr = item.name.padEnd(13);
                let qtyStr = item.quantity.toString().padStart(2);
                let priceStr = item.price.toLocaleString("vi-VN").padStart(10);
                let totalStr = itemTotal.toLocaleString("vi-VN").padStart(11);
                
                console.log(`│ ${indexStr} │ ${nameStr} │ ${qtyStr} │ ${priceStr}  │ ${totalStr}  │`);
            }
            
            console.log("├──────────────────────────────────────────────┤");
            let finalPriceStr = this.getTotal().toLocaleString("vi-VN") + "đ";
            console.log(`│ Tổng cộng:             ${finalPriceStr.padStart(21)} │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}

//Test đề bài 
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên số lượng 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → Số SP: 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → Sau xóa: 2