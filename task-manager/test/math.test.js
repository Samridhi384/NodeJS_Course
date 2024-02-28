const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

// test("Should calculate total tip", () => {
//   const total = calculateTip(10, 0.3);
//   expect(total).toBe(13);

//   // if (total !== 13) {
//   //   throw new Error(`Total should be 13 but you got ${total}`);
//   // }
// });

// test("Should calculate total with default tip", () => {
//   const total = calculateTip(10);
//   expect(total).toBe(12.5);
// });

// test("Should convert fahrenheit To Celsius", () => {
//   const temp = fahrenheitToCelsius(32);
//   expect(temp).toBe(0);
// });

// test("Should convert celsius  To Fahrenheit", () => {
//   const temp = celsiusToFahrenheit(0);
//   expect(temp).toBe(32);
// });

// // test("Async test done", (done) => {
// //   setTimeout(() => {
// //     expect(1).toBe(2);
// //     done();
// //   }, 2000);
// // });

// test("should add two numbers", (done) => {
//   add(2, 3).then((sum) => {
//     expect(sum).toBe(5);
//     done();
//   });
// });

test("should add two numbers with async/await", async () => {
  const sum = await add(2, 3);
  expect(sum).toBe(5);
});
// test("hello world", () => {});

// // test("this  is a failing test", () => {
// //   throw new Error("failure");
// // });

// //why test ?
// //- to ensure code works as expected
// //Saves time
// //Creates reliable software
// //Gives flexibility to developers
// // Refactoring
// //Collaborating
// // Profiling
// //Peace of mind
