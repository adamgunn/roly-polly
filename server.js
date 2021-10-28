const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);
const mongoose = require("mongoose");
const PollData = require("./PollData");
const uuid = require("uuid");
const uri = process.env.MONGODB_URI || "mongodb://localhost/rolly-polly";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/static', express.static(path.join(__dirname, "dist")));

app.get("/polls/:id", (req, res) => {
    res.sendFile(path.join(__dirname, INDEX));
});

app.get("/", (req, res) => {
    res.redirect(`/polls/${uuid.v4()}`);
});

io.on('connection', (socket) => {
    console.log("connected");
    socket.on("get-poll", async pollId => {
        const poll = await findOrCreatePoll(pollId);
        console.log(poll)
        socket.join(pollId);
        const data = {
            counts_data: poll.counts,
            comments_data: poll.comments
        }
        console.log(data);
        socket.emit('load-poll', data);
        socket.on('send-vote', counts => {
            socket.broadcast.to(pollId).emit('receive-vote', counts);
        });
        socket.on('send-comment', comments => {
            console.log(comments);
            socket.broadcast.to(pollId).emit('receive-comment', comments);
        });
        socket.on('save-poll', async data => {
            await PollData.findByIdAndUpdate(pollId, { counts: data.counts_data, 
                                                       comments: data.comments_data });
        })
    })
})

async function findOrCreatePoll(id) {
    console.log(id);
    if (id == null) return;
    const poll = await PollData.findById(id);
    if (poll) {
        return poll;
    }
    return await PollData.create({
        _id: id,
        counts: [0,0,0,0],
        comments: [],
        new_poll: true
    })
}
