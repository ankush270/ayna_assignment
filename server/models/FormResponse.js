import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const formResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: [answerSchema],
  createdAt: { type: Date, default: Date.now },
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);
export default FormResponse; 