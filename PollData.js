const { Schema, model } = require('mongoose');

const PollData = new Schema({
    _id: String,
    counts: Array,
    comments: Array,
    options: Array,
    colors: Array,
    title: String,
});

module.exports = model('PollData', PollData);
