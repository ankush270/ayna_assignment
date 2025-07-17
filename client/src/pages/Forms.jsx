import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, ListChecks, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Add keyframes for blob animation
const blobStyles = `
@keyframes blobMove1 {
  0%, 100% { transform: translate(-30%,-30%) scale(1); opacity: 0.35; }
  50% { transform: translate(-20%,-40%) scale(1.15); opacity: 0.5; }
}
@keyframes blobMove2 {
  0%, 100% { transform: translate(30%,30%) scale(1); opacity: 0.2; }
  50% { transform: translate(40%,20%) scale(1.1); opacity: 0.35; }
}
@keyframes blobMove3 {
  0%, 100% { transform: translate(0,0) scale(1); opacity: 0.18; }
  50% { transform: translate(-10%,10%) scale(1.2); opacity: 0.28; }
}
`;

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'text', options: ['', ''] },
    { text: '', type: 'text', options: ['', ''] },
    { text: '', type: 'text', options: ['', ''] },
  ]);
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`${backendUrl}/api/forms/mine`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.forms) {
          setForms(data.forms);
        } else {
          setError(data.message || 'Failed to fetch forms');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch forms');
        setLoading(false);
      });
  }, [token, navigate]);

  const handleShare = (formId) => {
    const publicUrl = `${frontendUrl}/public/forms/${formId}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedId(formId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Form creation logic
  const handleAddQuestion = () => {
    if (questions.length < 5) setQuestions([...questions, { text: '', type: 'text', options: ['', ''] }]);
  };
  const handleRemoveQuestion = (idx) => {
    if (questions.length > 3) setQuestions(questions.filter((_, i) => i !== idx));
  };
  const handleQuestionChange = (idx, value) => {
    setQuestions(questions.map((q, i) => (i === idx ? { ...q, text: value } : q)));
  };
  const handleQuestionTypeChange = (idx, type) => {
    setQuestions(questions.map((q, i) =>
      i === idx ? { ...q, type, options: type === 'mcq' ? ['', ''] : ['', ''] } : q
    ));
  };
  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(questions.map((q, i) =>
      i === qIdx
        ? { ...q, options: q.options.map((opt, j) => (j === optIdx ? value : opt)) }
        : q
    ));
  };
  const handleAddOption = (qIdx) => {
    setQuestions(questions.map((q, i) =>
      i === qIdx && q.options.length < 5
        ? { ...q, options: [...q.options, ''] }
        : q
    ));
  };
  const handleRemoveOption = (qIdx, optIdx) => {
    setQuestions(questions.map((q, i) =>
      i === qIdx && q.options.length > 2
        ? { ...q, options: q.options.filter((_, j) => j !== optIdx) }
        : q
    ));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedQuestions = questions.map(q => ({
      text: q.text,
      type: q.type,
      options: q.type === 'mcq' ? q.options.filter(opt => opt.trim() !== '').map(opt => ({ text: opt })) : []
    }));
    try {
      const response = await fetch(`${backendUrl}/api/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: formTitle,
          questions: formattedQuestions,
        }),
      });
      if (!response.ok) {
        alert('Failed to create form');
        return;
      }
      setShowModal(false);
      setFormTitle('');
      setQuestions([
        { text: '', type: 'text', options: ['', ''] },
        { text: '', type: 'text', options: ['', ''] },
        { text: '', type: 'text', options: ['', ''] },
      ]);
      fetch(`${backendUrl}/api/forms/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.forms) {
            setForms(data.forms);
          } else {
            setError(data.message || 'Failed to fetch forms');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch forms');
          setLoading(false);
        });
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated SVG blobs */}
      <motion.svg
        className="absolute top-0 left-0 w-96 h-96 opacity-30 pointer-events-none z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
      >
        <path fill="#a5b4fc" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,68.2,-29.2C72.7,-14.2,74.7,0.8,70.2,13.7C65.7,26.6,54.7,37.4,42.2,47.2C29.7,57,14.8,65.8,-0.7,66.7C-16.2,67.6,-32.4,60.6,-44.2,50.1C-56,39.6,-63.3,25.6,-66.2,10.7C-69.1,-4.2,-67.6,-20.1,-60.7,-32.7C-53.8,-45.3,-41.5,-54.7,-28.1,-62.2C-14.7,-69.7,0,-75.2,14.2,-74.2C28.4,-73.2,56.7,-75.2,44.8,-67.2Z" transform="translate(100 100)" />
      </motion.svg>
      <motion.svg
        className="absolute bottom-0 right-0 w-96 h-96 opacity-20 pointer-events-none z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      >
        <path fill="#f0abfc" d="M38.2,-62.6C51.2,-54.2,63.2,-44.2,68.2,-31.7C73.2,-19.2,71.2,-4.2,66.2,9.7C61.2,23.6,53.2,36.4,41.2,45.2C29.2,54,13.2,58.8,-1.8,61.2C-16.8,63.6,-33.6,63.6,-45.2,54.8C-56.8,46,-63.2,28.4,-65.2,11.2C-67.2,-6,-64.8,-22,-57.8,-34.2C-50.8,-46.4,-39.2,-54.8,-26.2,-62.2C-13.2,-69.6,1.2,-75,15.2,-74.2C29.2,-73.4,58.2,-75.2,38.2,-62.6Z" transform="translate(100 100)" />
      </motion.svg>
      <motion.svg
        className="absolute top-1/2 left-1/2 w-80 h-80 opacity-20 pointer-events-none z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        style={{ transform: 'translate(-50%,-50%)' }}
      >
        <path fill="#fbcfe8" d="M38.2,-62.6C51.2,-54.2,63.2,-44.2,68.2,-31.7C73.2,-19.2,71.2,-4.2,66.2,9.7C61.2,23.6,53.2,36.4,41.2,45.2C29.2,54,13.2,58.8,-1.8,61.2C-16.8,63.6,-33.6,63.6,-45.2,54.8C-56.8,46,-63.2,28.4,-65.2,11.2C-67.2,-6,-64.8,-22,-57.8,-34.2C-50.8,-46.4,-39.2,-54.8,-26.2,-62.2C-13.2,-69.6,1.2,-75,15.2,-74.2C29.2,-73.4,58.2,-75.2,38.2,-62.6Z" transform="translate(100 100)" />
      </motion.svg>
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-100/60 via-white to-purple-100/60 py-12 mb-0 shadow-sm relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Forms</h1>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04 }}
          >
            <PlusCircle className="w-6 h-6" />
            Create New Form
          </motion.button>
        </div>
        {/* Wavy SVG divider removed */}
      </div>
      {/* Forms Grid */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        {forms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/public/hero.svg" alt="No forms" className="w-40 mb-6 opacity-80" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No forms yet</h2>
            <p className="text-gray-500 mb-6">You haven't created any forms. Start by creating your first one!</p>
            <motion.button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.04 }}
            >
              <PlusCircle className="w-5 h-5" />
              Create New Form
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {forms.map((form, idx) => (
              <motion.div
                key={form._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(80,80,200,0.10)' }}
                className={
                  `group cursor-pointer rounded-3xl border border-blue-100 bg-white shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all p-8 flex flex-col gap-4 relative overflow-hidden ` +
                  `duration-200 ease-in-out animate-fade-in-up`
                }
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={e => {
                  if (e.target.closest('.share-btn') || e.target.closest('.view-responses-btn')) return;
                  navigate(`/forms/${form._id}`);
                }}
              >
                {/* Share icon overlay */}
                <motion.button
                  className="share-btn absolute top-4 right-4 p-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 hover:bg-blue-200 shadow-md z-10"
                  title="Share Link"
                  onClick={e => { e.stopPropagation(); handleShare(form._id); }}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Share2 className="w-5 h-5 text-blue-400 group-hover:text-purple-500 transition" />
                  <AnimatePresence>
                    {copiedId === form._id && (
                      <motion.span
                        className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-8 h-8 text-blue-500 group-hover:text-purple-600 transition" />
                  <span className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition">{form.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <ListChecks className="w-5 h-5 text-blue-400" />
                  {form.questions.length} {form.questions.length === 1 ? 'question' : 'questions'}
                </div>
                <button
                  className="view-responses-btn w-full mt-auto flex items-center justify-center gap-2 px-0 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow hover:from-green-600 hover:to-blue-600 transition-all"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/forms/${form._id}`, { state: { openResponses: true } });
                  }}
                >
                  <ListChecks className="w-5 h-5" />
                  View Responses
                </button>
                <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-60 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Floating action button for mobile */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-20 flex sm:hidden items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
      >
        <PlusCircle className="w-6 h-6" />
        New Form
      </button>
      {/* Create Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-blue-600" />
                Create Form
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter form title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
                  <div className="space-y-3">
                    {questions.map((q, idx) => (
                      <div key={idx} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={q.text}
                            onChange={e => handleQuestionChange(idx, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Question ${idx + 1}`}
                            required
                          />
                          <select
                            value={q.type}
                            onChange={e => handleQuestionTypeChange(idx, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none"
                          >
                            <option value="text">Text</option>
                            <option value="mcq">MCQ</option>
                          </select>
                          {questions.length > 3 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {q.type === 'mcq' && (
                          <div className="pl-2">
                            <label className="block text-xs text-gray-500 mb-1">MCQ Options</label>
                            <div className="space-y-2">
                              {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                    placeholder={`Option ${optIdx + 1}`}
                                    required
                                  />
                                  {q.options.length > 2 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveOption(idx, optIdx)}
                                      className="text-red-400 hover:text-red-600"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            {q.options.length < 5 && (
                              <button
                                type="button"
                                onClick={() => handleAddOption(idx)}
                                className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                <PlusCircle className="w-4 h-4" />
                                Add Option
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {questions.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Question
                    </button>
                  )}
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Create Form <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Forms; 