import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

// Restore all imports
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

function App() {
  console.log('App component rendered');
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<CareerPage />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/debug" element={<Debug />} />
        
        <Route path="/jobseeker-dashboard" element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <JobSeekerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/employer-dashboard" element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/jobseeker-form" element={
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <JobSeekerForm />
          </ProtectedRoute>
        } />
        
        <Route path="/employer-form" element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerProfileForm />
          </ProtectedRoute>
        } />
        
        <Route path="/edit-job/:id" element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EditJob />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
