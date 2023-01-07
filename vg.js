
const pool = require('./dbInfo').getPool();
const axios = require('axios');
const { VG_RELEASE_DATE_URL, VG_GAME_URL, VG_GAME_DATA, VG_COVER_URL } = require('./constants');
var constants = require('./constants');

const generateConfig = (url, data) => {
    // create the necessary config object for use in queries, using the associated url and data specification.
    let config = {
        url: url,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': constants.VG_CLIENT_ID,
            'Authorization': constants.VG_BEARER_TOKEN
        },
        data: data
    }
    return config
}

const createVideoGameEvents = (request, response) => {
    let values = [];
    async function InsertVgData() {
        // intial api call for recent game data.
        let res = await axios(generateConfig(constants.VG_GAME_URL, constants.VG_GAME_DATA));
        let results = res.data
        let release_date = null;
        let cover = "";
        var format = require('pg-format');
        for await (const vg of results) {
            // prepare the data object and fill it with the type, name, and title attributes.
            let data = [
                "vg",
                vg['name'],
                vg['summary'] ? vg['summary'] : "No Summary Available.",
            ]
            // use existing release date id's to get their release_dates through another api call.
            if (vg['release_dates'] && vg['release_dates'][0]) {
                let release_id = vg['release_dates'][0];
                let release_data = await axios(generateConfig(VG_RELEASE_DATE_URL, `fields date; where id = ${release_id};`));
                if (release_data.data[0]['date']) {
                    release_date = release_data.data[0]['date'][0] ? release_data.data[0]['date'][0] : release_data.data[0]['date'];
                }
            }
            // use existing cover id to get the cover img with another api call.
            if (vg['cover']) {
                let cover_id = vg['cover']
                let cover_image = await axios(generateConfig(VG_COVER_URL, `fields *; where id = ${cover_id};`));
                cover = cover_image.data[0]['url'];
            }
            // append attributes (image, url, follows) to the data object in the correct order for the sql query.
            data.push(cover);
            data.push(vg['url'])
            data.push(vg['hypes'])
            // if a timestamp exists, convert it from UNIX timestamp to postgres timestamp .
            if (release_date) {
                let timestamp_conversion = await pool.query(`SELECT to_timestamp(${release_date})`);
                data.push(timestamp_conversion['rows'][0]['to_timestamp']);
            }
            else {
                data.push(null);
            }
            // append the rest of the attributes (created, last_updated) with the current time.
            data.push(new Date().toISOString());
            data.push(new Date().toISOString());
            // append the data object to the values list for use in the sql insertion query.
            values.push(data);
        }

        // insert each video game entry, or update if already exists.
        sql = (format('INSERT INTO events(type, title, description, image, url, follows, release_date, created, last_updated) VALUES %L', values));
        sql += " ON CONFLICT DO UPDATE SET release_date = excluded.release_date, image = excluded.image, description = excluded.description;"
        try {
            pool.query(sql, (error, resp) => {
                console.log(error);
                console.log(resp)
            });
            response.status(201).send("events created successfully.");
        }
        catch (error) {
            response.status(400).send(`events contain duplicates.`);
        }
    }
    InsertVgData();
}

module.exports = {
    createVideoGameEvents,
}