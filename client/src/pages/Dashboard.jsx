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
    <div>
      <div>
        {/*total creation card */}
        <div>
          <div>
            <p>
              Total Creation
            </p>
            <h2>
              {creations.length}
            </h2>
          </div>
          <div>
            <Sparkle />
          </div>
        </div>

        {/*active plan card */}
        <div>
          <div>
            <p>
              Active Plan
            </p>
            <h2>
              <Protect plan='premium' fallback="Free" > Premium </Protect>
            </h2>
          </div>
          <div>
            <Gem />
          </div>
        </div>
      </div>
      <div>
        <p>Recent creation</p>
        {
          creations.map(item => <Recentcreations key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}

export default Dashboard