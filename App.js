/*

Basic app using callbacks, promises and async/await 

*/

// Require fetch (npm package - node-fetch)
const fetch = require('node-fetch');

// ** Promise ** first promise (promise1) 
var promise1 = new Promise(function (resolve, reject) {

  // use a setTimeout function to delay the calling of the function 
  setTimeout(function () {

    /* "resolve" by calling the fetchUsers ASYNC/AWAIT function which is calling the jsonplaceholder API */
    resolve(fetchUsers('https://jsonplaceholder.typicode.com/todos')
      // API data is received
      .then(data => {
        // and using the map method we obtain user's id and console.log it 
        console.log(data.map(user => user.id));
      }));
  }, 3000); // "3000" = 3 seconds // setTimeout is set for 3 seconds 
});

// ** ASYNC/AWAIT function ** // the parameter "endpoint" is the API 
async function fetchUsers(endpoint) {
  // waiting for the content from API - and placing it in a const named 'res' 
  const res = await fetch(endpoint);
  /* When the fetch is successful, we read and parse the data using json() and place it in a const named 'data' */
  const data = await res.json();
  // we return the data const 
  return data;
}

// regular function declaration named "movingForward" // with a callback paramater 
function movingFoward(callback) {
  /* this function is demonstrating synchronous to asynchronous operation of not only this function but also JavaScript */
  // console.logging the beginning of the function. We named it "let's start".
  console.log('let\'s start');
  // calling the ASYNC/AWAIT function fetchUsers and it makes an API call 
  fetchUsers('https://jsonplaceholder.typicode.com/users')
    // API data is received 
    .then(data => {
      // and using the map method we obtain user's email and console.log it 
      console.log(data.map(user => user.email));
      // console.logging "here" to show the location of the process at this time
      console.log('here');
      // console.logging "there" to show the location of the process at this time
      console.log('there');
      // the callback function is called 
      callback();
    });
}

// calling the movingForward function, and adding my callback function 
movingFoward(function () {
  // console.logging - this function being passed in (for training purposes)
  console.log('I\'m a function passed in as a callback');
  /* while in this function / we call 'again' the ASYNC/AWAIT function fetchUsers and make another placeholder API call */
  fetchUsers('https://jsonplaceholder.typicode.com/comments')
    // API data is received 
    .then(data => {
      // and using the map method we obtain comments' body and console.log it 
      console.log(data.map(comments => comments.body));
    });
  /* while in this function // we call 'yet again' the ASYNC/AWAIT function fetchUsers and make yet another placeholder API call */
  fetchUsers('https://jsonplaceholder.typicode.com/todos')
    // API data is received 
    .then(data => {
      // and using the map method we obtain todos' title and console.log it 
      console.log(data.map(todos => todos.title));
    });
  // while in this function, we call promise1 
  promise1.then(function (value) {
    // console logging the resolve msg or results with a parameter named "value"
    console.log(value);
  });
});