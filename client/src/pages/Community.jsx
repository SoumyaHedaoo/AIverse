import {useUser} from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart, Copy, Download, Check } from 'lucide-react';

const Community = () => {
  const [creations , setCreations] = useState([]);
  const [likedItems, setLikedItems] = useState(new Set());
  const [copiedItems, setCopiedItems] = useState(new Set());
  const {user} = useUser()

  const fetchCreations = async()=>{
    setCreations(dummyPublishedCreationData)
  }

  const handleLike = (index) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(index)) {
      newLikedItems.delete(index);
    } else {
      newLikedItems.add(index);
    }
    setLikedItems(newLikedItems);
  };

  const handleCopy = async (index, prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      const newCopiedItems = new Set(copiedItems);
      newCopiedItems.add(index);
      setCopiedItems(newCopiedItems);
      
      // Remove the copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const updated = new Set(prev);
          updated.delete(index);
          return updated;
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleDownload = async (imageUrl, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `community-creation-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  useEffect(()=>{
    fetchCreations()
  } , [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Community Creations</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          creations.map((creation , index)=>(
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group cursor-pointer relative">
              <img 
                src={creation.content} 
                alt={creation.prompt} 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                {/* Top Action Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(index, creation.prompt);
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  >
                    {copiedItems.has(index) ? (
                      <Check className="w-4 h-4 text-green-300" />
                    ) : (
                      <Copy className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(creation.content, index);
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Bottom Content */}
                <div>
                  <p className="text-white font-medium text-sm line-clamp-3 mb-3 leading-relaxed drop-shadow-lg">{creation.prompt}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-lg drop-shadow-lg">{creation.likes.length}</p>
                    <Heart 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index);
                      }}
                      className={`w-6 h-6 cursor-pointer transition-all duration-300 transform hover:scale-125 active:scale-95 drop-shadow-lg ${
                        likedItems.has(index) 
                          ? 'text-red-500 fill-red-500 animate-pulse' 
                          : 'text-white hover:text-red-300'
                      }`} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Community
