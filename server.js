import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import fileRoutes from './routes/filesRoutes.js'
import documentRoutes from './routes/documentsRoutes.js'
import remarkRoutes from './routes/remarksRoutes.js'
import authRoutes from './routes/authRoutes.js'

// configure env
dotenv.config()

// databaseconfig
connectDB()


// rest object
const app =express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/file',fileRoutes)
app.use('/api/document',documentRoutes)
app.use('/api/remarks',remarkRoutes)

// rest api
app.get('/',(req,res)=>{
    res.send({
        message:"welcome to File Management System"
    })
})

// Port
const PORT = process.env.PORT || 8080

// run listen
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`.bgGreen.white)
})