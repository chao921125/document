const express = require('express');
const fs = require('fs');
const Move = require('./src/Move');
const data = require('./src/data');

const app = express();

app.use(express.static('./static'));


// "canvas": "^2.8.0",
// "express": "^4.17.1",
// "ffmpeg-stream": "^0.7.0",
// "spritejs": "^3.7.38"




app.get('/', (req, res) => {

    console.log(1111);
    const move = new Move({ data });
    const layer = move.play();
    move.recording();
    // move.createSnapshot();
    res.send('create page');
});






app.listen('3000', () => {
    console.log('server is run ok');
});