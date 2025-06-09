import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

// Temporarily comment out all imports to isolate the issue
/*
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import EditJob from './components/EditJob'
import { ToastContainer, toast } from 'react-toastify'
import JobSeekerDashboard from './pages/JobSeekerDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import ProtectedRoute from './authvalidation/ProtectedRoute'
import JobSeekerForm from './pages/JobSeekerForm.jsx'
import EmployerProfileForm from './pages/EmployerProfileForm.jsx'
import CareerPage from './pages/CareerPage'
import JobDetails from './pages/JobDetails'
import Debug from './pages/Debug'
*/

function App() {
  console.log('App component rendered - simplified version');
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb' }}>HireNest Application</h1>
      <p>This is a simplified version to test rendering.</p>
      <p>If you can see this text, React is working correctly!</p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Environment Info</h2>
        <p>Mode: {import.meta.env.MODE}</p>
        <p>Base URL: {import.meta.env.BASE_URL}</p>
        <p>DEV: {String(import.meta.env.DEV)}</p>
        <p>PROD: {String(import.meta.env.PROD)}</p>
      </div>
    </div>
  )
}

export default App
