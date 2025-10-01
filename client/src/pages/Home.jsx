import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Plan from '../components/Plan'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Aitools />
        <Plan />
        <Footer />
    </>
  )
}

export default Home