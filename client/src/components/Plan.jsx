import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose your plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consequatur magni molestias accusamus totam quasi obcaecati quos, ducimus quidem harum.
          </p>
        </div>

        {/* Pricing Table Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            <PricingTable 
              appearance={{
                elements: {
                  // Style the main container
                  card: "bg-transparent border-0 shadow-none",
                  
                  // Style pricing plan cards
                  cardBox: "bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-6",
                  
                  // Style headers
                  cardHeader: "text-center pb-6 border-b border-gray-100",
                  cardTitle: "text-2xl font-bold text-gray-900 mb-2",
                  cardDescription: "text-gray-600",
                  
                  // Style pricing
                  cardPricing: "text-center py-8",
                  cardPrice: "text-4xl font-bold text-gray-900 mb-2",
                  cardPeriod: "text-gray-500 text-sm uppercase tracking-wide",
                  
                  // Style features
                  cardFeatures: "space-y-4 mb-8",
                  cardFeature: "flex items-center text-gray-700",
                  cardFeatureIcon: "text-green-500 mr-3 flex-shrink-0",
                  
                  // Style buttons
                  cardAction: "w-full",
                  formButtonPrimary: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-lg",
                  formButtonSecondary: "w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-gray-300",
                  
                  // Style the popular badge
                  badge: "bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wide",
                  
                  // Grid layout
                  cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                }
              }}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Need help choosing?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              All plans include our core features with 24/7 support. Upgrade or downgrade at any time with no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                Compare Features
              </button>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                Contact Sales →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plan
