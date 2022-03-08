const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const layoutRouter = require('./layoutRouter')
const registerRouter = require('../api/registerRouter');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use("/api/v1/layout", layoutRouter);
app.use("/api/v1/registration", registerRouter);

module.exports = app