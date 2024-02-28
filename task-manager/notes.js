//for middleware

// app.use((req, res, next) => {
//   // console.log(req.method, req.path);
//   if (req.method === "GET") {
//     res.send("Get requests are disabled");
//   } else next();
// });

// app.use((req, res, next) => {
//   res.status(503).send("Under Maintainenance ");
// });

// const bcrypt = require("bcryptjs");

// const myFunc = async () => {
//   const password = "12344332";
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare("12344332", hashedPassword);
//   console.log(isMatch);
// };

// myFunc();

// const jwt = require("jsonwebtoken");

// const myFun2 = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days", // 0 sec error,
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFun2();

//token has 3 parts:
// Header
// The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

// Payload
// The second part of the token is the payload, which contains the claims.Claims are statements about an entity(typically, the user) and additional data.

// signature

//without middleware = new request -> run route handler
//with middleware = new request ->  do something -> run route handler

//The toJSON method in JavaScript is used to customize the JSON serialization behavior of an object. When an object with a toJSON method is passed to JSON.stringify, the toJSON method is called and its return value is stringified instead of the object itself.

const pet = {
  name: "kitty",
};

pet.toJSON = function () {
  console.log(this);
  //   return this;
  return {};
};
console.log(JSON.stringify(pet));

// to get image from binary data in jsbin
//  <img src = "data:image/jpg;base64,
// /9j/4AAQSkZJRg etc...
