import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, FileText, MessageCircle, PlusCircle, ArrowRight, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const stats = [
  {
    icon: FileText,
    label: 'Total Forms',
    value: 24,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageCircle,
    label: 'Responses',
    value: 187,
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    label: 'Active Users',
    value: 8,
    color: 'from-green-500 to-emerald-500',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'text', options: ['', ''] },
    { text: '', type: 'text', options: ['', ''] },
    { text: '', type: 'text', options: ['', ''] },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

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
    // Prepare questions to match backend schema
    const formattedQuestions = questions.map(q => ({
      text: q.text,
      type: q.type,
      options: q.type === 'mcq' ? q.options.filter(opt => opt.trim() !== '').map(opt => ({ text: opt })) : []
    }));
    try {
      const response = await fetch('http://localhost:5000/api/forms', {
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
        // Optionally handle error
        alert('Failed to create form');
        return;
      }
      // Optionally handle success (e.g., show a message, refresh forms list)
      setShowModal(false);
      setFormTitle('');
      setQuestions([
        { text: '', type: 'text', options: ['', ''] },
        { text: '', type: 'text', options: ['', ''] },
        { text: '', type: 'text', options: ['', ''] },
      ]);
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Ayna User</span>!
          </h1>
          <p className="text-gray-600 text-lg">Here's a quick overview of your form activity and stats.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium shadow hover:bg-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className={`rounded-2xl p-6 shadow-xl bg-gradient-to-br ${stat.color} text-white flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300`}
          >
            <stat.icon className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-lg font-medium opacity-90">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Form
          </button>
          <Link to="/forms" className="flex items-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
            <FileText className="w-5 h-5" />
            View All Forms
          </Link>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">You received 5 new responses on <span className="font-semibold">Customer Feedback</span></span>
              <span className="text-xs text-gray-400">2 min ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">Form <span className="font-semibold">Event Registration</span> was published</span>
              <span className="text-xs text-gray-400">10 min ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">You added a new team member</span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </li>
            <li className="py-3 flex items-center justify-between">
              <span className="text-gray-700">Form <span className="font-semibold">Survey 2024</span> was updated</span>
              <span className="text-xs text-gray-400">Yesterday</span>
            </li>
          </ul>
          <div className="text-right mt-4">
            <Link to="/activity" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View all activity <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

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
                    Create Form <ArrowRight className="w-4 h-4" />
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

export default Dashboard; 