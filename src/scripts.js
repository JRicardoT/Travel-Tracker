// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here!!');

import { getAllData } from './api-calls';


// window.addEventListener('load', initializeData);

// const initializeData = () => {
  // const randomUserNum = Math.floor(Math.random() * 50);
  // getAllData()
  // .then(data => console.log(data));
// }