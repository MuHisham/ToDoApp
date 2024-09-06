const addBtn = document.querySelector(".add-btn");
const modalBox = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");

addBtn.addEventListener("click", () => {
    modalBox.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modalBox.style.display = "none";
})