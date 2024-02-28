// //A callback function is nothing more than a function we provide as an argument to another function with the intention of having it called later on.

// setTimeout(() => {
//   console.log("Time-out in 2 sec");
// }, 2000);

// const arr = ["a", "b", "c"];

// const vowel = arr.filter((i) => i === "a");
// console.log(vowel); // Output: ['a']
// //function called inside another function

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       lat: 0,
//       lon: 0,
//     };

//     //instead of return
//     callback(data);
//   }, 2000);
// };

// geoCode("surat", (data) => {
//   console.log(data);
// });

//

const doWorkCallback = (callback) => {
  setTimeout(() => {
    // callback("error", undefined);
    callback(undefined, [1, 4, 7]);
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) console.log(error);

  console.log(result);
});
