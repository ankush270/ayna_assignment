import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileText, PlusCircle, ListChecks } from 'lucide-react';

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:5000/api/forms/mine', {
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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <FileText className="w-7 h-7 text-blue-600" />
          Your Forms
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Form
        </button>
      </div>
      {forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <img src="/public/hero.svg" alt="No forms" className="w-40 mb-6 opacity-80" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No forms yet</h2>
          <p className="text-gray-500 mb-6">You haven't created any forms. Start by creating your first one!</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Form
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {forms.map(form => (
            <div
              key={form._id}
              className="group cursor-pointer rounded-2xl border border-blue-100 bg-white shadow-md hover:shadow-xl hover:border-blue-400 transition-all p-6 flex flex-col gap-3 relative overflow-hidden"
              onClick={() => navigate(`/forms/${form._id}`)}
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-7 h-7 text-blue-500 group-hover:text-purple-600 transition" />
                <span className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition">{form.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ListChecks className="w-4 h-4 text-blue-400" />
                {form.questions.length} {form.questions.length === 1 ? 'question' : 'questions'}
              </div>
              <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-60 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forms; 