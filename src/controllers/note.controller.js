const Note = require('../models/note.model');

// Create a single note
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Create multiple notes
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    // Validation
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Notes array is required and must not be empty',
        data: null,
      });
    }

    for (const note of notes) {
      if (!note.title || !note.content) {
        return res.status(400).json({
          success: false,
          message: 'Each note must have title and content',
          data: null,
        });
      }
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note fetched successfully',
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Replace a note completely (PUT)
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, overwrite: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note replaced successfully',
      data: note,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Update specific fields only (PATCH)
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid note ID',
        data: null,
      });
    }

    // Check if body is empty
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided to update',
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Delete a single note
const deleteNote = async (req, res) => {
  try {
    // Implementation here
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

// Delete multiple notes
const deleteBulkNotes = async (req, res) => {
  try {
    // Implementation here
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
};