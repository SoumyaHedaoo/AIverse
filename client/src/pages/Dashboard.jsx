import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkle } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import Recentcreations from '../components/Recentcreations'

const Dashboard = () => {
  const [creations , setCreations] = useState([])

  const getDashboardData= async()=>{
    setCreations(dummyCreationData);
  }

  useEffect(()=>{
    getDashboardData();
  } , [])
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/*total creation card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total Creation
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {creations.length}
              </h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Sparkle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/*active plan card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Active Plan
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                <Protect plan='premium' fallback="Free"> Premium </Protect>
              </h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Gem className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <p className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">Recent Creations</p>
        <div className="space-y-4">
          {
            creations.map(item => <Recentcreations key={item.id} item={item} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
