const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/codeRoute')
const userRouter = require('./routes/userRoutes')
const dotenv = require('dotenv') 
const connectToDB = require('./utils/connectToDB')
const bodyParser = require('body-parser')

dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

connectToDB()

app.get('/', (req, res)=>{
    return res.json({
        message: 'Health check'
    })
})

app.use('/api', router)
app.use('/api/user', userRouter)


app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is running on port ${process.env.PORT} `)
})
