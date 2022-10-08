"use strict";

///////////////////////////////////////
// Modal window

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");

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

// Smooth Scrolling
btnScrollTo.addEventListener("click", function (e) {
    // old way
    // const s1coords = section1.getBoundingClientRect();

    // console.log(s1coords);
    // console.log(e.target.getBoundingClientRect());
    // console.log("Current scroll (x/y)", window.pageXOffset, pageYOffset);

    // Scrolling
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: "smooth",
    // });

    // new way
    section1.scrollIntoView({ behavior: "smooth" });
});

// Page Navigation

// this attaches an event listener to each nav__link for scrolling
// it works but could be inefficient, imagine there are 1000 links
/* 
document.querySelectorAll(".nav__link").forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();

        document
            .querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});
*/

// instead take advantage of bubbling and attach to container element
navLinks.addEventListener("click", function (e) {
    e.preventDefault();
    // only want to grab the links (incase we click on the container itself with no link)
    if (e.target.classList.contains("nav__link")) {
        document
            .querySelector(e.target.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    }
});

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
// DOM API
// each element/text/comment/document is a node (those 4 are node types)
/*
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

// Styles Attributes and Classes
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
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

console.log(logo.designer); // undifined bc not a standard HTML attribute
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");
console.log(logo.getAttribute("company"));

// src paths
console.log(logo.src); //absolute path
console.log(logo.getAttribute("src")); //relative

// Classes 4 methods
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

// Don't use this way use above
// this overwrites classes and you can only set one class at a time
// logo.className = "Jonas"



// more about events

const h1 = document.querySelector("h1");

// use this
const alertH1 = function (e) {
    alert("addEventListener: Great! You are reading the heading!");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// old school
// h1.onmouseenter = function (e) {
//     alert("addEventListener: Great! You are reading the heading!");
// };

// rgb(255,255,255)
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
    `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// e.target - The element where the event happened (which element we actually clicked)
// e.currentTarget - The element where the current Event has been captured
//      (could be a parent element that the event bubbled up to)

// default behavior for addEventListener is listening for bubbling events
// not capture phase by default
const navLink = document.querySelector(".nav__link");
navLink.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();

    // stop propagation
    // e.stopPropagation();
});

const navLinks = document.querySelector(".nav__links");
navLinks.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
});

const nav = document.querySelector(".nav");
nav.addEventListener(
    "click",
    function (e) {
        this.style.backgroundColor = randomColor();
    },
    true // listening for capture phase will be the first to act
);
*/
