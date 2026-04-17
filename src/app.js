const express = require('express');
const noteRoutes = require('./routes/note.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Notes Management REST API!',
    data: {
      guide: 'Please use an API client like Postman to interact with this API.',
      endpoints: {
        docs: 'Detailed documentation is in the repository README',
        createNote: 'POST /api/notes',
        createBulkNotes: 'POST /api/notes/bulk',
        getAllNotes: 'GET /api/notes',
        getNoteById: 'GET /api/notes/:id',
        replaceNote: 'PUT /api/notes/:id',
        updateNote: 'PATCH /api/notes/:id',
        deleteNote: 'DELETE /api/notes/:id',
        deleteBulkNotes: 'DELETE /api/notes/bulk'
      }
    }
  });
});

module.exports = app;