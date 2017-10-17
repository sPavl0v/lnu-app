'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: {type: String, required: true },
  photo: {type: String, required: true },
  likes: {type: Number},
  subscribed: {type: Number, default: 0}
});


module.exports = mongoose.model('Event', EventSchema);