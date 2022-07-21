"use strict";

/*
//Strict Mode

//above statement has to be first line in file to affect whole file
//strict mode gives more errors in console and doesn't allow certian things

let hasDriversLicense = false;
const passTest = true;

//notice spelling mistake on diver"S"
if (passTest) hasDriverLicense = true;

//with strict mode this will throw an error in the console
//without it, it will fail silently
if (hasDriversLicense) console.log("I can drive :D");

//strict mode reserves more words that can not be used in variable names
const interface = "Audio";


//Functions

function logger() {
    console.log("My name is Jonas");
}

logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appOrangeJuice = fruitProcessor(2, 4);
console.log(appOrangeJuice);


//Function Declaraions and Expressions

//function declaration
//can call before declaration
const age1 = calcAge1(1991);
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

console.log(age1);

//function expression
//can not call before declaration
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}; //function (..) {...} is an expression that creates a "function" value that can be stored

const age2 = calcAge2(1991);
console.log(age2);


//Arrow Functions

//arrow function
//do not get this keyword
//good for one liner functions
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement} years`;
};

console.log(yearUntilRetirement(1991, "Jonas"));
console.log(yearUntilRetirement(1980, "Bob"));


//Functions calling other functions

function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
    return juice;
}

console.log(fruitProcessor(2, 3));


//Review Functions

function calcAge(birthYear) {
    return 2037 - birthYear;
}

function yearsUntilRetirement(birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) return retirement;
    return -1;
    //return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));



//Coding Challange 1
const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;
const dolphinAverage = calcAverage(85, 54, 41);
const koalaAverage = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins > 2 * avgKoalas)
        console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
    else if (avgKoalas > 2 * avgDolphins)
        console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
    else console.log(`It's a tie.`);
}

checkWinner(dolphinAverage, koalaAverage);


//Arrays
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

//const years = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

//arrays are not immutable so const doesn't stop us from changing elements of array
friends[2] = "Jay";
//however can not reassign enitre array
//friends = ['me'];
console.log(friends);

const firstName = "Jonas";
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

function calcAge(birthYear) {
    return 2037 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];
console.log(calcAge(years[0]));


//Basic Array Operations (Methods)

const friends = ["Michael", "Steven", "Peter"];
const newLength = friends.push("Jay"); //push returns new length
console.log(friends);
console.log(newLength);

friends.unshift("John"); // also return new length
console.log(friends);

friends.pop();
const popped = friends.pop(); //return element that is removed
console.log(friends);
console.log(popped);

friends.shift(); //return element that is removed
console.log(friends);

console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob")); //-1 if not there

console.log(friends.includes("Steven")); //true
console.log(friends.includes("Bob")); //false


//Coding Challange 2
function calcTip(bill) {
    if (bill >= 50 && bill <= 300) return bill * 0.15;
    return bill * 0.2;
}

console.log(calcTip(100));

const bills = [125, 555, 44];
console.log(bills);
const tips = [];
for (const bill of bills) {
    tips.push(calcTip(bill));
}
console.log(tips);
const totals = [];
for (let i = 0; i < bills.length; i++) {
    totals.push(bills[i] + tips[i]);
}
console.log(totals);



//Objects
const jonasArray = [
    "Jonas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ["Michael", "Peter", "Steven"],
];

const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
};

//dot notation
const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
};
console.log(jonas);
console.log(jonas.lastName);
console.log(jonas["lastName"]);

const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]);

const interestedIn = prompt(
    "What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends"
);

if (jonas[interestedIn]) console.log(jonas[interestedIn]);
else console.log("Wrong Request");

jonas.location = "portugal";
jonas["twitter"] = "@jonasschmedtman";
console.log(jonas);

console.log(
    `${jonas.firstName} has ${jonas.friends.length}, and his best friend is called ${jonas.friends[0]}`
);


//object methods

const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    birthYear: 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
    hasDriversLicense: false,

    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // },

    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.age} year old ${
            this.job
        }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license`;
    },
};

console.log(jonas.getSummary());
//console.log(jonas["calcAge"]());


//Coding Challange 3
const john = {
    firstName: "John",
    lastName: "Smith",
    mass: "92",
    height: "1.95",

    calcBMI: function () {
        return this.mass / this.height ** 2;
    },
};
const mark = {
    firstName: "Mark",
    lastName: "Miller",
    mass: "78",
    height: "1.69",

    calcBMI: function () {
        return this.mass / this.height ** 2;
    },
};

const markBMI = mark.calcBMI();
const johnBMI = john.calcBMI();

console.log(
    `${markBMI > johnBMI ? "Mark" : "John"}'s BMI (${
        markBMI > johnBMI ? markBMI : johnBMI
    } is higher than ${markBMI <= johnBMI ? "Mark" : "John"}'s BMI ${
        markBMI <= johnBMI ? markBMI : johnBMI
    })!`
);


// The For Loop

for (let rep = 1; rep <= 30; rep++) {
    console.log(`lifting weights rep ${rep} 🏋️‍♀️`);
}



//more array looping and stuff
const jonasArray = [
    "Jonas",
    "Schmedtmann",
    2037 - 1991,
    "teacher",
    ["Michael", "Peter", "Steven"],
    true,
];
const types = [];

for (let i = 0; i < jonasArray.length; i++) {
    console.log(jonasArray[i]);

    //types[i] = typeof jonasArray[i];
    types.push(typeof jonasArray[i]);
    console.log(types[i]);
}

*/

//Coding Challange 4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];
function calcTip(bill) {
    if (bill >= 50 && bill <= 300) return bill * 0.15;
    return bill * 0.2;
}
function calcAverage(arr) {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum / arr.length;
}
for (const bill of bills) {
    const i = tips.push(calcTip(bill));
    totals.push(bill + tips[i - 1]);
}

console.log(bills);
console.log(tips);
console.log(totals);
console.log(calcAverage(totals));
