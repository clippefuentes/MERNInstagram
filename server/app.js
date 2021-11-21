const express = require('express')
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')

require('./models/user')
require('./models/post')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected TO mongo')
})

mongoose.connection.on('error', (err) => {
    console.log('Error:', err)
})

app.listen(PORT, () => {
    console.log(`Listen to port ${PORT}`)
})