const { Schema, model } = require('mongoose');

const PollData = new Schema({
    _id: String,
    counts: Array
})

module.exports = model("PollData", PollData)