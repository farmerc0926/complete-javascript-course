/*
let javascriptIsFun = true;

console.log(javascriptIsFun);
console.log(typeof true);
console.log(typeof javascriptIsFun);
console.log(typeof 3);
console.log(typeof "hello");

javascriptIsFun = "Yes!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(year);
console.log(typeof year);

console.log(typeof null);
*/

/*let age = 30;
age = 31;

const birthYear = 1998;
//const job; error

var job = "programmer";
job = "teacher";

//doesn't create in current scope
//creates globally
lastName = "Farmer";
console.log(lastName);
*/

//Basic Operators

// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;
// console.log(ageJonas, ageSarah);
// console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// // ** is pow operator

// const firstName = "Jonas";
// const lastName = "Smith";
// console.log(firstName + " " + "Smith");

// let x = 10 + 5;
// x += 10; // x = x + 10 = 25
// x *= 4; // x = x * 4 = 100
// x++; // x = x + 1
// x--; // 100
// x--; // 99
// console.log(x);

// console.log(ageJonas > ageSarah);
// console.log(ageSarah >= 18);

// const isFullAge = ageSarah >= 18;

// console.log(now - 1991 > now - 2018);

// Operator Precendence

// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;
// console.log(now - 1991 > now - 2018);

// console.log(25 - 10 - 5);

// let x, y;

// x = y = 25 - 10 - 5; // x = y = 10, x = 10
// console.log(x, y);
// const averageAge = (ageJonas + ageSarah) / 2;
// console.log(ageJonas, ageSarah, averageAge);

// CODING CHALLANGE #1

// //testdata1
// const markWeight1 = 78;
// const markHeight1 = 1.69;
// const johnWeight1 = 92;
// const johnHeight1 = 1.95;

// //testdata2
// const markWeight2 = 95;
// const markHeight2 = 1.88;
// const johnWeight2 = 85;
// const johnHeight2 = 1.76;

// function calculateBMI(weight, height) {
//     return weight / height ** 2;
// }

// const markBMI1 = calculateBMI(markWeight1, markHeight1);
// const markBMI2 = calculateBMI(markWeight2, markHeight2);
// const johnBMI1 = calculateBMI(johnWeight1, johnHeight1);
// const johnBMI2 = calculateBMI(johnWeight2, johnHeight2);
// const markHigherBMI1 = markBMI1 > johnBMI1;
// const markHigherBMI2 = markBMI2 > johnBMI2;

// console.log(markBMI1, johnBMI1, markHigherBMI1);
// console.log(markBMI2, johnBMI2, markHigherBMI2);

// Strings and Template Literals

// const firstName = "Jonas";
// const job = "teacher";
// const birthYear = 1991;
// const year = 2037;

// const jonas =
//     "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
// console.log(jonas);

// const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
// console.log(jonasNew);

// console.log(`Just a string`);

// console.log("string with \n\
// multiple \n\
// lines");

// console.log(`String
// multiple
// lines`);

// taking decisions if/else
// const age = 15;

// if (age >= 18) {
//     console.log("Sarah can staart driving license");
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Sarah is too young wait another ${yearsLeft} years :)`);
// }

// const birthYear = 2002;
// let century;
// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(century);

// Coding Challange 2
// const markWeight1 = 78;
// const markHeight1 = 1.69;
// const johnWeight1 = 92;
// const johnHeight1 = 1.95;

// //testdata2
// const markWeight2 = 95;
// const markHeight2 = 1.88;
// const johnWeight2 = 85;
// const johnHeight2 = 1.76;

// function calculateBMI(weight, height) {
//     return weight / height ** 2;
// }

// const markBMI1 = calculateBMI(markWeight1, markHeight1);
// const markBMI2 = calculateBMI(markWeight2, markHeight2);
// const johnBMI1 = calculateBMI(johnWeight1, johnHeight1);
// const johnBMI2 = calculateBMI(johnWeight2, johnHeight2);
// const markHigherBMI1 = markBMI1 > johnBMI1;
// const markHigherBMI2 = markBMI2 > johnBMI2;

// if (markHigherBMI1) {
//     console.log(`Mark's BMI ${markBMI1} is higher than John's ${johnBMI1}!`);
// } else {
//     console.log(`John's BMI ${johnBMI1} is higher than Mark's! ${markBMI1}`);
// }
// if (markHigherBMI2) {
//     console.log(`Mark's BMI ${markBMI2} is higher than John's ${johnBMI2}!`);
// } else {
//     console.log(`John's BMI ${johnBMI2} is higher than Mark's! ${markBMI2}`);
// }

//Type Conversion and Coercion

// const inputYear = "1991";
// console.log(Number(inputYear) + 18);
// console.log(Number("Jonas"));
// console.log(typeof NaN);

// console.log(String(23), 23);

// //type coercion
// console.log("I am " + 23 + " years old");
// console.log("23" - "10" - 3); // -  converts string to numbers
// console.log("23" + "10" + 3); // + converts numbers to strings

// let n = "1" + 1;
// n = n - 1;
// console.log(n);

//Truthy and Falsey

// console.log(Boolean(0));
// console.log(Boolean(undefined));
// console.log(Boolean("Jonas"));
// console.log(Boolean({}));
// console.log(Boolean(""));

// const money = 100;
// //js converts Number to Boolean here 0 is falsey
// if (money) {
//     console.log("Don't spend it all ;)");
// } else {
//     console.log("Yeah that sucks man");
// }

// let height;
// height = 0;
// if (height) {
//     console.log("Height is defined");
// } else {
//     console.log("Height is undefined");
// }

// Equality Operators == and ===

// const age = "18";
// if (age === 18) console.log("You just became an adult (strict)");
// if (age == 18) console.log("You just became an adult (loose)");

// const fav = Number(prompt("What's your favorite number?"));
// console.log(typeof fav);

// if (fav === 23) {
//     console.log("23 is cool");
// } else if (fav === 7) {
//     console.log("7 is cool too");
// } else {
//     console.log("lame number");
// }

// Logical Operators

// const hasDriversLicense = true;
// const hasGoodVision = true;

// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);
// console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) console.log("should drive");
// else console.log("should not drive");

// const isTired = true;
// console.log(hasDriversLicense && hasGoodVision && isTired);

// if (hasDriversLicense && hasGoodVision && !isTired) console.log("should drive");
// else console.log("should not drive");

// Coding Challange 3

//i did if a score of 100 exists lol
//good enough tho
// const dolphinsScore1 = 97;
// const koalasScore1 = 88;
// const dolphinsScore2 = 112;
// const koalasScore2 = 91;
// const dolphinsScore3 = 101;
// const koalasScore3 = 106;

// const dolphinsAvg = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
// const koalasAvg = (koalasScore1 + koalasScore2 + koalasScore3) / 3;
// console.log(dolphinsAvg, koalasAvg);

// if (
//     dolphinsAvg > koalasAvg &&
//     (dolphinsScore1 >= 100 || dolphinsScore2 >= 100 || dolphinsScore3 >= 100)
// )
//     console.log("dolphins win");
// else if (
//     koalasAvg > dolphinsAvg &&
//     (koalasScore1 >= 100 || koalasScore2 >= 100 || koalasScore3 >= 100)
// )
//     console.log("koalas win");
// else if (
//     (dolphinsScore1 >= 100 || dolphinsScore2 >= 100 || dolphinsScore3 >= 100) &&
//     (koalasScore1 >= 100 || koalasScore2 >= 100 || koalasScore3 >= 100)
// )
//     console.log("tie");
// else console.log("no contest");

// Switch
// const day = "e";
// switch (day) {
//     case "monday": // day === "monday"
//         console.log("Plan Course");
//         console.log("Go to coding meetup");
//         break;
//     case "tuesday":
//         console.log("prep theory");
//         break;
//     case "wednesday":
//     case "thursday": //same for both days
//         console.log("write code examples");
//         break;
//     case "friday":
//         console.log("record videos");
//         break;
//     case "saturday":
//     case "sunday":
//         console.log("Enjoy the weeked");
//         break;
//     default:
//         console.log("not a valid day");
// }

// if (day === "monday") console.log("Plan Course\nGo to coding meetup");
// else if (day === "tuesday") console.log("prep theory");
// else if (day === "wednesday" || day === "thursday")
//     console.log("write code examples");
// else if (day === "friday") console.log("record videos");
// else if (day === "saturday" || day === "sunday")
//     console.log("Enjoy the weeked");
// else console.log("not a valid day");

//Statements and Expressions

//Ternary Op

// const age = 17;
// const drink = age >= 18 ? "wine 🍷" : "water 💧";
// console.log(drink);

// let drink2;
// if (age >= 18) drink2 = "wine";
// else drink2 = "water";
// console.log(drink2);

// console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 💧"}`);

// Coding Challange 4
const bill = 430;
const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
console.log(
    `The bill was $${bill}, the tip was $${tip}, and the total value $${
        bill + tip
    }`
);
