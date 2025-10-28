import { useAuth } from '@clerk/clerk-react';
import { File, Sparkles, Upload } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import ResumeAnalysisDisplay from '../components/ResumeAnalysisDisplay.jsx';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ResumeReview = () => {
  const [input, setInput] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const {getToken} = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      toast.error("Please select a resume to upload");
      return;
    }

    // Validate file type
    if (input.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    // Validate file size (max 10MB)
    if (input.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }
    
    try {
      setLoading(true);
      setAnalysis('');

      const formData = new FormData();
      formData.append("resumeFile", input);

      const response = await axios.post('/api/v1/ai/review-resume', 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data && response.data.success) {
        // Try multiple possible response structures
        const reviewData = response.data.data?.review || 
                          response.data.review || 
                          response.data.analysis || 
                          response.data.data;
        
        console.log("Review Data:", reviewData);
        setAnalysis(reviewData);
        toast.success(response.data.message || "Resume reviewed successfully!");
      } else {
        toast.error(response.data?.message || "Failed to review resume");
      }
      
    } catch (error) {
      console.error('Error reviewing resume:', error);
      console.error('Error response:', error.response);
      
      // Show the actual backend error if available
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please check your backend logs.");
      } else {
        toast.error("Unable to review resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <File className="w-8 h-8 text-blue-600 animate-pulse"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Resume Review
             </h1>
          </div>
          
          <p className="text-lg font-semibold text-gray-800 mb-3">Upload Resume</p>
          <input 
            onChange={handleFileChange} 
            accept='application/pdf,.pdf'
            type="file" 
            required
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white shadow-sm hover:border-blue-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none" 
          />
          
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <Upload className="w-4 h-4"/>
            Supported format: PDF only (Max 10MB)
          </p>

          {input && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Selected File:</p>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <File className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{input.name}</p>
                  <p className="text-sm text-gray-600">
                    {(input.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <br />
          <button 
            type="submit"
            disabled={loading || !input} 
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600 w-full sm:w-auto"
          >
            {
              loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <File className="w-5 h-5"/>
                  <span>Review Resume</span>
                </>
              )
            }
          </button>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <File className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Analysis
              </h1>
            </div>
            {!analysis ? (
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-lg p-8 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"/>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-semibold text-lg">Get expert AI-powered resume feedback!</p>
                    <p className="text-gray-600 leading-relaxed">Upload your resume and our AI will analyze it, providing detailed insights on formatting, content, keywords, and suggestions to help you stand out to employers.</p>
                  </div>
                </div>
              </div>
            ) : (
             <ResumeAnalysisDisplay analysis={analysis} />

            )}
      </div>
    </div>
  )
}

export default ResumeReview
