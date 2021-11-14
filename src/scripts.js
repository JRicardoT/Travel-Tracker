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
// ~~~~~~~~~ global variables ~~~~~~~~~
let allData;
let currentTraveler;
// ~~~~~~~~~ event listeners ~~~~~~~~~~
window.addEventListener('load', displayData);
searchButton.addEventListener('click', checkForm);

function displayData () {
  const randomUserNum = Math.floor(Math.random() * 50);
  getAllData()
    .then(data => {
      allData = data;
      // console.log(allData);
      intializeData(data, randomUserNum);
    });
}

// const createTraveler = () 

const intializeData = (data, randomId) => {
  const traveler = new Traveler(data[0][randomId], data[2], data[3]);
  currentTraveler = traveler;
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
