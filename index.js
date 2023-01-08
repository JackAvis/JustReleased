const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const vg = require('./vg')
const mv = require('./mv')
const events = require('./releases')
const users = require('./extras/users')
const reminders = require('./extras/reminders')
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

// release endpoints
app.get('/releases', events.getEvents)
app.get('/releases/upcoming/', events.getUpcomingEvents)
app.get('/releases/recentlyreleased/', events.getRecentEvents)
app.get('/releases/count', events.getEventCount)
app.get('/releases/type/:type', events.getEventsByType)
app.get('/releases/:id', events.getEventById)
app.post('/events', events.createEvent)
app.put('/events/:id', events.updateEvent)
app.delete('/events/:id', events.deleteEvent)

// External event API endpoints
app.post('/events/vg', vg.createVideoGameEvents)
app.post('/events/mv', mv.createMovieEvents)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})