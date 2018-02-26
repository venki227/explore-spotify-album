import express from 'express';
import request from 'request';
import fetch from 'node-fetch';

import SpotifyApi from './spotify-api.mjs';

// Get the instance of spotifyapi
const spotifyApi =  new SpotifyApi();

const PORT = 5000;

const app = express();
const router = express.Router();
app.use('/api', router);

// Start the server after getting access token
spotifyApi.getAccessToken().then((res) => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch((err) => {
  console.log(`Failed to get access token: ${err}`);
});


// Middleware that intercept albums by artists
router.get('/artists/:artistId/albums', (req, res) => {
  const offset = req.query.offset | 0;
  const limit = req.query.limit | 50;
  console.log(offset);
  spotifyApi.getAlbumsForArtists(req.params.artistId, offset, limit).then(response => {
    res.json(response);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// GET API to search based on artist name
router.get('/artists', (req, res) => {
  spotifyApi.getArtists(req.query.query).then(response => {
    res.send(response);
  }).catch((err) => {
    res.status(500).send(err);
  });
});





