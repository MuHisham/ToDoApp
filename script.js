const addBtn = document.querySelector(".add-btn");
const modalBox = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const actualAddBtn = document.querySelector(".addTaskForm");
const taskCol = document.querySelector(".task");
const courseCol = document.querySelector(".course");
const deadlineCol = document.querySelector(".deadline");
const checkCol = document.querySelector(".checkmarks");


function createTaskElemUI(itemNo, content, col) {
    let taskDiv = document.createElement("div");
    let taskP = document.createElement("p");
    taskDiv.classList.add("item");
    taskDiv.classList.add(`item${itemNo}`);
    taskP.textContent = content;
    taskDiv.appendChild(taskP);
    col.appendChild(taskDiv);
}

function checkIfDeadlinePassed() {
    let deadlines = deadlineCol.children;
    const currentDate = new Date();
    for (let i = 1; i < deadlines.length; i++) {
        let deadlineDate = new Date(deadlines[i].children[0].textContent);
        console.log(deadlineDate, currentDate);
        if (deadlineDate < currentDate) {
            let taskItems = document.querySelectorAll(`.${deadlines[i].classList[1]}`);
            for (let i = 0; i < 3; i++) {
                taskItems[i].style.backgroundColor = "#ec7063";
            }
        }
    }
}

function addTaskToUI() {
    for (let i = taskCol.children.length - 1; i > 0; i--) {
        taskCol.removeChild(taskCol.children[i]);
        courseCol.removeChild(courseCol.children[i]);
        deadlineCol.removeChild(deadlineCol.children[i]);
        checkCol.removeChild(checkCol.children[i]);
    }

    let todos = JSON.parse(localStorage.getItem("todo"));
    let count = 1;
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        createTaskElemUI(count, todo[0], taskCol);
        createTaskElemUI(count, todo[1], courseCol);
        createTaskElemUI(count, todo[2], deadlineCol);

        let taskDiv = document.createElement("div");
        taskDiv.classList.add("item");
        taskDiv.classList.add(`item${count}`);
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener("change", () => {
            let taskItems = document.querySelectorAll(`.${checkbox.parentNode.classList[1]}`);
            if (checkbox.checked) {
                for (let i = 0; i < 3; i++) {
                    taskItems[i].style.backgroundColor = "#AAFF00";
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    taskItems[i].style.backgroundColor = "white";
                }
            }
        })

        taskDiv.appendChild(checkbox);
        checkCol.appendChild(taskDiv);
        count++;
    }   
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("todo") == null) {
        localStorage.setItem("todo", JSON.stringify([]));
    }
    addTaskToUI();
});

addBtn.addEventListener("click", () => {
    modalBox.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modalBox.style.display = "none";
})

actualAddBtn.addEventListener("click", () => {
    let task = document.querySelector("#taskField").value;
    let course = document.querySelector("#courseField").value;
    let deadline = document.querySelector("#deadlineField").value;
    document.querySelector("#taskField").value = "";
    document.querySelector("#courseField").value = "";
    document.querySelector("#deadlineField").value = "";
    let taskDetails = [task, course, deadline];

    let todos = JSON.parse(localStorage.getItem("todo"));
    todos.push(taskDetails);
    localStorage.setItem("todo", JSON.stringify(todos));

    addTaskToUI();
    checkIfDeadlinePassed();
})



