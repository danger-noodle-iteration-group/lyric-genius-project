const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.LYRICS_API_KEY; // defined in .env
const baseUrl = 'https://api.musixmatch.com/ws/1.1/'; // potentially just have one url variable which is baseURL + endpoint
const endpoint = 'matcher.lyrics.get';

const lyricsapiController = {};

lyricsapiController.getLyrics = async (req, res, next) => {
  try {
    const { songname, artist, trackId } = req.body;
    const params = {
      q_track: songname,
      q_artist: artist,
      apikey: apiKey,
    };

    const response = await axios.get(baseUrl + endpoint, { params });

    if (response.status === 200) {
      const lyrics = response.data.message.body.lyrics;

      if (lyrics) {
        const lyricsBody = lyrics.lyrics_body;
        //console.log(lyricsBody)
        // console.log('Lyrics:\n', lyricsBody);
        res.locals.lyrics = lyricsBody;
        res.locals.artist = artist;
        res.locals.songname = songname;
        res.locals.trackId = trackId;
        return next();
      } else {
        console.log('No lyrics found');
        throw new Error('No lyrics found'); // return specific error in object format
      }
    } else {
      console.log('An error occurred:', response.status);
      throw new Error('API request failed'); // return specific error in object format
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    return next(error);
  }
};

module.exports = lyricsapiController;
