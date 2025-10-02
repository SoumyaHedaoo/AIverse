import { Scissors, Upload, FileImage, AlertCircle } from 'lucide-react'
import React, { useState } from 'react'

const onSubmitHandler= async (e)=>{
   e.preventDefault();
}

const RemoveObject = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectDescription, setObjectDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle dropped files
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Scissors className="w-8 h-8 text-blue-600"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Object Removal Tool
             </h1>
          </div>
          
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-4">Upload Image</p>
            
            {/* Custom File Upload Area */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : selectedFile 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                onChange={handleFileChange}
                accept='image/*'
                type="file" 
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                id="file-upload"
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FileImage className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className={`p-4 rounded-full ${
                    dragActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Upload className={`w-10 h-10 ${
                      dragActive ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {dragActive ? 'Drop your image here' : 'Upload your image'}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop your file here, or{' '}
                      <span className="text-blue-600 font-medium">browse</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Supports JPG, PNG, GIF, WebP (Max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-lg font-semibold text-gray-800">Describe object to remove</p>
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              onChange={(e)=>setObjectDescription(e.target.value)} 
              value={objectDescription} 
              type="text" 
              placeholder="e.g., person in red shirt, car in background, watermark..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm hover:border-gray-400" 
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Be specific about what you want to remove for better results
            </p>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={!selectedFile || !objectDescription.trim()}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600"
            >
              <Scissors className="w-5 h-5"/>
              Remove Object
            </button>
          </div>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Scissors className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Processed Image
              </h1>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Scissors className="w-5 h-5 text-green-600"/>
                </div>
                <p className="font-semibold text-gray-800">Processing Complete</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Your processed image will appear here once the object removal is complete. 
                The AI will intelligently fill in the background where the object was removed.
              </p>
            </div>
      </div>
    </div>
  )
}

export default RemoveObject
