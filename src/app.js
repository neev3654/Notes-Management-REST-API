const express = require('express');
const noteRoutes = require('./routes/note.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

module.exports = app;