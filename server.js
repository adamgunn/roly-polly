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
const uri = process.env.MONGODB_URI || 'mongodb://localhost/roly-polly';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/static', express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit-new-poll', async (req, res) => {
    const new_uuid = uuid.v4();
    var form_data = req.body;
    if (
        !form_data.title ||
        form_data.title == '' ||
        form_data.title == null
    ) {
        form_data.title = 'My awesome poll';
    }
    var title = form_data.title;
    if (
        !form_data.colors_input ||
        form_data.colors_input == '' ||
        form_data.colors_input == null
    ) {
        form_data.colors_input = '#8b0000 #ffd700 #006400 #4169e1';
    }
    var colors = form_data.colors_input.match(
        /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi
    );
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
        colors: colors,
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
});
