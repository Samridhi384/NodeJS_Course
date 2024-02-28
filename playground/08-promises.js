// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([7, 4, 1]);
//     reject("error");
//   }, 2000);
// });

// doWorkPromise
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));

//promise -> pending   = fulfilled / rejected

//callbacks vs promises

//Callbacks are a great approach to dealing with something once another task has been finished. Here, “something” refers to the execution of a function. Callbacks can be utilized if we wish to run a function immediately following the return of another function.

// To manage asynchronous actions in JavaScript, promises are used. It is an assurance that something will be done. The promise is used to keep track of whether the asynchronous event has been executed or not and determines what happens after the event has occurred.

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(2, 5)
//   .then((sum) => {
//     console.log(sum);

//     add(sum, 3)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((e) => console.log(e));
//   })
//   .catch((e) => console.log(e));

add(1, 2)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => console.log(e));
