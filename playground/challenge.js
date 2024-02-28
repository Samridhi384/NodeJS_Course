// const fs = require("fs");

// const dataBuffer = fs.readFileSync("01-json.json");
// const dataString = dataBuffer.toString();
// const data = JSON.parse(dataString);

// data.name = "sammy";
// data.age = 24;

// const newDataString = JSON.stringify(data);

// fs.writeFileSync("01-json.json", newDataString);

//callback challenge

const sum = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

sum(1, 5, (add) => {
  console.log(add); //output : 6
});
