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
    message: 'Welcome to Notes Management REST API — Assignment 02',
    data: {
      guide: 'Use Postman or any API client to interact with this API.',
      endpoints: {
        // CRUD
        createNote:       'POST   /api/notes',
        createBulkNotes:  'POST   /api/notes/bulk',
        getAllNotes:       'GET    /api/notes',
        getNoteById:      'GET    /api/notes/:id',
        replaceNote:      'PUT    /api/notes/:id',
        updateNote:       'PATCH  /api/notes/:id',
        deleteNote:       'DELETE /api/notes/:id',
        deleteBulkNotes:  'DELETE /api/notes/bulk',
        // Route Parameters
        getNotesByCategory: 'GET /api/notes/category/:category',
        getNotesByStatus:   'GET /api/notes/status/:isPinned',
        getNoteSummary:     'GET /api/notes/:id/summary',
        // Query Parameters
        filterNotes:       'GET /api/notes/filter',
        getPinnedNotes:    'GET /api/notes/filter/pinned',
        filterByCategory:  'GET /api/notes/filter/category?name=work',
        filterByDateRange: 'GET /api/notes/filter/date-range?from=2024-01-01&to=2024-12-31',
        // Pagination
        paginateNotes:      'GET /api/notes/paginate?page=1&limit=10',
        paginateByCategory: 'GET /api/notes/paginate/category/:category?page=1&limit=5',
        // Sorting
        sortNotes:       'GET /api/notes/sort?sortBy=title&order=asc',
        sortPinnedNotes: 'GET /api/notes/sort/pinned?sortBy=createdAt&order=desc',
      },
    },
  });
});

module.exports = app;