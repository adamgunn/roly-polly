const { Schema, model } = require('mongoose');

const PollData = new Schema({
    _id: String,
    counts: Array,
    comments: Array
})

module.exports = model("PollData", PollData)