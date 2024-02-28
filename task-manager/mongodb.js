//performing crud operations

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id.id.length);
// console.log(id.getTimestamp());
// console.log(id.toHexString().length);

const dbConnect = async () => {
  const client = new MongoClient(connectionURL);
  try {
    await client.connect();
    // console.log("Connected successfully");

    const db = client.db(databaseName);

    const collection = db.collection("users");

    const query = { _id: new ObjectId("65ceff8567f75e9c0874ac48") };
    const user = await collection.findOne(query);

    if (user) {
      //   console.log(user);
    } else {
      console.log("No User Found!");
    }

    const user1 = await collection.find({ age: 24 }).toArray();
    // console.log(user1);

    const task = await db
      .collection("tasks")
      .find({ completed: false })
      .toArray(); //cursor necesarry with find
    //   .findOne({ _id: new ObjectId("65cf07449d7e90f4f7c2a5a7") });

    console.log(task);
  } catch (error) {
    return console.log("Unable to connect database", error);
  } finally {
    //   Close the connection
    await client.close();
    //   console.log("Connection closed");
  }
};

// dbConnect();

//update
const client = new MongoClient(connectionURL);

client.connect();

const db = client.db(databaseName);

const collection = db.collection("users");

// const updateQuery = collection.updateOne(
//   {
//     _id: new ObjectId("65ceff8567f75e9c0874ac48"),
//   },
//   //   { $set: { name: "Slyvie" } }
//   { $inc: { age: 1 } }
// );

// updateQuery.then((data) => console.log(data)).catch((e) => console.log(e));

// const updateManyQuery = collection.updateMany(
//   {
//     completed: false,
//   },
//   { $set: { completed: true } }
// );

// updateManyQuery.then((data) => console.log(data)).catch((e) => console.log(e));

// const deleteQuery = collection.deleteOne({ completed: true });
// deleteQuery.then((data) => console.log(data)).catch((e) => console.log(e));

const deleteManyQuery = collection.deleteMany({ age: 24 });
deleteManyQuery.then((data) => console.log(data)).catch((e) => console.log(e));
