const axios = require('axios');
require('dotenv').config();

const apikey = process.env.LYRICS_API_KEY; // defined in .env
axios.default.baseURL = 'https://api.musixmatch.com/ws/1.1'; // potentially just have one url variable which is baseURL + endpoint

const lyricsapiController = {};

lyricsapiController.getSongs = (req, res, next) => {
  const { page } = req.params
  const params = {
    f_track_release_group_first_release_date_min: 19491212,
    f_track_release_group_first_release_date_max: 20131212,
    f_lyrics_language: 'en',
    s_track_rating: 'desc',
    page_size: 15,
    page,
    apikey,
  };
  axios('/track.search', {params})
  .then(function(data) {
    const { track_list } = data.message.body;
    const clean_track_list = track_list.filter(el => el.track.explicit === 0)
    res.locals.songs = clean_track_list.map(el => {
      return {
        track_id: el.trackId,
        name: el.track_name,
        artistName: el.artist_name
      }
    })
    return next()
  })
  .catch((error) => {
    next({
      log: 'Express error handler caught lyricsapiController.getSongs middleware error',
      status: 400,
      message: { err: error.message },
    });
  })
}

lyricsapiController.getLyrics = (req, res, next) => {
  const { id } = req.params;
  const params = {
    track_id: id,
    apikey
  };

axios('/track.lyrics.get', {params})
  .then(function(data) {
    const rawLyrics = data.message.body.lyrics.lyrics_body.split('/n');
    const lyrics = rawLyrics.slice(0, rawLyrics.indexOf('...'));
    const jumbledLyrics = lyrics.map(el => {
      const arr = el.split(' ')
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr.join(' ');
    })
    res.locals.lyrics = jumbledLyrics.join('/n')
    next()
  })
  .catch((error) => {
    next({
      log: 'Express error handler caught lyricsapiController.getLyrics middleware error',
      status: 400,
      message: { err: error.message },
    });
  })
};

module.exports = lyricsapiController;
