"use strict";

///////////////////////////////////////
// Modal window

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContents = document.querySelectorAll(".operations__content");

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

// Tabbed Component
tabsContainer.addEventListener("click", function (e) {
    e.preventDefault();

    // handles incase we click span number
    const clicked = e.target.closest(".operations__tab");

    if (
        clicked.classList.contains("operations__tab") &&
        !clicked.classList.contains("operations__tab--active")
    ) {
        // hide current tab
        document
            .querySelector(".operations__tab--active")
            .classList.remove("operations__tab--active");
        document
            .querySelector(".operations__content--active")
            .classList.remove("operations__content--active");

        // show new tab
        clicked.classList.add("operations__tab--active");
        document
            .querySelector(`.operations__content--${clicked.dataset.tab}`)
            .classList.add("operations__content--active");
    }
});

// Menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = nav.querySelectorAll(".nav__link");
        const logo = nav.querySelector("img");

        for (const el of siblings) {
            if (el !== link) el.style.opacity = this;
            logo.style.opacity = this;
        }
    }
};

// use bind to set "this" to our opacity
// note: this seems a little strange to me and reduces readability imo
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky nav bar
// in our html handled with "sticky" class
// bad way
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//     if (window.scrollY >= initialCoords.top) nav.classList.add("sticky");
//     else nav.classList.remove("sticky");
// });

// Sticky nav bar with intersection observer api
// (good way)

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entires, observer) {
    const [entry] = entires;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0, // when 0% of header is visible make sticky
    rootMargin: `-${navHeight}px`, // adds/removes "extra length" to target element (the header)
});
headerObserver.observe(header);

// Reveal Sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (entry.isIntersecting) {
        entry.target.classList.remove("section--hidden");

        // can remove obverser when we are done to improve performance
        observer.unobserve(entry.target);
    }
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

for (const section of allSections) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
}

// Lazy Loading Images
const imgs = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
    const [entry] = entries;

    if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;

        // avoids revealing image too soon
        entry.target.addEventListener("load", function () {
            entry.target.classList.remove("lazy-img");
        });

        observer.unobserve(entry.target);
    }
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px", // load images a little before user sees them
});

for (const img of imgs) {
    imgObserver.observe(img);
}

// Slider Component

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const dotContainer = document.querySelector(".dots");

let curSlide = 0;

const createDots = function () {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

const goToSlide = function (s) {
    slides.forEach(
        (slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
    );
};

const showActiveDot = function (s) {
    document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
        .querySelector(`.dots__dot[data-slide="${s}"]`)
        .classList.add("dots__dot--active");
};

// set inital positions
goToSlide(0);
createDots();
showActiveDot(0);

// go to next slide
const nextSlide = function () {
    curSlide++;
    if (curSlide >= slides.length) curSlide = 0;
    goToSlide(curSlide);
    showActiveDot(curSlide);
};

// go to prev slide
const prevSlide = function () {
    curSlide--;
    if (curSlide < 0) curSlide = slides.length - 1;
    goToSlide(curSlide);
    showActiveDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const slideIndex = e.target.dataset.slide;
        goToSlide(slideIndex);
        showActiveDot(slideIndex);
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


// DOM Traversing
const h1 = document.querySelector("h1");

// going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";

h1.closest("h1").style.background = "var(--gradient-secondary)";

// Going Sideways: Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if need all siblings (instead of prev and next)
console.log(h1.parentElement.children);
for (const el of [...h1.parentElement.children]) {
    if (el !== h1) {
        el.style.transform = "scale(0.5)";
    }
}

// DOM LifeCycle Events

// just html and js need to be loaded (not images/external resources)
document.addEventListener("DOMContentLoaded", function (e) {
    console.log("DOM Tree Built!", e);
});

window.addEventListener("load", function (e) {
    console.log("Page fully loaded!", e);
});

// window.addEventListener("beforeunload", function (e) {
//     e.preventDefault();
//     console.log(e);
//     e.returnValue = "";
// });
*/
