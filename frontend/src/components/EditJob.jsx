import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import GoBackButton from './GoBackButton';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    requirements: '',
    salaryRange: {
      min: '',
      max: '',
      currency: 'INR',
    },
    type: 'full-time',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_JOBS_ENDPOINT}/${jobId}`);
        const data = await response.json();

        if (response.ok) {
          const job = data.job;
          setFormData({
            title: job.title || '',
            description: job.description || '',
            location: job.location || '',
            requirements: job.requirements || '',
            salaryRange: {
              min: job.salaryRange?.min || '',
              max: job.salaryRange?.max || '',
              currency: job.salaryRange?.currency || 'INR',
            },
            type: job.type || 'full-time',
          });
        } else {
          toast.error('Failed to fetch job details');
          navigate('/employerdashboard');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Error loading job details');
        navigate('/employerdashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['min', 'max', 'currency'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_JOBS_ENDPOINT}/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Job updated successfully!');
        navigate('/employerdashboard');
      } else {
        toast.error('Error updating job: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('An error occurred while updating the job');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 p-8 bg-blue-50 border border-blue-300 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Job Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Requirements */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Salary and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Min Salary (INR)</label>
            <input
              type="number"
              name="min"
              value={formData.salaryRange.min}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Max Salary (INR)</label>
            <input
              type="number"
              name="max"
              value={formData.salaryRange.max}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Currency</label>
            <select
              name="currency"
              value={formData.salaryRange.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
  
        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
export default EditJob;
