"use strict";

// for coding challanges
const game = {
    team1: "Bayern Munich",
    team2: "Borrussia Dortmund",
    players: [
        [
            "Neuer",
            "Pavard",
            "Martinez",
            "Alaba",
            "Davies",
            "Kimmich",
            "Goretzka",
            "Coman",
            "Muller",
            "Gnarby",
            "Lewandowski",
        ],
        [
            "Burki",
            "Schulz",
            "Hummels",
            "Akanji",
            "Hakimi",
            "Weigl",
            "Witsel",
            "Hazard",
            "Brandt",
            "Sancho",
            "Gotze",
        ],
    ],
    score: "4:0",
    scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
    date: "Nov 9th, 2037",
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

const gameEvents = new Map([
    [17, "⚽️ GOAL"],
    [36, "🔁 Substitution"],
    [47, "⚽️ GOAL"],
    [61, "🔁 Substitution"],
    [64, "🔶 Yellow card"],
    [69, "🔴 Red card"],
    [70, "🔁 Substitution"],
    [72, "🔁 Substitution"],
    [76, "⚽️ GOAL"],
    [80, "⚽️ GOAL"],
    [92, "🔶 Yellow card"],
]);

// Data needed for a later exercise
const flights =
    "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
    [weekdays[4]]: {
        // can compute property names ^
        open: 12,
        close: 22,
    },
    [weekdays[5]]: {
        open: 11,
        close: 23,
    },
    [weekdays[6]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
    starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
    mainMenu: ["Pizza", "Pasta", "Risotto"],

    // openingHours: openingHours,
    openingHours, // es6 way

    // es6 way of method delcarations
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    // older way
    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = "20:00",
        address,
    }) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
        );
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Ingredients: ${ing1}, ${ing2}, ${ing3}`);
    },

    orderPizza: function (mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
    },
};

// another string challange

const parseFlight = function (fltStr) {
    const fltArr = fltStr.split(";");
    const status = fltArr[0].slice(1).replaceAll("_", " ");
    const from = fltArr[1].slice(0, 3).toUpperCase();
    const to = fltArr[2].slice(0, 3).toUpperCase();
    const time = fltArr[3].replace(":", "h");

    return `${
        status.startsWith("Delayed") ? "🔴" : ""
    }${status} from ${from} to ${to} (${time})`;
};

const rawFlights = flights.split("+");
const readableFlights = [];
let maxLength = 0;
for (const flight of rawFlights) {
    readableFlights.push(parseFlight(flight));
    readableFlights[readableFlights.length - 1].length < maxLength ||
        (maxLength = readableFlights[readableFlights.length - 1].length);
}

for (const flight of readableFlights) {
    console.log(flight.padStart(maxLength));
}

/*

// Coding Challange 4

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const buttonEl = document.querySelector("button");

buttonEl.addEventListener("click", function () {
    //get text
    const text = document.querySelector("textarea").value;

    const vars = text.split("\n");
    const camelCaseVars = [];

    for (const v of vars) {
        // remove white space and cases
        const words = v.trim().toLowerCase().split("_");

        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].replace(words[i][0], words[i][0].toUpperCase());
        }
        camelCaseVars.push(words.join(""));
    }
    document.querySelector("textarea").value = camelCaseVars.join("\n");
});



// strings pt3

// split and join
const arr = "a very nice string".split(" ");
console.log(arr);

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

const newName = ["Mr.", firstName, lastName].join(" ");
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(" ");

    let capNames = [];
    for (const n of names) {
        // capNames.push(n[0].toUpperCase() + n.slice(1).toLowerCase());
        capNames.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(capNames.join(" "));
};

capitalizeName("jessica ann smith davis");
capitalizeName("jonas schmentman");

// padding
const message = "Go to gate 23!";
// will make string a certain length
console.log(message.padStart(25, "+").padEnd(35, "+"));
console.log("Jonas".padStart(25, "+").padEnd(35, "+"));

const maskCreditCard = function (number) {
    const str = number + ""; // another way to convert number to string
    const lastFour = str.slice(-4);
    return lastFour.padStart(str.length, "*");
};

console.log(maskCreditCard(58490389594039543));
console.log(maskCreditCard("58490389594039543"));
console.log(maskCreditCard(34432432935094990600005));

// repeat
const message2 = "Bad weather ... All departures delayed";
console.log(message2.repeat(5));

const planesInLine = function (n) {
    console.log(`There are ${n} planes in line ${"✈".repeat(n)}`);
};

planesInLine(5);
planesInLine(8);



// strings pt2

const airline = "TAP Air Portugal";

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalization in name
const passenger = "jOnAs";
const passengerLower = passenger.toLocaleLowerCase();
const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

// comparing email
// loginEmail is still correct barring whitespace and case
const email = "hello@jonas.io";
const loginEmail = "   Hello@jonas.io \n";

console.log(email === loginEmail.toLowerCase().trim());

// replacing

const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
    "All passangers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate")); // only replaces first instance
console.log(announcement.replaceAll("door", "gate"));
console.log(announcement.replace(/door/g, "gate")); //using regex

// Boolean returning methods

const plane = "A320neo";
console.log(plane.includes("A320"));
console.log(plane.includes("Boeing"));
console.log(plane.startsWith("A320"));
console.log(plane.startsWith("3"));

if (plane.startsWith("A") && plane.endsWith("neo"))
    console.log("Part of new Airbus family");

// practice exercise
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();
    if (baggage.includes("knife") || baggage.includes("gun"))
        console.log("You are not allowed");
    else console.log("You are allowed ");
};
checkBaggage("I have a laptop, some food and a pocket KniFe");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");



// Strings pt 1

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r")); // get first instance
console.log(airline.lastIndexOf("r")); // gets last instance
console.log(airline.indexOf("portugal")); // -1 when can't be found

console.log(airline.slice(4)); // starts at index given and ends at end of string
console.log(airline.slice(4, 7)); // can also specify end index [start, end)

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2)); // - means start at end so 2 back from end
console.log(airline.slice(1, -1));

// if string contains b or e it is middle seat
const checkMiddleSeat = function (seat) {
    //my implementation
    // return seat.includes("B") || seat.includes("E");

    //another way
    const s = seat.slice(-1);
    if (s === "B" || s === "E") return true;
    return false;
};

console.log(checkMiddleSeat("11B"));
console.log(checkMiddleSeat("11C"));
console.log(checkMiddleSeat("3E"));

// Boxing
// this is when js takes a string primative and turns it into a string object
// this is what happens when we call a method on a string -> then it returns a primative



// coding challange 3

//1
const uniqueEvents = [...new Set(gameEvents.values())];
console.log(uniqueEvents);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
    `An event happened on average every ${90 / gameEvents.size} minutes`
);

//4
for (const [k, v] of gameEvents)
    console.log(`${k < 45 ? "[FIRST HALF]" : "[SECOND HALF]"} ${k}: ${v}`);

// Deciding what data structure to use
// simple list? Array or Set. Key Value pairs? Object or Map.
// Arrays vs Sets
// Arrays
//      use when you need ordered list of values
//      when you need to manipulate data
// Sets
//      when you need only unique values
//      high-performance
//      remove dupes from array
//
// Object vs Map
// Object
//      more traditional key/value
//      eaiser to write and access values with . and []
// Maps
//      Better performance
//      keys can have any data type
//      easy to iterate
//      easy to compute size



// More maps

const question = new Map([
    ["key", "value"],
    ["question", "What is the best language in the world?"],
    [1, "C"],
    [2, "Java"],
    [3, "Javascript"],
    ["correct", 3],
    [true, "correct 🎉"],
    [false, "try again!"],
]);

console.log(question); //same data structure
console.log(Object.entries(openingHours)); //same data structure
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz Map

console.log(question.get("question"));
for (const [key, value] of question) {
    if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt("Your answer"));
// console.log(question.get(answer === question.get("correct")));

//convert map back to array
console.log([...question]); // back to original question data structure
// console.log(question.entries());
console.log(...question.keys());
console.log(...question.values());


// Maps

// maps map values to keys
// keys can be ANY type

const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal")); // calling set also returns updated map

rest.set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
    .set("open", 11)
    .set("close", 23)
    .set(true, "We are open :)")
    .set(false, "We are closed :(");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
// rest.clear();
const arr1 = [1, 2];
rest.set([1, 2], "Test");
rest.set(arr1, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);

console.log(rest.get([1, 2])); // does not retrive test bc arrays are not the same
// they do not have the same address stored in the call stack and are no the same in the heap
console.log(rest.get(arr1)); // works bc it is the same array

// Sets

const ordersSet = new Set([
    "Pasta",
    "Pizza",
    "Pizza",
    "Risotto",
    "Pasta",
    "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Jonas"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
ordersSet.delete("Risotto");
// ordersSet.clear(); // removes all items
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// ex: remove dupes in array

const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
    new Set(["waiter", "chef", "waiter", "manager", "chef", "waiter"]).size
);

// sets have no indexing



// Coding Challange #2

//1
for (const [i, scorer] of game.scored.entries())
    console.log(`Goal ${i + 1}: ${scorer}`);

//2
let sum = 0;
for (const odd of Object.values(game.odds)) {
    sum += odd;
}
console.log(sum / Object.values(game.odds).length);

//3
for (const [k, v] of Object.entries(game.odds)) {
    console.log(`Odds of ${game[k] || "draw"}: ${v}`);
}

//bonus
const scorers = {};
for (const scorer of game.scored) {
    scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers);



// more looping
scorers[player] ? scorers[player]++ : (scorers[player] = 1
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
    openStr += day;
}

const values = Object.values(openingHours);
console.log(values);

for (const [key, value] of Object.entries(openingHours)) {
    console.log(key, value);
}


//optional chaining

if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? "closed";
    console.log(`On ${day} we open at ${open}`);
}

// methods can be used with optional chaining
console.log(restaurant.order?.(0, 1) ?? "method dne");
console.log(restaurant.orderRisotto?.(0, 1) ?? "method dne");

// arrays
const users = [
    {
        name: "jonas",
        email: "hello@jonas.io",
    },
];

console.log(users[0]?.name ?? "User array empty");

// object literals


// for of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
    console.log(item);
}

// what if we want index?
for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}. ${el}`);
}


// Coding Challange 1

//1
const [players1, players2] = game.players;
console.log(players1, players2);
//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//4
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);
//5
const { team1, x: draw, team2 } = { ...game.odds };
//can also do this
// const {
//     odds: { team1, x: draw, team2 },
// } = game;
console.log(team1, draw, team2);
//6
function printGoals(...names) {
    console.log(names, names.length);
}
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);
//7
// lower value is better
team1 < team2 && console.log("Team1 better odds");
team1 > team2 && console.log("Team2 better odds");


const rest1 = {
    name: "Capri",
    numGuests: 0,
};

const rest2 = {
    name: "La Piazza",
    owner: "Giovanni Rossi",
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// OR assignement operator, assigns value if falsey
// rest1.numGuests ||= 10;
// rest1.numGuests ||= 10;

// Nullish assignment operator, assigns value if null or undefined
rest2.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// will continue down the line until falsey value
// rest1.owner = rest1.owner && "<ANONYMOUS>";
// rest2.owner = rest2.owner && "<ANONYMOUS>";

// assign value to variable if it is currently truthy
rest1.owner &&= "<ANON>";
rest2.owner &&= "<ANON>";

console.log(rest1);
console.log(rest2);


// nullish coalesing op
// nullish just means null and undefined
// everything else is evaled as true
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// saves 0 value
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);


// && and ||
// use any data type, return any data tye, short-circut eval
// short circuting for or means if first value is truthy or will return that
// will also return first truthy value in the chain
console.log("-------------- OR ---------------");
console.log(3 || "Jonas"); // 3
console.log("" || "Jonas"); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || "" || "Hello" || 23 || null); // Hello

//restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// cool way to set default val
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log("-------------- AND -----------------");
// && will short circut for first falsey value
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // 7
console.log("Hello" && 23 && null && "Jonas"); // null

if (restaurant.orderPizza) {
    restaurant.orderPizza("mushrooms", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

// Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//spread operator unpacks all values in the array in order
const newArr = [1, 2, ...arr];
console.log(newArr);

// 1, 2, 7, 8, 9
console.log(...newArr);

// can only use spread operator where you would put comma seperated values
const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

//shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// iterables: arrays, strings, maps, sets
// can use spread op on iterables

const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...letters);

// const ingredients = [
//     prompt("Let's make Pasta! Ingredient 1?"),
//     prompt("2?"),
//     prompt("3?"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = {
    ...restaurant,
    founder: "Guiseppe",
};
console.log(newRestaurant);

// good way to make shallow copys

const newNewRestaurant = { ...newRestaurant };

// Rest Operator (same syntax as spread but on left side of assignment)

// Destructuring
const [a, b, ...c] = [1, 2, 3, 4, 5];
console.log(a, b, c);

// rest operator gets all elements AFTER it's position
// ex: does not get skipped elements and must be last
const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// also works on objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Rest op can also be used for accepted n parameters

const add = function (...numbers) {
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    console.log(sum);
    return sum;
};

add(2, 3);
add(2, 3, 6, 7, 8);
add(2, 3, 5, 5, 7, 8, 7);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");


restaurant.orderDelivery({
    time: "22:30",
    address: "Via del Sole, 21",
    mainIndex: 2,
    starterIndex: 2,
});

restaurant.orderDelivery({
    address: "Via del Sole, 21",
    starterIndex: 2,
});

// Destructuring Objects

//just need to write prop names
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//can give new names
const {
    name: restaurantName,
    openingHours: hours,
    categories: tags,
} = restaurant;
console.log(name, hours, tags);

//default
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables
let a = 11;
let b = 99;
const obj = { d: 23, e: 7, f: 14 };
//have to wrap in parantheses
({ d: a, e: b } = obj);
console.log(a, b);

// nested obj
const {
    fri: { open, close },
} = openingHours;
console.log(open, close);


DESTRUCTURING ARRAYS
// without destructuring
const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

//destructuring into x, y, z
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching Varialbes
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

//receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [first, , third] = nested;
// console.log(first, third);
const [two, , [five, six]] = nested;
console.log(two, five, six);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
