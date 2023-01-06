
const pool = require('./dbInfo').getPool();
const axios = require('axios');
const { VG_RELEASE_DATE_URL } = require('./constants');
var constants = require('./constants');
const generateConfig = (url, data) => {
    let config = {
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Client-ID': constants.VG_CLIENT_ID,
            'Authorization': constants.VG_BEARER_TOKEN
        },
        data: data
    }
    return config
}


async function getVgReleaseDate(id, callback) {
    const t = await axios(generateConfig(VG_RELEASE_DATE_URL, `fields category,checksum,created_at,date,game,human,m,platform,region,updated_at,y; where id = ${id};`))
        .then(response => {
            console.log(response.data[0]['date']);
            return response.data;

        })
        .catch(err => {
            console.error(err);
        });
    return t['date'];

}
const insertEvent = (type, title, description, image, release_date) => {
    pool.query('INSERT INTO events(type, title, description, image, release_date, created, last_updated) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())', [type, title, description, image, release_date], (error, results) => {
        if (error) {
            response.status(401).send(`Input error or Event is a duplicate and already in the table.`);
        }
        else {
            response.status(201).send(`Event added to the table.`);
        }
    })
}
const createVideoGameEvents = (request, response) => {
    async function getData() {
        await axios(generateConfig(constants.VG_GAME_URL, constants.VG_GAME_DATA))
            .then(response => {
                let data = response.data;
                data.forEach(function (vg) {
                    let title = vg['name'];
                    let description = vg['summary'];
                    let rd = "";
                    let changeRelease = (release) => {rd=release};
                    console.log(title, description);
                    if (vg['release_dates']) {
                        let release_id = vg['release_dates'][0];
                        getVgReleaseDate(release_id, changeRelease).then((data) => console.log(data));
                    }

                })
                //console.log(response.data[0]['name']);
            })
            .catch(err => {
                console.error(err);
            });
    }
    getData();
}

module.exports = {
    createVideoGameEvents,
}