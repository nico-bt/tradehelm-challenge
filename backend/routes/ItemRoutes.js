const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Item = require("../models/ItemModel")

// Controllers
const {
  getAllItems,
  createNewItem,
  getSingleItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemControllers")

// GET all items | endpoint: /api/items/
router.get("/", getAllItems)

// CREATE a New Item | endpoint: /api/items/
router.post("/", createNewItem)

// Get a SINGLE Item | endpoint: /api/items/:id
router.get("/:id", getSingleItem)

// Update a Item | endpoint: /api/items/:id
router.patch("/:id", updateItem)

// Delete a Item | endpoint: /api/items/:id
router.delete("/:id", deleteItem)

module.exports = router
