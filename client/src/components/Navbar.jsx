import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk , UserButton , useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const {openSignIn} = useClerk();


    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <img
                src={assets.logo}
                alt="logo"
                className="h-10 w-auto cursor-pointer"
                onClick={() => navigate('/')}
            />
            {
                user ? <UserButton/> :
                (
                    <button onClick={openSignIn}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm font-medium cursor-pointer"
            >
                Get Started <ArrowRight size={18} />
            </button>
                )
            }
        </nav>
    )
}

export default Navbar
