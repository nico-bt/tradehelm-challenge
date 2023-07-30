const mongoose = require("mongoose")
const Item = require("../models/ItemModel")

// GET ALL Items
//-----------------------------------------------------------------------
const getAllItems = async (req, res) => {
  const userID = req.user._id //Passed via authMiddleware
  try {
    const items = await Item.find({ user: userID })
    res.status(200).json(items)
  } catch (error) {
    res.status(400).json(error)
  }
}

// CREATE New Item
//-----------------------------------------------------------------------
const createNewItem = async (req, res) => {
  const { itemData } = req.body
  const user = req.user._id //Passed via authMiddleware

  if (!itemData) {
    return res.status(400).json({ error: "Please enter an Item" })
  }

  try {
    const item = await Item.create({ item: itemData, user })
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

// GET SINGLE item
//-----------------------------------------------------------------------
const getSingleItem = async (req, res) => {
  // Check if the passed id is a valid mongoDb type
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "No such item in db" })
  }

  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(400).json({ error: "No such item in db" })
    }
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json(error)
  }
}

// DELETE an Item
//-----------------------------------------------------------------------
const deleteItem = async (req, res) => {
  // Check if the passed id is a valid mongoDb type
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "No such Item in db" })
  }

  // Check if user is owner of the item
  try {
    const item = await Item.findById(req.params.id)
    const userId = req.user._id.toString()
    if (userId != item.user.toString()) {
      return res.status(400).json({ error: "Not your Item to delete!" })
    }
  } catch (error) {
    res.status(400).json(error)
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)
    if (!deletedItem) {
      return res.status(400).json({ error: "No such Item in db" })
    }
    res.status(200).json(deletedItem)
  } catch (error) {
    res.status(400).json(error)
  }
}

//UPDATE an Item
//-----------------------------------------------------------------------
const updateItem = async (req, res) => {
  // Check if user is owner of the item
  try {
    const item = await Item.findById(req.params.id)
    const userId = req.user._id.toString()
    if (userId != item.user.toString()) {
      return res.status(400).json({ error: "Not your item to update" })
    }
  } catch (error) {
    res.status(400).json(error)
  }

  try {
    const { itemData } = req.body
    if (!itemData) {
      return res.status(400).json("Enter an Item")
    }
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { itemData }, { new: true })
    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { getAllItems, createNewItem, getSingleItem, deleteItem, updateItem }
