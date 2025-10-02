import { useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Images, Scissors, SquarePen, User } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    {to: '/ai', label: 'Dashboard', Icon: House},
    {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
    {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
    {to: '/ai/generate-images', label: 'Generate Images', Icon: Images},
    {to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser},
    {to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors},
    {to: '/ai/review-resume', label: 'Resume Review', Icon: FileText},
    {to: '/ai/community', label: 'Community', Icon: User}
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();
    
    return (
        <>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-0 ${
                sidebar ? 'translate-x-0' : '-translate-x-full'
            }`}>
                
                {/* Sidebar Header */}
                <div className="flex flex-col items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                    {/* User Avatar */}
                    <div className="relative mb-4">
                        <img 
                            src={user?.imageUrl} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    {/* User Name */}
                    <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
                        {user?.fullName || 'Guest User'}
                    </h1>
                    
                    {/* User Email */}
                    {user?.emailAddresses?.[0]?.emailAddress && (
                        <p className="text-sm text-gray-600 text-center">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    )}
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                    <nav className="space-y-2">
                        {navItems.map(({ to, label, Icon }) => (
                            <NavLink 
                                key={to} 
                                to={to} 
                                end={to === '/ai'} 
                                onClick={() => setSidebar(false)}
                                className={({ isActive }) => 
                                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive 
                                            ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700' 
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-gray-200 p-4 space-y-2">
                    <button 
                        onClick={() => openUserProfile()}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 text-sm font-medium cursor-pointer"
                    >
                        <User className="h-4 w-4 mr-2" />
                        Profile Settings
                    </button>
                    
                    <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 hover:text-red-800 transition-colors duration-200 text-sm font-medium cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
