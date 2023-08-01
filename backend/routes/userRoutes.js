const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Controllers
const { getUser, createNewUser, loginUser } = require("../controllers/userControllers")

// GET user info | endpoint: api/user
router.get("/", getUser)

// CREATE a New User | endpoint: api/user/signup
router.post("/signup", createNewUser)

// LOGIN User | endpoint: api/user/login
router.post("/login", loginUser)

module.exports = router
