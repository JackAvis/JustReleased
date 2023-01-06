const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const users = require('./users')
const port = 5000
app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Login Template Express API' })
})


app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})