import express from 'express';
import Form from '../models/Form.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/forms
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const form = new Form({ title, questions, createdBy: req.user.userId });
    await form.save();
    res.status(201).json({ message: 'Form created', form });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/forms/mine - get forms created by the authenticated user
router.get('/mine', authenticateToken, async (req, res) => {
  try {
    const forms = await Form.find({ createdBy: req.user.userId });
    res.json({ forms });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/forms/:id - get details of a single form (only if created by user)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const form = await Form.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json({ form });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router; 