const express = require('express');
const cors = require('cors');
const config = require('./src/config/env');
const ApiError = require('./src/utils/ApiError');
const httpStatus = require('http-status');
const routes = require('./src/routes/router');
const mongoose = require('mongoose');

mongoose.pluralize(null);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin: [process.env.NODE_ENV === 'development' ? process.env.CLIENT_API_DEV : process.env.CLIENT_API_PROD],
	credentials: true,
}));

app.use('/', routes);

app.use((_, _, next) => {
	next(new ApiError(httpStatus.status.NOT_FOUND, 'Not Found'));
});

module.exports = app;