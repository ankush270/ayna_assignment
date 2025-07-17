import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, FileText, MessageCircle, PlusCircle, ArrowRight, LogOut, X, ListChecks, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase();
};

const userName = 'Ayna User';

// AnimatedNumber component
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = display;
    let end = value;
    if (start === end) return;
    let raf;
    const duration = 600;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.floor(start + (end - start) * progress));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{display}</span>;
};

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
  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState(null);
  const [stats, setStats] = useState({ forms: 0, responses: 0, users: 1 });
  const [fabOpen, setFabOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

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
        setFormError(true);
        setTimeout(() => setFormError(false), 800);
        alert('Failed to create form');
        return;
      }
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setShowModal(false);
        setFormTitle('');
        setQuestions([
          { text: '', type: 'text', options: ['', ''] },
          { text: '', type: 'text', options: ['', ''] },
          { text: '', type: 'text', options: ['', ''] },
        ]);
        setFormStep(1);
      }, 1200);
    } catch (err) {
      setFormError(true);
      setTimeout(() => setFormError(false), 800);
      alert('Server error. Please try again.');
    }
  };

  // Fetch dynamic activity (simulate with forms/responses if no /api/activity endpoint)
  useEffect(() => {
    const fetchActivity = async () => {
      setActivityLoading(true);
      setActivityError(null);
      try {
        // Simulate: fetch forms and responses, build activity feed
        const formsRes = await fetch('http://localhost:5000/api/forms/mine', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const formsData = await formsRes.json();
        let activityArr = [];
        if (formsData.forms) {
          for (const form of formsData.forms) {
            // Form created
            activityArr.push({
              type: 'form_created',
              formTitle: form.title,
              time: form.createdAt,
            });
            // Fetch responses for each form
            const respRes = await fetch(`http://localhost:5000/api/forms/${form._id}/responses`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            const respData = await respRes.json();
            if (respData.responses && respData.responses.length > 0) {
              // New responses
              const sorted = respData.responses.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              // Only show the most recent response event for each form
              activityArr.push({
                type: 'new_responses',
                formTitle: form.title,
                count: respData.responses.length,
                time: sorted[0].createdAt,
              });
            }
          }
        }
        // Sort by time desc
        activityArr.sort((a, b) => new Date(b.time) - new Date(a.time));
        setActivity(activityArr.slice(0, 6));
      } catch (err) {
        setActivityError('Failed to load activity');
      }
      setActivityLoading(false);
    };
    fetchActivity();
    // eslint-disable-next-line
  }, [token]);

  // Fetch dynamic stats
  useEffect(() => {
    const fetchStats = async () => {
      let formsCount = 0;
      let responsesCount = 0;
      let usersCount = 1; // Simulate 1 active user (current user)
      try {
        const formsRes = await fetch('http://localhost:5000/api/forms/mine', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const formsData = await formsRes.json();
        if (formsData.forms) {
          formsCount = formsData.forms.length;
          for (const form of formsData.forms) {
            const respRes = await fetch(`http://localhost:5000/api/forms/${form._id}/responses`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            const respData = await respRes.json();
            if (respData.responses) {
              responsesCount += respData.responses.length;
            }
          }
        }
        // If you have a user API, fetch usersCount here
      } catch (err) {
        // ignore errors for stats
      }
      setStats({ forms: formsCount, responses: responsesCount, users: usersCount });
    };
    fetchStats();
    // eslint-disable-next-line
  }, [token]);

  // Helper for time ago
  const timeAgo = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 relative overflow-hidden">
      {/* Decorative SVG backgrounds */}
      <svg className="absolute top-0 right-0 w-72 h-72 opacity-20 pointer-events-none z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#a5b4fc" d="M44.8,-67.2C56.7,-59.2,63.7,-44.2,68.2,-29.2C72.7,-14.2,74.7,0.8,70.2,13.7C65.7,26.6,54.7,37.4,42.2,47.2C29.7,57,14.8,65.8,-0.7,66.7C-16.2,67.6,-32.4,60.6,-44.2,50.1C-56,39.6,-63.3,25.6,-66.2,10.7C-69.1,-4.2,-67.6,-20.1,-60.7,-32.7C-53.8,-45.3,-41.5,-54.7,-28.1,-62.2C-14.7,-69.7,0,-75.2,14.2,-74.2C28.4,-73.2,56.7,-75.2,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-80 h-80 opacity-10 pointer-events-none z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f0abfc" d="M38.2,-62.6C51.2,-54.2,63.2,-44.2,68.2,-31.7C73.2,-19.2,71.2,-4.2,66.2,9.7C61.2,23.6,53.2,36.4,41.2,45.2C29.2,54,13.2,58.8,-1.8,61.2C-16.8,63.6,-33.6,63.6,-45.2,54.8C-56.8,46,-63.2,28.4,-65.2,11.2C-67.2,-6,-64.8,-22,-57.8,-34.2C-50.8,-46.4,-39.2,-54.8,-26.2,-62.2C-13.2,-69.6,1.2,-75,15.2,-74.2C29.2,-73.4,58.2,-75.2,38.2,-62.6Z" transform="translate(100 100)" />
      </svg>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          {/* Logo Avatar */}
          <img src="/logo.svg" alt="Ayna Logo" className="w-14 h-14 " />
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              Welcome back, <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{userName}</span>!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="text-gray-600 text-lg"
            >
              Here's a quick overview of your form activity and stats.
            </motion.p>
          </div>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
          className="rounded-2xl p-6 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
        >
          <FileText className="w-10 h-10 mb-4" />
          <div className="text-3xl font-bold mb-1">
            <AnimatedNumber value={stats.forms} />
          </div>
          <div className="text-lg font-medium opacity-90">Total Forms</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
          className="rounded-2xl p-6 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
        >
          <MessageCircle className="w-10 h-10 mb-4" />
          <div className="text-3xl font-bold mb-1">
            <AnimatedNumber value={stats.responses} />
          </div>
          <div className="text-lg font-medium opacity-90">Responses</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
          className="rounded-2xl p-6 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
        >
          <Users className="w-10 h-10 mb-4" />
          <div className="text-3xl font-bold mb-1">
            <AnimatedNumber value={stats.users} />
          </div>
          <div className="text-lg font-medium opacity-90">Active Users</div>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Actions Card (restored) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 z-10"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Form
          </button>
          <button
            onClick={() => navigate('/forms')}
            className="flex items-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
          >
            <FileText className="w-5 h-5" />
            View All Forms
          </button>
          <button
            onClick={() => navigate('/forms')}
            className="flex items-center gap-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all"
          >
            <ListChecks className="w-5 h-5" />
            View All Responses
          </button>
        </motion.div>
        {/* Recent Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {activityLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : activityError ? (
            <div className="text-red-500">{activityError}</div>
          ) : (
            <div className="relative pl-8">
              {/* Vertical timeline line */}
              <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 to-purple-200 rounded-full" />
              {activity.length === 0 && <div className="py-3 text-gray-500">No recent activity.</div>}
              <ul className="space-y-6">
                {activity.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5, type: 'spring' }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Timeline icon */}
                    <span className="absolute -left-8 top-1.5 bg-white rounded-full shadow p-1">
                      {item.type === 'form_created' ? (
                        <FileText className="w-6 h-6 text-blue-500" />
                      ) : (
                        <MessageCircle className="w-6 h-6 text-purple-500" />
                      )}
                    </span>
                    <div className="flex-1">
                      <span className="text-gray-700">
                        {item.type === 'form_created' && (
                          <>
                            Form <span className="font-semibold">{item.formTitle}</span> was created
                          </>
                        )}
                        {item.type === 'new_responses' && (
                          <>
                            You received <span className="font-semibold">{item.count} new response{item.count > 1 ? 's' : ''}</span> on <span className="font-semibold">{item.formTitle}</span>
                          </>
                        )}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">{timeAgo(item.time)}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setFabOpen(v => !v)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-5 shadow-lg hover:scale-110 transition flex items-center justify-center"
          aria-label="Quick Actions"
        >
          <PlusCircle className="w-8 h-8 text-white" />
        </motion.button>
        <AnimatePresence>
          {fabOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute bottom-20 right-0 flex flex-col gap-4 bg-white rounded-xl shadow-xl p-4"
            >
              <button
                onClick={() => { setShowModal(true); setFabOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                title="Create New Form"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="hidden md:inline">Create New Form</span>
              </button>
              <button
                onClick={() => { navigate('/forms'); setFabOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                title="View All Forms"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden md:inline">View All Forms</span>
              </button>
              <button
                onClick={() => { navigate('/forms'); setFabOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-green-600 hover:bg-green-50 transition"
                title="View All Responses"
              >
                <ListChecks className="w-5 h-5" />
                <span className="hidden md:inline">View All Responses</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
              className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative ${formError ? 'animate-shake' : ''}`}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Stepper/Progress Bar */}
              <div className="flex items-center mb-6 gap-4">
                <div className={`flex-1 h-2 rounded-full ${formStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full ${formStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-blue-600" />
                Create Form
              </h2>
              {formSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <div className="text-xl font-semibold text-green-600">Form Created!</div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter form title"
                        required
                      />
                      <div className="flex justify-end mt-4">
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
                          disabled={!formTitle.trim()}
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}
                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
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
                      <div className="flex justify-between mt-4">
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          Create Form <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard; 