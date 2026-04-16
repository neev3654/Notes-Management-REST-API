const express = require('express');
const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
} = require('../controllers/note.controller');

const router = express.Router();

// POST /api/notes - Create a single note
router.post('/', createNote);

// POST /api/notes/bulk - Create multiple notes
router.post('/bulk', createBulkNotes);

// GET /api/notes - Get all notes
router.get('/', getAllNotes);

// GET /api/notes/:id - Get a single note by ID
router.get('/:id', getNoteById);

// PUT /api/notes/:id - Replace a note completely
router.put('/:id', replaceNote);

// PATCH /api/notes/:id - Update specific fields only
router.patch('/:id', updateNote);

// DELETE /api/notes/:id - Delete a single note
router.delete('/:id', deleteNote);

// DELETE /api/notes/bulk - Delete multiple notes
router.delete('/bulk', deleteBulkNotes);

module.exports = router;