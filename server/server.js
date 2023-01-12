require("dotenv").config()

const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const cors = require("cors")

// Express app
const app = express()
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use("/api/workouts", workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for request
        app.listen(process.env.PORT, () => {
        console.log("Connected to db and listening on port", process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    }) 



