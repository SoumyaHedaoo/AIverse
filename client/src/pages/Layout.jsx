import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm">
        {/* Logo */}
        <img 
          src={assets.logo} 
          alt="App Logo" 
          onClick={() => navigate('/')} 
          className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
        />

        {/* Mobile Sidebar Toggle */}
        {sidebar ? (
          <X 
            onClick={() => setSidebar(false)} 
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu 
            onClick={() => setSidebar(true)} 
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (slides in/out) */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Overlay for mobile */}
        {sidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 px-6 py-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
