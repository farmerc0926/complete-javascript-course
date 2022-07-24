"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Display and calc functions

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = ""; // clears element

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i, arr) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__value">${mov}</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySumamry = function (acc) {
    const inc = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = inc;

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = Math.abs(out);

    //1.2%
    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((mov) => (mov * acc.interestRate) / 100)
        .filter((mov) => mov >= 1)
        .reduce((acc, mov) => acc + mov);
    labelSumInterest.textContent = interest;
};

const updateUI = function (acc) {
    displayMovements(acc.movements);
    calcDisplayBalance(acc);
    calcDisplaySumamry(acc);
};

const createUsernames = function (accounts) {
    for (const account of accounts) {
        account.username = account.owner
            .toLowerCase()
            .split(" ")
            .map((word) => word[0])
            .join("");
    }
};
createUsernames(accounts);

// Event Handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
    e.preventDefault(); // since button is in form default is to refresh page which we dont want
    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome Back ${
            currentAccount.owner.split(" ")[0]
        }!`;
        containerApp.style.opacity = 100;

        //clear inputs
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = "";
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
    }
    updateUI(currentAccount);
});

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= 0.1 * amount)
    ) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }
    inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

// Simple Array Methods
let arr = ["a", "b", "c", "d", "e"];

// .slice(start index, end index)
// works like string slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // gets last 2 elements
console.log(arr.slice(-1)); // last element
console.log(arr.slice(1, -2));
console.log(arr.slice()); // shallow copy
console.log([...arr]); // also shallow copy

// .splice(starting index, delete count)
// works like slice but mutates original array
// console.log(arr.splice(2));
arr.splice(-1); // remove last element of array
console.log(arr);
arr.splice(1, 2); // remove arr[1] and arr[2] elements
console.log(arr);

// .reverse()
// mutates original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse()); // same
console.log(arr2); // same

// arr1.concat(arr2)
// does not mutate
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// .join(seperator)
// does not mutate
console.log(letters.join(" - "));


// the .at() method
// also works on strings
const arr = [23, 11, 64];
console.log(arr[0]); // same
console.log(arr.at(0)); // same

console.log(arr[arr.length - 1]); // same
console.log(arr.at(-1)); // same


// arr.forEach(fn(item, index, array){}) method arrays
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements)
    console.log(
        `${movement > 0 ? "deposit" : "withdrawal"} ${Math.abs(movement)}`
    );

console.log("-------------- FOREACH ---------------");
movements.forEach(function (movement) {
    console.log(
        `${movement > 0 ? "deposit" : "withdrawal"} ${Math.abs(movement)}`
    );
});

// to get index
// for ([i, value] of x) {}
// forEach index
movements.forEach(function (movement, index, array) {
    console.log(
        `${index}: ${movement > 0 ? "deposit" : "withdrawal"} ${Math.abs(
            movement
        )}`
    );
});


// for each for maps and sets

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(currencies.values());
// value and key will have the same value bc sets don't have keys
// they just made it this way so forEach is consistant with params
currenciesUnique.forEach(function (value, key, set) {
    console.log(`${key}: ${value}`);
});


// Coding Challance 1

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];
const kate1 = [4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
    // 1
    // gross looking way
    // const scJulia = dogsJulia.slice();
    // better way
    const scJulia = [...dogsJulia];
    scJulia.splice(0, 1);
    console.log(scJulia);
    scJulia.splice(-2);
    console.log(scJulia);

    // 2
    // gross way
    // const combined = scJulia.concat(dogsKate);
    // nice way
    const combined = [...scJulia, ...dogsKate];
    console.log(combined);

    // 3
    // using forEach (gross)
    // combined.forEach(function (age, i, arr) {
    //     console.log(
    //         `Dog number ${i + 1} is an ${
    //             age >= 3 ? "adult" : "puppy"
    //         }, and is ${age} years old`
    //     );
    // });
    // using for of (not gross)
    for (const [i, age] of combined.entries()) {
        console.log(
            `Dog number ${i + 1} is an ${
                age >= 3 ? "adult" : "puppy"
            }, and is ${age} years old`
        );
    }
};

checkDogs(julia1, kate1);
checkDogs(julia2, kate2);


// data transformations: map, filter, reduce
// map
//      maps values from original arr to new arr using a callback function
// filter
//      filters values from original arr into new arr using a test condition
// reduce
//      reduces entire array into one value using a function

// arr.map()
const eurToUsa = 1.1;

// return value is what will be placed for current item in new arr
const movementsUsd = movements.map(function (mov, i, arr) {
    return mov * eurToUsa;
});
console.log(movements);
console.log(movementsUsd);

const movementsArrowUsd = movements.map((mov) => mov * eurToUsa);
console.log(movementsArrowUsd);

const movementsDescriptions = movements.map((mov, i) => {
    return `Movement ${i + 1}: You ${
        mov > 0 ? "deposited" : "withdrew"
    } ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);


// filters

const deposits = movements.filter(function (mov) {
    return mov > 0;
});

const arrowDeposits = movements.filter((mov) => mov > 0);
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter((mov) => mov <= 0);
console.log(withdrawals);



// reduce

console.log(movements);
// FIRST FUNCTION PARAM IS ACCUMULATOR
const balance = movements.reduce(function (acc, cur, i, arr) {
    console.log(`${i}: ${acc}`);
    return acc + cur;
}, 0); // the 0 is the inital value of acc
console.log(balance);

const arrowBalance = movements.reduce((acc, cur) => acc + cur, 0); // the 0 is the inital value of acc
console.log(arrowBalance);

// max value of movement arr
// use inital val in array because
// if we were doing min there can be negatives so don't want to start at 0
const max = movements.reduce(
    (acc, cur) => (cur > acc ? cur : acc),
    movements[0]
);
console.log(max);

// Coding Challange 2 
// ... and 3 i guess

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
    return ages
        .map((age) => (age <= 2 ? 2 * age : 16 + age * 4)) //1
        .filter((age) => age >= 18) //2
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0); // 3 and 4 note using arr for average
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// chaining

const eurToUsd = 1.1;

// Pipline
// you can log arr at each point for debugging
const totalDepositsUSD = movements
    .filter((mov, i, arr) => mov > 0)
    .map((mov, i, arr) => {
        // console.log(arr);
        return mov * eurToUsd;
    })
    .reduce((acc, mov, i, arr) => acc + mov, 0);
console.log(totalDepositsUSD);


// The find method
// call back function also needs a bool return (like filter)
// but it only returns first satisfying element
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// can find based on object prop
console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);


// some and every

//some
// passes if one element in array passes condition

// equality
console.log(movements);
console.log(movements.includes(-130));

// condition
const anyDeposits = movements.some((mov) => mov > 1500);
console.log(anyDeposits);

// every
// returns true if every element passes condition
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// Flat and Flat Map

// flat
// flattens array by removing nesting (only 1 level deep by default)
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2));

const totalBankSum = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, cur) => acc + cur);
console.log(totalBankSum);

// flat map

const totalBankSum1 = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, cur) => acc + cur);
console.log(totalBankSum1);



// sorting arrays

// mutates original arr
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

// sort method sorts as if numbers were strings
console.log(movements);
console.log(movements.sort());

movements.sort((a, b) => {
    // return < 0 A,B
    // return > 0 B,A
    return a > b ? 1 : -1;
});
console.log(movements);

// same thing
movements.sort((a, b) => {
    // return < 0 A,B
    // return > 0 B,A
    return a - b;
});
console.log(movements);


// more ways to fill arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// creates empty array of size 7
// cant call anything like map on empty array
// can call fill tho
const x = new Array(7);
console.log(x);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
// good for converting array like objects to arrays (to then use array methods)
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
console.log(movementsUI);

labelBalance.addEventListener("click", function () {
    const movementsUI = Array.from(
        document.querySelectorAll(".movements__value")
    );
    console.log(movementsUI.map((el) => Number(el.textContent)));
});



// Array Method Practice

//1
const totalBankDeposits = accounts
    .flatMap((acc) => acc.movements)
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
console.log(totalBankDeposits);

//2
const numDeposit1000 = accounts
    .flatMap((acc) => acc.movements)
    // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
    .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposit1000);

// ++a returns old a + 1
// a++ returns old a (but still adds one to a)

//3
// obj contains sum of deposits and withdraws
const sums = accounts
    .flatMap((acc) => acc.movements)
    .reduce(
        (acc, cur) => {
            cur > 0
                ? (acc.deposits += cur)
                : (acc.withdrawals += Math.abs(cur));
            return acc;
        },
        { deposits: 0, withdrawals: 0 }
    );
console.log(sums);

//4
// this is  a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
    const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with"];
    return title
        .toLowerCase()
        .split(" ")
        .map((word) =>
            exceptions.includes(word)
                ? word
                : word[0].toUpperCase() + word.slice(1)
        )
        .join(" ");
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
*/
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
    { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
    { weight: 8, curFood: 200, owners: ["Matilda"] },
    { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
    { weight: 32, curFood: 340, owners: ["Michael"] },
];

//1
for (const dog of dogs)
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
console.log(dogs);

//2
const sarahsDog = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(
    sarahsDog.curFood > sarahsDog.recommendedFood * 0.9 &&
        sarahsDog.curFood < sarahsDog.recommendedFood * 1.1
        ? "Eating recommended!"
        : "Not eating recommended!"
);

//3
const ownersEatTooMuch = dogs
    .filter((dog) => dog.curFood > dog.recommendedFood * 1.1)
    .flatMap((dog) => dog.owners);
const ownersEatTooLittle = dogs
    .filter((dog) => dog.curFood < dog.recommendedFood * 0.9)
    .flatMap((dog) => dog.owners);
// console.log(ownersEatTooMuch, ownersEatTooLitte);

//4
console.log(`${ownersEatTooMuch.join(" and ")} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")} dogs eat too little!`);

//5
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

//6
console.log(
    dogs.some(
        (dog) =>
            dog.curFood > dog.recommendedFood * 0.9 &&
            dog.curFood < dog.recommendedFood * 1.1
    )
);

//7
const dogsEatingOk = dogs.filter(
    (dog) =>
        dog.curFood > dog.recommendedFood * 0.9 &&
        dog.curFood < dog.recommendedFood * 1.1
);
console.log(dogsEatingOk);

//8
const sortedDogs = dogs
    .slice()
    .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
