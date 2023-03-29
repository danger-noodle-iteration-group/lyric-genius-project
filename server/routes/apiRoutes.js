const express = require('express');
const router = express.Router();
const lyricsapiController = require('../controllers/lyricsapiController');

router.get(
  'getsongs/:page',
  lyricsapiController.getSongs,
  (req, res) => {
    console.log('Lyrics:', res.locals.lyrics);
    return res.status(200).json(res.locals.songs);
  }
);

router.get('getlyrics/:id', lyricsapiController.getLyrics, (req, res) => {
  return res.status(200).json(res.locals.lyrics);
});
module.exports = router;
