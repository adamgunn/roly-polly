const { Schema, model } = require('mongoose');

const PollData = new Schema({
    _id: String,
    counts: Array,
    comments: Array,
    options: Array,
    colors: Array,
    new_poll: Boolean
})

module.exports = model("PollData", PollData)