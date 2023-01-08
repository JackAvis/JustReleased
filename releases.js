// Queries for events here
const pool = require('./dbInfo').getPool();


const getEvents = (request, response) => {
    pool.query('SELECT * FROM events ORDER BY event_id ASC LIMIT 100', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const getEventsByType = (request, response) => {
    const type = request.params.type;
    pool.query('SELECT * FROM events WHERE type = $1 and release_date > NOW() ORDER BY release_date ASC LIMIT 50', [type], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const getEventCount = (request, response) => {
    pool.query('SELECT count(*) FROM events', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getRecentEvents = (request, response) => {
    pool.query('SELECT * FROM events WHERE release_date < NOW() ORDER BY release_date DESC LIMIT 20', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getUpcomingEvents = (request, response) => {
    pool.query('SELECT * FROM events WHERE release_date > NOW() ORDER BY release_date ASC LIMIT 20', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const getEventById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM events WHERE event_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const createEvent = (request, response) => {
    const { type, title, description, image, release_date } = request.body;

    pool.query('INSERT INTO events(type, title, description, image, release_date, created, last_updated) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())', [type, title, description, image, release_date], (error, results) => {
        if (error) {
            response.status(401).send(`Input error  or Event is a duplicate and already in the table.`);
        }
        else {
            response.status(201).send(`Event added to the table.`);
        }
    })
}


const updateEvent = (request, response) => {
    const id = parseInt(request.params.id);
    console.log(1);
    const { type, title, description, image, release_date } = request.body;

    pool.query(
        'UPDATE events SET last_updated = NOW(), type = $1, title = $2, description = $3, image = $4, release_date = $5 WHERE event_id = $6',
        [type, title, description, image, release_date, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Event modified with ID: ${id}`);
        }
    )
}


const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM events WHERE event_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Event deleted with ID: ${id}`);
    })
}


module.exports = {
    getRecentEvents,
    getUpcomingEvents,
    getEvents,
    getEventsByType,
    getEventCount,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
}