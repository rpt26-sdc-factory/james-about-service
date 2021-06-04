const mongoose = require('mongoose');

const mongoURI = process.env.ABOUT_MONGODB_URI + '/' + process.env.ABOUT_DATABASE;

const db = mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = db;
