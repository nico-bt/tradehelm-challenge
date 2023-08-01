const User = require("../models/UserModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Helper function
// *******************************************************************************
const daysInSecs = 3 * 24 * 60 * 60
function createToken(id) {
  // ({payload}, "secret", {options - ej: duración en segundos})
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: daysInSecs })
}

// Controllers
// *******************************************************************************

// Return User data
//-----------------------------------------------------------------------------
const getUser = async (req, res) => {
  // user extracted with authMiddleware
  return res.json(req.user)
}

// Create New user when signup
//-----------------------------------------------------------------------------
const createNewUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all fields" })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email" })
  }

  try {
    let user = await User.create({ email, password }) //Obs: Password is hashed in the User Model before saving in db

    const token = createToken(user._id)

    //Remove password for returning it. Although it is hashed in User model
    user.password = undefined

    return res.status(201).json({ user, userToken: token })
  } catch (error) {
    if (error.code == 11000) {
      // Error code comes from the User Model definition in mongoDb with email as unique
      return res.status(400).json({ error: `${email} is already registered` })
    }

    res.status(400).json(error)
  }
}

// Check credentials and log in user
//-----------------------------------------------------------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all fields" })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Email not registered" })
    }

    const auth = await bcrypt.compare(password, user.password)

    if (auth) {
      const token = createToken(user._id)
      user.password = undefined
      return res.json({ user, userToken: token })
    } else {
      return res.status(400).json({ error: "Wrong password" })
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = { getUser, createNewUser, loginUser }
