"use strict";

/*
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const usa = describeCountry("USA", 350, "DC");
const canada = describeCountry("Canada", 100, "Ottawa"); // how many people are in canada? i have no idea
const uk = describeCountry("UK", 20, "London"); //again no idea
console.log(usa, "\n", canada, "\n", uk);

function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

console.log("china: ", percentageOfWorld1(1441));

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
};
console.log("china: ", percentageOfWorld2(1441));

const percentageOfWorld3 = (population) => (population / 7900) * 100;
console.log("china: ", percentageOfWorld3(1441));

function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(
        population
    )}% of the world.`;
}
console.log(describePopulation("china", 1441));

const populations = [350, 100, 20, 1441];
console.log(populations.length === 4);

const percentages = [];
for (let i = 0; i < populations.length; i++) {
    percentages.push(percentageOfWorld1(populations[i]));
}
console.log(percentages);

const neighbors = ["Canada", "Mexico"];
neighbors.push("Utopia");
neighbors.pop();
if (!neighbors.includes("Germany")) console.log("Probably not central europe");
neighbors[neighbors.indexOf("Canada")] = "OH CANADA";
console.log(neighbors);

const myCountry = {
    country: "USA",
    capital: "DC",
    population: 35,
    language: "English",
    neighbors: ["Canada", "Mexico"],
    describe: function () {
        return `${this.country} has ${this.population} million ${this.language} speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}`;
    },

    checkIsland: function () {
        if (this.neighbors.length === 0) this.isIsland = true;
        else this.isIsland = false;
    },
};
myCountry.checkIsland();
console.log(myCountry);

console.log(
    `${myCountry.country} has ${myCountry.population} million ${myCountry.language} speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}`
);

myCountry.population += 2;
console.log(myCountry.population);
myCountry["population"] -= 2;
console.log(myCountry.population);

console.log(myCountry.describe());

for (let i = 0; i < 50; i++) {
    console.log(`Voter number ${i + 1} is voting`);
}
*/
