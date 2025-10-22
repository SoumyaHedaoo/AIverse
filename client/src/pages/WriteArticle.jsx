import {Edit, Sparkles} from 'lucide-react'
import React, { useState } from 'react'

import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const articleLength = [
  {length : 800 , text : 'Short (500-800 words)'},
  {length : 1200 , text : 'Medium (800-1200 words)'},
  {length : 1600 , text : 'Large (1200+ words)'},
]

const WriteArticle = () => {
  const [selectedLength , setSelectedLength] = useState(articleLength[0]);
  const [input , setInput] = useState('');
  const [loading , setLoading] = useState(false);
  const [content , setContent] = useState('');

  const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error('Please enter an article topic');
      return;
    }
    
    try {
      setLoading(true);
      setContent('');

      const prompt = `Write an article about ${input} in ${selectedLength.text} words`;

      const response = await axios.post('/api/v1/ai/generate-article',
        {
          prompt,
          length: selectedLength.length
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` }
        }
      );
    
      if (response.data && response.data.success) {
        setContent(response.data.data);
        console.log(response.data.data);
        
        toast.success('Article generated successfully!');
      } else {
        toast.error(response.data?.message || 'Failed to generate article');
      }
    } catch (error) {
      console.error('Error generating article:', error);
      toast.error(error.data?.message || 'An error occurred while generating the article');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Sparkles className="w-8 h-8 text-blue-600 animate-pulse"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Article Configuration
             </h1>
          </div>
          
          <p className="text-lg font-semibold text-gray-800 mb-3">Article Topic</p>
          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder="Enter your article topic here..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white shadow-sm hover:border-gray-400 outline-none" 
            required
          />
          
          <p className="text-lg font-semibold text-gray-800 mb-4 mt-8">Article Length</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {
              articleLength.map((item, index) => (
                <span 
                  onClick={() => setSelectedLength(item)} 
                  key={index} 
                  className={`px-6 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 font-medium text-sm select-none hover:shadow-md ${
                    selectedLength.text === item.text 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {item.text}
                </span>
              ))
            }
          </div>
          
          <br />
          <button 
            type="submit"
            disabled={loading || !input.trim()} 
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600 w-full sm:w-auto"
          >
            {
              loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Article...</span>
                </>
              ) : (
                <>
                  <Edit className="w-5 h-5"/>
                  <span>Generate Article</span>
                </>
              )
            }
          </button>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Edit className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Generated Article
              </h1>
            </div>
            {!content ? (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"/>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-semibold text-lg">Ready to create amazing content!</p>
                    <p className="text-gray-600 leading-relaxed">Enter your topic, select the desired length, and click "Generate Article" to create AI-powered content tailored to your needs.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="reset-tw text-gray-800 leading-relaxed">
                  <Markdown>
                    {content}
                  </Markdown>
                </div>
              </div>
            )}
      </div>
    </div>
  )
}

export default WriteArticle
