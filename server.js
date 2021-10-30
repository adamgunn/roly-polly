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
    form_data = JSON.parse(form_data.submission_data);
    var counts_empty = [];
    for (var i = 0; i < form_data.options.length; i++) {
        counts_empty.push(0);
    }
    await PollData.create({
        _id: new_uuid,
        counts: counts_empty,
        comments: [],
        options: form_data.options,
        colors: form_data.colors,
        title: form_data.title,
    });
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
