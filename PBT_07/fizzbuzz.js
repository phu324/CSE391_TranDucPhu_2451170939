// ==========================================
// Version 1: Classic
// ==========================================
console.log("--- FIZZBUZZ CLASSIC ---");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// ==========================================
// Version 2: Custom
// ==========================================
console.log("\n--- FIZZBUZZ CUSTOM ---");
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let resultStr = "";

        // Duyệt qua từng quy luật có trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                resultStr += rules[j].word; // Nếu chia hết thì cộng dồn chữ vào chuỗi
            }
        }

        // Nếu chuỗi rỗng tức là không chia hết cho số nào trong luật, in ra chính số đó
        if (resultStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${resultStr}"`);
        }
    }
}

// Chạy thử với bộ dữ liệu test của đề 
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);