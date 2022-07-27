"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
    // prevents page from scrolling to top on click
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
/*
 */
// DOM API
// each element/text/comment/document is a node (those 4 are node types)

// Selecting Creaing and Deleting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
// returns node list
// elements in the node list do not get updated automatically when HTML is added/deleted/modified
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
// return HTML collection
// if HTML is updated these elements are automatically updated
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

// creating and inserting elements
// .insertAdjacentHTML (see old section)

// creates an element but does NOT attach onto DOM
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent =
    "We use cookies for improved functionality and analytics.";
message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// if both lines are executed only the append will happen
// the element can only exist once on the page
// header.prepend(message);
header.append(message);
// header.before(message);
// header.after(message);

// this will work to put multiple
// header.append(message.cloneNode(true));

// delete elements
document
    .querySelector(".btn--close--cookie")
    .addEventListener("click", function () {
        message.remove();
    });

// Styles Atricutes and Classes
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// only reads inline style
console.log(message.style);

// will get rendered style props
console.log(getComputedStyle(message).color);

message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
