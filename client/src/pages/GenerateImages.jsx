import { useAuth } from '@clerk/clerk-react';
import { Hash, Image, Sparkles} from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const imageStyles = ['Realistic', 'Ghibli', 'Anime Style', 'Cartoon Style', 'Fantasy Style', '3D Style', 'Portrait Style', 'Abstract Style']

const GenerateImages = () => {
    const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
    const [input, setInput] = useState('');
    const [publish, setPublish] = useState(false);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const {getToken} = useAuth();

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      
      if (!input.trim()) {
        toast.error('Please enter a description for your image');
        return;
      }
      
      try {
        setLoading(true);
        setImage('');
        
        const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

        const response = await axios.post('/api/v1/ai/generate-image',
          {
            prompt, 
            publish
          },
          {
            headers: {Authorization: `Bearer ${await getToken()}`}
          }
        );

        if (response.data && response.data.success) {
          console.log(response);
          setImage(response.data.data || response.data.imageUrl || response.data.image);
          toast.success(response.data.message || "Image generated successfully!");
        } else {
          toast.error(response.data?.message || "Failed to generate image");
        }
      } catch (error) {
        console.error('Error generating image:', error);
        toast.error(error.response?.data?.message || "Unable to generate image. Please try again.");
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
              AI Image Generator
             </h1>
          </div>
          
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-3">Describe Your Image</p>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder="E.g., A serene sunset over mountains with a lake..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white shadow-sm hover:border-gray-400 outline-none" 
              required
            />
          </div>
          
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-4">Style Category</p>
            <div className="flex flex-wrap gap-3">
              {
                imageStyles.map((item, index) => (
                  <span 
                    onClick={() => setSelectedStyle(item)} 
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
                onChange={(e) => setPublish(e.target.checked)} 
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
                    <span>Generating Image...</span>
                  </>
                ) : (
                  <>
                    <Image className="w-5 h-5"/>
                    <span>Generate Image</span>
                  </>
                )
              }
            </button>
          </div>
      </form>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <Image className="w-8 h-8 text-green-600"/>
              <h1 className="text-3xl font-bold text-gray-900">
                Generated Image
              </h1>
            </div>
            {!image ? (
              <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-8 border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0"/>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-semibold text-lg">Ready to bring your imagination to life!</p>
                    <p className="text-gray-600 leading-relaxed">Describe your vision, choose a style, and watch AI create stunning visuals tailored to your needs.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 min-h-[400px]">
                <img 
                  src={image} 
                  alt="Generated AI Image" 
                  className="max-w-full h-auto rounded-lg shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage failed to load%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
      </div>
    </div>
  )
}

export default GenerateImages
