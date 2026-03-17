const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const methodOverride = require("method-override");
require("dotenv").config();
const Shoe = require("./models/shoe.js");
require("./db/connection.js");

const shoeController = require("./controllers/shoes.js");
const authController = require("./controllers/auth.js");
const authRequired = require("./middleware/isUserAuthorized");
const passDataToView = require("./middleware/passDataToView");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Session expires after 1 day
        },
        store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        }),
    }),
);

app.use(passDataToView);

// Custom middleware to make the current user available in all views as a variable called currentUser
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});



// Routes
app.use("/auth", authController);
app.use("/shoes", authRequired, shoeController);


app.get("/", async (req, res) => {
    if (req.session.user) {
        res.redirect("/shoes");
    } else {
        res.render("index.ejs");
    }
});

app.get("*slug", (req, res) => {
    res.render("error.ejs", {
        message: "That page does not exist, please click back and try again",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
