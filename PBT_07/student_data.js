const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Các biến phục vụ thống kê
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;
let totalMath = 0, totalPhysics = 0, totalCS = 0;
let totalMaleGPA = 0, countMale = 0;
let totalFemaleGPA = 0, countFemale = 0;

let maxStudent = null;
let minStudent = null;

// In tiêu đề bảng kết quả (Yêu cầu 3)
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3)
    let gpa = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    gpa = Math.round(gpa * 10) / 10; // Làm tròn 1 chữ số thập phân cho đẹp

    // 2. Xếp loại
    let xepLoai = "";
    if (gpa >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++; // 4. Đếm số SV mỗi xếp loại
    } else if (gpa >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (gpa >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // 3. In dòng kết quả của sinh viên đó
    console.log(`| ${i + 1}   | ${sv.name.padEnd(6)} | ${gpa.toFixed(1)}  | ${xepLoai.padEnd(11)} |`);

    // 5. Tìm SV điểm cao nhất / thấp nhất
    if (maxStudent === null || gpa > maxStudent.gpa) {
        maxStudent = { name: sv.name, gpa: gpa };
    }
    if (minStudent === null || gpa < minStudent.gpa) {
        minStudent = { name: sv.name, gpa: gpa };
    }

    // 6. Cộng dồn điểm môn học để tính trung bình lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    // 7. Bonus: Phân loại theo giới tính
    if (sv.gender === "M") {
        totalMaleGPA += gpa;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += gpa;
        countFemale++;
    }
}

console.log("---------------------------------------------");
// 4. In kết quả đếm
console.log(`Thống kê xếp loại: Giỏi: ${countGioi}, Khá: ${countKha}, Trung bình: ${countTB}, Yếu: ${countYeu}`);

// 5. In thủ khoa / vĩ khoa
console.log(`SV có điểm TB cao nhất: ${maxStudent.name} (${maxStudent.gpa})`);
console.log(`SV có điểm TB thấp nhất: ${minStudent.name} (${minStudent.gpa})`);

// 6. In điểm TB môn toàn lớp
console.log(`Điểm TB môn toàn lớp -> Toán: ${(totalMath / students.length).toFixed(1)}, Lý: ${(totalPhysics / students.length).toFixed(1)}, Tin: ${(totalCS / students.length).toFixed(1)}`);

// 7. In điểm TB theo giới tính
console.log(`Điểm TB theo giới tính -> Nam: ${(totalMaleGPA / countMale).toFixed(1)}, Nữ: ${(totalFemaleGPA / countFemale).toFixed(1)}`);