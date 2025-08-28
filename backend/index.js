const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config({path:"./config/.env"})

const connectDB = require("./config/db")
connectDB()

const PORT = process.env.PORT

const morgan = require("morgan")
const cors = require("cors")

// Middleware
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())



// Importing Routes
const contactRoutes = require("./routes/contact")
const eventRoutes = require("./routes/event.routes")

// UsingRoutes
app.use("/api/contact", contactRoutes)
app.use("/api/event", eventRoutes)

app.get('/', (req, res)=>{
return res.send("hello")
})


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})