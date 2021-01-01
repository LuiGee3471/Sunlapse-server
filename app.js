const e = require('express');
const express = require('express');
const app = express();
const staticConfig = require('./config/static-files');
const ajaxRouter = require('./routers/ajaxRouter');

staticConfig(express, app);
ajaxRouter(express, app);
module.exports = app;