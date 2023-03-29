const express = require('express');
const router = express.Router();
const gptapiController = require('../controllers/gptapiController');
const lyricsapiController = require('../controllers/lyricsapiController');
const databaseController = require('../controllers/databaseController');

router.get(
  '/getsongs/:page',
  lyricsapiController.getSongs,
  (req, res) => {
    console.log('Lyrics:', res.locals.lyrics);
    return res.status(200).json(res.locals.songs);
  }
);

router.get('/getlyrics/:id', databaseController.getLyrics, (req, res) => {
  return res.status(200).json(res.locals.lyrics);
});
module.exports = router;
