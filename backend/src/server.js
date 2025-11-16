import express from "express"
const app = express()
import noteRoute from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dotenv.config()
const port = process.env.PORT || 5001

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`visit : http://localhost:${port}`)
    })
})
// middleware 
app.use(cors())
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", noteRoute)