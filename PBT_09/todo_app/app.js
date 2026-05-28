// ==================== STATE MANAGEMENT ====================
let todos = [];
let currentFilter = 'all'; // Có 3 giá trị: 'all' | 'active' | 'completed'

// DOM Elements References
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

// ==================== LÀM VIỆC VỚI LOCALSTORAGE ====================
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("todos");
    todos = data ? JSON.parse(data) : [];
}

// ==================== CORE RENDER LOGIC ====================
// Yêu cầu: Sử dụng hoàn toàn document.createElement (Không innerHTML bừa bãi)
function render() {
    // 1. Xóa sạch các node con hiện có trong list
    todoList.innerHTML = "";

    // 2. Lọc danh sách todos dựa theo trạng thái bộ lọc (Filter)
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // mặc định 'all'
    });

    // 3. Nếu danh sách trống, hiển thị thông báo nhẹ nhàng
    if (filteredTodos.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = "Không có công việc nào trong danh sách này! 🎉";
        todoList.appendChild(emptyLi);
    } else {
        // 4. Xây dựng từng node DOM cho Todo Item bằng createElement
        filteredTodos.forEach(todo => {
            const li = document.createElement("li");
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id; // Gắn ID để Event Delegation dễ bắt cấu trúc dữ liệu

            const span = document.createElement("span");
            span.className = "todo-text";
            span.textContent = todo.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "❌";

            // Gắn các phần tử con vào thẻ li mẹ
            li.appendChild(span);
            li.appendChild(deleteBtn);

            // Đẩy thẻ li hoàn chỉnh vào cây DOM lớn
            todoList.appendChild(li);
        });
    }

    // 5. Cập nhật số đếm công việc (Chỉ đếm các công việc chưa xong - active)
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} việc còn lại`;

    // 6. Đồng bộ trạng thái hiện tại vào ổ cứng LocalStorage
    saveToLocalStorage();
}

// ==================== EVENT HANDLERS (XỬ LÝ SỰ KIỆN) ====================

// Chức năng: Thêm mới Todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // ⚠️ Bắt buộc phải có để ngăn reload trang
    const text = todoInput.value.trim();
    
    if (!text) return; // Bảo vệ: Không add dữ liệu rỗng

    const newTodo = {
        id: Date.now(), // Tạo ID độc nhất dựa trên timestamp miliseconds
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = ""; // Xóa dữ liệu ô nhập
    todoInput.focus();    // Focus lại chuẩn bị cho lần nhập kế tiếp
    render();
});

// ⚡ Yêu cầu: EVENT DELEGATION - Gán 1 sự kiện duy nhất lên thẻ cha `#todoList`
todoList.addEventListener("click", (e) => {
    const target = e.target;
    // Tìm thẻ cha li gần nhất chứa data-id tương ứng dữ liệu
    const todoItem = target.closest(".todo-item");
    if (!todoItem) return;

    const id = Number(todoItem.dataset.id);

    // THÀNH PHẦN 1: Click trúng nút Xóa
    if (target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        render();
    } 
    // THÀNH PHẦN 2: Click vào dòng chữ để Toggle hoàn thành (completed)
    else if (target.classList.contains("todo-text")) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        render();
    }
});

// Chức năng nâng cao: Double-click (dblclick) vào chữ để mở giao diện Edit
todoList.addEventListener("dblclick", (e) => {
    const target = e.target;
    
    if (target.classList.contains("todo-text")) {
        const todoItem = target.closest(".todo-item");
        const id = Number(todoItem.dataset.id);
        const currentText = target.textContent;

        // Tạo phần tử input chỉnh sửa tạm thời bằng createElement
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = currentText;

        // Thay thế thẻ Text cũ bằng Input mới trên DOM
        todoItem.replaceChild(editInput, target);
        editInput.focus();

        // Xử lý khi bấm Enter để lưu hoặc Blur (click ra ngoài để hủy/lưu)
        const saveEdit = () => {
            const updatedText = editInput.value.trim();
            if (updatedText) {
                todos = todos.map(t => t.id === id ? { ...t, text: updatedText } : t);
            } else {
                // Nếu xóa sạch chữ trong khi edit, mặc định sẽ xóa luôn item đó
                todos = todos.filter(t => t.id !== id);
            }
            render();
        };

        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") saveEdit();
            if (event.key === "Escape") render(); // Bấm Esc để hủy lưu, hoàn tác về cũ
        });

        editInput.addEventListener("blur", saveEdit);
    }
});

// Chức năng: Bộ lọc All / Active / Completed
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Xóa class active ở nút cũ, gán class active vào nút vừa click
        document.querySelector(".filter-btn.active").classList.remove("active");
        e.target.classList.add("active");

        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Chức năng: Xóa toàn bộ các việc đã làm xong (Clear completed)
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
});

// ==================== KHỞI CHẠY ỨNG DỤNG ====================
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    render();
});