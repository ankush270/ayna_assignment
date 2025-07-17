import express from 'express';
import Form from '../models/Form.js';
import FormResponse from '../models/FormResponse.js';
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

// GET /api/forms/public/:id - public access to a form (no auth required)
router.get('/public/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    // Optionally, you can filter out sensitive fields if needed
    res.json({ form });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/forms/public/:id/submit - submit a public form response
router.post('/public/:id/submit', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    const { answers } = req.body;
    if (!Array.isArray(answers) || answers.length !== form.questions.length) {
      return res.status(400).json({ message: 'Invalid answers' });
    }
    // Optionally, validate each answer
    const response = new FormResponse({
      form: form._id,
      answers,
    });
    await response.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/forms/:id/responses - get all responses for a form (only for creator)
router.get('/:id/responses', authenticateToken, async (req, res) => {
  try {
    const form = await Form.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found or not authorized' });
    }
    const responses = await FormResponse.find({ form: form._id }).sort({ createdAt: -1 });
    res.json({ responses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router; 