// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here!!');

import { getAllData } from './api-calls';
import Traveler from './Traveler';
import domUpdates from './dom-updates';

// ~~~~~~~~~ query selectors ~~~~~~~~~~
let searchButton = document.getElementById('searchButton');
let acceptButton = document.getElementById('acceptButton');
let cancelButton = document.getElementById('cancelButton');
let estimatedCost = document.getElementById('estimatedCost');
let userInputForm = document.getElementById('userInputForm');
// ~~~~~~~~~ global variables ~~~~~~~~~
let allData;
let currentTraveler;
// ~~~~~~~~~ event listeners ~~~~~~~~~~
window.addEventListener('load', displayData);
searchButton.addEventListener('click', checkForm);
acceptButton.addEventListener('click', acceptTripRequest);
cancelButton.addEventListener('click', renderForm)

function displayData () {
  const randomUserNum = Math.floor(Math.random() * 50);
  getAllData()
    .then(data => {
      allData = data;
      // console.log(data);
      intializeData(data, randomUserNum);
    });
}

// const createTraveler = () 

const intializeData = (data, randomId) => {
  const traveler = new Traveler(data[0][randomId], data[2], data[3]);
  currentTraveler = traveler;
  // console.log(currentTraveler);
  domUpdates.renderTravelerTrips(traveler);
  domUpdates.greetUser(traveler);
  domUpdates.displayAmountSpentYearly(traveler);
  domUpdates.addDestinationOptionsToDropdown(data[3])
}

function checkForm(event) {
  event.preventDefault();
  if (domUpdates.checkInputValidation()) {
    domUpdates.createNewTrip(allData, currentTraveler);
  }
}

function acceptTripRequest() {
  domUpdates.sendTripRequest(currentTraveler)
}

function renderForm() {
  domUpdates.hideResponse(estimatedCost, userInputForm)
  domUpdates.hide(acceptButton);
  domUpdates.hide(cancelButton);
  domUpdates.display(userInputForm);
}