const router = require("express").Router();
const express = require("express");
let User = require("../../models/user.model");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const UserSession = require("../../models/UserSession");

app.use(cookieParser());

const secret = "mysecretsshhh";

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  const { username } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }

  if (/\S+@\S+\.\S+/.test(email) === false) {
    return res.send({
      success: false,
      message: "Error: Not Valid"
    });
  }

  if (password.length < 6) {
    return res.send({
      success: false,
      message: "Error: Password too short"
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exist."
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: err
          });
        }
        return res.send({
          success: true,
          message: "Signed up"
        });
      });
    }
  );
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("user is not found");
    else user.grid = req.body;

    user
      .save()
      .then(user => {
        res.send("user updated!");
        console.log("updatedddd");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

router.route("/updatelist/:id").post((req, res) => {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("user is not found");
    else user.list = req.body;

    user
      .save()
      .then(user => {
        res.send("user list updated!");
        console.log("updatedddd");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

router.route("/login").post((req, res) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }
  email = email.toLowerCase();
  email = email.trim();
  User.find(
    {
      email: email
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid Password"
        });
      }
      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        console.log("succccesss");
        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id
        });
      });
    }
  );
});

router.route("/verify").get((req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  // Verify the token is one of a kind and it's not deleted.

  UserSession.find(
    {
      _id: token,
      isDeleted: false
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }

      if (sessions.length != 1) {
        console.log("none");
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      } else {
        return res.send({
          success: true,
          message: "Good",
          userId: sessions[0].userId
        });
      }
    }
  );
});

router.route("/logout").get((req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }
      console.log("logged out");
      return res.send({
        success: true,
        message: "Good"
      });
    }
  );
});

router.route("/:id").get((req, res) => {
  const userId = req.params.id;
  User.findById(userId, function(err, user) {
    res.json(user);
  });
});

module.exports = router;
