const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const dns = require("dns")
const connectDB = require("./config/db")
dotenv.config()
dns.setServers(["1.1.1.1", "8.8.8.8"])
const authRoute = require("./routes/auth.routes")

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use("/api/auth", authRoute)

app.listen(port, () => {
    {
        console.log(`Server is running on port ${port}`)
    }
})