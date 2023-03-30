const axios = require('axios');
const { raw } = require('express');
require('dotenv').config();

const apikey = '5ad5bdc4bff41e453be25e947abfd440' // defined in .env
axios.defaults.baseURL = 'https://api.musixmatch.com/ws/1.1/'; // potentially just have one url variable which is baseURL + endpoint

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
  axios('track.search', {params})
  .then(function(info) {
    
    const { track_list } = info.data.message.body;
    
    const clean_track_list = track_list.filter(el => el.track.explicit === 0)
    //console.log(clean_track_list);
    res.locals.songs = clean_track_list.map(el => {
      
      return {
        track_id: el.track.track_id,
        track_name: el.track.track_name,
        artist_name: el.track.artist_name
      }
    })
    //console.log(res.locals.songs)
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

axios('track.lyrics.get', {params})
  .then(function(info) {
    const rawLyrics = info.data.message.body.lyrics.lyrics_body.split('\n');
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
    console.log(lyrics)
    res.locals.lyrics = jumbledLyrics.join(' \n ')
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
