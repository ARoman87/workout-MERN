const express = require("express")

// Controller Functions
const {signupUser, loginUser} = require("../controllers/userController")



const router = express.Router()


// Login Route
router.post("/login", loginUser)


// Sign Up Route
router.post("/signup", signupUser)


module.exports = router