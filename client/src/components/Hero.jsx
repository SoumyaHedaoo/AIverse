// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom"; // assuming react-router-dom is used

const Hero = () => {
  return (
    <section className="relative bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-32 flex flex-col items-start space-y-8">
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          All Your AI, One Place
        </h1>
        
        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-300">
          Generate blog content, suggest titles, create images, remove backgrounds, analyze resumes — AI for everything, all in one place.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/create"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Start Creating Now
          </Link>
          <a
            href="#features"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition"
          >
            AI Tools
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
