"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-05-27T17:01:17.194Z",
        "2020-07-11T23:36:17.929Z",
        "2020-07-12T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
};

const formatMovementDate = function (date, locale) {
    const daysPassed = (day1, day2) =>
        Math.abs(day2 - day1) / (1000 * 60 * 60 * 24);

    const days = daysPassed(date, new Date());

    if (days < 1) {
        const hours = days * 60;
        if (hours < 1) {
            const min = hours * 60;
            if (min < 1) {
                return "Seconds ago";
            }
            return `${min.toFixed(0)} minutes ago}`;
        }
        return `${hours.toFixed(0)} hours ago`;
    }
    return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = "";

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const date = new Date(acc.movementsDates[i]);

        const displayDate = formatMovementDate(date, acc.locale);

        const formattedmov = formatCur(mov, acc.locale, acc.currency);

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedmov}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${formatCur(
        acc.balance,
        acc.locale,
        acc.currency
    )}`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${`${formatCur(
        incomes,
        acc.locale,
        acc.currency
    )}`}`;

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${`${formatCur(
        Math.abs(out),
        acc.locale,
        acc.currency
    )}`}`;

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${`${formatCur(
        interest,
        acc.locale,
        acc.currency
    )}`}`;
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};
createUsernames(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
    let timeLeft = 1000 * 60 * 5; // 5 min

    const id = setInterval(() => {
        if (timeLeft === 0) {
            containerApp.style.opacity = 0;
            labelWelcome.textContent = "Log in to get started";
            clearInterval(id);
        }
        const displayStr = `${String(Math.floor(timeLeft / 1000 / 60)).padStart(
            2,
            0
        )}:${String((timeLeft / 1000) % 60).padStart(2, 0)}`;
        labelTimer.textContent = displayStr;
        timeLeft -= 1000;
        console.log(timeLeft);
    }, 1000);

    return id;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;
// Fake log in so we dont have to do it in dev
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );
    // console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        const now = new Date();
        const dateOpts = {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
        };
        const locale = navigator.language;
        labelDate.textContent = new Intl.DateTimeFormat(
            currentAccount.locale,
            dateOpts
        ).format(now);

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
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
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);
    }
});

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        setTimeout(function () {
            // Add movement
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());
            // Update UI
            updateUI(currentAccount);
        }, 2500);
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
        console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// Numbers
//  represented as floats

console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number("23"));
console.log(+"23"); // this is dumb just write Number

// string needs to start with a number
console.log(Number.parseInt("34fiodps"));
console.log(Number.parseFloat("2.4rem"));

console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(Number("20x")));
console.log(Number.isNaN(23 / 0)); // Infinity is a number in js

console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(Number("20x")));
console.log(Number.isFinite(23 / 0)); // Infinity is a number in js

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.max(5, 18, "23px", 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat("10px") ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
// console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor("23.9"));

console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));


// mod
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener("click", function () {
    [...document.querySelectorAll(".movements__row")].forEach(function (
        row,
        i
    ) {
        // 0, 2, 4, 6
        if (i % 2 === 0) row.style.backgroundColor = "orangered";
        // 0, 3, 6, 9
        if (i % 3 === 0) row.style.backgroundColor = "blue";
    });
});

// Numeric seperators

// 287,460,000,000
// you can use underscores as commas and it doens't affect number
const diameter = 287_460_000_000;

// Big int
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
// bigger is unsafe somtimes works sometimes doesnt
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// use n at the end for big int
console.log(483285904382905849032859480325n);


// Creating Dates
const now = new Date();
console.log(now);

console.log(new Date("Aug 02 2020 18:05:41"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // 2037 Nov 19th 15:23:05 GMT+0000
console.log(new Date(2037, 10, 31)); // nov 31st doesn't exist but JS corrects to Dec 1st

console.log(new Date(0)); // Jan 1st 1970 01:00:00, 0ms in unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //  days * hours * min * sec * milliseocond => days to ms

// Dates are Objects

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // year
console.log(future.getMonth()); // month
console.log(future.getDate()); // day
console.log(future.getDay()); // day of the week
console.log(future.getHours()); // hours
console.log(future.getMinutes()); // mins
console.log(future.getSeconds()); // seconds
console.log(future.toISOString());
console.log(future.getTime());

console.log(Date.now()); // gives us current time stamp

future.setFullYear(2040);
console.log(future);


// operations with dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(Number(future));

// console.log(daysPassed(new Date(), new Date(2022, 6, 23)));

// INTL Numbers

const num = 3210321.45;

const options = {
    style: "currency",
    currency: "EUR",
};

console.log("US:", new Intl.NumberFormat("en-US", options).format(num));
console.log("GER:", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria:", new Intl.NumberFormat("ar-SY", options).format(num));

// timers

// setTimeout
// all args after specified time will be passed into call back func
setTimeout(() => console.log("Here is your pizza!"), 1000);
console.log("waiting...");

setTimeout((food) => console.log(`Here is your ${food}!`), 3000, "pizza");
console.log("waiting...");

// setInterval
// clock
setInterval(() => {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, 0);
    const min = String(now.getMinutes()).padStart(2, 0);
    const sec = String(now.getSeconds()).padStart(2, 0);
    console.log(`${hour}:${min}:${sec}`);
}, 1000);
*/
