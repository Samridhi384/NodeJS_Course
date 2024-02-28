// const square = (x) => x * x;

// console.log(square(2));

const event1 = {
  name: "bday party",
  guestList: ["sam", "john", "rhea"],
  printEventGuest() {
    // console.log("name is ", this.name);
    this.guestList.forEach((guest) => {
      console.log(guest, " is attending ", this.name);
    });
  },
};
event1.printEventGuest();

//function  () has its own bind method so it will not take parent's this keyword until this is defined as separate variable
//so in this case we can use arrow function where do not require own this but just the parents one
