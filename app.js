const express = require('express');
const app = express();
const staticConfig = require('./config/static-files');
const ajaxRouter = require('./routers/ajaxRouter');
const videoRouter = require('./routers/videoRouter');

staticConfig(express, app);
ajaxRouter(express, app);
videoRouter(express, app);
module.exports = app;