import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Aitools = ({ user }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Powerful AI Tools
        </h2>
        <p className="mt-4 text-gray-600">
          Explore a variety of AI-powered tools to generate content, create images,
          remove backgrounds, analyze resumes, and more.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="cursor-pointer bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <tool.Icon className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{tool.title}</h3>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Aitools;
