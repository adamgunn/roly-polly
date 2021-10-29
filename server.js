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
const { syncIndexes } = require('./PollData');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/roly-polly';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get('/new-poll', (req, res) => {
    console.log("redirecting");
    res.redirect(`../${uuid.v4()}`);
});

app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('get-poll', async (pollId) => {
        const poll = await findOrCreatePoll(pollId);
        socket.join(pollId);
        const data = {
            counts_data: poll.counts,
            comments_data: poll.comments,
            options_data: poll.options,
            colors_data: poll.colors,
            title_data: poll.title,
            poll_created_data: poll.poll_created,
        };
        socket.emit('load-poll', data);
        socket.on('send-vote', (counts) => {
            socket.broadcast.to(pollId).emit('receive-vote', counts);
        });
        socket.on('send-comment', (comments) => {
            console.log(comments);
            socket.broadcast.to(pollId).emit('receive-comment', comments);
        });
        socket.on('save-poll', async (data) => {
            await PollData.findByIdAndUpdate(pollId, {
                counts: data.counts_data,
                comments: data.comments_data,
            });
        });
        socket.on('create-poll', async (data) => {
            console.log(data);
            await PollData.findByIdAndUpdate(pollId, {
                counts: data.counts_data,
                comments: data.comments_data,
                options: data.options_data,
                colors: data.colors_data,
                title: data.title_data,
                poll_created: data.poll_created_data,
            });
            socket.broadcast.to(pollId).emit('poll-created', data);
        });
        socket.on('delete-never-created-poll', async (pollId) => {
            if (!PollData.findByIdAndDelete(pollId)) {
                console.log("failed to delete never-created poll on window/tab close");
            }
        });
    });
});

async function findOrCreatePoll(id) {
    if (id == null) return;
    const poll = await PollData.findById(id);
    if (poll) {
        return poll;
    }
    return await PollData.create({
        _id: id,
        counts: [],
        comments: [],
        options: [],
        colors: [],
        title: '',
        poll_created: false,
    });
}
