const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

// Controllers
const { getUser, createNewUser, loginUser } = require("../controllers/userControllers")
const requireAuth = require("../middleware/authMiddleware")

// GET user info | endpoint: api/user
router.get("/", requireAuth, getUser)

// CREATE a New User | endpoint: api/user/signup
router.post("/signup", createNewUser)

// LOGIN User | endpoint: api/user/login
router.post("/login", loginUser)

module.exports = router
