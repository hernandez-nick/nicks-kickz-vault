const express = require("express");
const Shoe = require("../models/shoe.js");

const router = express.Router();

module.exports = router;

// Index - GET /shoes - get all the shoes and send back a page
router.get("/", async (req, res) => {
  try {
    // Find all the shoes in the database and send them to the index.ejs page as a variable called shoes
    const shoes = await Shoe.find({
      owner: req.session.user._id,
    });
    res.render("shoes/index.ejs", { shoes: shoes });
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// New - GET /shoes/new - send a form page to create a new shoe
router.get("/new", async (req, res) => {
  res.render("shoes/new.ejs");
});

// Delete - Delete /shoes/:shoeId - delete some shoes based on the param passed
router.delete("/:shoeId", async (req, res) => {
  try {
    // Find the shoe in the database with the id from the url params and delete it, then redirect back to the index page
    await Shoe.findOneAndDelete({
      _id: req.params.shoeId,
      owner: req.session.user._id,
    });
    res.redirect("/shoes");
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// GET /shoes/:shoeId/confirm_delete - show confirmation before deleting
router.get("/:shoeId/confirm_delete", async (req, res) => {
  try {
    const foundShoe = await Shoe.findOne({
      _id: req.params.shoeId,
      owner: req.session.user._id,
    });
    if (!foundShoe)
      throw new Error(
        "Failed to find that shoe, please click back and try again",
      );

    res.render("shoes/shoe_confirm_delete.ejs", {
      shoe: foundShoe,
    });
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// Update - PUT /shoes/:shoeId - update some shoes based on the param passwed and req.body
router.put("/:shoeId", async (req, res) => {
  try {
    // Find the shoe in the database with the id from the url params and update it with the data from req.body, then redirect back to the index page
    const shoeData = {
      ...req.body,
      isDeadstock: req.body.isDeadstock === "on",
    };
    await Shoe.findOneAndUpdate(
      { _id: req.params.shoeId, owner: req.session.user._id },
      shoeData,
      { new: true },
    );
    res.redirect(`/shoes/${req.params.shoeId}`);
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// Create - POST /shoes - take data from shoes/new form and add a new shoe to the database
router.post("/", async (req, res) => {
  try {
    const shoeData = {
      ...req.body,
      owner: req.session.user._id,
      isDeadstock: req.body.isDeadstock === "on",
    };
    // Give the form data to the model.create to make a new mongodb document
    await Shoe.create(shoeData);
    // Redirect the user back to the index page after creating the new shoe
    res.redirect("/shoes");
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// GET /shoes/:shoeId/ - show one specific shoe
router.get("/:shoeId/", async (req, res) => {
  try {
    // Find the shoe in the database with the id from the url params and send it to the show.ejs page as a variable called shoe
    const foundShoe = await Shoe.findOne({
      _id: req.params.shoeId,
      owner: req.session.user._id,
    });
    // If no shoe is found, throw a manual error to be caught by the catch block
    if (!foundShoe)
      throw new Error(
        "Failed to find that shoe, please click back and try again",
      );

    res.render("shoes/show.ejs", {
      shoe: foundShoe,
    });
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// Edit - GET /shoes/:shoeId/edit - edit a specific shoe
router.get("/:shoeId/edit", async (req, res) => {
  try {
    // Find the shoe in the database with the id from the url params and send it to the show.ejs page as a variable called shoe
    const foundShoe = await Shoe.findOne({
      _id: req.params.shoeId,
      owner: req.session.user._id,
    });
    // If no shoe is found, throw a manual error to be caught by the catch block
    if (!foundShoe)
      throw new Error(
        "Failed to find that shoe, please click back and try again",
      );

    res.render("shoes/edit.ejs", {
      shoe: foundShoe,
    });
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});

// Show - GET /shoes/:shoeId - show one specific shoe
router.get("/:shoeId", async (req, res) => {
  try {
    // Find the shoe in the database with the id from the url params and send it to the show.ejs page as a variable called shoe
    const foundShoe = await Shoe.findOne({
      _id: req.params.shoeId,
      owner: req.session.user._id,
    });
    // If no shoe is found, throw a manual error to be caught by the catch block
    if (!foundShoe)
      throw new Error(
        "Failed to find that shoe, please click back and try again",
      );

    res.render("shoes/show.ejs", {
      shoe: foundShoe,
    });
  } catch (error) {
    res.render("error.ejs", { message: error.message });
  }
});
