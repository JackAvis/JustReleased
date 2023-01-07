
const pool = require('./dbInfo').getPool();
const axios = require("axios");
const { MV_API_KEY, MV_URL } = require('./constants');
// month dict for timestamp
const months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
}
function generateConfig(id) {
    let config = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/title/get-plots',
        params: { tconst: id },
        headers: {
            'X-RapidAPI-Key': '1aa9985771msh52f5865e15414b2p1b1063jsn481a23cce4b9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    }
    return config;
}

const createMovieEvents = (request, response) => {
    const dateToTimeStamp = (d) => {
        let month = d.substring(0, 3);
        let day = d.substring(4, 6);
        let year = d.substring(8, 12);
        return `${year}-${months[month]}-${day}`
    }

    let values = [];
    async function InsertMvData() {
        // intial api call for recent game data.
        let res = await axios.get(`${MV_URL}${MV_API_KEY}`);
        let results = res.data['items']
        results = results.slice(81);
        let i = 0;
        var format = require('pg-format');
        let description = ""
        console.log('browser connected');
        for await (const mv of results) {
            let data = [
                "mv",
                mv['title'],
            ]
            await axios.request(generateConfig(mv['id'])).then(function (response) {
                description = response.data["plots"][0]["text"]
            }).catch(function (error) {
                console.error(error);
            });
            // push attributes in correct order to data array for insertion with sql
            data.push(description);
            data.push(mv['image']);
            data.push(`https://www.imdb.com/title/${mv['id']}/`);
            data.push(null);
            data.push(dateToTimeStamp(mv['releaseState']))
            data.push(new Date().toISOString());
            data.push(new Date().toISOString());
            console.log(i);
            values.push(data);
        }
        // insert each video game entry, or update if already exists.
        sql = (format('INSERT INTO events(type, title, description, image, url, follows, release_date, created, last_updated) VALUES %L', values));
        sql += " ON CONFLICT (title) DO UPDATE SET release_date = excluded.release_date, image = excluded.image, description = excluded.description;"
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
    InsertMvData();
}

module.exports = {
    createMovieEvents,
}