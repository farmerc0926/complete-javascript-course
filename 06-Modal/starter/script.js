"use strict";

//store elements into variables that we will use
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

//close and open
function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
function openModal() {
    //remove hidden on modal and overlay so it displays onClick
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//responding to keyboard events
//this is a global event usually so put listener on document

//e is for event
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
