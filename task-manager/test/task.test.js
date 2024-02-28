const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const {
  userOne,
  userOneId,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("should create a new task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Testing",
    })
    .expect(201);

  //Assert that the database was changed correctly
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("should not create task with invalid description/completed", async () => {
  // Attempt to create a task with invalid data
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "",
      completed: "invalid",
    })
    .expect(400);

  //Assert that the database was not changed
  const tasks = await Task.findById(response.body._id);
  expect(tasks).toBeNull();
});

test("should get all task of users", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  //   const task = await Task.findById(response.body[0]._id);
  expect(response.body.length).toEqual(2);
});

test("should not update task with invalid description/completed", async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "",
      completed: "invalid",
    })
    .expect(400);

  //Assert that the database was not changed
  const tasks = await Task.findById(response.body._id);
  expect(tasks).toBeNull();
});

test("should not delete task of other user", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

test("Should delete user task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
});

test("Should not delete task if unauthenticate", async () => {
  await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
});

test("should not update task of other user", async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);

  const task = await Task.findById(response.body._id);
  expect(task).toBeNull();
});

test("should get task of  one user", async () => {
  await request(app)
    .get(`/tasks/${taskTwo._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get task of  one user if unauthenticated", async () => {
  await request(app).get(`/tasks/${taskTwo._id}`).send().expect(401);
});

test("Should not fetch other users task by id", async () => {
  await request(app)
    .get(`/tasks/${taskTwo._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);
});

test("should get all task of users which are completed", async () => {
  await request(app)
    .get("/tasks?completed=true")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get all task of users which are incompleted", async () => {
  await request(app)
    .get("/tasks?completed=false")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get all sorted  tasks ascending order by createdAt", async () => {
  await request(app)
    .get("/tasks?sortBy=createdAt:asc")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should get all tasks by pagination", async () => {
  await request(app)
    .get("/tasks?limit=5&skip=1")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
