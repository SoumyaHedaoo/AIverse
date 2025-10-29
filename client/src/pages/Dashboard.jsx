import React, { useEffect, useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Gem, Sparkle } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import Recentcreations from '../components/Recentcreations';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/user/usersCreations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      // Correctly check success and data
      if (data.success && Array.isArray(data.data)) {
        setCreations(data.data);
        toast.success('Users creation fetched successfully!');
      } else {
        toast.error(data.message || 'Failed to fetch creations');
        setCreations([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching creations');
      setCreations([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Total Creations */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Creations</p>
              <h2 className="text-3xl font-bold text-gray-900">{creations.length}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Sparkle className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Active Plan */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Plan</p>
              <h2 className="text-3xl font-bold text-gray-900">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>
              </h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Gem className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Creations Scrollable List */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          <p className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">Recent Creations</p>

          {loading ? (
            <p className="text-center text-gray-500 py-20">Loading creations...</p>
          ) : creations.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No creations found.</p>
          ) : (
            <div className="space-y-4">
              {creations.map((item) => (
                <Recentcreations key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
