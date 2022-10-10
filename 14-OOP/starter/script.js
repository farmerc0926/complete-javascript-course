"use strict";
/*


// constructor function
const Person = function (firstName, birthYear) {
    // Instance Props
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Instance Methods

    // Don't do this
    // if we made n instances this function would be made n times
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // };
    // use prototypes as seen below
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);

// "new" keyword
// 1. New {} is created
// 2. function is called, "this" keyword is now the empty object {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 2017);
console.log(matilda, jack);

console.log(jonas instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};
console.log(Person.prototype);

jonas.calcAge();
console.log(jonas.__proto__ === Person.prototype);

// can put values on prototype as well
Person.prototype.species = "Homo Sapien";
console.log(jonas.species, matilda.species);

// not the instances property though
console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false

console.log(jonas.__proto__); // prototype associated with Peron
console.log(jonas.__proto__.__proto__); // prototype associated with Object
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1];
console.log(arr.__proto__); // contains all the arr methods (map, filter, reduce, etc)
console.log(arr.__proto__.__proto__); // Object.prototype

// can add method to existing "class"
// Generally not a good idea
Array.prototype.unique = function () {
    return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir((x) => x + 1);


// Coding Challange #1

// 1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
};
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();

mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();
*/

// ES6 Classes
// still prototypal inheritance but syntax is like classes from other languages

class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // all methods written here are on the prototype for PersonCl
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.firstName}!`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    set fullName(name) {
        if (name.includes(" ")) this.fullName = name;
        else alert(`${name} is not a full name!`);
    }
}

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();

// Classes are not hoisted
// Classes are first class
// Classes are always executed in strict mode

// Setters and Getters

const account = {
    owner: "jonas",
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

// access like a property
console.log(account.latest);
account.latest = 50;

// added getter to
console.log(jessica.age);
