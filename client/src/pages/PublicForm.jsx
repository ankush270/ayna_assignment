import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PublicForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/forms/public/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.form) {
          setForm(data.form);
          setAnswers(data.form.questions.map(() => ''));
        } else {
          setError(data.message || 'Form not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch form');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (idx, value) => {
    setAnswers(prev => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleRadioChange = (idx, value) => {
    setAnswers(prev => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        answers: form.questions.map((q, idx) => ({
          question: q.text,
          answer: answers[idx],
        })),
      };
      const res = await fetch(`http://localhost:5000/api/forms/public/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || 'Failed to submit');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setSubmitError('Failed to submit');
    }
    setSubmitting(false);
  };

  // Progress calculation
  const progress = form && form.questions.length > 0 ? answers.filter(a => a && a.length > 0).length / form.questions.length : 0;

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!form) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated SVG backgrounds */}
      <motion.svg
        className="absolute top-0 right-0 w-80 h-80 opacity-30 pointer-events-none z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      >
        <path fill="#a5b4fc" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,68.2,-29.2C72.7,-14.2,74.7,0.8,70.2,13.7C65.7,26.6,54.7,37.4,42.2,47.2C29.7,57,14.8,65.8,-0.7,66.7C-16.2,67.6,-32.4,60.6,-44.2,50.1C-56,39.6,-63.3,25.6,-66.2,10.7C-69.1,-4.2,-67.6,-20.1,-60.7,-32.7C-53.8,-45.3,-41.5,-54.7,-28.1,-62.2C-14.7,-69.7,0,-75.2,14.2,-74.2C28.4,-73.2,56.7,-75.2,44.8,-67.2Z" transform="translate(100 100)" />
      </motion.svg>
      <motion.svg
        className="absolute bottom-0 left-0 w-96 h-96 opacity-20 pointer-events-none z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
      >
        <path fill="#f0abfc" d="M38.2,-62.6C51.2,-54.2,63.2,-44.2,68.2,-31.7C73.2,-19.2,71.2,-4.2,66.2,9.7C61.2,23.6,53.2,36.4,41.2,45.2C29.2,54,13.2,58.8,-1.8,61.2C-16.8,63.6,-33.6,63.6,-45.2,54.8C-56.8,46,-63.2,28.4,-65.2,11.2C-67.2,-6,-64.8,-22,-57.8,-34.2C-50.8,-46.4,-39.2,-54.8,-26.2,-62.2C-13.2,-69.6,1.2,-75,15.2,-74.2C29.2,-73.4,58.2,-75.2,38.2,-62.6Z" transform="translate(100 100)" />
      </motion.svg>
      <div className="w-full max-w-2xl mx-auto bg-white/95 rounded-3xl shadow-2xl p-6 md:p-10 border border-blue-100 relative my-10">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-blue-100 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-6"
        >
          <motion.img
            src="/form.svg"
            alt="Form Icon"
            className="w-16 h-16 mb-2 drop-shadow-lg"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {form.title}
          </motion.h1>
          <motion.p
            className="text-gray-500 text-center text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Please fill out this form below
          </motion.p>
        </motion.div>
        <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
          <AnimatePresence>
            {form.questions.map((q, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ delay: 0.1 * idx, duration: 0.5, type: 'spring' }}
                className={`p-4 md:p-5 rounded-2xl border border-blue-100 bg-white shadow-sm flex flex-col gap-2 ${submitError ? 'animate-shake' : ''}`}
              >
                <label className="block font-semibold text-gray-800 mb-1">Q{idx + 1}: {q.text}</label>
                {q.type === 'text' ? (
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-base bg-blue-50/60 transition-shadow focus:shadow-lg hover:shadow-md"
                    placeholder="Your answer..."
                    value={answers[idx]}
                    onChange={e => handleChange(idx, e.target.value)}
                    required
                    disabled={success}
                  />
                ) : (
                  <div className="space-y-2">
                    {q.options.map((opt, oidx) => (
                      <label key={oidx} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name={`q${idx}`}
                          id={`q${idx}_opt${oidx}`}
                          className="hidden peer"
                          value={opt.text}
                          checked={answers[idx] === opt.text}
                          onChange={() => handleRadioChange(idx, opt.text)}
                          required
                          disabled={success}
                        />
                        <span className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center transition-all peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-purple-500 peer-checked:border-purple-500">
                          <span className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-all"></span>
                        </span>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="text-center mt-4">
            <motion.button
              type="submit"
              className="px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-60"
              whileTap={{ scale: 0.95 }}
              disabled={submitting || success}
            >
              {success ? 'Submitted!' : submitting ? 'Submitting...' : 'Submit'}
            </motion.button>
            <AnimatePresence>
              {submitError && (
                <motion.div
                  className="text-red-500 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitError}
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="text-green-600 mt-4 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
                  Thank you for your response!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicForm; 