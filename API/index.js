const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/codeRoute')
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


app.listen(8080, (req, res)=>{
    console.log('Server is running on port 8080')
})
