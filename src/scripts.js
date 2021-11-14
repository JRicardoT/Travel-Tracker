// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here!!');

import { getAllData } from './api-calls';
import Traveler from './Traveler';

// ~~~~~~~~query selectors~~~~~
let tripCardsContainer = document.getElementById('tripCardsContainer');
let userGreeting = document.getElementById('userGreeting');
let totalSpent = document.getElementById('totalSpent');
let destinationDropdown = document.getElementById('destinationDropdown');
let startDateInput = document.getElementById('startDate');
let tripDurationIput = document.getElementById('tripDuration');
let numOfTravelersInput = document.getElementById('numberOfTravelers');
let errorMessage = document.getElementById('errorMessage');
let searchButton = document.getElementById('searchButton');
let userInputForm = document.getElementById('userInputForm');


window.addEventListener('load', displayData);
searchButton.addEventListener('click', checkForm);

function displayData () {
  const randomUserNum = Math.floor(Math.random() * 50);
  console.log(randomUserNum)
  getAllData()
    .then(data => {
      intializeData(data, randomUserNum);
    });
}

const intializeData = (data, randomId) => {
  const traveler = new Traveler(data[0][randomId], data[2], data[3]);
  renderTravelerTrips(traveler);
  greetUser(traveler);
  displayAmountSpentYearly(traveler);
  addDestinationOptionsToDropdown(data[3])
}

const renderTravelerTrips = (traveler) => {
  tripCardsContainer.innerHTML = '';
  traveler.trips.forEach(trip => {
    tripCardsContainer.innerHTML += `
    <article class="trip-card">
    <section class="destination-image-container">
      <img class="destination-image"src="${trip.destination.image}" alt="${trip.destination.alt}">
    </section>
    <section class="trip-info">
      <h4>${trip.destination.destination}</h4>
      <p>Date: ${trip.date}</p>
      <p>Travelers: ${trip.travelers}</p>
      <p>Duration: ${trip.duration}</p>
      <p>Cost: $${trip.calculateTripCost()}</p>
      <p>Status: ${trip.status}</p>
    </section>
  </article>`
  });
}

const greetUser = (traveler) => {
  const names = traveler.name.split(' ');
  const firstName = names[0];
  userGreeting.innerText = `Welcome ${firstName}!`;
}

const displayAmountSpentYearly = (traveler) => {
  totalSpent.innerText = `Total Amount Spent This Year: $${traveler.calculateTotalSpent()}`;
}

const addDestinationOptionsToDropdown = (destinations) => {
  destinations.forEach(destination => {
    destinationDropdown.add(new Option(destination.destination, destination.destination));
  })
}
