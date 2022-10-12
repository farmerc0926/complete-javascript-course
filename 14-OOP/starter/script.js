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

// Static Methods

Person.hey = function () {
    console.log("Hey there 👋");
    console.log(this);
};

Person.hey();
// jonas.hey(); cant do this bc hey is not in the prototype, just in Person namespace



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
        console.log(name);
        if (name.includes(" ")) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // static method

    static hey() {
        console.log("Hey there 👋");
        console.log(this);
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

const walter = new PersonCl("Walter White", 1965);

PersonCl.hey();

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

// Object.create

// define a prototype
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

// Coding Challange #2

class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed);
    }

    brake() {
        this.speed -= 5;
        console.log(this.speed);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(mph) {
        this.speed = mph * 1.6;
    }
}

const ford = new Car("Ford", 120);

ford.accelerate();
ford.brake();
ford.speedUS;
ford.speedUS = 20;
ford.brake();

// Parent and student class 3 different ways

// constructor functions
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
    // .call allows us to define "this" keyword for Person function
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// This is the key line for inheritance
// Obeject.create allows us to create an object using an existing prototype
// Student.prototype = Person.prototype DOES NOT WORK
// doing this then creating a method on the student prototype would also create the method
//      on the person prototype which kinda defeats the purpose of inheritance
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

// Coding Challange #3

// 1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} acclerated to ${this.speed} km/h`);
};
Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} decclerated to ${this.speed} km/h`);
};

const ElectricCar = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

ElectricCar.prototype = Object.create(Car.prototype);

// 2
ElectricCar.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`Charged to ${this.charge}`);
};

// 3
ElectricCar.prototype.accelerate = function () {
    this.speed += 20;
    this.charge *= 0.99;
    console.log(
        `${this.make} acclerated to ${this.speed} km/h, with a charge of ${this.charge}%`
    );
};

// 4
const tesla = new ElectricCar("Tesla", 100, 100);
tesla.brake();
tesla.chargeBattery(50);
tesla.accelerate();
*/

// Skipping to coding challange #4

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} acclerated to ${this.speed} km/h`);
        return this;
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.make} decclerated to ${this.speed} km/h`);
        return this;
    }
}

class EvCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        console.log(`Charged to ${this.#charge}`);
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.charge *= 0.99;
        console.log(
            `${this.make} acclerated to ${this.speed} km/h, with a charge of ${
                this.#charge
            }%`
        );
        return this;
    }
}

const tesla = new EvCl("Tesla", 100, 100);
tesla.accelerate().accelerate().accelerate().chargeBattery(100);
