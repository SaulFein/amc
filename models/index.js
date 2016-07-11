'use strict';

let mongoose = require('mongoose');
let config = require(__dirname + '/../config/env.js');

// mongoose.connect(config.MONGOLAB_URI);
mongoose.connect('mongodb://localhost/db');


let models = {};

require(__dirname + '/Cars.js')(mongoose, models);
require(__dirname + '/User.js')(mongoose, models);

module.exports = models;