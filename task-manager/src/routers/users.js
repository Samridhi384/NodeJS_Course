const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancellationEmail } = require("../email/account");
const deleteUserAndTasks = require("../middleware/delete");

// router.get("/test", (req, res) => {
//   res.send("hello test this is my first router");
// });

//create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();

    await user.save();
    sendWelcomeEmail(user.email, user.name);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send("Invalid email or password");
    // console.log(error);
  }
});

//log out user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token != req.token;
    });

    await req.user.save();

    res.send("Log out successfully");
  } catch (error) {
    res.status(500).send();
  }
});

//logout all users
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    // console.log(req.users.tokens);
    req.user.tokens = [];

    await req.user.save();
    res.send("Logged out from all devices");
  } catch (error) {
    res.status(500).send();
    // console.log(error);
  }
});

//get all users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(400).send();
  // }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

//get single user
// router.get("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const user = await User.findById(_id);

//     if (!user) {
//       res.status(400).send("User not found");
//     } else res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }

// User.findById(_id)
//   .then((user) => {
//     if (!user) {
//       res.status(400).send("User not found");
//     }

//     res.send(user);
//   })
//   .catch((e) => {
//     res.status(500).send();
//   });
// });

//update a user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).send({ error: "Invalid update!" });
  }

  try {
    // const updatedUser = await User.findById(req.params.id);

    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // if (!updatedUser) {
    //   res.status(400).send("User not found");
    // }
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

//delete a user

router.delete("/users/me", auth, deleteUserAndTasks, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    sendCancellationEmail(user.email, user.name);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      // await user.remove();
      res.send(user);
      // await user.save();
    }
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("avatar uploaded successfully");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send("Deleted Successfully");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png"); //as here it is in png format
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});
module.exports = router;
