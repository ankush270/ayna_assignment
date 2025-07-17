import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Share2, ListChecks, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const FormDetails = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [responses, setResponses] = useState([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [responsesError, setResponsesError] = useState(null);
  const [responsesTab, setResponsesTab] = useState('tabular');
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:5000/api/forms/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.form) {
          setForm(data.form);
        } else {
          setError(data.message || 'Failed to fetch form');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch form');
        setLoading(false);
      });
  }, [id, token, navigate]);

  // Open responses modal if navigated with state
  useEffect(() => {
    if (location.state && location.state.openResponses) {
      handleViewResponses();
    }
    // eslint-disable-next-line
  }, [location.state]);

  const handleShare = () => {
    const publicUrl = `${window.location.origin}/public/forms/${id}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewResponses = async () => {
    setShowResponses(true);
    setLoadingResponses(true);
    setResponsesError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/forms/${id}/responses`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setResponsesError(data.message || 'Failed to fetch responses');
      } else {
        setResponses(data.responses);
      }
    } catch (err) {
      setResponsesError('Failed to fetch responses');
    }
    setLoadingResponses(false);
  };

  // Helper for summary view (for MCQ: count answers)
  const getSummary = () => {
    if (!form) return [];
    return form.questions.map((q, idx) => {
      const answers = responses.map(r => r.answers[idx]?.answer).filter(Boolean);
      let summary = null;
      if (q.type === 'mcq') {
        const counts = {};
        answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
        summary = Object.entries(counts).map(([opt, count]) => ({ opt, count }));
      }
      return { question: q.text, type: q.type, answers, summary };
    });
  };

  // CSV export logic
  const handleExportCSV = () => {
    if (!form || !responses.length) return;
    const header = [
      'No.',
      ...form.questions.map(q => q.text),
      'Submitted'
    ];
    const rows = responses.map((resp, rIdx) => [
      rIdx + 1,
      ...form.questions.map((q, qIdx) => resp.answers[qIdx]?.answer || '-'),
      new Date(resp.createdAt).toLocaleString()
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
      .join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title.replace(/\s+/g, '_')}_responses.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!form) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden py-10">
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
      <div className="w-full max-w-5xl mx-auto bg-white/95 rounded-3xl shadow-2xl p-0 md:p-0 border border-blue-100 relative my-10 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
          {/* Left: Form Info & Actions */}
          <div className="md:w-1/3 w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 flex flex-col items-center justify-center gap-6 shadow-md">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mb-2">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-2xl font-extrabold text-gray-900 text-center mb-2">{form.title}</h1>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all relative w-full"
              >
                <Share2 className="w-5 h-5" />
                Share Link
                {copied && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1">Copied!</span>
                )}
              </button>
              <button
                onClick={handleViewResponses}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition-all w-full"
              >
                <ListChecks className="w-5 h-5" />
                View Responses
              </button>
            </div>
          </div>
          {/* Right: Questions */}
          <div className="md:w-2/3 w-full p-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Questions</h2>
            <ul className="space-y-6">
              {form.questions.map((q, idx) => (
                <li key={idx} className="p-5 rounded-2xl border border-blue-100 bg-blue-50/60 shadow flex flex-col gap-1 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-gray-900">Q{idx + 1}: {q.text}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Type: <span className="capitalize font-medium">{q.type}</span></div>
                  {q.type === 'mcq' && q.options && q.options.length > 0 && (
                    <ul className="list-disc pl-6 text-gray-700">
                      {q.options.map((opt, oidx) => (
                        <li key={oidx}>{opt.text}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Responses Modal/Section */}
        {showResponses && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowResponses(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowResponses(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-blue-600" />
                Responses
              </h2>
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${responsesTab === 'tabular' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
                  onClick={() => setResponsesTab('tabular')}
                >
                  Tabular View
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${responsesTab === 'summary' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
                  onClick={() => setResponsesTab('summary')}
                >
                  Summary View
                </button>
                {responsesTab === 'tabular' && responses.length > 0 && (
                  <button
                    onClick={handleExportCSV}
                    className="ml-auto px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white shadow hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    Export CSV
                  </button>
                )}
              </div>
              {loadingResponses ? (
                <div>Loading...</div>
              ) : responsesError ? (
                <div className="text-red-500">{responsesError}</div>
              ) : responses.length === 0 ? (
                <div className="text-gray-500">No responses yet.</div>
              ) : responsesTab === 'tabular' ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 border-b text-left">#</th>
                        {form.questions.map((q, idx) => (
                          <th key={idx} className="p-2 border-b text-left">{q.text}</th>
                        ))}
                        <th className="p-2 border-b text-left">Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responses.map((resp, rIdx) => (
                        <tr key={resp._id || rIdx} className="even:bg-blue-50/40">
                          <td className="p-2 border-b">{rIdx + 1}</td>
                          {form.questions.map((q, qIdx) => (
                            <td key={qIdx} className="p-2 border-b">{resp.answers[qIdx]?.answer || '-'}</td>
                          ))}
                          <td className="p-2 border-b text-xs text-gray-500">{new Date(resp.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {getSummary().map((q, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                      <div className="font-semibold mb-2">Q{idx + 1}: {q.question}</div>
                      {q.type === 'mcq' && q.summary ? (
                        <ul className="list-disc pl-6">
                          {q.summary.map((opt, oidx) => (
                            <li key={oidx}>{opt.opt} <span className="text-xs text-gray-500">({opt.count})</span></li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="list-disc pl-6">
                          {q.answers.map((a, aidx) => (
                            <li key={aidx}>{a}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDetails; 