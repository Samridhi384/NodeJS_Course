const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        reject("Values must be positive numbers");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  //   throw new Error("something went wrong");
  //   return "sam";

  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum, sum2);
  return sum3;
};

doWork()
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
