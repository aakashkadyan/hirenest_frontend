import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import GoBackButton from '../components/GoBackButton';

const EmployerProfileForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [profileId, setProfileId] = useState(null);

  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    website: '',
    industry: '',
    companySize: '',
    location: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_EMPLOYER_PROFILE_ENDPOINT}/${userId}`);
        const data = await res.json();
        
        if (res.ok && data.profile) {
          setFormData(data.profile);
          setIsEditing(true);
          setProfileId(data.profile._id);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isEditing 
        ? `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_EMPLOYER_PROFILE_ENDPOINT}/${profileId}`
        : `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_EMPLOYER_PROFILE_ENDPOINT}`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isEditing ? 'Profile updated successfully!' : 'Profile created successfully!');
        navigate('/employerdashboard');
      } else {
        toast.error('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while saving the profile');
    }
  };

  return (
    <div className="p-4">
      <GoBackButton />   
    
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-10 mb-10 p-6 max-w-2xl mx-auto bg-blue-50 border border-blue-400 rounded-lg shadow-md"
    >
      
      <h2 className="text-xl font-semibold text-center text-blue-600">Company Profile</h2>

      <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
      <SelectField label="Industry" name="industry" value={formData.industry} onChange={handleChange}
        options={["Technology", "Finance", "Healthcare", "Education", "Manufacturing"]} />
      <InputField label="Website URL" name="website" value={formData.website} onChange={handleChange} type="url" />
      <TextAreaField label="Company Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} />
      <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
      <SelectField label="Company Size" name="companySize" value={formData.companySize} onChange={handleChange}
        options={["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"]} />
      <InputField label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" />
      <InputField label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="tel" />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isEditing ? 'Update' : 'Submit'}
      </button>
    </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="mt-1 w-full p-2 border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
  
);

export default EmployerProfileForm;
