const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const externalEvents = require('./vg')
const events = require('./events')
const users = require('./users')
const reminders = require('./reminders')
const port = 5000
app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'The base URL for the RemindMeWhen application!' })
})

// user endpoints
app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)

// reminder endpoints
app.get('/reminders', reminders.getReminders)
app.get('/reminders/:id', reminders.getReminderById)
app.post('/reminders', reminders.createReminder)
app.put('/reminders/:id', reminders.updateReminder)
app.delete('/reminders/:id', reminders.deleteReminder)

// event endpoints
app.get('/events', events.getEvents)
app.get('/events/:id', events.getEventById)
app.post('/events', events.createEvent)
app.put('/events/:id', events.updateEvent)
app.delete('/events/:id', events.deleteEvent)

// External event API endpoints
app.post('/events/vg', externalEvents.createVideoGameEvents)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})