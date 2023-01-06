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

    pool.query('INSERT INTO users(username, email, password, created) VALUES ($1, $2, $3, CURRENT_DATE)', [username, email, password], (error, results) => {
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
        'UPDATE users SET last_updated = CURRENT_DATE, username = $1, email = $2, password = $3 WHERE id = $4',
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

const getDataDump = (request, response) => {

    pool.query('SELECT * FROM datadump ORDER BY post_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createDataDump = (request, response) => {
    const { title, text } = request.body;
    const client_id = "1kcquaftbv249cuwslv5rmbasotdc4";
    const bearer = "Bearer 3vujqhiblzmx2ddbelpc08h327lh4m"
    const url = "https://api.igdb.com/v4/games/"
    let summary = "";
    let titl = "";
    const populate = (tit, sum) => { summary = sum; titl = tit; }
    let config = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Client-ID': client_id,
            'Authorization': bearer
        },
        data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
    }
    async function getData() {
        await axios(config)
            .then(response => {
                populate(response.data[0]['name'], response.data[0]['summary']);
                console.log(titl, summary);
                insertData();
            })
            .catch(err => {
                console.error(err);
            });
    }
    getData();
    const insertData = () => {
        pool.query('INSERT INTO datadump(title, text, created, last_updated) VALUES ($1, $2, NOW(), NOW())', [titl, summary], (error, results) => {
            if (error) {
                response.status(401).send(`data in table already`);
            }
            else {
                response.status(201).send(`data added to the table.`);
            }
        })
    }
}
module.exports = {
    createDataDump,
    getDataDump,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}