//object property shorthand

const name = "siya";
const userAge = 25;

const user = {
  name,
  age: userAge, //only age like name will give error
  location: "Surat",
};

console.log(user);

//Object destructuring

const product = {
  label: "Redbook",
  price: "122$",
  stock: 201,
  salesPrice: "!25$",
};

// const label = product.label;
// const stock = products.stock

// const { label: priceLabel, stock, rating = 5 } = product;
// console.log(priceLabel, "\n", stock, "\n", rating);

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock);
};

transaction("order");
