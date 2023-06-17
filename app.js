const express = require('express');
const app = express();
const router = require('./routers');
const {errorHandler} = require('./errorHandler');

app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

module.exports = app;