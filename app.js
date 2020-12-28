const express = require('express');
const app = express();
const staticConfig = require('./config/static-files');

staticConfig(express, app);
module.exports = app;