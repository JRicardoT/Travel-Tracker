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
let backButton = document.getElementById('backButton');
let pendingTripsButton = document.getElementById('pendingTripsButton');
let allTripsButton = document.getElementById('allTripsButton');
// ~~~~~~~~~~~~login~~~~~~~~~~
let loginForm = document.getElementById('loginForm');
let userNameInput = document.getElementById('userName');
let passwordInput = document.getElementById('password');
let loginButton = document.getElementById('loginButton');
let loginErrorMessage = document.getElementById('loginErrorMessage');
let loginTitle = document.getElementById('loginTitle');
let tripInputContainer = document.getElementById('tripInputContainer');
let tripSelectorContainer = document.getElementById('tripSelectorContainer');

// ~~~~~~~~~ global variables ~~~~~~~~~
let allData;
let currentTraveler;
// ~~~~~~~~~ event listeners ~~~~~~~~~~
window.addEventListener('load', getData);
searchButton.addEventListener('click', checkForm);
acceptButton.addEventListener('click', acceptTripRequest);
cancelButton.addEventListener('click', renderForm);
backButton.addEventListener('click', renderForm);
pendingTripsButton.addEventListener('click', displayPendingTrips);
allTripsButton.addEventListener('click', displayAllTrips);
loginButton.addEventListener('click', checkLoginInfo);

function checkLoginInfo(event) {
  event.preventDefault();
  getData();
  const id = parseInt(userNameInput.value.slice(8));
  if (checkLoginInputsAreFilled() && validateUserName() && validatePassword()) {
    createTraveler(id);
    domUpdates.hide(loginTitle);
    domUpdates.hide(loginForm);
    domUpdates.display(tripInputContainer);
    domUpdates.display(tripSelectorContainer);
    intializeData();
  }
}

const createTraveler = (id) => {
  currentTraveler = new Traveler(allData[0][id - 1], allData[2], allData[3]);
  console.log(currentTraveler)
}

const checkLoginInputsAreFilled = () => {
  if (!userNameInput.value || !passwordInput) {
    loginErrorMessage.innerText = 'Please Fill Out All Sections!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true;
  }
}

const validateUserName = () => {
  if (userNameInput.value.length < 9 || userNameInput.value.length > 10 || !userNameInput.value.includes('traveler')) {
    loginErrorMessage.innerText = 'Invalid Username!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true
  }
}

const validatePassword = () => {
  if (passwordInput.value !== 'traveler') {
    loginErrorMessage.innerText = 'The Password Was Wrong. Please Try Again!';
    domUpdates.display(loginErrorMessage);
    setTimeout(() => {
      domUpdates.hideResponse(loginErrorMessage, loginForm);
    }, 2000);
  } else {
    return true
  }
}

function getData () {
  getAllData()
    .then(data => {
      allData = data;
    });
}

const intializeData = () => {
  domUpdates.renderTravelerTrips(currentTraveler.trips);
  domUpdates.greetUser(currentTraveler);
  domUpdates.displayAmountSpentYearly(currentTraveler);
  domUpdates.addDestinationOptionsToDropdown(allData[3])
}

function checkForm(event) {
  event.preventDefault();
  if (domUpdates.checkInputValidation()) {
    domUpdates.createNewTrip(allData, currentTraveler);
  }
}

function acceptTripRequest() {
  domUpdates.sendTripRequest(currentTraveler);
  domUpdates.renderTravelerTrips(currentTraveler.trips);
  domUpdates.hide(cancelButton);
  domUpdates.hide(acceptButton);
  domUpdates.display(backButton);
}

function renderForm() {
  domUpdates.hideResponse(estimatedCost, userInputForm)
  domUpdates.hide(acceptButton);
  domUpdates.hide(backButton);
  domUpdates.hide(cancelButton);
  domUpdates.display(userInputForm);
}

function displayPendingTrips() {
  domUpdates.changeToPendingTrips(currentTraveler);
}

function displayAllTrips() {
  domUpdates.renderTravelerTrips(currentTraveler.trips);
}