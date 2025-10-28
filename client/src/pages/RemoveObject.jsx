import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Scissors, Sparkles, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [preview, setPreview] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const {getToken} = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      toast.error("Please select an image to upload");
      return;
    }

    if (!objectDescription.trim()) {
      toast.error("Please describe the object you want to remove");
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(input.type)) {
      toast.error("Please upload a valid image file (JPG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 10MB)
    if (input.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }
    
    try {
      setLoading(true);
      setImage('');

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", objectDescription);

      const response = await axios.post('/api/v1/ai/remove-object', 
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log("Response:", response);

      if (response.data && response.data.success) {
        // Try multiple possible response structures
        const imageUrl = response.data.data?.url || response.data.url || response.data.data;
        setImage(imageUrl);
        toast.success(response.data.message || "Object removed successfully!");
      } else {
        toast.error(response.data?.message || "Failed to remove object");
      }
    } catch (error) {
      console.error('Error removing object:', error);
      toast.error(error.response?.data?.message || "Unable to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
             <Scissors className="w-8 h-8 text-blue-600 animate-pulse"/>
             <h1 className="text-3xl font-bold text-gray-900">
              Object Removal Tool
             </h1>
          </div>
          
          <p className="text-lg font-semibold text-gray-800 mb-3">Upload Image</p>
          <input 
            onChange={handleFileChange} 
            accept='image/*'
            type="file" 
            required
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white shadow-sm hover:border-blue-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none" 
          />
          
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <Upload className="w-4 h-4"/>
            Supported formats: JPG, PNG, WebP, GIF (Max 10MB)
          </p>

          {preview && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Preview:</p>
              <div className="flex justify-center">
                <img 
                  src={preview} 
                  alt="Upload preview" 
                  className="max-h-64 rounded-lg shadow-lg border-2 border-white"
                />
              </div>
            </div>
          )}

          <p className="text-lg font-semibold text-gray-800 mb-3 mt-8">Describe Object to Remove</p>
          <input 
            onChange={(e) => setObjectDescription(e.target.value)} 
            value={objectDescription} 
            type="text" 
            placeholder="e.g., person in red shirt, car in background, watermark..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white shadow-sm hover:border-gray-400 outline-none" 
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            Be specific about what you want to remove for better results
          </p>
          
          <br />
          <button 
            type="submit"
            disabled={loading || !input || !objectDescription.trim()} 
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600 w-full sm:w-auto"
          >
            {
              loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Removing Object...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5"/>
                  <span>Remove Object</span>
                </>
              )
            }
          </button>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Scissors className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Processed Image
              </h1>
            </div>
            {!image ? (
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-lg p-8 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"/>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-semibold text-lg">Remove unwanted objects with AI precision!</p>
                    <p className="text-gray-600 leading-relaxed">Upload an image, describe what you want to remove, and our AI will intelligently erase it while seamlessly filling in the background.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 min-h-[400px] relative" style={{backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 20px 20px'}}>
                  <img 
                    src={image} 
                    alt="Processed image with object removed" 
                    className="max-w-full h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Image failed to load:', image);
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage failed to load%3C/text%3E%3C/svg%3E';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', image)}
                  />
                </div>
                <div className="flex justify-center">
                  <a 
                    href={image} 
                    download="object-removed.png"
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Image
                  </a>
                </div>
              </div>
            )}
      </div>
    </div>
  )
}

export default RemoveObject
