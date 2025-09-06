const express = require('express')
const aiRoutes = require('./routes/ai.routes')

const cors = require('cors')

const app = express() //when express() is called server is being created

app.use(cors())

app.use(express.json())




app.get('/', (req, res) => {
    res.send('Hello world !! ')
})

app.use('/ai', aiRoutes)

module.exports = app