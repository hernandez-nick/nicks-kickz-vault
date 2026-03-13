const express = require("express");
const Shoe = require("../models/shoe.js");

const router = express.Router();

// Index Route - GET /shoes
module.exports = router;

// I.ND.U.C.E.S. (RESTful Routes)

// Index - GET /shoes - get all the shoes and send back a page
// New - GET /shoes/new - send a form page to create a new shoe
// Delete - Delete /shoes/:shoeId - delete some shoes based on the param passed
// Update - PUT /shoes/:shoeId - update some shoes based on the param passwed and req.body
// Create - POST /shoes - take data from shoes/new form and add a new shoe to the database
// Edit - GET /shoes/:shoeId/edit - edit a specific shoe
// Show - GET /shoes/:shoeId - show one specific shoe

// Extra routes not part of RESTful convention:
// Soft Delete - Delete /shoes/:shoeId - delete some shoes based on the param passed, but instead of actually deleting the document, set a isSoftDeleted field to true and filter for that in the index route so it doesn't show up on the index page
// GET /shoes/:shoeId/confirm_delete - show a confirmation page before deleting a shoe

// Index - GET /shoes - get all the shoes and send back a page
router.get("/", async (req, res) => {
    try {
    // Find all the shoes in the database and send them to the index.ejs page as a variable called shoes
    const shoes = await Shoe.find({ isSoftDeleted: { $in: [false, null] } });
        res.render("shoes/index.ejs", { shoes: shoes });
    } catch (error) {
        res.render("error.ejs", { message: error.message });
    }
});

// New - GET /shoes/new - send a form page to create a new shoe
router.get("/new", (req, res) => {
res.render("shoes/new.ejs");
});

// Delete - Delete /shoes/:shoeId - delete some shoes based on the param passed
router.delete("/:shoeId", async (req, res) => {
    try {
    // Find the shoe in the database with the id from the url params and delete it, then redirect back to the index page
    await Shoe.findByIdAndDelete(req.params.shoeId);
        res.redirect("/shoes");
    } catch (error) {
        res.render("error.ejs", { message: error.message });
    }
});

// Update - PUT /shoes/:shoeId - update some shoes based on the param passwed and req.body
router.put("/:shoeId", async (req, res) => {
    try {
    // Find the shoe in the database with the id from the url params and update it with the data from req.body, then redirect back to the index page
        await Shoe.findByIdAndUpdate(req.params.shoeId, req.body);
        res.redirect(`/shoes/${req.params.shoeId}`);
    } catch (error) {
        res.render("error.ejs", { message: error.message });
    }
});

// Soft Delete - Delete /shoes/:shoeId/soft - mark a shoe as soft deleted
router.delete("/:shoeId/soft", async (req, res) => {
    try {
    // Find the shoe in the database with the id from the url params and soft delete it, then redirect back to the index page
    await Shoe.findByIdAndUpdate(req.params.shoeId, { isSoftDeleted: true });
        res.redirect("/shoes");
    } catch (error) {
        res.render("error.ejs", { message: error.message });
    }
});

// Create - POST /shoes - take data from shoes/new form and add a new shoe to the database
router.post("/", async (req, res) => {
    try {
    // Check for an empty name field, if it's empty throw a manual error to be caught by the catch block
    const { name, brand, price, color, description } = req.body;
    // If I trim the name and color and they are falsy (empty string, null, undefined) then throw an error
    if (!name.trim() || !brand.trim() || !color.trim())
        return res.render("shoes/new.ejs", {
        message:
            "Name, brand, and color fields cannot be empty, please try again",
    });

    if (description && description.length > 100) {  
        return res.render("shoes/new.ejs", {
        message:
            "Description cannot be longer than 100 characters, please try again",
    });
}

// Give the form data to the model.create to make a new mongodb document
    await Shoe.create(req.body);
    // Redirect the user back to the index page after creating the new shoe
        res.redirect("/shoes");
    } catch (error) {
        res.render("error.ejs", { message: error.message });
    }
});

// GET /shoes/:shoeId/confirm_delete - show a confirmation page before deleting a shoe
router.get("/:shoeId/confirm_delete", async (req, res) => {
    try {
    // Find the shoe in the database with the id from the url params and send it to the show.ejs page as a variable called shoe
    const foundShoe = await Shoe.findById(req.params.shoeId);
    // If no shoe is found, throw a manual error to be caught by the catch block
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

// Edit - GET /shoes/:shoeId/edit - edit a specific shoe
router.get("/:shoeId/edit", async (req, res) => {
    try {
    // Find the shoe in the database with the id from the url params and send it to the show.ejs page as a variable called shoe
    const foundShoe = await Shoe.findById(req.params.shoeId);
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
    const foundShoe = await Shoe.findById(req.params.shoeId);
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
