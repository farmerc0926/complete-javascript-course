"use strict";

/*
function calcAge(birthYear) {
    const age = 2037 - birthYear;
    function printAge() {
        let output = `${firstName}, You are ${age}, born in ${birthYear}`;
        console.log(output);

        if (birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            const firstName = "Steven";
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }

            const output = "NEW OUTPUT!";
        }
        // console.log(str);
        console.log(millenial);
        // console.log(add(2, 3)); // works without strict mode
        console.log(output);
    }
    printAge();
    return age;
}

const firstName = "Jonas";
calcAge(1991);
// console.log(age);
// printAge();


//hoisting w variables
// console.log(me); //undefined
// console.log(job); //error
// console.log(year); //error

var me = "Jonas";
let job = "teacher";
const year = 1991;

//functions
// console.log(addDecl(2, 3)); //works
// console.log(addExpr(2, 3)); //doesnt work uninit with let/const and undefined with var
// console.log(addArrow(2, 3)); //doesnt work uninit with let/const and undefined with var
function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
};

const addArrow = (a, b) => a + b;

// Example

//products deleted bc numProducts is hoisted and undefined which is falsey value
if (!numProducts) deleteShoppingCart();

var numProducts = 30;

function deleteShoppingCart() {
    console.log("All products deleted");
}

var x = 1; // creates value on window object
let y = 2;
const z = 3;


console.log(this);
const calcAge = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
};
calcAge(1991);

const calcAgeArrow = (birthYear) => {
    console.log(2037 - birthYear);
    console.log(this);
};
calcAgeArrow(1991);

const jonas = {
    year: 1991,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);
    },
};
jonas.calcAge();

const matilda = {
    year: 2017,
};

matilda.calcAge = jonas.calcAge;

//this is matilda here NOT jonas
//thats because it is refering to the parent object
matilda.calcAge();


// var firstName = "Matilda";

const jonas = {
    firstName: "Jonas",
    year: 1991,
    calcAge: function () {
        console.log(this); //this is the object calling this function
        console.log(2037 - this.year);

        // const isMillenial = function () { // this is undefined
        //     console.log(this);
        //     console.log(this.year >= 1981 && this.year <= 1996);
        // };

        // const self = this; // pre es6 solution
        // const isMillenial = function () {
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // };

        // es6 solution
        // arrow functions inherit "this" from above scope of where the function is declared
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
        };
        isMillenial();
    },

    greet: () => {
        console.log(this); // this is the window
        console.log(`Hey ${this.firstName}`);
    },
};
jonas.greet();
jonas.calcAge();

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

//arguments does not work in arrow funcs
var addArrow = (a, b) => {
    console.log(arguments);
    return a + b;
};
addArrow(2, 5, 8);



let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
    name: "Jonas",
    age: 30,
};

const friend = me;
friend.age = 27;

//both are the same age
//because objects are reference values
//me and friend point to the same address in call stack
//which holds a value that points to the heap where obj is stored
//so changing a property via either object name will effectively change both
console.log(friend);
console.log(me);

*/

//primative types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

//reference types
const jessica = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before Marriage", jessica);
console.log("After Marriage", marriedJessica);

// marriedJessica = {}; //error bc reference to new empty object would overwrite address saved in stack be jessica is constant

//shallow copy
//only properties in "first level" (not deeper objects)
const jessica2 = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27,
    family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
console.log("Before Marriage", jessica2);
console.log("After Marriage", jessicaCopy);

//deep copy (hard to do in js)
