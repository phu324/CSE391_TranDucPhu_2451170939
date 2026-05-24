// 1. Máy random 1 số từ 1 đến 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
const maxAttempts = 7; // Giới hạn 7 lần đoán
let attempts = 0;
let guessedNumbers = []; // Mảng lưu các số đã từng đoán để check trùng

alert("Chào mừng bạn đến với game Đoán Số! Bạn có tối đa 7 lượt đoán một số từ 1-100.");

while (attempts < maxAttempts) {
    let input = prompt(`Lượt đoán thứ ${attempts + 1}/${maxAttempts}. Mời bạn nhập số:`);

    // Nếu người dùng bấm "Cancel" thì dừng game luôn
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    // Chuyển kiểu dữ liệu từ string của prompt về số nguyên
    let guess = parseInt(input);

    // Validate dữ liệu đầu vào
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng chỉ nhập số nguyên hợp lệ trong khoảng từ 1 đến 100!");
        continue; // Lượt này không hợp lệ, bắt nhập lại và không tính lượt
    }

    // Kiểm tra xem số này đã đoán trước đó chưa
    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }

    if (isDuplicated) {
        alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
        continue; // Báo trùng và bắt nhập lại, không trừ lượt
    }

    // Nếu hợp lệ và không trùng, thêm vào danh sách và tăng số lần đoán
    guessedNumbers.push(guess);
    attempts++;

    // 2 & 4. Kiểm tra kết quả
    if (guess === targetNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần! 🎉`);
        break;
    } else if (guess < targetNumber) {
        alert("Cao hơn!"); // Số máy lớn hơn số đoán
    } else {
        alert("Thấp hơn!"); // Số máy nhỏ hơn số đoán
    }
}

// 5. Trường hợp hết lượt đoán mà vẫn không đúng
if (attempts === maxAttempts && guessedNumbers[guessedNumbers.length - 1] !== targetNumber) {
    alert(`Bạn đã hết lượt! Bạn thua rồi. Đáp án chính xác là: ${targetNumber}`);
}