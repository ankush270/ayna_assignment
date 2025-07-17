import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FormDetails = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token');
  const navigate = useNavigate();

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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!form) return null;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      <ul className="space-y-6">
        {form.questions.map((q, idx) => (
          <li key={idx} className="p-4 border rounded-lg bg-white shadow">
            <div className="font-medium mb-2">Q{idx + 1}: {q.text}</div>
            <div className="text-sm text-gray-600 mb-1">Type: {q.type}</div>
            {q.type === 'mcq' && q.options && q.options.length > 0 && (
              <ul className="list-disc pl-6">
                {q.options.map((opt, oidx) => (
                  <li key={oidx}>{opt.text}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDetails; 