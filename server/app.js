const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

module.exports = app;