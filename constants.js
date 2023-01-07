

module.exports = Object.freeze({
    VG_CLIENT_ID: "1kcquaftbv249cuwslv5rmbasotdc4",
    VG_BEARER_TOKEN: "Bearer 3vujqhiblzmx2ddbelpc08h327lh4m",
    VG_GAME_URL: "https://api.igdb.com/v4/games/",
    VG_GAME_DATA: `fields *; where first_release_date > ${Date.now()} & hypes > 10; sort hypes; limit 50;`,
    VG_RELEASE_DATE_URL: "https://api.igdb.com/v4/release_dates/",
    VG_COVER_URL: "https://api.igdb.com/v4/covers"
});