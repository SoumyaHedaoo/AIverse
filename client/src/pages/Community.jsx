import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Heart, Copy, Download, Check, Loader2 } from 'lucide-react'; // Added Loader2 for loading spinner
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [likedItems, setLikedItems] = useState(new Set());
  const [copiedItems, setCopiedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();

  // Fetch community creations
  const fetchCreations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/user/allPublishedCreations',
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      console.log("data" , data);
      

      if (data.success && Array.isArray(data.data)) {
        setCreations(data.data);
        toast.success('Creations fetched successfully');
      } else {
        setCreations([]);
        toast.error('Unable to fetch creations');
      }
    } catch (error) {
      setCreations([]);
      toast.error('Unable to fetch creations');
    }
    setLoading(false);
  };

 const handleLike = async (index) => {
  const creationId = creations[index].id;

  try {
    const response = await axios.post(
      '/api/v1/user/togglr-like-creation',
      { id: creationId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    console.log(response);

    if (response.data.success) {
      toast.success(response.data.message || "Like toggled");

      // Update likedItems set to reflect UI state
      setLikedItems((prev) => {
        const updated = new Set(prev);
        if (updated.has(index)) {
          updated.delete(index);
        } else {
          updated.add(index);
        }
        return updated;
      });

      // Update likes count in creations array for UI
      setCreations((prevCreations) => {
        const newCreations = [...prevCreations];
        const creation = newCreations[index];
        if (!creation) return prevCreations;

        creation.likes = response.data.data.likes; // update likes array from backend response
        return newCreations;
      });

    } else {
      toast.error("Unable to like");
    }
  } catch (error) {
    toast.error("Unable to like");
  }
};


  // Copy to clipboard logic
  const handleCopy = async (index, prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      const newCopiedItems = new Set(copiedItems);
      newCopiedItems.add(index);
      setCopiedItems(newCopiedItems);
      setTimeout(() => {
        setCopiedItems((prev) => {
          const updated = new Set(prev);
          updated.delete(index);
          return updated;
        });
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  // Download image logic
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
      toast.error('Failed to download image');
      window.open(imageUrl, '_blank');
    }
  };

  useEffect(() => {
    fetchCreations();
    // eslint-disable-next-line
  }, [user]);

  // UI for loading, empty and error states
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 overflow-y-auto">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10 drop-shadow-sm">
        Community Creations
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : creations.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p>No creations found. Be the first to share!</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.035] overflow-hidden group cursor-pointer relative border border-blue-100"
            >
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(index, creation.prompt);
                    }}
                    className="p-2 bg-white/30 rounded-full hover:bg-white/40 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  >
                    {copiedItems.has(index)
                      ? <Check className="w-4 h-4 text-green-300" />
                      : <Copy className="w-4 h-4 text-white" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(creation.content, index);
                    }}
                    className="p-2 bg-white/30 rounded-full hover:bg-white/40 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mt-8 mb-4 line-clamp-3 leading-relaxed drop-shadow-lg">{creation.prompt}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-lg drop-shadow-lg">{creation.likes?.length ?? 0}</span>
                    <Heart
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index);
                      }}
                      className={`w-7 h-7 cursor-pointer transition-all duration-300 transform hover:scale-125 active:scale-95 drop-shadow-lg
                        ${likedItems.has(index) ? 'text-red-500 fill-red-500 animate-pulse' : 'text-white hover:text-red-300'}
                      `}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
