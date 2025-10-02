import {Edit, Hash, Image, Sparkles} from 'lucide-react'
import React, { useState } from 'react'

const imageStyles =['Realistic', 'Ghibli', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style', 'Portrait Style', 'Abstract Style']

const onSubmitHandler= async (e)=>{
   e.preventDefault();
}

const GenerateImages = () => {
    const [selectedStyle , setSelectedStyle] = useState(imageStyles[0]); // Fixed: Initialize with first item from array
    const [input , setInput] = useState('');
    const [publish , setPublish]= useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Sparkles className="w-8 h-8 text-blue-600"/>
             <h1 className="text-3xl font-bold text-gray-900">
              AI Image Generator
             </h1>
          </div>
          
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-3">Describe your Image</p>
            <input 
              onChange={(e)=>setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder="Describe the image you want to generate..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm hover:border-gray-400" 
              required
            />
          </div>
          
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-4">Style Category</p>
            <div className="flex flex-wrap gap-3">
              {
                imageStyles.map((item , index)=>(
                  <span 
                    onClick={()=>setSelectedStyle(item)} 
                    key={index} 
                    className={`px-6 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 font-medium text-sm select-none hover:shadow-md ${
                      selectedStyle === item 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {item}
                  </span>
                ))
              }
            </div>
          </div>

          <div className="mb-8">
            <label className="block cursor-pointer group">
              <input 
                type="checkbox" 
                onChange={(e)=>setPublish(e.target.checked)} 
                checked={publish} 
                className="sr-only peer"
              />
              <div className="p-5 bg-gray-50 rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-gray-300 peer-checked:border-blue-400 peer-checked:bg-blue-50 peer-focus:ring-2 peer-focus:ring-blue-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      publish ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Hash className={`w-5 h-5 transition-colors duration-300 ${
                        publish ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-semibold transition-colors duration-300 ${
                        publish ? 'text-blue-800' : 'text-gray-800'
                      }`}>
                        Make this image public
                      </p>
                      <p className="text-sm text-gray-500">
                        Share your creation with the community
                      </p>
                    </div>
                  </div>
                  <div className="relative w-16 h-9 bg-gray-300 rounded-full transition-all duration-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500 peer-hover:peer-checked:from-purple-600 peer-hover:peer-checked:to-blue-600">
                    <div className={`absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-7 w-7 transition-all duration-500 flex items-center justify-center shadow-md ${
                      publish ? 'transform translate-x-7' : ''
                    }`}>
                      {publish ? (
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit"
              disabled={!input.trim()} 
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600"
            >
              <Image className="w-5 h-5"/>
              Generate Image
            </button>
          </div>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Image className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Generated Image
              </h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <Image className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"/>
                <p className="text-gray-700 leading-relaxed text-lg">Your generated image will appear here once you click the generate button above.</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default GenerateImages
