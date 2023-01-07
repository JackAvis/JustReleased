// Queries for reminders here
const pool = require('./dbInfo').getPool();


const getReminders = (request, response) => {
    pool.query('SELECT * FROM reminders ORDER BY reminder_id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const getReminderById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM reminders WHERE reminder_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}


const createReminder = (request, response) => {
    const { event_id, user_id, remind_date, remind_type } = request.body;
    pool.query('INSERT INTO reminders(event_id, user_id, remind_date, remind_type, created, last_updated) VALUES ($1, $2, $3, $4, NOW(), NOW())', [event_id, user_id, remind_date, remind_type], (error, results) => {
        if (error) {
            response.status(401).send(`Input error or reminder is a duplicate and already in the table.`);
        }
        else {
            response.status(201).send(`reminder added to the table.`);
        }
    })
}


const updateReminder = (request, response) => {
    const id = parseInt(request.params.id);
    const { remind_date, remind_type } = request.body;

    pool.query(
        'UPDATE reminders SET last_updated = NOW(), remind_date = $1, remind_type = $2  WHERE reminder_id = $3',
        [remind_date, remind_type, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`reminder modified with ID: ${id}`);
        }
    )
}


const deleteReminder = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM reminders WHERE reminder_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`reminder deleted with ID: ${id}`);
    })
}


module.exports = {
    getReminders,
    getReminderById,
    createReminder,
    updateReminder,
    deleteReminder,
}