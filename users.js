// Queries for users here
const pool = require('./dbInfo').getPool();
const axios = require('axios');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
    const { username, email, password } = request.body;

    pool.query('INSERT INTO users(username, email, password, created) VALUES ($1, $2, $3, NOW())', [username, email, password], (error, results) => {
        if (error) {
            response.status(401).send(`Username is a duplicate and already in the table.`);
        }
        else {
            response.status(201).send(`User added to the table.`);
        }
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { username, email, password } = request.body

    pool.query(
        'UPDATE users SET last_updated = NOW(), username = $1, email = $2, password = $3 WHERE id = $4',
        [username, email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}