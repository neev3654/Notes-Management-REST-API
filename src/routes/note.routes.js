const express = require('express');
const {
  // CRUD
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
  // Route Parameters
  getNotesByCategory,
  getNotesByStatus,
  getNoteSummary,
  // Query Parameters
  filterNotes,
  getPinnedNotes,
  filterByCategory,
  filterByDateRange,
  // Pagination
  paginateNotes,
  paginateByCategory,
  // Sorting
  sortNotes,
  sortPinnedNotes,
} = require('../controllers/note.controller');

const router = express.Router();

// ─────────────────────────────────────────────
// IMPORTANT: Route order matters in Express.
// Specific/static routes MUST come before parameterized
// routes like /:id, otherwise "bulk", "filter", "sort"
// etc. will be treated as an :id value.
// ─────────────────────────────────────────────

// ── CRUD bulk routes (must be before /:id) ──────────────────
// POST /api/notes/bulk — Create multiple notes
router.post('/bulk', createBulkNotes);

// DELETE /api/notes/bulk — Delete multiple notes
router.delete('/bulk', deleteBulkNotes);

// ── SECTION 1: Route Parameters ─────────────────────────────
// GET /api/notes/category/:category — Get notes by category
router.get('/category/:category', getNotesByCategory);

// GET /api/notes/status/:isPinned — Get notes by pinned status
router.get('/status/:isPinned', getNotesByStatus);

// ── SECTION 2: Query Parameters ─────────────────────────────
// GET /api/notes/filter — General filter (category, isPinned)
router.get('/filter', filterNotes);

// GET /api/notes/filter/pinned — Get pinned notes
router.get('/filter/pinned', getPinnedNotes);

// GET /api/notes/filter/category — Filter by category via ?name=
router.get('/filter/category', filterByCategory);

// GET /api/notes/filter/date-range — Filter by date range via ?from= &to=
router.get('/filter/date-range', filterByDateRange);

// ── SECTION 3: Pagination ───────────────────────────────────
// GET /api/notes/paginate — Paginate all notes
router.get('/paginate', paginateNotes);

// GET /api/notes/paginate/category/:category — Paginate by category
router.get('/paginate/category/:category', paginateByCategory);

// ── SECTION 4: Sorting ──────────────────────────────────────
// GET /api/notes/sort — Sort all notes
router.get('/sort', sortNotes);

// GET /api/notes/sort/pinned — Sort pinned notes only
router.get('/sort/pinned', sortPinnedNotes);

// ── CRUD single-item routes (/:id must be LAST) ─────────────
// POST /api/notes — Create a single note
router.post('/', createNote);

// GET /api/notes — Get all notes
router.get('/', getAllNotes);

// GET /api/notes/:id/summary — Get note summary (selected fields)
// Must come before /:id so "summary" path is not treated as :id
router.get('/:id/summary', getNoteSummary);

// GET /api/notes/:id — Get a single note by ID
router.get('/:id', getNoteById);

// PUT /api/notes/:id — Full replace
router.put('/:id', replaceNote);

// PATCH /api/notes/:id — Partial update
router.patch('/:id', updateNote);

// DELETE /api/notes/:id — Delete single note
router.delete('/:id', deleteNote);

module.exports = router;