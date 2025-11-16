import express from "express"
const app = express()
import noteRoute from "./routes/notesRoutes.js"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path from "path"
dotenv.config()
const port = process.env.PORT || 5001
const __dirname = path.resolve()
// middleware 
if (process.env.NODE_ENV != "production") {
  app.use(cors())
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}
app.use(express.json())
app.use(rateLimiter)
app.use("/api/notes", noteRoute)

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}


connectDb().then(() => {
  app.listen(port, () => {
    console.log(`visit : http://localhost:${port}`)
  })
})