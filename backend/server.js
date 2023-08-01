//Enviroment variables
require("dotenv").config()

// Express
const express = require("express")
const app = express()

//Database
const mongoose = require("mongoose")

//Cors and json, and middleware
var cors = require("cors")
app.use(cors())
app.use(express.json())

const path = require("path")
const requireAuth = require("./middleware/authMiddleware")

// Limiting number of request to the API
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

//Routes
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/items", requireAuth, require("./routes/itemRoutes"))

// For production - Serving the frontend
// --------------------------------------------------------------------
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "..", "frontend/dist")))

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "frontend/dist/index.html"))
//   })
// } else {
//   app.get("/", (req, res) => {
//     res.send("Development mode. Frontend in different port")
//   })
// }

//Connect to DB and run app
mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & running on port: ${process.env.PORT}`)
    })
  )
  .catch((err) => console.log(err))
