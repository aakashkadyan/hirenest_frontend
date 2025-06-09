import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CareerPage = () => {
  return (
    <div>  
      <Header />
      <div className="min-h-screen bg-gray-50 py-20 px-4 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl font-bold mb-6 text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Careers at HireNest
          </motion.h1>
          
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Current Openings</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in joining the HireNest team! We don't have any open positions at the moment, but we're always looking for talented individuals to join our team.
            </p>
            <p className="text-gray-600 mb-6">
              Please check back later for future opportunities, or send your resume to <span className="text-blue-600">careers@hirenest.com</span> to be considered for future openings.
            </p>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Stay Connected</h3>
              <p className="text-gray-600">
                Follow us on social media to be the first to know about new opportunities!
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CareerPage;