const fs = require("fs");

const book = {
  title: "Kittie the Cutie",
  author: "Kitkat",
};

const bookJSON = JSON.stringify(book);

// console.log(bookJSON.title); //undefined
// const parsedBook = JSON.parse(bookJSON);
// console.log(parsedBook.title); // Kittie the Cutie

fs.writeFileSync("01-json.json", bookJSON);

const dataBuffer = fs.readFileSync("01-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

console.log(data);
