"use strict";

/*
// default parameters

const bookings = [];

const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers //default values
) {
    const booking = {
        flightNum, // equivalent to flightNum: flightNum
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 6);
createBooking("LH123", undefined, 1000); // how to skip a param to leave as default

// Passing by value and reference

const flight = "LH234";
const jonas = {
    name: "Jonas Schmedtmann",
    passport: 48392048932,
};

const checkIn = function (flightNum, passenger) {
    flightNum = "LH999";
    passenger.name = "Mr. " + passenger.name;

    if (passenger.passport === 48392048932) alert("Checked in");
    else alert("wrong passport");
};

// checkIn(flight, jonas);
// console.log(flight); // when passed into the function JS engine creates a copy bc primative type
// console.log(jonas); // This passes the address of the object so when we change values it changes in the actual object on the heap

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// it looks like JS has pass by reference for objects but it technically doesn't ...
// this is bc js stores heap address in call stack for objects
// so it is passing the "value" on the call stack, which happens to be a heap address
// so everything is technically pass by value but objects act like pass by reference



// First class and higher order functions

// first class
//      this means that functions are treated as values (they are an object)

// higher order functions
//      can be a function that receives another function as an arg
//          passed in function is usually called a callback function
//      or a function  that returns a new function
//      or both

// Functions Accepting Callback Functions

const oneWord = function (str) {
    return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...other] = str.split(" ");
    return [first.toUpperCase(), ...other].join(" ");
};

//higher order function
const transformer = function (str, fn) {
    console.log(`original string: ${str}`);
    console.log(`transformed string: ${fn(str)}`);
    console.log(`transformed by: ${fn.name}`);
};

transformer("js is the best!", upperFirstWord);
transformer("js is the best!", oneWord);

// JS uses call backs a lot
// they can split code into more readable parts
// callback functions allow us to abstract
const high5 = function () {
    console.log("👋");
};
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);




// functions returning other functions

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");

greet("Hello")("Jonas");
greet("Hello")("Steven");

const arrowGreet = (greeting) => (name) => console.log(`${greeting} ${name}`);

const arrowGreeterHey = arrowGreet("Hey");
arrowGreeterHey("Jonas");
arrowGreeterHey("Steven");
arrowGreet("Hello")("Jonas");
arrowGreet("Hello")("Steven");



// call and apply methods

const lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name, // name: name es6 thing
        });
    },
};

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(239, "John Smith");
console.log(lufthansa);

const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],
};

const book = lufthansa.book;

// book(23, "Sarah Williiams"); //undefined bc this is undefined when not called via object

// fn.call() allows you to define what "this" points to
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
    airline: "Swiss",
    iataCode: "LX",
    bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

// apply method does almost same thing except function args after defining this are an array
const flightData = [583, "George Cooper"];
// you can just use call
book.apply(swiss, flightData); //same
book.call(swiss, ...flightData); //same

// bind method
// book.call(eurowings, 23, "Sarah Williams");

// returns a new function where "this" will always be bound to eurowings
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams");

// can also set some paramters
// so bookEW23 only needs name as param now
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Schmedtmann");
bookEW23("Martha Cooper");
console.log(eurowings);

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

// when buyPlane is called like this "this" becomes the HTML element
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// we can bind buyPlane to lufthanasa object "this" -> lufthansa
document
    .querySelector(".buy")
    .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// partial application
// means preset parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//can define a specific tax
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(23));

// Challange: Create function that has a defined tax rate and returns a func that adds tax to a value
// this works and is readable
// const getTaxFunc = function (rate) {
//     return (value) => value + value * rate;
// };

// fancy
const getTaxFunc = (rate) => (value) => value + value * rate;

const addMISalesTax = getTaxFunc(".06");
console.log(addMISalesTax(100));
console.log(addMISalesTax(1000));
console.log(addMISalesTax(1));

*/

// Coding Challange 1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),

    //1
    registerNewAnswer() {
        //1.1
        const choice = Number(
            prompt(
                `What is your favourite programming language?
${this.options.join("\n")}(Write option number)`
            ) || -1
        );
        //1.2
        console.log(choice);
        if (choice > -1 && choice < this.answers.length) this.answers[choice]++;
        else alert("Not a valid choice!");
        //4
        this.displayResults("string");
    },

    //3
    displayResults(type = "array") {
        if (type === "array") console.log(this.answers);
        else if (type === "string")
            console.log(`Poll results are ${this.answers.toString()}`);
    },
};

//2
document
    .querySelector(".poll")
    .addEventListener("click", poll.registerNewAnswer.bind(poll));

//bonus
const td1 = { answers: [5, 2, 3] };
const td2 = { answers: [1, 5, 3, 9, 6, 1] };
poll.displayResults.call(td1);
poll.displayResults.call(td1, "string");
poll.displayResults.call(td2);
poll.displayResults.call(td2, "string");



// Immediately invoked functions expressions (IIFE)
// sometimes need a function that immidiatly executes then goes away

const runOnce = function () {
    console.log("This will never run again");
};
runOnce();

// IIFE
(function () {
    console.log("This will never run again");
    const isPrivate = 23;
})();

// console.log(isPrivate); // error

(() => console.log("This will never run again"))();

// block scope still private with let/const inside
{
    const isPrivate = 23;
    var notPrivate = 46;
}

console.log(notPrivate);



// Closures

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

// because passengerCount is in secureBooking scope
// passengerCount is removed from the call stack afer secureBooking()
// is done executing

const booker = secureBooking();
booker();
booker();
booker();

// But the above still works, why?
// A closure makes a function "remember" all the variables that were in scope at definition
// A function always has access to the variable env of the execution context in which it was created
// Closure is the variable env attached to the functino, exactly as it was at the time and place the function was created
// closure has priority over scope chain when js engine looks for variables

console.dir(booker); // can see closure under [[scopes]] ([[]] means internal property that is not accessable)


// More Closure Examples

// ex 1
let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
};

g();
f(); // closure allows f to hold onto a value in the g() scope
console.dir(f);

// h reassigns f
h();
f(); // closure alls f to hold onto b value in the h() scope
// closure no longer contains a
console.dir(f);

// ex 2

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    // this executes then boardPassengers is done
    console.log(`Will start boarding in ${wait} seconds`);
};

// shows that closure get priority over scope chain
const perGroup = 1000;

// call back function setTimeout is executed independently of boardPassangers
// It gets a closure for the parameters and perGroup variables and can still use them
boardPassengers(180, 3);

*/

// Coding Challange 2
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
    const header = document.querySelector("h1");
    header.style.color = "red";

    document.querySelector("body").addEventListener("click", function () {
        header.style.color = "blue";
    });
})();

// why does this work?
// In the event listener we have defined a call back function
// when it is defined const header is in scope (part of the IIFE scope)
// the IIFE executes and its variable env is popped off the call stack
// however our call back function retains "header" as a closure
// then the call back function is executed  when the user clicks the body
// and it uses the closure to access the header element
