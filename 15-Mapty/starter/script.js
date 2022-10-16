"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  // should use a library to make ids
  id = (Date.now() + "").slice(-10);

  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance;
    this.duration = duration;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// APP ARCHITECTURE ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));

    this._loadLocalStorage();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // need to bind to this or else function call will have this = undefined
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));

    this.#workouts.forEach((workout) => this._renderWorkoutMarker(workout));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    inputType.value = "running";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest("div").classList.toggle("form__row--hidden");
    inputCadence.closest("div").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    // returns true if all inputs are valid numbers
    const validateInputs = (...inputs) =>
      inputs.every((input) => Number.isFinite(input));

    // returns true is all inputs are positive
    const checkPositive = (...inputs) => inputs.every((input) => input > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout;
    // Check if data is valid

    // If running
    if (type === "running") {
      const cadence = +inputCadence.value;

      // validate data
      if (
        !validateInputs(distance, duration, cadence) ||
        !checkPositive(distance, duration, cadence)
      )
        return alert("Inputs have to be positive numbers!");

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If cycling
    if (type === "cycling") {
      const elevationGain = +inputElevation.value;

      // validate data
      if (
        !validateInputs(distance, duration, elevationGain) ||
        !checkPositive(distance, duration)
      )
        return alert("Inputs have to be positive numbers!");

      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    // Add to workout array
    this.#workouts.push(workout);

    // Redner workout on map as marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkout(workout);

    // Clear empty fields
    this._hideForm();

    // set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `
        ${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}
        ${workout.type.slice(0, 1).toUpperCase() + workout.type.slice(1)}
        on ${months[workout.date.getMonth()]}
        ${workout.date.getDate()}
        `
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    const html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">
          ${workout.type.slice(0, 1).toUpperCase() + workout.type.slice(1)}
          on ${months[workout.date.getMonth()]}
          ${workout.date.getDate()}
        </h2>
        <div class="workout__details">
          <span class="workout__icon">
            ${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}
          </span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">
            ${workout.type === "running" ? workout.pace : workout.speed}
          </span>
          <span class="workout__unit">
            ${workout.type === "running" ? "min/km" : "km/h"}
          </span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">
            ${workout.type === "running" ? "🦶🏼" : "⛰"}
          </span>
          <span class="workout__value">
            ${
              workout.type === "running"
                ? workout.cadence
                : workout.elevationGain
            }
          </span>
          <span class="workout__unit">
            ${workout.type === "running" ? "spm" : "m"}
          </span>
        </div>
      </li>
    `;

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");

    if (workoutEl) {
      const workout = this.#workouts.find(
        (work) => work.id === workoutEl.dataset.id
      );

      this.#map.setView(workout.coords, this.#mapZoomLevel, {
        animate: true,
        pan: {
          duration: 1,
        },
      });

      // workout.click();
    }
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  _loadLocalStorage() {
    this.#workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    this.#workouts.forEach((workout) => {
      // date read in as String from JSON parse and we use dateObj.getMonth, etc later
      workout.date = new Date(workout.date);

      this._renderWorkout(workout);
    });
  }

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();
