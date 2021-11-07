const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);
const mongoose = require('mongoose');
const PollData = require('./PollData');
const uuid = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const SpotifyWebApi = require('spotify-web-api-node');
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
];

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
spotifyApi.clientCredentialsGrant().then(
    (data) => {
        console.log('Access token expires in: ' + data.body['expires_in']);
        console.log('Access token:' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    (err) => {
        console.log('Failed to retrieve access token\n', err);
    }
);

const mongouri = process.env.MONGODB_URI || 'mongodb://localhost/roly-polly';
mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/search-album', async (req, res) => {
});

app.post('/submit-new-poll', async (req, res) => {
    const new_uuid = uuid.v4();
    var form_data = req.body;
    if (!form_data.title || form_data.title == '' || form_data.title == null) {
        form_data.title = 'My awesome poll';
    }
    var title = form_data.title;
    form_data.colors = JSON.parse(form_data.colors);
    if (form_data.colors.empty) {
        form_data.colors = ['#8b0000', '#ffd700', '#006400', '#4169e1'];
    }
    var options = [];
    if (
        !form_data.num_options ||
        form_data.num_options == '' ||
        form_data.num_options == null
    ) {
        form_data.num_options = 2;
    }
    for (var i = 0; i < form_data.num_options; i++) {
        options.push(form_data['option_' + i]);
    }
    var counts_empty = [];
    for (var i = 0; i < options.length; i++) {
        counts_empty.push(0);
    }
    const new_poll = {
        _id: new_uuid,
        counts: counts_empty,
        comments: [],
        options: options,
        colors: form_data.colors,
        title: title,
    };
    console.log(new_poll);
    await PollData.create(new_poll);
    res.redirect(`/polls/${new_uuid}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get('/new-poll', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get('/polls/:id', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get('/:page', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('get-poll', async (pollId) => {
        const poll = await PollData.findById(pollId);
        socket.join(pollId);
        if (!poll) socket.broadcast.to(pollId).emit('not-found');
        const data = {
            counts_data: poll.counts,
            comments_data: poll.comments,
            options_data: poll.options,
            colors_data: poll.colors,
            title_data: poll.title,
        };
        socket.emit('load-poll', data);
        socket.on('send-vote', (counts) => {
            socket.broadcast.to(pollId).emit('receive-vote', counts);
        });
        socket.on('send-comment', (comments) => {
            socket.broadcast.to(pollId).emit('receive-comment', comments);
        });
        socket.on('save-poll', async (data) => {
            await PollData.findByIdAndUpdate(pollId, {
                counts: data.counts_data,
                comments: data.comments_data,
            });
        });
    });
    socket.on('search-albums', async (query) => {
        var artist_query = query.artist;
        var album_query = query.album;
        spotifyApi.searchAlbums(`album:${album_query} artist:${artist_query}`).then(
            function (data) {
                if (data.body.albums.items[0]) {
                    socket.emit('album-found', data.body.albums.items[0].images[1].url);
                } else {
                    socket.emit('album-not-found');
                }
            },
            function (err) {
                socket.emit('error', err);
            }
        );
    });
});
