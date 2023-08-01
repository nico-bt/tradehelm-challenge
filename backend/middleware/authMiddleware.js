const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

// Check credentials with jsonwebtoken. If is not valid you can't go to the next()
// -------------------------------------------------------------------------------------------------------
const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).json({ error: "Not authorized, no token" })
    }

    //Get token from request
    const userToken = authorization.split(" ")[1]

    if (userToken) {
      // With the retrieved id from token, check if user exists in database
      const { id } = await jwt.verify(userToken, process.env.JWT_SECRET)

      let user = await User.findById(id)

      if (user) {
        // Token ok && user ok => add id into req and continue
        user.password = undefined
        req.user = user
        next()
      } else {
        return res.status(401).json({ error: "Wrong credentials" })
      }
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = requireAuth
