import { Eraser } from 'lucide-react';
import React, { useState } from 'react'

const onSubmitHandler= async (e)=>{
   e.preventDefault();
}

const RemoveBackground = () => {
  const [input , setInput] = useState('')
  return (
        <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Eraser className="w-8 h-8 text-blue-600"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Background Removal
             </h1>
          </div>
          
          <p className="text-lg font-semibold text-gray-800 mb-3">Upload Image</p>
          <input 
            onChange={(e)=>setInput(e.target.files[0])} 
            accept='image/*'
            type="file" 
            required
            placeholder="Enter your article topic here..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm hover:border-gray-400 cursor-pointer " 
          />
          
          <p>support img jpg png other image formats</p>

          
          <br />
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none">
            <Eraser className="w-5 h-5"/>
            Remove Background
          </button>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Eraser className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Processed Image
              </h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Eraser className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"/>
                <p className="text-gray-700 leading-relaxed text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, voluptate!</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default RemoveBackground