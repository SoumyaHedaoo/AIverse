import {Edit, Sparkles} from 'lucide-react'
import React, { useState } from 'react'

const articleLength =[
  {length : 800 , text : 'Short(500-800 words)'},
  {length : 1200 , text : 'Medium(800-1200 words)'},
  {length : 1600 , text : 'Large(1200+ words)'},
]

const onSubmitHandler= async (e)=>{
   e.preventDefault();
}

const WriteArticle = () => {
  const [selectedLength , setSelectedLength] = useState(articleLength[0]);
  const [input , setInput] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Sparkles className="w-8 h-8 text-blue-600"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Article Configuration
             </h1>
          </div>
          
          <p className="text-lg font-semibold text-gray-800 mb-3">Article Topic</p>
          <input 
            onChange={(e)=>setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder="Enter your article topic here..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm hover:border-gray-400" 
          />
          
          <p className="text-lg font-semibold text-gray-800 mb-4 mt-8">Article Length</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {
              articleLength.map((item , index)=>(
                <span 
                  onClick={()=>setSelectedLength(item)} 
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
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none">
            <Edit className="w-5 h-5"/>
            Generate Article
          </button>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Edit className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Generated Article
              </h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Edit className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"/>
                <p className="text-gray-700 leading-relaxed text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, voluptate!</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default WriteArticle
