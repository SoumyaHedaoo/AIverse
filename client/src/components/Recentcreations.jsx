import React, { useState } from 'react'
import Markdown from 'react-markdown'

const Recentcreations = ({item}) => {
    const [expand , setExpand] = useState(false);
    
    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-md" 
             onClick={()=> setExpand(!expand)}>
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.prompt}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {item.type} - {new Date(item.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <button className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                        item.type === 'image' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}>
                        {item.type}
                    </button>
                </div>
            </div>
            
            {expand && (
                <div className="border-t border-gray-200 bg-white rounded-b-lg">
                    {item.type === 'image' ? (
                        <div className="p-4">
                            <img 
                                src={item.content} 
                                alt="Generated content" 
                                className="w-full max-w-md mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            />
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className=" reset-tw prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:text-gray-700 prose-code:text-blue-600 prose-pre:bg-gray-100">
                               <Markdown>{item.content}</Markdown> 
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Recentcreations
