const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

// afterEach(() => {
//   console.log("after each");
// });

test("should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Rohan Nanda",
      email: "rohan@nanda.com",
      password: "123456",
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  // expect(response.body.user.name).toBe("Rohan Nanda");
  expect(response.body).toMatchObject({
    user: {
      name: "Rohan Nanda",
      email: "rohan@nanda.com",
    },
    token: user.tokens[0].token,
  });

  // Password Security Assertion: The password should not be returned in plain text
  expect(user.password).not.toBe("123456");
});

test("should not sign up user with invalid name/email/password", async () => {
  // Attempt to sign up with invalid data
  const response = await request(app)
    .post("/users")
    .send({
      name: "", // Invalid name
      email: "invalidemail", // Invalid email
      password: "123", // Invalid password
    })
    .expect(400); // Expect a 400 Bad Request response

  // Assert that the database was not changed
  const users = await User.find({ email: "invalidemail" });
  expect(users.length).toBe(0); // No user should be created

  // Assert the response message
  expect(response.text).toContain("error");
});

test("should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "this2332",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete authorized user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "test/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  // expect({}).toEqual({}) // true as is does not uses equality operator (===)
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user data", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Siya" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Siya");
});

test("should not update invalid name,email,password", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "",
      email: "invalidemail",
      password: "123",
    })
    .expect(400);

  const users = await User.find({ email: "invalidemail" });
  expect(users.length).toBe(0); // No user should be created

  // Assert the response message
  expect(response.text).toContain("");
});

test("should not update invalid user data", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Surat" })
    .expect(400);
});

test("should not update for unauthenticated user", async () => {
  await request(app).patch("/users/me").send().expect(401);
});
